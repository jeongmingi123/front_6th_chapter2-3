import { FilterSelect } from "../../../shared/ui/FilterSelect"
import { sortByOptions } from "../data"
import { useSortBy } from "../model"

export const SortBySelect = () => {
  const { sortBy, handleSortByChange } = useSortBy()

  return (
    <FilterSelect value={sortBy} onValueChange={handleSortByChange} placeholder="정렬 기준" options={sortByOptions} />
  )
}
