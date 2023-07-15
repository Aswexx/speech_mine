import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type QueryParams = {
  keyword: string
  filterTags: string | string[]
}

export default defineEventHandler(async (event) => {
  const { keyword, filterTags } = getQuery(event) as QueryParams

  console.log('keyword-filterTags', keyword, filterTags)

  // 只選一個標籤會是 string，確保 DB query 時都是 string[]
  const filterTagsArr =
    typeof filterTags === 'string' ? [filterTags] : filterTags
  
  console.log('filterTagsArr', filterTagsArr)

  try {
    if (!filterTagsArr) {
      const result = await prisma.speech.findMany({
        where: { content: { contains: keyword } },
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
      return result.map(r => {
        return {
          speech: {
            ...r
          }
        }
      })
    } else {
      const result = await prisma.marking.findMany({
        where: {
          OR: filterTagsArr.map((tagId) => {
            return {
              tagId
            }
          })
        },
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
      const filteredResult = result.filter(r => r.speech.content.includes(keyword))
      return filteredResult
    }
  } catch (err) {
    console.error(err)
  }
})
