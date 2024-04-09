import ActivationForm from "@/app/components/authentication/activationForm"
import { redirect } from "next/navigation"


export default function ActivationPage ({searchParams } : {searchParams: {confirmId? : string}}) {
  const confirmId = searchParams?.confirmId

  if (!confirmId || typeof confirmId !== 'string') return redirect('/') 

    return (
      <ActivationForm />
    )
} 