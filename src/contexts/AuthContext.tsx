import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
  admin_granted_access: boolean;
  admin_access_end: string | null;
  hasAccess: boolean;
  accessType: 'stripe' | 'admin' | 'both' | 'none';
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  subscription: SubscriptionData;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<{ error: any }>;
  checkSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context; // Return undefined instead of throwing error
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [subscription, setSubscription] = useState<SubscriptionData>({
    subscribed: false,
    subscription_tier: null,
    subscription_end: null,
    admin_granted_access: false,
    admin_access_end: null,
    hasAccess: false,
    accessType: 'none'
  });
  const [loading, setLoading] = useState(true);
  const [sessionLoading, setSessionLoading] = useState(true);

  console.log('AuthProvider rendered, loading:', loading, 'user:', user?.email);

  // Helper function to calculate access status
  const calculateAccessStatus = (data: {
    subscribed?: boolean;
    subscription_tier?: string | null;
    subscription_end?: string | null;
    admin_granted_access?: boolean;
    admin_access_end?: string | null;
  }): SubscriptionData => {
    const subscribed = data.subscribed || false;
    const adminGrantedAccess = data.admin_granted_access || false;
    const adminAccessEnd = data.admin_access_end;
    
    // Check if admin access has expired
    const adminAccessValid = adminGrantedAccess && (!adminAccessEnd || new Date(adminAccessEnd) > new Date());
    
    let hasAccess = subscribed || adminAccessValid;
    let accessType: 'stripe' | 'admin' | 'both' | 'none' = 'none';
    
    if (subscribed && adminAccessValid) {
      accessType = 'both';
    } else if (subscribed) {
      accessType = 'stripe';
    } else if (adminAccessValid) {
      accessType = 'admin';
    }
    
    return {
      subscribed,
      subscription_tier: data.subscription_tier || null,
      subscription_end: data.subscription_end || null,
      admin_granted_access: adminGrantedAccess,
      admin_access_end: adminAccessEnd || null,
      hasAccess,
      accessType
    };
  };

  const checkSubscription = async () => {
    // Don't reset subscription if session is still loading
    if (!session) {
      if (!sessionLoading) {
        console.log('[AUTH] No session after loading complete, setting unsubscribed state');
        setSubscription(calculateAccessStatus({}));
      } else {
        console.log('[AUTH] No session but still loading, keeping current subscription state');
      }
      return;
    }

    try {
      console.log('[AUTH] Checking subscription for user:', session.user.email);
      
      // Try direct database query first (more reliable)
      console.log('[AUTH] Checking database directly...');
      const { data: dbData, error: dbError } = await supabase
        .from('subscribers')
        .select('subscribed, subscription_tier, subscription_end, admin_granted_access, admin_access_end')
        .eq('user_id', session.user.id)
        .maybeSingle();
      
      console.log('[AUTH] Database query result:', { dbData, dbError });
      
      if (!dbError && dbData) {
        setSubscription(calculateAccessStatus(dbData));
        console.log('[AUTH] Using database subscription data');
        return;
      }
      
      // Fallback to edge function if database query fails
      console.log('[AUTH] Database failed, trying edge function...');
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      console.log('[AUTH] Check-subscription response:', { data, error });

      if (error) {
        console.error('[AUTH] Edge function also failed:', error);
        return;
      }

      console.log('[AUTH] Setting subscription state from edge function:', {
        subscribed: data.subscribed || false,
        subscription_tier: data.subscription_tier || null,
        subscription_end: data.subscription_end || null
      });

      setSubscription(calculateAccessStatus({
        subscribed: data.subscribed || false,
        subscription_tier: data.subscription_tier || null,
        subscription_end: data.subscription_end || null
      }));
    } catch (error) {
      console.error('[AUTH] Error in checkSubscription:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        console.log('[AUTH] Auth state changed:', event, currentSession?.user?.email);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setSessionLoading(false); // Session loading is complete
        
        if (event === 'SIGNED_OUT') {
          // Only reset subscription on explicit logout
          console.log('[AUTH] User signed out, resetting subscription');
          setSubscription(calculateAccessStatus({}));
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      console.log('[AUTH] Initial session:', currentSession?.user?.email);
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      setSessionLoading(false); // Initial session loading is complete
      setLoading(false);
    });

    return () => authSubscription.unsubscribe();
  }, []);

  // Separate effect to handle subscription checks when session changes
  useEffect(() => {
    if (!sessionLoading && session?.user) {
      console.log('[AUTH] Session ready, checking subscription');
      checkSubscription();
    }
  }, [session, sessionLoading]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    const redirectUrl = `${window.location.origin}/`;
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        }
      }
    });
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const value = {
    user,
    session,
    subscription,
    loading,
    signIn,
    signUp,
    signOut,
    checkSubscription,
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/20 via-secondary/10 to-muted/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground font-medium">Wird geladen...</p>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};