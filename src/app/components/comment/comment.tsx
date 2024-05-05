"use client"

import { useState } from "react"
import { UUID } from "mongodb"
import { json } from "stream/consumers"

export default function ProductComment ({product}: {product: Product}) {

  const [comment, setComment] = useState<CommentField[]>([])
  const [text, setText] = useState<string>("")

const rngId = Math.floor(Math.random() * 1000 * 100).toString()

// function dummyComment (text: string) {
//   return {
//     name: `user ${rngId}`,
//     text: text
//   }
// }

interface CommentField {
  name: string
  text: string
}

async function commentOnSubmit (event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault()

  try {
    const res = await fetch(`/api/product/buyer/comment`, {
      method: 'POST',
      body: JSON.stringify({
        productId: product?._id,
        text: text
      })
    })

    if(!res.ok) return 

    

  } catch (error) {
    console.log(error)
  }
} 
  
  return (
    <>
    {!comment.length && (
      <div>You are the first to comment!</div>
    )}
    {comment.map((prop) => (
      <div key={prop?.name}>
        {`${prop?.name} said: `}{prop?.text}
      </div>
    ))}
    <div>
      <form onSubmit={commentOnSubmit}>
      <div>
        <label htmlFor="">Message: </label>
        <textarea value={text} onChange={event => setText(event.target.value)}/>
      </div>
        <button type="submit">Send</button>
      </form>
      
    </div>
    </>
  )
}