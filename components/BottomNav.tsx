'use client'

import { Home, Search, Bookmark, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BottomNav() {
    const pathname = usePathname()

    const navItems = [
        { icon: <Home size={24} />, label: '홈', href: '/' },
        { icon: <Search size={24} />, label: '검색', href: '/search' },
        { icon: <Bookmark size={24} />, label: '저장됨', href: '/bookmarks' },
        { icon: <User size={24} />, label: '프로필', href: '/profile' },
    ]

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border px-6 py-2 md:hidden">
            <div className="flex items-center justify-between max-w-lg mx-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 p-2 transition-colors ${isActive ? 'text-primary' : 'text-muted hover:text-foreground'
                                }`}
                        >
                            {item.icon}
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
