import { createClient } from '@/utils/supabase/server'
import Navbar from '@/components/Navbar'
import SearchBar from '@/components/SearchBar'
import CategoryFilter from '@/components/CategoryFilter'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'
import BottomNav from '@/components/BottomNav'

interface Post {
  id: string
  title: string
  content: string
  category: string
  thumbnail_url: string
  created_at: string
}

export default async function HomePage(props: {
  searchParams: Promise<{ category?: string; page?: string; q?: string }>
}) {
  const searchParams = await props.searchParams
  const category = searchParams.category || '전체'
  const page = parseInt(searchParams.page || '1')
  const q = searchParams.q || ''
  const postsPerPage = 6

  const supabase = await createClient()

  // Fetch User
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch Posts
  let query = supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((page - 1) * postsPerPage, page * postsPerPage - 1)

  if (category !== '전체') {
    query = query.eq('category', category)
  }

  if (q) {
    query = query.ilike('title', `%${q}%`)
  }

  const { data: posts, count, error } = await query

  if (error) {
    console.error('Error fetching posts:', error)
  }

  const totalCount = count || 0
  const totalPages = Math.ceil(totalCount / postsPerPage)

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navbar user={user} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            최신 개발 트렌드와 <span className="text-primary text-glow">인사이트</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            매일 업데이트되는 양질의 개발 포스트를 확인해보세요.
          </p>
        </div>

        <SearchBar initialQuery={q} />

        <CategoryFilter
          selectedCategory={category}
        />

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            최신 글
            <span className="text-sm font-normal text-muted bg-secondary px-2 py-0.5 rounded-full">
              {totalCount}
            </span>
          </h2>

          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-muted text-lg">게시글이 없습니다.</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
          />
        )}
      </main>

      <div className="hidden md:block py-12 border-t border-border mt-12 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted text-sm text-[12px]">
          &copy; 2026 DevLog. All rights reserved.
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
