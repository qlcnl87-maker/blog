'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface PostActionButtonsProps {
    postId: string
    authorId: string
    currentUserId: string | undefined
}

export default function PostActionButtons({ postId, authorId, currentUserId }: PostActionButtonsProps) {
    const router = useRouter()
    const supabase = createClient()

    const handleDelete = async () => {
        if (!confirm('정말 이 게시글을 삭제하시겠습니까?')) return

        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', postId)

        if (error) {
            alert('삭제 중 오류가 발생했습니다: ' + error.message)
        } else {
            router.push('/')
            router.refresh()
        }
    }

    if (currentUserId !== authorId) return null

    return (
        <div className="flex items-center gap-2 mr-2">
            <Link
                href={`/edit/${postId}`}
                className="text-xs font-bold text-slate-400 hover:text-primary transition-colors px-2 py-1"
            >
                수정
            </Link>
            <button
                onClick={handleDelete}
                className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors px-2 py-1"
            >
                삭제
            </button>
            <div className="w-[1px] h-3 bg-slate-800 mx-1" />
        </div>
    )
}
