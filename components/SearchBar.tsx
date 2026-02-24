'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

interface SearchBarProps {
    initialQuery?: string
}

export default function SearchBar({ initialQuery = '' }: SearchBarProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState(initialQuery)

    useEffect(() => {
        setQuery(initialQuery)
    }, [initialQuery])

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        const params = new URLSearchParams(searchParams.toString())
        if (query) {
            params.set('q', query)
        } else {
            params.delete('q')
        }
        params.delete('page') // Reset page on new search
        router.push(`/?${params.toString()}`)
    }

    return (
        <div className="relative w-full max-w-2xl mx-auto px-4 mt-8">
            <form onSubmit={handleSearch} className="relative group">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="text-muted group-focus-within:text-primary transition-colors" size={20} />
                </div>
                <input
                    type="text"
                    placeholder="게시글 검색..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-secondary border border-border rounded-xl py-4 pl-12 pr-4 text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-lg"
                />
            </form>
        </div>
    )
}
