import { useAtom } from "jotai"
import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  searchQueryAtom,
  selectedTagAtom,
  sortByAtom,
  sortOrderAtom,
  skipAtom,
  limitAtom,
  tagsAtom,
} from "../../../store/postsAtoms"
import { postsApi } from "../../../entities/post/api/postsApi"

export const usePostFilters = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom)
  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)
  const [tags, setTags] = useAtom(tagsAtom)

  const updateURL = () => {
    const params = new URLSearchParams()
    if (skip) params.set("skip", skip.toString())
    if (limit) params.set("limit", limit.toString())
    if (searchQuery) params.set("search", searchQuery)
    if (sortBy) params.set("sortBy", sortBy)
    if (sortOrder) params.set("sortOrder", sortOrder)
    if (selectedTag) params.set("tag", selectedTag)
    navigate(`?${params.toString()}`)
  }

  const fetchTags = async () => {
    try {
      const data = await postsApi.getTags()
      setTags(data)
    } catch (error) {
      console.error("태그 가져오기 오류:", error)
    }
  }

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
    updateURL()
  }

  const handleSkipChange = (newSkip: number) => setSkip(newSkip)
  const handleLimitChange = (newLimit: number) => setLimit(newLimit)

  useEffect(() => {
    fetchTags()
  }, [])

  useEffect(() => {
    updateURL()
  }, [skip, limit, sortBy, sortOrder, selectedTag])

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    setSkip(parseInt(params.get("skip") || "0"))
    setLimit(parseInt(params.get("limit") || "10"))
    setSearchQuery(params.get("search") || "")
    setSortBy(params.get("sortBy") || "")
    setSortOrder(params.get("sortOrder") || "asc")
    setSelectedTag(params.get("tag") || "")
  }, [location.search])

  return {
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    skip,
    limit,
    tags,
    handleTagChange,
    handleSkipChange,
    handleLimitChange,
  }
}
