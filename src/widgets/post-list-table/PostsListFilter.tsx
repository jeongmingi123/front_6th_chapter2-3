import { Search } from "lucide-react"
import { useAtom } from "jotai"
import { Input } from "../../shared/ui/index"
import { SelectTag } from "../../features/select-tag/ui/SelectTag"
import { SortBySelect } from "../../features/sort-by-select/ui/SortBySelect"
import { SortOrderSelect } from "../../features/sort-order-select/ui/SortOrderSelect"
import { searchQueryAtom, selectedTagAtom, sortByAtom, tagsAtom } from "../../store/postsAtoms"
import { usePosts } from "../../features/post/hooks/usePosts"

export const PostsListFilter = () => {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom)
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)
  const [sortBy, setSortBy] = useAtom(sortByAtom)
  const [tags] = useAtom(tagsAtom)

  const { searchPosts } = usePosts()

  const handleSearch = () => {
    searchPosts(searchQuery)
  }

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="게시물 검색..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
      </div>
      <SelectTag selectedTag={selectedTag} setSelectedTag={setSelectedTag} tags={tags} onTagChange={handleTagChange} />
      <SortBySelect />
      <SortOrderSelect />
    </div>
  )
}
