"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function ActivationForm ({confirmId} : {confirmId: string}) {

  const router = useRouter()
  const [otp, setOtp] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  async function submitHandler (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const res = await fetch(`/api/register/activation`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          otp, 
          confirmId
        })
      })

      if(!res.ok) {
        setErrorMessage(await res.json())
      } else {
        router.push(`/api/auth/signin`)
      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler} method="POST">
        <div className="flex flex-col">
          <label className="font-semibold">Please Insert OTP that has been sent to your Email. 3 minutes Remaining.</label>
          <input value={otp} onChange={(event) => setOtp(event.target.value)} type="text" minLength={5} maxLength={5}/>
          <button type="submit">Submit</button>
          {errorMessage && (
            <label> {errorMessage} </label>
          )}
        </div>
        
      </form>
    </div>
  )
}