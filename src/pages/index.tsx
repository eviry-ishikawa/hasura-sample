import { NextPage } from 'next'
import Link from 'next/link'
import { useGetAllArticlesQuery } from '../generated/graphql'

const Index: NextPage = () => {
  const { data, loading, error } = useGetAllArticlesQuery()

  if (loading) {
    return <div>...loading</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div>
      <h1>ここはトップページ</h1>
      <Link href="post">投稿画面</Link>
      <div>
        {data.article.map((article) => (
          <div>
            <Link href={`/${article.user.displayId}/${article.id}`}>
              {article.subject}
            </Link>
            <div>{article.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Index
