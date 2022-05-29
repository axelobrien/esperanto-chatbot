import React, { useState } from 'react'
import TextBox from '../components/TextBox'
import ThemedText from '../components/ThemedText'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase/firebaseConfig'
import { MessageType } from '../types/message'
import MessageHistory from '../components/MessageHistory'
const askQuestion = httpsCallable(functions, 'generateResponse')

type GPT3Response = {
  data?: string
  error?: string
}

function Home() {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<MessageType[]>([])

  async function handleQuestion(text: string) {
    setMessages([...messages, new MessageType(text, true)])
    const responseData = (await askQuestion({ text })) as GPT3Response

    const response = responseData?.data ?? responseData?.error ?? 'Sorry, I don\'t know'

    const msg = new SpeechSynthesisUtterance(response)
    msg.lang = 'eo'
    window.speechSynthesis.speak(msg)

    setMessages([...messages, new MessageType(text, true), new MessageType(response, false)])
  }

  return (<>
    <div className='flex flex-col justify-center items-center'>

      <MessageHistory messages={messages} />

      <TextBox 
        changeCallback={setText} 
        submitCallback={handleQuestion} 
      />

      <ThemedText styles='text-2xl'>
        {text.length} / 30 characters
      </ThemedText>

    </div>
  </>)
}

export default Home