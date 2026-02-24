'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const categories = ['전체', 'React', 'TypeScript', 'Node.js', 'CSS', 'Git', 'Dev']

interface CategoryFilterProps {
    selectedCategory: string
}

export default function CategoryFilter({ selectedCategory }: CategoryFilterProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleCategorySelect = (category: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('category', category)
        params.delete('page') // Reset page on new category
        router.push(`/?${params.toString()}`)
    }

    return (
        <div className="flex gap-2 overflow-x-auto px-4 mt-8 pb-2 scrollbar-hide">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleCategorySelect(category)}
                    className={`whitespace-nowrap px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === category
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-secondary text-muted hover:bg-secondary/80'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}
