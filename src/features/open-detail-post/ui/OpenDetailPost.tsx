import React from "react"
import { Button } from "../../../shared/ui"
import { Post } from "../../../types"
import { MessageSquare } from "lucide-react"
import { useOpenDetailPost } from "../model/useOpenDetailPost"

interface OpenDetailPostProps {
  post: Post
  fetchComments: (postId: number) => void
}

export const OpenDetailPost: React.FC<OpenDetailPostProps> = ({ post, fetchComments }) => {
  const { openPostDetail } = useOpenDetailPost(fetchComments)

  return (
    <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
      <MessageSquare className="w-4 h-4" />
    </Button>
  )
}
