import { NextPage } from 'next'
import React, { useState } from 'react'

import styles from './index.module.css'

import autosize from 'autosize'
import { Button } from '../../components/button'
import { usePostArticlesMutation } from '../../generated/graphql'
import { useRouter } from 'next/router'

const PostPage: NextPage = () => {
  const ref = React.useRef(null)
  const router = useRouter()
  const [subject, setSubject] = useState('')
  const [content, setContent] = useState('')

  const [postArticle] = usePostArticlesMutation()

  React.useEffect(() => {
    if (ref.current) {
      autosize(ref.current)
    }
  }, [])

  const handleSubjectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(event.target.value)
  }

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value)
  }

  const handlePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { data } = await postArticle({
      variables: {
        //FIXME: authorIDは決め打ち
        author_id: '682d050c-567b-4691-9864-2b2975630974',
        subject: subject,
        content: content,
        published_at: 'now()',
      },
    })
    if (data && data.insert_article_one) {
      const articleId = data.insert_article_one.id
      //FIXME: authorIDは決め打ち
      router.push(`/hoge/${articleId}`)
    } else {
      console.log('POST unkonwn state', data)
    }
  }

  return (
    <>
      <div className={styles.editContent}>
        <input
          type="text"
          placeholder="タイトル"
          className={styles.subject}
          value={subject}
          onChange={handleSubjectChange}
        />
        <textarea
          className={styles.editor}
          placeholder="本文"
          ref={ref}
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>
      <form onSubmit={handlePost}>
        <div className={styles.footer}>
          <Button text={'投稿'} />
        </div>
      </form>
    </>
  )
}

export default PostPage
