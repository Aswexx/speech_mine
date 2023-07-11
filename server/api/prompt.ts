import { Configuration, OpenAIApi } from 'openai'

const openAIconfig = new Configuration({
  apiKey: useRuntimeConfig().gptKey
})

const openAI = new OpenAIApi(openAIconfig)

export default defineEventHandler(async (event) => {
  const { cause } = await readBody(event)
  const question = ''
  const attitude = '客氣且簡短'
  const modifiedPrompt = `
    我需要你作為遊戲產品的客服，在線上即時通訊軟體中回答使用者的問題，
    假設使用者反映了${question}問題，
    你需要使用${attitude}的語氣回復他原因，假設經過你的查詢，使用者的問題導因於${cause}，
    請你依照上面的要求，給予使用者適當的回覆，
    回覆中不能有"抱歉"、非常抱歉"這類看似將問題錯誤直接歸咎於我方的語句。
  `

  console.log(modifiedPrompt, modifiedPrompt.length)

  try {
    const response = await openAI.createChatCompletion({
      model: 'gpt-3.5-turbo',
      temperature: 1, // 回應隨機性，0~2，越大越隨機
      messages: [
        {
          role: 'user',
          content: modifiedPrompt
        },
      ]
    })

    console.log('response@@', response)
    console.log(response.data.choices[0].message?.content)
    return {
      modifiedResult: response.data.choices[0].message?.content
    }

  } catch (err) {
    console.log(err)
  }

  // return {
  //   modifiedResult: modifiedPrompt
  // }
})
