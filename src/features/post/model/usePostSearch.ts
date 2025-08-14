import { useAtom, useSetAtom } from "jotai"
import { postsAtom, totalPostsAtom, loadingAtom, searchQueryAtom } from "../../../store/postsAtoms"
import { postsApi } from "../../../entities/post/api/postsApi"

export const usePostSearch = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const setPosts = useSetAtom(postsAtom)
  const setTotal = useSetAtom(totalPostsAtom)
  const setLoading = useSetAtom(loadingAtom)

  const searchPosts = async (query: string) => {
    if (!query.trim()) {
      return
    }

    setLoading(true)
    try {
      const data = await postsApi.searchPosts(query)
      setPosts(data.posts)
      setTotal(data.total)
    } catch (error) {
      console.error("게시물 검색 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
  }

  return {
    searchQuery,
    setSearchQuery,
    searchPosts,
    clearSearch,
  }
}
