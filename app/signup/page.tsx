/**
 * [회원가입 페이지 요약]
 * 이 파일은 새로운 사용자가 계정을 만들기 위해 정보를 입력하는 화면을 담당합니다.
 * 이메일과 비밀번호를 입력받아 'signup' 서버 액션으로 전송합니다.
 * 가입 성공 시 '이메일 확인' 메시지를, 실패 시 '에러 메시지'를 화면에 띄웁니다.
 */

import { signup } from '@/actions/auth' // 회원가입 처리를 담당하는 서버 기능을 가져옵니다.
import Link from 'next/link' // 로그인 페이지로 돌아가기 위한 링크 도구입니다.

// 회원가입 페이지를 만드는 메인 함수입니다.
export default async function SignupPage(props: {
    searchParams: Promise<{ error?: string; message?: string }> // 주소창의 정보(에러나 알림 메시지)를 받습니다.
}) {
    const searchParams = await props.searchParams // 주소창 정보를 다 읽을 때까지 기다립니다.

    return (
        // 화면 정중앙에 회원가입 상자를 배치합니다.
        <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-background">
            {/* 카드 모양의 회원가입 상자 설정 */}
            <div className="w-full max-w-md space-y-8 bg-card p-8 rounded-2xl border border-border shadow-xl">
                <div>
                    {/* 상단 제목과 설명 */}
                    <h2 className="text-center text-3xl font-black tracking-tight text-foreground">
                        회원가입
                    </h2>
                    <p className="mt-2 text-center text-sm text-muted">
                        새로운 계정을 만들고 개발 지식을 공유해보세요.
                    </p>
                </div>
                {/* 정보를 입력하고 회원가입 버튼을 누르는 양식입니다. */}
                <form className="mt-8 space-y-6" action={signup}>
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
                                placeholder="8자 이상 입력"
                            />
                        </div>
                    </div>

                    {/* 가입 도중 에러가 났을 때 보여주는 빨간색 메시지 상자 */}
                    {searchParams?.error && (
                        <div className="text-red-500 text-sm text-center font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                            {decodeURIComponent(searchParams.error)}
                        </div>
                    )}

                    {/* 가입 성공 후 나타나는 초록색 안내 메시지 상자 */}
                    {searchParams?.message && (
                        <div className="text-green-500 text-sm text-center font-medium bg-green-500/10 py-2 rounded-lg border border-green-500/20">
                            {decodeURIComponent(searchParams.message)}
                        </div>
                    )}

                    {/* 회원가입 제출 버튼 */}
                    <div>
                        <button
                            type="submit"
                            className="group relative flex w-full justify-center rounded-xl border border-transparent bg-primary py-3 px-4 text-sm font-bold text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all"
                        >
                            회원가입
                        </button>
                    </div>
                </form>
                {/* 이미 아이디가 있는 분들을 위한 로그인 이동 버튼 */}
                <div className="text-center">
                    <Link
                        href="/login"
                        className="text-sm font-medium text-muted hover:text-primary transition-colors"
                    >
                        이미 계정이 있으신가요? <span className="underline decoration-primary/30 underline-offset-4">로그인</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}
