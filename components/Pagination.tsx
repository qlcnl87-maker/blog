'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'

interface PaginationProps {
    currentPage: number
    totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('page', page.toString())
        router.push(`/?${params.toString()}`)
    }

    return (
        <div className="flex items-center justify-center gap-4 mt-12 pb-24">
            <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-xl bg-secondary border border-border text-foreground disabled:opacity-50 hover:border-primary transition-colors"
            >
                <ChevronLeft size={20} />
            </button>

            <span className="text-sm font-medium">
                {currentPage} / {totalPages} 페이지
            </span>

            <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-xl bg-secondary border border-border text-foreground disabled:opacity-50 hover:border-primary transition-colors"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    )
}
