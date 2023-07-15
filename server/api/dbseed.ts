import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const greetings = [
  '你好！歡迎使用我們的服務，請問有什麼需要協助的呢?',
  '嗨！有什麼我可以幫助你的嗎？',
  '哈囉！需要任何協助或資訊嗎？',
  '歡迎！請問有什麼需要我們的支援嗎？',
  '嘿！有什麼問題或疑問我可以回答嗎？',
  '您好！需要什麼樣的幫助或建議呢？',
  '歡迎光臨！請告訴我們您需要什麼樣的協助。',
  '嗨！有什麼我可以為您解決的問題嗎？',
  '您好！需要我們提供任何遊戲支援或解答疑惑嗎？',
  '哈囉！請告訴我您需要什麼樣的協助或建議。'
]

const accountRequests = [
  '請您提供會員帳號，以便我們協助您。',
  '為了能夠協助您處理問題，請問能提供您的會員帳號嗎？',
  '為了更好地為您服務，請問您可以提供會員帳號嗎？',
  '為了協助您解決問題，請問能提供一下您的會員帳號嗎？',
  '為了確認您的身分，請您提供一下會員帳號。',
  '為了進一步協助您，請問能提供您的會員帳號嗎？',
  '請問您能提供一下會員帳號嗎？我們需要這些資訊來協助您。',
  '為了更好地處理您的問題，請問您能提供會員帳號嗎？',
  '為了提供您更好的協助，請您提供一下會員帳號。',
  '請您提供會員帳號，讓我們能更有效地回應您的需求。'
]

const expiredMsg = [
  '提醒您，此活動已經結束。歡迎您參考我們的其他精彩活動！',
  '感謝您的參與！此活動已經結束，請查看我們的其他活動以獲取更多樂趣。',
  '告知您，該活動已過期。請瀏覽我們的其他活動，或許您會找到新的驚喜！',
  '很遺憾通知您，該活動已結束。別擔心，我們還有其他精彩活動等著您。',
  '提醒您，該活動已結束，期待您參與未來的活動！請留意我們的最新動態。',
  '告知您，該活動已結束，但請繼續關注我們的其他精彩活動！',
  '很遺憾通知您，該活動已經結束。請您參考我們的其他活動以獲得更多樂趣。',
  '提醒您，此活動已經結束，感謝您的參與與支持。請繼續關注我們即將推出的新活動！',
  '告知您，該活動已結束，歡迎您參考我們的其他活動，體驗更多精彩內容。',
  '感謝您參與此活動，但很遺憾它已經結束了。請您留意我們的最新活動，有更多驚喜等著您！'
]

const activityAccountRequests = [
  '非常感謝您的參與！為了協助您享受活動特典，請提供您的會員帳號。',
  '我們非常期待您的參與！請告訴我們您的會員帳號，讓我們協助您確認參與活動的資格。',
  '為了確保您符合活動資格，請提供您的會員帳號。',
  '您的支持對我們而言非常重要！請提供您的會員帳號，以協助我們確認您的活動資格。',
  '熱烈歡迎您參與活動！為了完整的體驗，請告訴我們您的會員帳號。',
  '感謝您的熱情參與！請提供您的會員帳號，以協助我們確認您是否符合參與活動的資格。',
  '您的參與讓我們更加精彩！為了確保您有資格參加，請告訴我們您的會員帳號。',
  '讓我們一起創造美好回憶！請提供您的會員帳號，以協助我們確認您是否符合參與活動的資格。',
  '感謝您的支持與參與！為了協助您享受活動特典，請告訴我們您的會員帳號。'
]

const tags = [
  'cljtqhd0500007kbcf1cgsjjn', // 活動諮詢
  'cljtqhd0600017kbcl8ey9y4e', // 帳號事務
  'cljtqhd0600027kbcqe9g60qy', // 基本問候
  'cljwdh1ga00007kx4yjm2mpk1', // 索取會員資料
]

const bookId = 'cljqpic4500017kpcmzejdrz9'

async function createGreetings(speechArr: string[], tagIdArr: string[]) {

  const results = await Promise.all(speechArr.map(async (g) => {
    const newSpeech = await prisma.speech.create({
      data: {
        content: g,
        marking: {
          createMany: {
            data: tagIdArr.map((t: string) => {
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
      }
    })

    return newSpeech
  }))


  console.log(results)
}

async function createNewTags() {
  const tags = [
    {
      name: '技術問題',
      color: '#000000'
    },
  ]
  const result = await prisma.tag.createMany({
    data: tags
  })

  return result
}


export default defineEventHandler(async (event) => {
  try {
    // await createNewTags()
    // return createGreetings(accountRequests, ['cljtqhd0600017kbcl8ey9y4e'])
    // await createGreetings(expiredMsg, ['cljtqhd0500007kbcf1cgsjjn'])
    // await createGreetings(activityAccountRequests, [
    //   'cljwdh1ga00007kx4yjm2mpk1',
    //   'cljtqhd0500007kbcf1cgsjjn'
    // ])
    return 'done'
  } catch (e) {
    return { error: e }
  }
})
