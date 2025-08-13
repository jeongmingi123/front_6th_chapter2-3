import { useAtom } from "jotai"
import { sortByAtom } from "../../../store/postsAtoms"

/**
 * 정렬 기준을 관리하는 hook
 * Jotai atom을 사용해서 전역 상태로 정렬 기준을 관리합니다.
 */
export const useSortBy = () => {
  const [sortBy, setSortBy] = useAtom(sortByAtom)

  /**
   * 정렬 기준을 변경하는 함수
   * @param value - 새로운 정렬 기준 값
   */
  const handleSortByChange = (value: string) => {
    setSortBy(value)
  }

  return {
    sortBy,
    handleSortByChange,
  }
}
