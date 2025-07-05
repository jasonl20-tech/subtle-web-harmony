-- Add RLS policies for admins to manage all subscriptions
CREATE POLICY "Admins can insert all subscriptions" 
ON public.subscribers 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update all subscriptions" 
ON public.subscribers 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can view all subscriptions" 
ON public.subscribers 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));