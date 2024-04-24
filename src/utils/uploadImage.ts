import { Buffer } from 'node:buffer'
import imageType from 'image-type'
import imageKit from './imageKit'
import { createId } from '@paralleldrive/cuid2'

function validateImageFile(size: number) {
  const allowedSizeMB = 3

  //Check Allowed Size of the Image, if the size in MB is less than 3MB return true
  if(size / 1024 ** 2 > allowedSizeMB) return false

  return true
}

export async function uploadImage(image: ArrayBuffer): Promise<string | null> {
  try {

    if(!validateImageFile(image.byteLength)) {
      return null
    }

    const imgBuffer = Buffer.from(image)
    const imgType = await imageType(imgBuffer)
    if(!imgType) return null

    const uploadedImage = await imageKit.upload({
      file: imgBuffer,
      fileName: `${createId}.webp`,
      transformation: {
        pre: 'f-webp,w-800,h-auto'
      }
    })

    return uploadedImage.url
    
  } catch (error) {
    console.log(error)
    return null
  }
}