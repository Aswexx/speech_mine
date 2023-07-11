import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { bookId } = event.context.params as { bookId: string }
  const { name, description, color } = await readBody(event)
  console.log(bookId, name, description, color )
  try {
    await prisma.book.update({
      where: { id: bookId },
      data: {
        name,
        description,
        color
      }
    })
    return 'ok'
  } catch (err) {
    console.error(err)
  }
})
