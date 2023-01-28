import React, { useState } from 'react'
import TextBox from '../components/TextBox'
import ThemedText from '../components/ThemedText'
import { httpsCallable } from 'firebase/functions'
import { functions } from '../firebase/firebaseConfig'
import { MessageType } from '../types/message'
import MessageHistory from '../components/MessageHistory'
import Head from 'next/head'
import ThemedDiv from '../components/ThemedDiv'

const askQuestion = httpsCallable(functions, 'generateResponse')

type GPT3Response = {
  data?: string
  error?: string
}

function Home() {
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<MessageType[]>([])

  async function handleQuestion(text: string) {
    if (text.length === 0) return
    setMessages([...messages, new MessageType(text, true)])
    setText('')

    const responseData = (await askQuestion({ text })) as GPT3Response

    const response = responseData?.data ?? responseData?.error ?? 'Sorry, I don\'t know'

    setMessages([...messages, new MessageType(text, true), new MessageType(response, false)])
  }

  return (<>

    <Head>
      <title>An Esperanto Speaking Friend</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="title" content="Esperanto Speaking Chatbot" />
      <meta name="description" content="Using the power of GPT-3 to generate responses in the most popular conlang!" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://esperanto-chatbot.web.app" />
      <meta property="og:title" content="Esperanto Speaking Chatbot" />
      <meta property="og:description" content="Using the power of GPT-3 to generate responses in the most popular conlang!" />
      <meta property="og:image" content="https://esperanto-chatbot.web.app/assets/logo.png" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://esperanto-chatbot.web.app" />
      <meta property="twitter:title" content="Esperanto Speaking Chatbot" />
      <meta property="twitter:description" content="Using the power of GPT-3 to generate responses in the most popular conlang!" />
      <meta property="twitter:image" content="https://esperanto-chatbot.web.app/assets/logo.png" />

    </Head>

    <div className='flex flex-col items-center h-screen overflow-y-scroll'>

      <ThemedText class='text-5xl font-semibold text-center mt-4'>
        Your Only Esperanto Speaking Friend
      </ThemedText>

      <img 
        src='/assets/logo.png'
        alt='Esperanto Chatbot'
        className='w-1/12 min-w-[200px]'
      />

      <ThemedText class='text-2xl font-semibold text-center'>
        (also your only friend)
      </ThemedText>

      <MessageHistory messages={messages} />

      <TextBox 
        changeCallback={setText} 
        submitCallback={handleQuestion} 
      />

      <ThemedText class='text-2xl mb-10'>
        {text.length} / 30 characters
      </ThemedText>

      <ThemedDiv class='max-w-7xl w-11/12 p-4 rounded-lg shadow-xl mt-auto mb-10'>
        <ThemedText class='text-xl'>
          Need a friend to speak Esperanto with? Need a friend period? Well this robot can fill that empty void in your heart! It uses <a href='https://openai.com/api/' target={'_blank'} rel="noreferrer" className='underline text-blue-400'>GPT-3,</a> the most powerful language processing model in the world, just to sass you in Esperanto.
        </ThemedText>

        <ThemedText class='text-2xl mt-6'>
          Site made by Axel O.
          <br/> 
          <a 
            href='https://github.com/Sirbananathe6th/esperanto-chatbot'
            target={'_blank'}
            rel="noreferrer"
            className='underline text-blue-400'
          >
            Github Repository
          </a> 
          <br />
          <br />
          I also made a news site that has stories from the future
          <br />
          <a 
            href='https://tomorrowtribune.com/'
            target={'_blank'} 
            rel="noreferrer" 
            className='underline text-blue-400'
          >
            https://tomorrowtribune.com/
          </a>
        </ThemedText>
      </ThemedDiv>

    </div>
  </>)
}

export default Home