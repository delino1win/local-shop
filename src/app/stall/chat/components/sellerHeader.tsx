

export default function SellerHeaderTitle({username}: {username?: string}) {
  return (
    <>
      <div className="p-3 text-lg tracking-wide self-center font-bold">
        {username}
      </div>
    </>
  )
}