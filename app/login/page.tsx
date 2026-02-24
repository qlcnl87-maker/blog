import { login } from '@/actions/auth'
import Link from 'next/link'

export default async function LoginPage(props: {
    searchParams: Promise<{ error?: string }>
}) {
    const searchParams = await props.searchParams

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
            <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-2xl border border-border shadow-xl">
                <div>
                    <h2 className="text-center text-3xl font-black tracking-tight text-foreground">
                        로그인
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted">
                        개발자 블로그 DevLog에 오신 것을 환영합니다.
                    </p>
                </div>
                <form className="mt-8 space-y-6" action={login}>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-bold text-slate-500 mb-1 block">이메일</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="block w-full rounded-xl border border-border bg-secondary px-4 py-3 text-foreground placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="example@email.com"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold text-slate-500 mb-1 block">비밀번호</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="block w-full rounded-xl border border-border bg-secondary px-4 py-3 text-foreground placeholder-slate-500 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    {searchParams?.error && (
                        <div className="text-red-500 text-sm text-center font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                            {decodeURIComponent(searchParams.error)}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-xl border border-transparent bg-primary py-3 px-4 text-sm font-bold text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
                        >
                            로그인
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <Link
                        href="/signup"
                        className="text-sm font-medium text-muted hover:text-primary transition-colors"
                    >
                        계정이 없으신가요? <span className="underline decoration-primary/30 underline-offset-4">회원가입</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
