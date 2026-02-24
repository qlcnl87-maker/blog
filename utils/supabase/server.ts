/**
 * [서버용 데이터베이스 연결 도구 정보]
 * 이 파일은 서버 측(Next.js 서버)에서 데이터베이스(Supabase)에 안전하게 접속하기 위한 
 * 설정 파일입니다. 사용자의 로그인 세션 정보를 쿠키(Cookies)를 통해 관리하며,
 * 서버 컴포넌트나 서버 액션에서 데이터를 주고받을 때 사용됩니다.
 */

import { createServerClient } from '@supabase/ssr' // 서버용 접속 도구를 가져옵니다.
import { cookies } from 'next/headers' // 웹 브라우저의 쿠키를 다루는 도구를 가져옵니다.

// [데이터베이스 접속 도구를 만드는 함수]
export async function createClient() {
    const cookieStore = await cookies() // 현재 브라우저의 쿠키 저장소를 불러옵니다.

    // 데이터베이스 연결 설정을 반환합니다.
    return createServerClient(
        // 설정 파일(.env)에 적어둔 데이터베이스 주소와 보안 키를 사용합니다.
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                // 저장된 모든 쿠키 정보를 가져오는 기능입니다.
                getAll() {
                    return cookieStore.getAll()
                },
                // 데이터베이스 접속 상태가 바뀌면 쿠키를 갱신해주는 기능입니다.
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    } catch {
                        // 서버 컴포넌트에서 호출될 때의 예외 처리를 합니다.
                    }
                },
            },
        }
    )
}
