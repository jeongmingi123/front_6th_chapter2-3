import { useAtom, useSetAtom } from "jotai"
import { useEffect } from "react"
import { postsAtom, totalPostsAtom, loadingAtom, skipAtom, limitAtom, selectedTagAtom } from "../../../store/postsAtoms"
import { postsApi } from "../../../entities/post/api/postsApi"
import { NewPost, Post } from "../../../types"

export const usePosts = () => {
  const [posts, setPosts] = useAtom(postsAtom)
  const [total, setTotal] = useAtom(totalPostsAtom)
  const [loading, setLoading] = useAtom(loadingAtom)
  const [skip] = useAtom(skipAtom)
  const [limit] = useAtom(limitAtom)
  const [selectedTag] = useAtom(selectedTagAtom)

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const result = await postsApi.getPostsWithUsers(limit, skip)
      setPosts(result.posts)
      setTotal(result.total)
    } catch (error) {
      console.error("게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPostsByTag = async (tag: string) => {
    setLoading(true)
    try {
      const result = await postsApi.getPostsByTag(tag, limit, skip)
      setPosts(result.posts)
      setTotal(result.total)
    } catch (error) {
      console.error("태그별 게시물 가져오기 오류:", error)
    } finally {
      setLoading(false)
    }
  }

  const addPost = async (newPost: NewPost) => {
    try {
      const data = await postsApi.addPost(newPost)
      setPosts((prev) => [data, ...prev])
      return data
    } catch (error) {
      console.error("게시물 추가 오류:", error)
      throw error
    }
  }

  const updatePost = async (post: Post) => {
    try {
      const data = await postsApi.updatePost(post.id, post)
      setPosts((prev) => prev.map((p) => (p.id === data.id ? data : p)))
      return data
    } catch (error) {
      console.error("게시물 업데이트 오류:", error)
      throw error
    }
  }

  const deletePost = async (id: number) => {
    try {
      await postsApi.deletePost(id)
      setPosts((prev) => prev.filter((post) => post.id !== id))
    } catch (error) {
      console.error("게시물 삭제 오류:", error)
      throw error
    }
  }

  useEffect(() => {
    if (selectedTag) {
      fetchPostsByTag(selectedTag)
    } else {
      fetchPosts()
    }
  }, [skip, limit, selectedTag])

  return {
    posts,
    total,
    loading,
    fetchPosts,
    fetchPostsByTag,
    addPost,
    updatePost,
    deletePost,
  }
}
