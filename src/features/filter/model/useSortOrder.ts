import { useAtom } from "jotai"
import { atom } from "jotai"

// 외부에서 정렬 순서를 설정하는 atom
export const externalSortOrderAtom = atom<string>("asc")

// 외부 setSortOrder 함수를 주입받는 atom
export const setSortOrderAtom = atom<((value: string) => void) | null>(null)

// 정렬 순서 변경 hooks
export const useSortOrder = () => {
  const [externalSortOrder, setExternalSortOrder] = useAtom(externalSortOrderAtom)
  const [setSortOrderExternal] = useAtom(setSortOrderAtom)

  const changeSortOrder = (value: string) => {
    setExternalSortOrder(value)

    // 외부 setSortOrder 함수가 있으면 호출하여 PostsManagerPage의 상태도 업데이트
    if (setSortOrderExternal) {
      setSortOrderExternal(value)
    }
  }

  return {
    sortOrder: externalSortOrder,
    changeSortOrder,
  }
}
