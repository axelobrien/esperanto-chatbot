import * as functions from 'firebase-functions'
import { Configuration, OpenAIApi } from 'openai'
require('dotenv').config()

export const generateResponse = functions.https.onCall(async (data, context) => {
  // if (context.app) {
    
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_SK,
    })
  
    const openai = new OpenAIApi(configuration)

    try {
      const rawResponse = await openai.createCompletion('text-davinci-002', {
        prompt: `Respond in Esperanto with sass: ${data.text ?? 'best pickup line?'}\n\n\n`,
        temperature: 0.3,
        max_tokens: 40,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })

      const response = (rawResponse && rawResponse?.data?.choices?.at(0)?.text)

      if (!response) {
        throw new Error('No response from OpenAI')
      }
      
      return response
    } catch (error) { 
      functions.logger.error('error', error)
      return error
    }   
  // } else {
  //   return {
  //     error: 'Unauthorized'
  //   }
  // }
})