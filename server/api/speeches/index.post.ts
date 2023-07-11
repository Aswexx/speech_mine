import { PrismaClient } from '@prisma/client'
import { distance } from 'fastest-levenshtein'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const { bookId, tags, content } = await readBody(event)

  console.log(bookId, tags, content)
  // TODO: 先進行相似度比對
  console.log('compare', distance('fast', 'faster')) // 距離=差幾個字元，越小越相近


  try {
    const result = await prisma.speech.create({
      data: {
        content,
        marking: {
          createMany: {
            data: tags.map((t: string) => {
              return {
                tagId: t
              }
            })
          }
        },
        contain: {
          create: {
            bookId
          }
        }
      },
      // 使新建後的資料返回格式與最初獲取一致
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
    })
    return result
  } catch (err) {
    console.error(err)
  }
})
