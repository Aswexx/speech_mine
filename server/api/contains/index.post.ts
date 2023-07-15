import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { bookId, speechId } = await readBody(event)

  console.log(bookId, speechId)
  try {
    return await prisma.contain.create({
      data: {
        bookId,
        speechId
      }
    })
  } catch (err) {
    console.error(err)
    return createError({
      statusCode: 422,
    })
  }
})
