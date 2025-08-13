import { useAtom } from "jotai"
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../shared/ui/index"
import { skipAtom, limitAtom, totalPostsAtom } from "../../store/postsAtoms"

export const PostsListPagination = () => {
  const [skip, setSkip] = useAtom(skipAtom)
  const [limit, setLimit] = useAtom(limitAtom)
  const [total] = useAtom(totalPostsAtom)

  const handleSkipChange = (newSkip: number) => setSkip(newSkip)
  const handleLimitChange = (newLimit: number) => setLimit(newLimit)

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span>표시</span>
        <Select value={limit.toString()} onValueChange={(value) => handleLimitChange(Number(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
        <span>항목</span>
      </div>
      <div className="flex gap-2">
        <Button disabled={skip === 0} onClick={() => handleSkipChange(Math.max(0, skip - limit))}>
          이전
        </Button>
        <Button disabled={skip + limit >= total} onClick={() => handleSkipChange(skip + limit)}>
          다음
        </Button>
      </div>
    </div>
  )
}
