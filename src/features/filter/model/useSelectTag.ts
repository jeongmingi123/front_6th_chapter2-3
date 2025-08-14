import { useAtom } from "jotai"
import { selectedTagAtom, tagsAtom } from "../../../store/postsAtoms"

/**
 * 태그 선택을 관리하는 hook
 * Jotai atom을 사용해서 전역 상태로 선택된 태그와 태그 목록을 관리합니다.
 */
export const useSelectTag = () => {
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom)
  const [tags] = useAtom(tagsAtom)

  /**
   * 태그를 변경하는 함수
   * @param tag - 새로운 태그 값
   */
  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
  }

  return {
    selectedTag,
    tags,
    handleTagChange,
  }
}
