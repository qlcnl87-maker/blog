'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'

interface Post {
    id: string
    title: string
    content: string
    category: string
    thumbnail_url: string
    created_at: string
}

interface PostCardProps {
    post: Post
}

export default function PostCard({ post }: PostCardProps) {
    const [imageError, setImageError] = useState(false)

    const timeAgo = (date: string) => {
        const diff = new Date().getTime() - new Date(date).getTime()
        const minutes = Math.floor(diff / 1000 / 60)
        if (minutes < 60) return `${minutes}분 전`
        const hours = Math.floor(minutes / 60)
        if (hours < 24) return `${hours}시간 전`
        return new Date(date).toLocaleDateString()
    }

    const getThumbnail = () => {
        if (post.title === 'Git Rebase Interactive 마스터하기') {
            return '/images/git-rebase.svg'
        }
        return post.thumbnail_url
    }

    const thumbnailUrl = getThumbnail()

    return (
        <Link href={`/post/${post.id}`} className="block">
            <div className="bg-card border border-border rounded-2xl overflow-hidden group cursor-pointer hover:border-primary/50 transition-all hover:shadow-xl h-full">
                <div className="relative aspect-video w-full">
                    {thumbnailUrl && !imageError ? (
                        <img
                            src={thumbnailUrl}
                            alt={post.title}
                            onError={() => setImageError(true)}
                            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full bg-secondary flex items-center justify-center p-8 text-center text-white/50 font-bold">
                            {post.title}
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold text-primary uppercase tracking-wider">{post.category}</span>
                        <span className="text-xs text-muted flex items-center gap-1">
                            <Clock size={12} />
                            {timeAgo(post.created_at)}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                        {post.title}
                    </h3>
                    <p className="text-sm text-muted mt-2 line-clamp-2">
                        {post.content}
                    </p>
                </div>
            </div>
        </Link>
    )
}
