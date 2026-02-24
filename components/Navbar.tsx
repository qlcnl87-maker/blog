import Link from 'next/link'
import { Code2 } from 'lucide-react'
import { User } from '@supabase/supabase-js'
import { signOut } from '@/actions/auth'

interface NavbarProps {
    user: User | null
}

export default function Navbar({ user }: NavbarProps) {
    return (
        <nav className="flex items-center justify-between p-4 bg-background border-b border-border sticky top-0 z-50">
            <div className="flex items-center gap-2">
                <div className="bg-primary p-1.5 rounded-lg text-white">
                    <Code2 size={24} />
                </div>
                <span className="text-xl font-bold tracking-tight">DevLog</span>
            </div>

            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-4">
                        <Link
                            href="/write"
                            className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold hover:bg-primary/20 transition-colors"
                        >
                            글쓰기
                        </Link>
                        <span className="text-sm text-muted hidden md:inline">{user.email}</span>
                        <form action={signOut}>
                            <button className="text-sm font-medium hover:text-primary transition-colors">
                                로그아웃
                            </button>
                        </form>
                    </div>
                ) : (
                    <>
                        <Link
                            href="/login"
                            className="text-sm font-medium hover:text-primary transition-colors"
                        >
                            로그인
                        </Link>
                        <Link
                            href="/signup"
                            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                            회원가입
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}
