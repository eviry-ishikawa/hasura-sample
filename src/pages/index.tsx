import { NextPage } from 'next'
import { AddArticle } from '../components/AddArticle'
import { useGetArticlesQuery } from '../generated/graphql'

const Index: NextPage = () => {
  const { loading, error, data } = useGetArticlesQuery()

  if (loading) {
    return <div>Loading...</div>
  }

  if (loading) {
    return <div>Error...</div>
  }

  return (
    <div>
      {data.articles.map((article) => {
        return (
          <div>
            <p>{article.id}</p>
            <p>{article.content}</p>
            <p>{article.created_at}</p>
          </div>
        )
      })}
      <AddArticle />
    </div>
  )
}

export default Index
