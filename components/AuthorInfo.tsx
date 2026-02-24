'use client'

import Image from 'next/image'

interface AuthorInfoProps {
    name: string
    date: string
    avatarUrl?: string
}

export default function AuthorInfo({ name, date, avatarUrl }: AuthorInfoProps) {
    return (
        <div className="flex items-center justify-between w-full py-6">
            <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-secondary">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt={name} className="object-cover w-full h-full" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted font-bold text-lg">
                            {name.charAt(0)}
                        </div>
                    )}
                </div>
                <div>
                    <h4 className="font-bold text-foreground">{name}</h4>
                    <p className="text-sm text-muted">
                        {new Date(date).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })} · 5분 읽기
                    </p>
                </div>
            </div>
            <button className="text-primary font-bold text-sm hover:underline">
                팔로우
            </button>
        </div>
    )
}
