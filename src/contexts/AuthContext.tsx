import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
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
    subscription_end: null
  });
  const [loading, setLoading] = useState(true);

  console.log('AuthProvider rendered, loading:', loading, 'user:', user?.email);

  const checkSubscription = async () => {
    if (!session) {
      console.log('[AUTH] No session, setting unsubscribed state');
      setSubscription({ subscribed: false, subscription_tier: null, subscription_end: null });
      return;
    }

    try {
      console.log('[AUTH] Checking subscription for user:', session.user.email);
      
      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      console.log('[AUTH] Check-subscription response:', { data, error });

      if (error) {
        console.error('[AUTH] Error checking subscription:', error);
        
        // Fallback: Check directly from database
        console.log('[AUTH] Trying database fallback...');
        const { data: dbData, error: dbError } = await supabase
          .from('subscribers')
          .select('subscribed, subscription_tier, subscription_end')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        console.log('[AUTH] Database fallback result:', { dbData, dbError });
        
        if (!dbError && dbData) {
          setSubscription({
            subscribed: dbData.subscribed || false,
            subscription_tier: dbData.subscription_tier || null,
            subscription_end: dbData.subscription_end || null
          });
          console.log('[AUTH] Using database fallback subscription data');
          return;
        }
        
        return;
      }

      console.log('[AUTH] Setting subscription state:', {
        subscribed: data.subscribed || false,
        subscription_tier: data.subscription_tier || null,
        subscription_end: data.subscription_end || null
      });

      setSubscription({
        subscribed: data.subscribed || false,
        subscription_tier: data.subscription_tier || null,
        subscription_end: data.subscription_end || null
      });
    } catch (error) {
      console.error('[AUTH] Error in checkSubscription:', error);
      
      // Fallback: Check directly from database
      try {
        console.log('[AUTH] Exception fallback: checking database directly...');
        const { data: dbData, error: dbError } = await supabase
          .from('subscribers')
          .select('subscribed, subscription_tier, subscription_end')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        console.log('[AUTH] Exception fallback result:', { dbData, dbError });
        
        if (!dbError && dbData) {
          setSubscription({
            subscribed: dbData.subscribed || false,
            subscription_tier: dbData.subscription_tier || null,
            subscription_end: dbData.subscription_end || null
          });
          console.log('[AUTH] Using exception fallback subscription data');
        }
      } catch (fallbackError) {
        console.error('[AUTH] Even fallback failed:', fallbackError);
      }
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription: authSubscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Check subscription after auth state change
        if (currentSession?.user) {
          setTimeout(() => {
            checkSubscription();
          }, 0);
        } else {
          setSubscription({ subscribed: false, subscription_tier: null, subscription_end: null });
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        setTimeout(() => {
          checkSubscription();
        }, 0);
      }
      
      setLoading(false);
    });

    return () => authSubscription.unsubscribe();
  }, []);

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