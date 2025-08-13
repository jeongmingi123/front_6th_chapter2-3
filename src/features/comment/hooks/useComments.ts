import { useAtom, useSetAtom } from "jotai"
import { commentsAtom, selectedCommentAtom } from "../../../store/postsAtoms"
import { commentApi } from "../api/commentApi"

export const useComments = () => {
  const [comments, setComments] = useAtom(commentsAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)

  const fetchComments = async (postId: number) => {
    if (comments[postId]) return
    try {
      const data = await commentApi.getCommentsByPost(postId)
      setComments((prev) => ({ ...prev, [postId]: data.comments }))
    } catch (error) {
      console.error("댓글 가져오기 오류:", error)
    }
  }

  const addComment = async (newComment: any) => {
    try {
      const data = await commentApi.addComment(newComment)
      setComments((prev) => ({
        ...prev,
        [data.postId]: [...(prev[data.postId] || []), data],
      }))
      return data
    } catch (error) {
      console.error("댓글 추가 오류:", error)
      throw error
    }
  }

  const updateComment = async (commentId: number, body: string) => {
    try {
      const data = await commentApi.updateComment(commentId, body)
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId].map((comment) => (comment.id === data.id ? data : comment)),
      }))
      return data
    } catch (error) {
      console.error("댓글 수정 오류:", error)
      throw error
    }
  }

  const deleteComment = async (id: number, postId: number) => {
    try {
      await commentApi.deleteComment(id)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].filter((comment) => comment.id !== id),
      }))
    } catch (error) {
      console.error("댓글 삭제 오류:", error)
      throw error
    }
  }

  const likeComment = async (id: number, postId: number) => {
    try {
      const currentComment = comments[postId]?.find((c) => c.id === id)
      if (!currentComment) return

      const data = await commentApi.likeComment(id, currentComment.likes + 1)
      setComments((prev) => ({
        ...prev,
        [postId]: prev[postId].map((comment) =>
          comment.id === data.id ? { ...data, likes: comment.likes + 1 } : comment,
        ),
      }))
    } catch (error) {
      console.error("댓글 좋아요 오류:", error)
    }
  }

  return {
    comments,
    selectedComment,
    setSelectedComment,
    fetchComments,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
  }
}
