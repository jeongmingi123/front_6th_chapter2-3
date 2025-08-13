import { FilterSelect } from "../../../shared/ui/FilterSelect"
import { Tag } from "../../../types"
import { createTagOptions } from "../data"

interface SelectTagProps {
  selectedTag: string
  setSelectedTag: (tag: string) => void
  tags: Tag[]
  onTagChange: (tag: string) => void
}

export const SelectTag = ({ selectedTag, setSelectedTag, tags, onTagChange }: SelectTagProps) => {
  // 태그 옵션 설정
  const tagOptions = createTagOptions(tags)

  return (
    <FilterSelect
      value={selectedTag}
      onValueChange={(value) => {
        setSelectedTag(value)
        onTagChange(value)
      }}
      placeholder="태그 선택"
      options={tagOptions}
    />
  )
}
