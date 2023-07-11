import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { userId , title, description, color } = await readBody(event)

  console.log(userId, title, description, color)
  try {
    const result = await prisma.book.create({
      data: {
        userId,
        name: title,
        description,
        color
      }
    })
    return result
  } catch (err) {
    console.error(err)
  }
})
