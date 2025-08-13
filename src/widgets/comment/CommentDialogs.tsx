import { useAtom } from "jotai"
import { DialogLayout, Textarea, Button } from "../../shared/ui/index"
import { Comment, NewComment } from "../../types"
import {
  showAddCommentDialogAtom,
  newCommentAtom,
  showEditCommentDialogAtom,
  selectedCommentAtom,
} from "../../store/postsAtoms"
import { useComments } from "../../features/comment/hooks/useComments"

interface CommentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  submitText: string
}

// 공통 다이얼로그 컴포넌트
const CommentDialog = ({
  open,
  onOpenChange,
  title,
  placeholder,
  value,
  onChange,
  onSubmit,
  submitText,
}: CommentDialogProps) => (
  <DialogLayout open={open} onOpenChange={onOpenChange} title={title}>
    <div className="space-y-4">
      <Textarea placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
      <Button onClick={onSubmit}>{submitText}</Button>
    </div>
  </DialogLayout>
)

export const AddCommentDialog = () => {
  const [open, setOpen] = useAtom(showAddCommentDialogAtom)
  const [newComment, setNewComment] = useAtom(newCommentAtom)
  const { addComment } = useComments()

  const handleAddComment = async () => {
    try {
      await addComment(newComment)
      setOpen(false)
      setNewComment({ body: "", postId: null, userId: 1 })
    } catch (error) {
      console.error("댓글 추가 오류:", error)
    }
  }

  return (
    <CommentDialog
      open={open}
      onOpenChange={setOpen}
      title="새 댓글 추가"
      placeholder="댓글 내용"
      value={newComment.body}
      onChange={(body) => setNewComment({ ...newComment, body })}
      onSubmit={handleAddComment}
      submitText="댓글 추가"
    />
  )
}

interface EditCommentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedComment: Comment | null
  onSelectedCommentChange: (comment: Comment) => void
  onUpdateComment: () => void
}

export const EditCommentDialog = () => {
  const [open, setOpen] = useAtom(showEditCommentDialogAtom)
  const [selectedComment, setSelectedComment] = useAtom(selectedCommentAtom)
  const { updateComment } = useComments()

  const handleUpdateComment = async () => {
    if (!selectedComment) return
    try {
      await updateComment(selectedComment.id, selectedComment.body)
      setOpen(false)
    } catch (error) {
      console.error("댓글 수정 오류:", error)
    }
  }

  return (
    <CommentDialog
      open={open}
      onOpenChange={setOpen}
      title="댓글 수정"
      placeholder="댓글 내용"
      value={selectedComment?.body || ""}
      onChange={(body) => selectedComment && setSelectedComment({ ...selectedComment, body })}
      onSubmit={handleUpdateComment}
      submitText="댓글 업데이트"
    />
  )
}
