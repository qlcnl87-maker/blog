'use client'

import { Share2, Bookmark, ArrowLeft, MessageSquare, Heart } from 'lucide-react'
import Link from 'next/link'

export default function ShareButtons() {
    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: document.title,
                url: window.location.href,
            })
        } else {
            navigator.clipboard.writeText(window.location.href)
            alert('링크가 복사되었습니다.')
        }
    }

    return (
        <div className="flex items-center justify-between py-6 border-t border-b border-border my-8">
            <div className="flex items-center gap-6">
                <button className="flex items-center gap-1.5 text-muted hover:text-primary transition-colors group">
                    <Heart size={20} className="group-hover:fill-primary" />
                    <span className="text-sm font-medium">1.2k</span>
                </button>
                <button className="flex items-center gap-1.5 text-muted hover:text-primary transition-colors">
                    <MessageSquare size={20} />
                    <span className="text-sm font-medium">48</span>
                </button>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={handleShare}
                    className="p-2 text-muted hover:text-primary transition-colors"
                >
                    <Share2 size={22} />
                </button>
                <button className="p-2 text-muted hover:text-primary transition-colors">
                    <Bookmark size={22} />
                </button>
            </div>
        </div>
    )
}
