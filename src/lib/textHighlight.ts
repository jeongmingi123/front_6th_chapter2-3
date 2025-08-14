/**
 * 텍스트에서 검색어를 하이라이트 처리하는 함수
 * @param text - 하이라이트할 원본 텍스트
 * @param highlight - 하이라이트할 검색어
 * @returns 하이라이트가 적용된 HTML 문자열
 */
export const highlightText = (text: string, highlight: string): string => {
  if (!text) return ""

  if (!highlight.trim()) {
    return text
  }

  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)

  return parts
    .map((part, i) => {
      // 정규식과 일치하는 부분인지 확인 (대소문자 구분 없이)
      const isMatch = regex.test(part) || part.toLowerCase() === highlight.toLowerCase()
      return isMatch ? `<mark>${part}</mark>` : part
    })
    .join("")
}
