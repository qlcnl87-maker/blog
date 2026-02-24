/**
 * [게시글 상세 페이지 요약]
 * 이 파일은 특정 게시글의 내용을 자세히 보여주는 화면을 담당합니다.
 * 주소창의 아이디(ID)를 통해 데이터베이스에서 해당 글을 찾아 화면에 표시하며,
 * 작성자 정보, 공유하기, 북마크, 그리고 댓글 목록 등을 보여줍니다.
 */

import { createClient } from '@/utils/supabase/server' // 서버용 데이터베이스 연결 도구를 가져옵니다.
import Navbar from '@/components/Navbar' // 상단 메뉴 표시줄 컴포넌트를 가져옵니다.
import BottomNav from '@/components/BottomNav' // 하단 메뉴 컴포넌트를 가져옵니다.
import AuthorInfo from '@/components/AuthorInfo' // 작성자 정보를 표시하는 컴포넌트를 가져옵니다.
import ShareButtons from '@/components/ShareButtons' // 소셜 공유 버튼 컴포넌트를 가져옵니다.
import PostActionButtons from '@/components/PostActionButtons' // 수정/삭제 버튼 컴포넌트를 가져옵니다.
import { ArrowLeft, Bookmark, Share2 } from 'lucide-react' // 화면에 쓰일 아이콘들을 가져옵니다.
import Link from 'next/link' // 다른 페이지로 이동하기 위한 링크 도구를 가져옵니다.
import { redirect } from 'next/navigation' // 다른 주소로 강제 이동(리다이렉트)시키는 도구를 가져옵니다.

// 게시글 데이터의 형태를 정의합니다.
interface Post {
    id: string
    title: string
    content: string
    category: string
    thumbnail_url: string
    author_id: string
    created_at: string
}

// 상세 페이지를 구성하는 주요 함수입니다.
export default async function PostDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params // 주소창에서 게시글의 고유 아이디를 추출합니다.
    const supabase = await createClient() // 데이터베이스에 접속합니다.

    // 현재 로그인한 사용자의 정보를 가져옵니다.
    const { data: { user } } = await supabase.auth.getUser()

    // 데이터베이스의 'posts' 표에서 이 아이디와 일치하는 글 하나를 가져옵니다.
    const { data: post, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single()

    // 글을 못 찾았거나 에러가 났을 경우 처리합니다.
    if (error || !post) {
        console.error('Error fetching post:', error)
        return (
            <div className="min-h-screen bg-background">
                <Navbar user={user} />
                <div className="flex flex-col items-center justify-center py-40">
                    <h2 className="text-2xl font-bold mb-4">게시글을 찾을 수 없습니다.</h2>
                    <Link href="/" className="text-primary hover:underline">홈으로 돌아가기</Link>
                </div>
            </div>
        )
    }

    // 예시용 특정 글 제목일 때만 이미지를 변경해주는 코드입니다. (테스트용)
    const thumbnailUrl = post.title === 'Git Rebase Interactive 마스터하기'
        ? '/images/git-rebase.svg'
        : post.thumbnail_url

    return (
        <div className="min-h-screen bg-background pb-32">
            <Navbar user={user} /> {/* 상단 메뉴바 */}

            <article className="max-w-2xl mx-auto px-4 pt-12">
                {/* 상단 내비게이션 및 액션 버튼 영역 */}
                <div className="flex items-center justify-between mb-8">
                    {/* 뒤로 가기 링크 (홈으로 이동) */}
                    <Link
                        href="/"
                        className="p-2 -ml-2 text-muted hover:text-foreground transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </Link>
                    <div className="flex items-center gap-2">
                        {/* 본인 글일 때만 보이는 수정/삭제 버튼 */}
                        <PostActionButtons
                            postId={id}
                            authorId={post.author_id}
                            currentUserId={user?.id}
                        />
                        {/* 공유 아이콘 버튼 */}
                        <button className="p-2 text-muted hover:text-primary transition-colors">
                            <Share2 size={22} />
                        </button>
                        {/* 북마크 아이콘 버튼 */}
                        <button className="p-2 text-muted hover:text-primary transition-colors">
                            <Bookmark size={22} />
                        </button>
                    </div>
                </div>

                {/* 제목 및 작성자 정보 영역 */}
                <div className="mb-8">
                    {/* 카테고리 표시 배지 */}
                    <span className="inline-block px-3 py-1 rounded-md bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                        {post.category}
                    </span>
                    {/* 큰 게시글 제목 */}
                    <h1 className="text-3xl md:text-4xl font-black leading-tight mb-6">
                        {post.title}
                    </h1>
                    {/* 작성자 아바타와 이름, 날짜 */}
                    <AuthorInfo
                        name="김개발"
                        date={post.created_at}
                        avatarUrl="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop"
                    />
                </div>

                {/* 게시글 대표 이미지(썸네일) 영역 */}
                <div className="relative aspect-video w-full mb-12 rounded-3xl overflow-hidden bg-secondary">
                    {thumbnailUrl ? (
                        <img
                            src={thumbnailUrl}
                            alt={post.title}
                            className="object-cover w-full h-full"
                        />
                    ) : (
                        // 이미지가 없을 경우 제목을 대신 보여줍니다.
                        <div className="w-full h-full flex items-center justify-center p-8 text-center text-white/20 font-black text-2xl">
                            {post.title}
                        </div>
                    )}
                </div>

                {/* 실제 본문 내용 영역입니다. */}
                <div className="prose prose-invert prose-lg max-w-none">
                    {/* 데이터베이스에서 가져온 글 내용을 표시합니다. */}
                    <p className="text-foreground/90 leading-relaxed mb-6">
                        {post.content}
                    </p>
                    {/* 예시용 추가 설명 텍스트입니다. */}
                    <p className="text-foreground/90 leading-relaxed">
                        비동기 프로그래밍은 자바스크립트의 핵심 개념 중 하나입니다. 이를 통해 프로그램은 오래 걸릴 수 있는 작업을 시작해두고, 그 작업이 완료될 때까지 마냥 기다리는 대신 다른 이벤트를 처리할 수 있습니다.
                    </p>

                    <h2 className="text-2xl font-bold mt-12 mb-6">코드 예시</h2>
                    {/* 소스 코드를 예쁘게 보여주는 코드 블록입니다. */}
                    <div className="bg-secondary/50 rounded-2xl p-6 font-mono text-sm mb-12 border border-border">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-muted">callback-example.js</span>
                            <button className="text-muted hover:text-foreground">copy</button>
                        </div>
                        <pre className="text-primary-foreground/90 overflow-x-auto">
                            {`function getData(callback) {
  setTimeout(() => {
    callback('데이터 수신 완료');
  }, 1000);
}

getData((data) => {
  console.log(data);
});`}
                        </pre>
                    </div>

                    <p className="text-foreground/90 leading-relaxed">
                        이러한 패턴은 서로 의존적인 여러 비동기 작업을 처리해야 할 때 코드를 관리하기 매우 어렵게 만듭니다.
                    </p>
                </div>

                {/* SNS 공유 버튼들 */}
                <ShareButtons />

                {/* 댓글 영역입니다. (현재는 예시 데이터) */}
                <div className="mt-20">
                    <h3 className="text-xl font-bold mb-8">댓글 (48)</h3>
                    <div className="space-y-8">
                        {/* 댓글 하나 단위 */}
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-blue-500 flex-shrink-0 flex items-center justify-center font-bold">JD</div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold">정대리</span>
                                    <span className="text-xs text-muted">2시간 전</span>
                                </div>
                                <p className="text-foreground/80 text-sm mb-2">훌륭한 설명이네요! 콜백과의 비교 덕분에 왜 async/await이 더 깔끔한지 명확하게 이해되었습니다.</p>
                                <button className="text-xs text-muted font-bold hover:text-primary">좋아요 12 · 답글</button>
                            </div>
                        </div>
                        {/* 답글 (들여쓰기 된 작성자 댓글) */}
                        <div className="flex gap-4 ml-12">
                            <div className="w-10 h-10 rounded-full bg-secondary flex-shrink-0 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop" alt="김개발" className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-bold">김개발</span>
                                    <span className="bg-primary/20 text-primary text-[10px] px-1.5 py-0.5 rounded font-bold">작성자</span>
                                    <span className="text-xs text-muted">1시간 전</span>
                                </div>
                                <p className="text-foreground/80 text-sm mb-2">도움이 되었다니 기쁘네요, 대리님! 그래도 특정 병렬 처리 시나리오에서는 여전히 프로미스 체이닝이 유용할 때가 있습니다.</p>
                                <button className="text-xs text-muted font-bold hover:text-primary">좋아요 4 · 답글</button>
                            </div>
                        </div>
                    </div>

                    {/* 댓글 입력창 영역 */}
                    <div className="mt-12 bg-secondary/30 rounded-2xl p-4 border border-border">
                        <textarea
                            placeholder="토론에 참여해보세요..."
                            className="w-full bg-transparent border-none focus:ring-0 text-sm min-h-[100px] resize-none"
                        />
                        <div className="flex justify-end mt-2">
                            <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors">
                                댓글 작성
                            </button>
                        </div>
                    </div>
                </div>
            </article>

            <BottomNav />
        </div>
    )
}
