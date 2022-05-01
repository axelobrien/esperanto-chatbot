import * as functions from "firebase-functions"
require('dotenv').config()


const askQuestion = functions.https.onCall(async (data, context) => {
  // if (context.app) {
    const { Configuration, OpenAIApi } = require("openai")
    
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_SK,
    })
  
    const openai = new OpenAIApi(configuration)
    try {
      const response = await openai.createCompletion("text-davinci-002", {
        prompt: `Generate  a sassy response for the following prompt:\n${data.text ?? 'best pickup line?'}`,
        temperature: 0.3,
        max_tokens: 30,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })

      return response.data.choices[0].text
    } catch (error) { 
      functions.logger.error("error", error)
      return error
    }   
  // } else {
  //   return {
  //     error: "Unauthorized"
  //   }
  // }
})

module.exports = {
  askQuestion
}