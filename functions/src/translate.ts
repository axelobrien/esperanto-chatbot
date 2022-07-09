import * as functions from 'firebase-functions'
import { Translate } from '@google-cloud/translate/build/src/v2'
require('dotenv').config()

const translateInstance = new Translate({
  projectId: process.env.GCP_PROJECT_ID,
  keyFilename: process.env.GCP_KEY_FILE_NAME
})

type TranslateRequest = {
  text: string
  from: string
  to: string
}

export const translate = functions.https.onCall(async (data: TranslateRequest, context) => {
  // if (context.app) {
    try {
      const [translation] = await translateInstance.translate(
        [data.text], 
        {
          from: data.from, 
          to: data.to,
          format: 'text'
        }
      )

      if (!translation) {
        throw new Error('No response from Google Translate API')
      }

      return { 
        text: translation[0]
      }
    } catch (error) { 
      functions.logger.error('error', error)
      return {
        error
      }
    }   
  // } else {
  //   return {
  //     error: 'Unauthorized'
  //   }
  // }
})