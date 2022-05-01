import React, { useState } from 'react'
import TextBox from '../components/TextBox'
import ThemedText from '../components/ThemedText'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase/firebaseConfig'

function Home() {
  const [text, setText] = useState('')
  const [response, setResponse] = useState('')

  async function textToSpeech(text: string) {
    const askQuestion = httpsCallable(functions, 'askQuestion')
    const response = (await askQuestion({ text }))?.data as string | undefined
    const msg = new SpeechSynthesisUtterance(response ?? 'Sorry, I don\'t know')
    window.speechSynthesis.speak(msg)
    setResponse(response ?? 'Sorry, I don\'t know')
  }

  return (<>
    <div className='flex flex-col justify-center items-center'>

      <ThemedText
        styles='text-4xl mb-4'
      >
        {response ? response : 'Ask a question'}
      </ThemedText>

      <TextBox 
        changeCallback={setText} 
        submitCallback={textToSpeech} 
      />

      <ThemedText styles='text-2xl'>
        {text.length} / 30 characters
      </ThemedText>

    </div>
  </>)
}

export default Home