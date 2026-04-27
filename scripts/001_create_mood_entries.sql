-- Create mood_entries table for tracking user moods
CREATE TABLE IF NOT EXISTS public.mood_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  mood INTEGER NOT NULL CHECK (mood >= 1 AND mood <= 5),
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.mood_entries ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own mood entries" 
  ON public.mood_entries FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own mood entries" 
  ON public.mood_entries FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own mood entries" 
  ON public.mood_entries FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own mood entries" 
  ON public.mood_entries FOR DELETE 
  USING (auth.uid() = user_id);

-- Create index for faster queries by user and date
CREATE INDEX IF NOT EXISTS mood_entries_user_id_created_at_idx 
  ON public.mood_entries(user_id, created_at DESC);
