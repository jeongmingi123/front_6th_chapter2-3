import React from "react"
import { useAtom } from "jotai"
import { selectedPostAtom, showPostDetailDialogAtom, commentsAtom, searchQueryAtom } from "../model/PostDetailContext"
import { useComments } from "../../../features/comment/hooks/useComments"
import { PostDetailDialog } from "../../../widgets"
import { CommentsSection } from "../../../widgets/comment/CommentsSection"

export const PostDetailDialogWrapper: React.FC = () => {
  const [selectedPost] = useAtom(selectedPostAtom)
  const [showPostDetailDialog, setShowPostDetailDialog] = useAtom(showPostDetailDialogAtom)
  const [comments] = useAtom(commentsAtom)
  const [searchQuery] = useAtom(searchQueryAtom)

  const { addComment, updateComment, deleteComment, likeComment } = useComments()

  // 댓글 추가 다이얼로그 열기
  const handleOpenAddComment = (postId: number) => {
    // 댓글 추가 로직은 useComments 훅에서 처리
    addComment({ postId, body: "", userId: 1 })
  }

  // 댓글 수정 다이얼로그 열기
  const handleOpenEditComment = (comment: any) => {
    // 댓글 수정 로직은 useComments 훅에서 처리
    updateComment(comment.id, comment)
  }

  // 댓글 삭제 처리
  const handleDeleteComment = (id: number, postId: number) => {
    deleteComment(id, postId)
  }

  // 댓글 좋아요 처리
  const handleLikeComment = (id: number, postId: number) => {
    likeComment(id, postId)
  }

  return (
    <PostDetailDialog
      open={showPostDetailDialog}
      onOpenChange={setShowPostDetailDialog}
      selectedPost={selectedPost}
      searchQuery={searchQuery}
    >
      {selectedPost && (
        <CommentsSection
          postId={selectedPost.id}
          comments={comments[selectedPost.id] || []}
          searchQuery={searchQuery}
          onAddComment={handleOpenAddComment}
          onEditComment={handleOpenEditComment}
          onDeleteComment={handleDeleteComment}
          onLikeComment={handleLikeComment}
        />
      )}
    </PostDetailDialog>
  )
}
