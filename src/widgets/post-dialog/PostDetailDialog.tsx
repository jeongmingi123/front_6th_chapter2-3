import React from "react"
import { DialogLayout } from "../../shared/ui/index"
import { Post } from "../../types"

interface PostDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedPost: Post | null
  searchQuery: string
  children: React.ReactNode
}

export const PostDetailDialog = ({
  open,
  onOpenChange,
  selectedPost,
  searchQuery,
  children,
}: PostDetailDialogProps) => {
  // 하이라이트 함수
  const highlightText = (text: string, highlight: string) => {
    if (!text) return null
    if (!highlight.trim()) {
      return <span>{text}</span>
    }
    const regex = new RegExp(`(${highlight})`, "gi")
    const parts = text.split(regex)
    return (
      <span>
        {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
      </span>
    )
  }

  return (
    <DialogLayout
      open={open}
      onOpenChange={onOpenChange}
      title={highlightText(selectedPost?.title || "", searchQuery) || ""}
      className="max-w-3xl"
    >
      <div className="space-y-4">
        <p>{highlightText(selectedPost?.body || "", searchQuery)}</p>
        {children}
      </div>
    </DialogLayout>
  )
}
