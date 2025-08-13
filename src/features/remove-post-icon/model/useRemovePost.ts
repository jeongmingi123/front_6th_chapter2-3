import { useAtom } from "jotai"
import { atom } from "jotai"

// 게시물 삭제 함수를 주입받는 atom
export const deletePostAtom = atom<((id: number) => Promise<void>) | null>(null)

// 게시물 삭제 hooks
export const useRemovePost = () => {
  const [deletePost] = useAtom(deletePostAtom)

  const removePost = async (id: number) => {
    if (deletePost) {
      await deletePost(id)
    }
  }

  return {
    removePost,
  }
}
