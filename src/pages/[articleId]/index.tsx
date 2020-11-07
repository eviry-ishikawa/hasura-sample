import { NextPage } from 'next'
import { useGetArticlesQuery } from '../../generated/graphql'

const ArticlePage: NextPage = () => {
  const { loading, error, data } = useGetArticlesQuery()

  if (loading) {
    return <div>Loading...</div>
  }

  if (loading) {
    return <div>Error...</div>
  }

  return <div>{JSON.stringify(data)}</div>
}

export default ArticlePage
