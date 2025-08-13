import React from "react"
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components"
import { Post, Tag } from "../../types"
import { Eye, Edit, Trash2, MessageSquare, ThumbsDown, ThumbsUp, Edit2 } from "lucide-react"

interface PostsListTableProps {
  posts: Post[]
  searchQuery: string
  selectedTag: string
  setSelectedTag: (tag: string) => void
  onPostDetail: (post: Post) => void
  onEditPost: (post: Post) => void
  onDeletePost: (id: number) => void
  onUserModal: (user: any) => void
}

export const PostsListTable: React.FC<PostsListTableProps> = ({
  posts,
  searchQuery,
  selectedTag,
  setSelectedTag,
  onPostDetail,
  onEditPost,
  onDeletePost,
  onUserModal,
}) => {
  // 검색어와 태그에 따른 필터링
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTag = !selectedTag || (post.tags && post.tags.includes(selectedTag))
    return matchesSearch && matchesTag
  })

  // 검색어 하이라이트 함수
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 font-semibold">
          {part}
        </mark>
      ) : (
        part
      ),
    )
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">ID</TableHead>
            <TableHead>제목</TableHead>
            <TableHead className="w-[150px]">작성자</TableHead>
            <TableHead className="w-[150px]">반응</TableHead>
            <TableHead className="w-[150px]">작업</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPosts.map((post) => (
            <TableRow key={post.id}>
              <TableCell>{post.id}</TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div>{highlightText(post.title, searchQuery)}</div>

                  <div className="flex flex-wrap gap-1">
                    {post.tags?.map((tag) => (
                      <span
                        key={tag}
                        className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                          selectedTag === tag
                            ? "text-white bg-blue-500 hover:bg-blue-600"
                            : "text-blue-800 bg-blue-100 hover:bg-blue-200"
                        }`}
                        onClick={() => {
                          setSelectedTag(tag)
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onUserModal(post.author)}>
                  <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
                  <span>{post.author?.username}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.reactions?.likes || 0}</span>
                  <ThumbsDown className="w-4 h-4" />
                  <span>{post.reactions?.dislikes || 0}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => onPostDetail(post)}>
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      onEditPost(post)
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDeletePost(post.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
