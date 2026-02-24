-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    category TEXT NOT NULL, -- Keep as text for simplicity as per previous design, or could link to categories.id
    thumbnail_url TEXT,
    author_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public categories are viewable by everyone." ON public.categories 
    FOR SELECT USING (true);

CREATE POLICY "Public posts are viewable by everyone." ON public.posts 
    FOR SELECT USING (true);

-- Create Policy for authenticated users to insert their own posts (optional for now, but good practice)
CREATE POLICY "Allow authenticated users to insert their own posts" ON public.posts
    FOR INSERT WITH CHECK (auth.uid() = author_id);
