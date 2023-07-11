import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type QueryParams = {
  bookId: string
}

export default defineEventHandler(async (event) => {
  // const { bookId } = event.context.params as { bookId: string }
  const { bookId } = getQuery(event) as QueryParams

  console.log('bid', bookId)
  try {
    const result = await prisma.contain.findMany({
      where: { bookId },
      select: {
        speech: {
          select: {
            id: true,
            content: true,
            marking: {
              select: {
                tag: {
                  select: {
                    id: true,
                    name: true,
                    color: true
                  }
                }
              }
            }
          }
        }
      }
    })
    return result
  } catch (err) {
    console.error(err)
  }
})
