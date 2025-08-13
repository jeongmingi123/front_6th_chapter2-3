import { Search } from "lucide-react"
import { Input } from "../../components/index"
import { FilterSelect } from "../../shared/ui/FilterSelect"
import { TagSelect } from "../../features/post/TagSelect"
import { SortBySelect } from "../../features/post/SortBySelect"
import { SortOrderSelect } from "../../features/post/SortOrderSelect"
import { Tag } from "../../types"

interface PostsListFilterProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  selectedTag: string
  setSelectedTag: (tag: string) => void
  sortBy: string
  setSortBy: (sortBy: string) => void
  sortOrder: string
  setSortOrder: (sortOrder: string) => void
  tags: Tag[]
  onSearch: () => void
  onTagChange: (tag: string) => void
}

export const PostsListFilter = ({
  searchQuery,
  setSearchQuery,
  selectedTag,
  setSelectedTag,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  tags,
  onSearch,
  onTagChange,
}: PostsListFilterProps) => {
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
            onKeyPress={(e) => e.key === "Enter" && onSearch()}
          />
        </div>
      </div>
      <TagSelect selectedTag={selectedTag} setSelectedTag={setSelectedTag} tags={tags} onTagChange={onTagChange} />
      <SortBySelect value={sortBy} onValueChange={setSortBy} />
      <SortOrderSelect value={sortOrder} onValueChange={setSortOrder} />
    </div>
  )
}
