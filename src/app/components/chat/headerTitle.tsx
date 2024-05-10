

export default function HeaderTitle({username}: {username?: string}) {
  return (
    <>
      <div className="">
        {username}
      </div>
    </>
  )
}