import Image from "next/image";
import type { User } from "next-auth";

type Props = {
    user?: {
        username?: User["username"]
        role?: User['role']
        image?: User['image']
        name?: User['name']
    }
}

export default function UserCard({user}: Props) {

    const information = user? (
        <div>
            <h2>Welcome, <b>{user?.username}</b></h2>
            <h2>Role: {user.role}</h2>

        </div>) : (<h3>You need to login first</h3>)

    const userImage = user?.image ? (
        <Image
            className="border-4 border-black dark:border-slate-500 drop-shadow-xl shadow-black rounded-full mx-auto mt-8 "
            src={user?.image}
            width={50}
            height={50}
            alt={user?.name ?? "Profile Pic"}
            priority={true}
        />
    ) : null

    return (
        <section className="flex flex-col gap-2">
            {userImage}
            {information}
        </section>
    )
}

