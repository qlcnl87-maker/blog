/**
 * [인증 기능 요약]
 * 이 파일은 사용자의 로그인, 회원가입, 로그아웃 기능을 처리하는 '서버 액션' 모음입니다.
 * 사용자가 입력한 정보를 데이터베이스(Supabase)로 보내서 확인하거나 저장하며,
 * 처리 결과에 따라 다른 페이지로 이동(리다이렉트)시키는 역할을 합니다.
 */

'use server' // 이 코드가 브라우저가 아닌 서버에서만 실행되도록 설정합니다.

import { revalidatePath } from 'next/cache' // 화면의 데이터를 최신 상태로 갱신하기 위한 도구입니다.
import { redirect } from 'next/navigation' // 페이지를 다른 주소로 강제 이동시키는 도구입니다.
import { createClient } from '@/utils/supabase/server' // 서버용 데이터베이스 연결 도구를 가져옵니다.

// [로그인 기능을 처리하는 함수]
export async function login(formData: FormData) {
    const supabase = await createClient() // 데이터베이스에 접속합니다.

    // 사용자가 입력한 이메일과 비밀번호를 가져옵니다.
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // 데이터베이스에 이메일과 비밀번호를 보내서 로그인을 시도합니다.
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    // 로그인 도중 에러가 발생했다면 (아이디/비번 불일치 등)
    if (error) {
        // 로그인 페이지로 다시 보내면서 에러 메시지를 주소창에 담아 보냅니다.
        redirect('/login?error=' + encodeURIComponent(error.message))
    }

    // 로그인이 성공하면 홈 화면 홈페이지의 데이터를 갱신합니다.
    revalidatePath('/', 'layout')
    // 홈페이지로 이동시킵니다.
    redirect('/')
}

// [회원가입 기능을 처리하는 함수]
export async function signup(formData: FormData) {
    const supabase = await createClient() // 데이터베이스 접속

    // 입력받은 이메일과 비밀번호 정보
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // 데이터베이스에 새로운 사용자를 등록(회원가입)합니다.
    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            // 회원가입 성공 후 이메일 인증 링크를 눌렀을 때 돌아올 주소입니다.
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
        },
    })

    // 가입 도중 에러가 생겼다면
    if (error) {
        // 가입 페이지로 돌아가며 에러 내용을 알려줍니다.
        redirect('/signup?error=' + encodeURIComponent(error.message))
    }

    // 가입이 진행되었으므로 캐시를 비우고
    revalidatePath('/', 'layout')
    // 이메일을 확인해달라는 메시지를 담아 가입 페이지로 다시 보냅니다.
    redirect('/signup?message=' + encodeURIComponent('이메일을 확인하여 가입을 완료해 주세요.'))
}

// [로그아웃 기능을 처리하는 함수]
export async function signOut() {
    const supabase = await createClient() // 데이터베이스 접속
    await supabase.auth.signOut() // 데이터베이스에서 로그아웃 처리를 합니다.
    revalidatePath('/', 'layout') // 화면 상태를 갱신합니다.
    redirect('/login') // 로그인 페이지로 이동합니다.
}
