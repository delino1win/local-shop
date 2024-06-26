import User from "@/models/user"

const getUserDetail = async (userId: User["userId"]) => {
  const profile = await User.findOne({userId: userId}).lean()

  if(!profile) return null

  return profile as User
}

export default getUserDetail