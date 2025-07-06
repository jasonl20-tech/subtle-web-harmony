-- Add columns for admin-granted dashboard access
ALTER TABLE public.subscribers 
ADD COLUMN admin_granted_access boolean NOT NULL DEFAULT false,
ADD COLUMN admin_access_end timestamp with time zone;

-- Add index for better performance when checking admin access
CREATE INDEX idx_subscribers_admin_access ON public.subscribers (admin_granted_access, admin_access_end);

-- Add comment for clarity
COMMENT ON COLUMN public.subscribers.admin_granted_access IS 'Dashboard access granted by admin, independent of Stripe subscription';
COMMENT ON COLUMN public.subscribers.admin_access_end IS 'When admin-granted access expires (NULL = permanent)';