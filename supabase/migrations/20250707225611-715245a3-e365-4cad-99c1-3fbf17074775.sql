-- Allow all authenticated users to read webhook_url setting
DROP POLICY IF EXISTS "Admins can manage settings" ON public.settings;

-- Admin-only policy for all operations except reading webhook_url
CREATE POLICY "Admins can manage settings" 
ON public.settings 
FOR ALL 
USING (
  CASE 
    WHEN key = 'webhook_url' AND tg_op = 'SELECT' THEN auth.uid() IS NOT NULL
    ELSE has_role(auth.uid(), 'admin'::app_role)
  END
)
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Additional read-only policy for webhook_url for all authenticated users
CREATE POLICY "All users can read webhook_url" 
ON public.settings 
FOR SELECT 
USING (key = 'webhook_url' AND auth.uid() IS NOT NULL);