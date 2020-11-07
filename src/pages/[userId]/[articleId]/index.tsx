import { useRouter } from 'next/router'
import { NextPage } from 'next'
import { useGetArticleQuery } from '../../../generated/graphql'
import Error from 'next/error'

import styles from './index.module.css'
import { Article } from '../../../components/article'

const ArticlePage: NextPage = () => {
  const router = useRouter()
  const { articleId } = router.query

  const { loading, error, data } = useGetArticleQuery({
    variables: {
      id: articleId as string,
    },
  })

  if (loading) {
    return <p>...loading</p>
  }

  if (error) {
    return <p>aaa{error.toString()}</p>
  }

  if (!data || !data.article_by_pk) {
    return <Error statusCode={404} />
  }

  const { user, subject, content } = data.article_by_pk

  return (
    <div className={styles.contentContainer}>
      <div className={styles.subject}>{subject}</div>
      <div className={styles.userContainer}>
        <div>
          <img src="/profile.jpg" alt="user-icon" className={styles.userIcon} />
        </div>
        <div className={styles.userText}>
          <div className={styles.userId}>{user.displayId}</div>
          <div className={styles.userName}>{user.displayName}</div>
        </div>
      </div>
      <div className={styles.content}>
        <Article content={content} />
      </div>
    </div>
  )
}

export default ArticlePage
