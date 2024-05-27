import { getServerSession } from "next-auth"
import { options } from "../api/auth/[...nextauth]/options"
import PaymentActivation from "./_paymentActivationForm"

export default async function Page () {

  return (
    <>
    <div className="flex justify-center">
      <PaymentActivation />
    </div>
    </>
  )
}