'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { User } from '@supabase/supabase-js'
import {
    ArrowLeft,
    Bold,
    Italic,
    Code,
    Link as LinkIcon,
    Image as ImageIcon,
    Eye,
    Layout
} from 'lucide-react'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export default function WritePage() {
    const router = useRouter()
    const supabase = createClient()

    const [user, setUser] = useState<User | null>(null)
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [category, setCategory] = useState('React')
    const [thumbnailUrl, setThumbnailUrl] = useState('')
    const [isPreview, setIsPreview] = useState(false)
    const [isSplit, setIsSplit] = useState(false)
    const [isPublishing, setIsPublishing] = useState(false)
    const [categories, setCategories] = useState<{ name: string }[]>([])

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push('/login')
            } else {
                setUser(user)
            }
        }
        checkUser()

        const fetchCategories = async () => {
            const { data } = await supabase.from('categories').select('name')
            if (data) setCategories(data)
        }
        fetchCategories()
    }, [])

    const handlePublish = async () => {
        if (!title || !content) {
            alert('제목과 내용을 입력해주세요.')
            return
        }

        setIsPublishing(true)
        const { error } = await supabase.from('posts').insert({
            title,
            content,
            category,
            thumbnail_url: thumbnailUrl || null,
            author_id: user?.id
        })

        if (error) {
            alert('게시 중 오류가 발생했습니다: ' + error.message)
        } else {
            router.push('/')
            router.refresh()
        }
        setIsPublishing(false)
    }

    const insertText = (before: string, after: string = '') => {
        const textarea = document.getElementById('editor') as HTMLTextAreaElement
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = textarea.value
        const selectedText = text.substring(start, end)
        const newText = text.substring(0, start) + before + selectedText + after + text.substring(end)
        setContent(newText)

        // Focus back and set cursor
        setTimeout(() => {
            textarea.focus()
            textarea.setSelectionRange(start + before.length, end + before.length)
        }, 0)
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200">
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b border-slate-800 sticky top-0 bg-[#0f172a] z-50">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400 hover:text-white">
                        <ArrowLeft size={24} />
                    </button>
                    <h1 className="text-lg font-bold">새 글 작성</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsPreview(!isPreview)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${isPreview ? 'text-primary' : 'text-slate-400 hover:text-white'}`}
                    >
                        {isPreview ? '편집하기' : '미리보기'}
                    </button>
                    <button className="px-4 py-2 rounded-lg text-sm font-bold bg-slate-800 hover:bg-slate-700 transition-colors">
                        임시저장
                    </button>
                    <button
                        onClick={handlePublish}
                        disabled={isPublishing}
                        className="px-6 py-2 rounded-lg text-sm font-bold bg-primary hover:bg-primary/90 text-white transition-colors disabled:opacity-50"
                    >
                        {isPublishing ? '게시 중...' : '출간하기'}
                    </button>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-6 py-8">
                {/* Title Input */}
                <input
                    type="text"
                    placeholder="제목을 입력하세요"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-transparent border-none text-4xl md:text-5xl font-black focus:ring-0 placeholder-slate-700 mb-8"
                />

                {/* Toolbar */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                    <div className="flex items-center bg-slate-900/50 rounded-xl p-1 border border-slate-800">
                        <button onClick={() => insertText('**', '**')} className="p-2.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors" title="굵게">
                            <Bold size={18} />
                        </button>
                        <button onClick={() => insertText('_', '_')} className="p-2.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors" title="기울임">
                            <Italic size={18} />
                        </button>
                        <button onClick={() => insertText('`', '`')} className="p-2.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors" title="코드">
                            <Code size={18} />
                        </button>
                        <div className="w-[1px] h-4 bg-slate-800 mx-1" />
                        <button onClick={() => insertText('[', '](url)')} className="p-2.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors" title="링크">
                            <LinkIcon size={18} />
                        </button>
                        <button onClick={() => insertText('![alt](', ')')} className="p-2.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors" title="이미지">
                            <ImageIcon size={18} />
                        </button>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-500">분할 보기</span>
                            <button
                                onClick={() => setIsSplit(!isSplit)}
                                className={`w-12 h-6 rounded-full relative transition-colors ${isSplit ? 'bg-primary' : 'bg-slate-800'}`}
                            >
                                <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isSplit ? 'translate-x-6' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Category & Thumbnail URL */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">카테고리</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 focus:border-primary outline-none transition-colors"
                        >
                            {categories.map(cat => (
                                <option key={cat.name} value={cat.name}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-500 mb-2">섬네일 URL (선택)</label>
                        <input
                            type="text"
                            placeholder="https://..."
                            value={thumbnailUrl}
                            onChange={(e) => setThumbnailUrl(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 focus:border-primary outline-none transition-colors"
                        />
                    </div>
                </div>

                {/* Editor Area */}
                <div className={`grid gap-8 ${isSplit ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {(!isPreview || isSplit) && (
                        <textarea
                            id="editor"
                            placeholder="당신의 이야기를 들려주세요..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-[600px] bg-transparent border-none focus:ring-0 text-xl leading-relaxed resize-none placeholder-slate-800 font-mono"
                        />
                    )}

                    {(isPreview || isSplit) && (
                        <div className={`w-full h-[600px] overflow-auto prose prose-invert prose-lg max-w-none pb-20 ${isSplit ? 'border-l border-slate-800 pl-8' : ''}`}>
                            <ReactMarkdown>{content || '*내용이 비어있습니다.*'}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}
