-- Add api_key column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN api_key uuid DEFAULT gen_random_uuid() UNIQUE NOT NULL;

-- Create index for faster lookups
CREATE INDEX idx_profiles_api_key ON public.profiles(api_key);

-- Create reports table to store download links for users
CREATE TABLE public.reports (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES public.profiles(user_id) ON DELETE CASCADE,
  api_key uuid NOT NULL REFERENCES public.profiles(api_key) ON DELETE CASCADE,
  title text NOT NULL,
  download_url text NOT NULL,
  file_type text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on reports table
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Create policies for reports table
CREATE POLICY "Users can view their own reports" 
ON public.reports 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Reports can be inserted via API key" 
ON public.reports 
FOR INSERT 
WITH CHECK (true); -- This will be controlled by the API key system

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates on reports
CREATE TRIGGER update_reports_updated_at
    BEFORE UPDATE ON public.reports
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();