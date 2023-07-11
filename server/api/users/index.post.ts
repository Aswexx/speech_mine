import crypto from 'crypto'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { userId, email } = await readBody(event)
  const initName = crypto.randomBytes(4).toString('hex').slice(0,8)

  try {
    await prisma.user.upsert({
      where: { id: userId },
      update: {},
      create: {
        id: userId,
        name: `user-${initName}`,
        email
      }
    })
    console.log(userId)
    return 'ok'
  } catch (err) {
    console.error(err)
  }
})
