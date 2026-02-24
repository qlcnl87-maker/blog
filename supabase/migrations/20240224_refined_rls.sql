-- Refine RLS policies for posts to allow updates and deletes by authors
CREATE POLICY "Authors can update their own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own posts" ON public.posts
    FOR DELETE USING (auth.uid() = author_id);
