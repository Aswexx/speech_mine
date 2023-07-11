import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type QueryParams = {
  userId: string
}

export default defineEventHandler(async (event) => {
  // const { userId } = event.context.params as { userId: string }
  const { userId } = getQuery(event) as QueryParams
  console.log(userId)
  try {
    const books = await prisma.book.findMany({
      where: { userId }
    })
    return books
  } catch (err) {
    console.error(err)
  }
})
