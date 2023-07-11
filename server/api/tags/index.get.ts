import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const tags = await prisma.tag.findMany({})
    return tags
  } catch (err) {
    console.error(err)
  }
})
