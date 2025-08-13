import { useAtom } from "jotai"
import { openPostDetailAtom } from "./PostDetailContext"

export const useOpenDetailPost = (fetchComments: (postId: number) => void) => {
  const [, openPostDetail] = useAtom(openPostDetailAtom)

  const handleOpenPostDetail = (post: any) => {
    openPostDetail({ post, fetchComments })
  }

  return {
    openPostDetail: handleOpenPostDetail,
  }
}
