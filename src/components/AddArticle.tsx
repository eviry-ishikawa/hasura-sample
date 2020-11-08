import { NextPage } from 'next'
import { useState } from 'react'
import { usePostArticleMutation } from '../generated/graphql'

export const AddArticle = () => {
  const [content, setContent] = useState<string>('')
  const [postArticle] = usePostArticleMutation()

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
  }

  const handleClick = async () => {
    const { data } = await postArticle({
      variables: {
        id: 14,
        content: content,
        created_at: 'now()',
      },
    })
    console.log(data)
  }

  return (
    <div>
      <h3>記事追加</h3>
      <textarea value={content} onChange={handleChange}></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
    </div>
  )
}
