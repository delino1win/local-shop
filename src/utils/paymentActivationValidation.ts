import { error } from "console"

const nationalIdValidation = (id: string) => {
  const regex = /^\d{12}$/
  return regex.test(id)
}

const phoneNumberValidation = (no: string) => {
  const regex = /^\d{11,14}$/
  return regex.test(no)
}

const checkBoolean = (boolean: string) => {
  if(boolean === "true") {
    return true
  } else if (boolean === "false") {
    return false
  }
}

export {nationalIdValidation, phoneNumberValidation, checkBoolean}