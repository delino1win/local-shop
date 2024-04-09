
import nodemailer from "nodemailer"
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: true,
    minVersion: 'TLSv1.2',
  },
})

dayjs.extend(relativeTime)

//Function for generating the Otp message
function rngString (value: number = 5): string {
  let number = ''
  for (let i = 0; i < value; i++)
    number += Math.floor(Math.random() * 10)
  return number
}

export function generateOtpMessage () : {otpValue: string, emailInHtml: string, validUntil: Date} {
  const otpValue = rngString(5)
  const validCounter = dayjs().add(3, "minute")
  return {
    otpValue,
    validUntil: validCounter.toDate(),
    emailInHtml: `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Equator Stall</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Equator Stall. Use the following OTP to complete your Sign Up procedures. OTP is valid for ${validCounter.fromNow(true)}</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otpValue}</h2>
        <p style="font-size:0.9em;">Regards,<br />Equator Stall</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Equator Stall Shop Inc</p>
          <p>Jl. Fern No. 22</p>
          <p>Ende</p>
        </div>
      </div>
      div>
    `

  }
}

export async function send_Email(email: string, message: string, subject: string = "Your Confirmation Code") {
  try {
    console.log("this is send email function")
    const sendEmail = await transporter.sendMail({
      from: `Equator Stall, <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject,
      html: message
    })

    return sendEmail
  } catch (error) {
    console.log(error)
  }
}