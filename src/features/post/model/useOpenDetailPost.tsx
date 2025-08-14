import { useAtom } from "jotai"
import { openPostDetailAtom } from "./PostDetailContext"
import { Post } from "../../../types"

export const useOpenDetailPost = (fetchComments: (postId: number) => void) => {
  const [, openPostDetail] = useAtom(openPostDetailAtom)

  const handleOpenPostDetail = (post: Post) => {
    openPostDetail({ post, fetchComments })
  }

  return {
    openPostDetail: handleOpenPostDetail,
  }
}
