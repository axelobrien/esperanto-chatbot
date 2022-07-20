import * as functions from 'firebase-functions'
import { Configuration, OpenAIApi } from 'openai'
import { Translate } from '@google-cloud/translate/build/src/v2'
require('dotenv').config()

const translateInstance = new Translate({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEY_FILE_NAME
})

export const generateResponse = functions.https.onCall(async (data, context) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_SK,
  })

  const openai = new OpenAIApi(configuration)

  try {
    const rawResponse = await openai.createCompletion('text-curie-001', {
      prompt: `Respond in Esperanto with sass: ${data.text ?? 'best pickup line?'}\n\n\n`,
      temperature: 0.3,
      max_tokens: 40,
      top_p: 1,
      frequency_penalty: 1.0,
      presence_penalty: 0,
    })

    const response = (rawResponse && rawResponse?.data?.choices?.at(0)?.text)

    if (!response) {
      throw new Error('No response from OpenAI')
    }
    
    const [forcedEsperantoResponse] = await translateInstance.translate(
      [response], 
      {
        from: 'en', 
        to: 'eo',
        format: 'text'
      }
    )

    if (!forcedEsperantoResponse) {
      throw new Error('No response from Google Translate API')
    }
    
    return forcedEsperantoResponse[0]

  } catch (error) { 
    functions.logger.error('error', error)
    return error
  }   
})
