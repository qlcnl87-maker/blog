/**
 * [로그인 페이지 요약]
 * 이 파일은 사용자가 이메일과 비밀번호를 입력하여 로그인하는 화면을 담당합니다.
 * 입력된 정보는 'login'이라는 서버 액션으로 전달되어 처리됩니다.
 * 로그인 실패 시 주소창을 통해 전달된 에러 메시지를 화면에 보여줍니다.
 */

import { login } from '@/actions/auth' // 로그인 처리를 담당하는 서버 기능을 가져옵니다.
import Link from 'next/link' // 다른 페이지(회원가입 등)로 이동하기 위한 링크 도구입니다.

// 로그인 페이지를 만드는 메인 함수입니다.
export default async function LoginPage(props: {
    searchParams: Promise<{ error?: string }> // 주소창의 정보(에러 메시지 등)를 받습니다.
}) {
    const searchParams = await props.searchParams // 주소창 정보를 다 읽을 때까지 기다립니다.

    return (
        // 화면 정중앙에 로그인 상자를 배치하기 위한 설정입니다.
        <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
            {/* 흰색 배경의 카드 모양 로그인 상자입니다. */}
            <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-2xl border border-border shadow-xl">
                <div>
                    {/* 상단 제목과 환영 메시지 */}
                    <h2 className="text-center text-3xl font-black tracking-tight text-foreground">
                        로그인
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted">
                        개발자 블로그 DevLog에 오신 것을 환영합니다.
                    </p>
                </div>
                {/* 실제 정보를 입력하고 제출하는 양식(폼)입니다. */}
                <form className="mt-8 space-y-6" action={login}>
                    <div className="space-y-4">
                        {/* 이메일 입력 칸 */}
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
                        {/* 비밀번호 입력 칸 */}
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

                    {/* 로그인 도중 에러가 발생했다면 빨간색 상자로 에러 내용을 보여줍니다. */}
                    {searchParams?.error && (
                        <div className="text-red-500 text-sm text-center font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                            {decodeURIComponent(searchParams.error)}
                        </div>
                    )}

                    {/* 로그인 버튼 */}
                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-xl border border-transparent bg-primary py-3 px-4 text-sm font-bold text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
                        >
                            로그인
                        </button>
                    </div>
                </form>
                {/* 아직 회원이 아닌 분들을 위한 회원가입 링크 */}
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
