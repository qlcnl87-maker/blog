/**
 * [홈 페이지 요약]
 * 이 파일은 블로그의 메인 화면을 담당합니다. 
 * 데이터베이스(Supabase)에서 게시글 목록을 가져와서 화면에 보여주며,
 * 검색, 카테고리 필터링, 그리고 페이지 나누기(페이징) 기능을 제공합니다.
 */

import { createClient } from '@/utils/supabase/server' // 서버용 데이터베이스 연결 도구를 가져옵니다.
import Navbar from '@/components/Navbar' // 상단 메뉴 표시줄 컴포넌트를 가져옵니다.
import SearchBar from '@/components/SearchBar' // 검색창 컴포넌트를 가져옵니다.
import CategoryFilter from '@/components/CategoryFilter' // 카테고리 선택 버튼 컴포넌트를 가져옵니다.
import PostCard from '@/components/PostCard' // 개별 게시글을 보여주는 카드 컴포넌트를 가져옵니다.
import Pagination from '@/components/Pagination' // 페이지 번호 이동 컴포넌트를 가져옵니다.
import BottomNav from '@/components/BottomNav' // 하단 메뉴 컴포넌트를 가져옵니다.

// 게시글 데이터의 형태를 정의합니다. (아이디, 제목, 내용, 카테고리 등)
interface Post {
  id: string
  title: string
  content: string
  category: string
  thumbnail_url: string
  created_at: string
}

// 홈 페이지를 만드는 주 기능 함수입니다.
export default async function HomePage(props: {
  searchParams: Promise<{ category?: string; page?: string; q?: string }> // 주소창의 정보(카테고리, 페이지번호, 검색어)를 받습니다.
}) {
  const searchParams = await props.searchParams // 주소창 정보를 다 읽을 때까지 기다립니다.
  const category = searchParams.category || '전체' // 선택된 카테고리가 없으면 '전체'로 설정합니다.
  const page = parseInt(searchParams.page || '1') // 현재 페이지 번호를 숫자로 바꿉니다. 없으면 1페이지입니다.
  const q = searchParams.q || '' // 검색어를 가져옵니다. 없으면 빈 칸입니다.
  const postsPerPage = 6 // 한 화면에 보여줄 게시글 개수를 6개로 정합니다.

  const supabase = await createClient() // 데이터베이스에 접속합니다.

  // 로그인한 사용자의 정보를 가져옵니다.
  const { data: { user } } = await supabase.auth.getUser()

  // 게시글 데이터를 가져오기 위한 준비를 합니다.
  let query = supabase
    .from('posts') // 'posts'라는 이름의 표에서 데이터를 찾습니다.
    .select('*', { count: 'exact' }) // 모든 정보를 가져오고 전체 개수도 셉니다.
    .order('created_at', { ascending: false }) // 최신순(날짜 역순)으로 정렬합니다.
    .range((page - 1) * postsPerPage, page * postsPerPage - 1) // 현재 페이지에 해당하는 범위의 글만 가져옵니다.

  // 사용자가 특정 카테고리를 선택했다면, 그 카테고리의 글만 고릅니다.
  if (category !== '전체') {
    query = query.eq('category', category)
  }

  // 사용자가 검색어를 입력했다면, 제목에 검색어가 포함된 글만 고릅니다.
  if (q) {
    query = query.ilike('title', `%${q}%`)
  }

  const { data: posts, count, error } = await query // 실제로 데이터베이스에서 글을 가져옵니다.

  // 에러가 발생했다면 내용을 콘솔(기록장)에 남깁니다.
  if (error) {
    console.error('Error fetching posts:', error)
  }

  const totalCount = count || 0 // 전체 글 개수를 저장합니다.
  const totalPages = Math.ceil(totalCount / postsPerPage) // 전체 페이지 수를 계산합니다.

  return (
    // 전체 화면 배경과 여백을 설정합니다.
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Navbar user={user} /> {/* 상단 메뉴를 보여주고 사용자 정보를 넘겨줍니다. */}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 메인 제목 영역입니다. */}
        <div className="py-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
            최신 개발 트렌드와 <span className="text-primary text-glow">인사이트</span>
          </h1>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            매일 업데이트되는 양질의 개발 포스트를 확인해보세요.
          </p>
        </div>

        <SearchBar initialQuery={q} /> {/* 검색창을 보여줍니다. */}

        <CategoryFilter
          selectedCategory={category} // 현재 선택된 카테고리 표시를 위해 정보를 넘깁니다.
        />

        {/* 게시글 목록이 들어가는 영역입니다. */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            최신 글
            {/* 전체 글 개수를 작게 표시합니다. */}
            <span className="text-sm font-normal text-muted bg-secondary px-2 py-0.5 rounded-full">
              {totalCount}
            </span>
          </h2>

          {/* 가져온 게시글이 있으면 목록을 보여주고, 없으면 없다는 메시지를 띄웁니다. */}
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} /> // 각 게시글을 카드 형태로 하나씩 보여줍니다.
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-muted text-lg">게시글이 없습니다.</p>
            </div>
          )}
        </div>

        {/* 페이지가 2페이지 이상일 때만 페이지 번호를 보여줍니다. */}
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
          />
        )}
      </main>

      {/* 하단 푸터 영역(저작권 표시 등)입니다. */}
      <div className="hidden md:block py-12 border-t border-border mt-12 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 text-center text-muted text-sm text-[12px]">
          &copy; 2026 DevLog. All rights reserved.
        </div>
      </div>

      <BottomNav /> {/* 모바일용 하단 메뉴를 보여줍니다. */}
    </div>
  )
}
