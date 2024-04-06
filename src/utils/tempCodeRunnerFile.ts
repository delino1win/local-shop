import User from "@/models/user"

const getUserDetail = async (userId: User["userId"]) => {
  const profile = await User.findOne({userId: userId})

  if(!profile) return null

  return profile
}

export default getUserDetail