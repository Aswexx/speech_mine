import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { speechId } = event.context.params as { speechId: string }
  const { bookId } = await readBody(event)

  console.log('@spID', speechId)
  console.log('@bkID', bookId)
  // TODO: 刪除此關聯後同一 speech 不存在與其他任何 book 的關聯，一併從話術池中移除
  // 另開一功能手動實現或者排程實現

  try {
    await prisma.contain.delete({
      where: {
        bookId_speechId: {
          speechId,
          bookId
        }
      }
    })
    return 'ok'
  } catch (err) {
    console.error(err)
  }
})
