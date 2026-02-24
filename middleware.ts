/**
 * [미들웨어(중간 관리자) 요약]
 * 이 파일은 웹사이트의 모든 요청이 목적지에 도착하기 전에 '중간'에서 가로채어
 * 보안이나 세션(로그인 상태)을 체크하는 역할을 합니다.
 * 주로 로그인이 풀리지 않도록 세션을 주기적으로 갱신해주는 일을 합니다.
 */

import { type NextRequest } from 'next/server' // 요청 정보를 다루는 도구를 가져옵니다.
import { updateSession } from '@/utils/supabase/middleware' // 세션 갱신 로직을 가져옵니다.

// [중간 관리자가 수행하는 주 임무]
export async function middleware(request: NextRequest) {
    // 사용자의 로그인 세션 상태를 최신으로 업데이트합니다.
    return await updateSession(request)
}

// [미들웨어가 작동할 범위 설정]
export const config = {
    matcher: [
        /*
         * 다음 파일들을 제외한 모든 주소에서 이 미들웨어를 실행합니다:
         * - 정적 파일들(글꼴, 이미지, 아이콘 등)
         * - 특정 이미지 확장자들
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
