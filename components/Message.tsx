import { httpsCallable, HttpsCallable, HttpsCallableResult } from 'firebase/functions'
import React, { useState } from 'react'
import { functions } from '../firebase/firebaseConfig'
import { TranslateRequest } from '../types/translate'

type Props = { 
  text: string
  isUser: boolean 
}

enum TranslationStatus {
  NOT_STARTED,
  PENDING,
  SUCCESS,
  ERROR
}

function Message(props: Props) {
  const { isUser, text } = props
  const [status, setStatus] = useState(TranslationStatus.NOT_STARTED)
  const [translation, setTranslation] = useState('')

  async function translateToNative() {
    if (isUser === false && !translation && status !== TranslationStatus.PENDING && text.length > 0) {
      setStatus(TranslationStatus.PENDING)
      
      const translate: HttpsCallable<TranslateRequest, unknown> = httpsCallable(functions, 'translate')
      const response = await translate({ text, from: 'eo', to: 'en' }) as HttpsCallableResult<{text?: string, error?: unknown}>
      
      if (response.data.text) {
        const translatedText = response.data.text
        setStatus(TranslationStatus.SUCCESS)
        setTranslation(translatedText)
      } else {
        setStatus(TranslationStatus.ERROR)
      }

    }
  }

  return (<>
      <p 
        onClick={() => translateToNative()}
        className={`text-white text-2xl m-2 p-4 rounded-xl max-w-[70%] sm:max-w-[40%] ${isUser ? 'bg-blue-500 self-end rounded-br-none' : 'bg-gradient-to-tr from-purple-500 to-blue-600 self-start rounded-bl-none hover:cursor-pointer'}`} 
      >
      {text}
      
      {!isUser && status !== TranslationStatus.NOT_STARTED && <p className='text-white w-full mx-0 border-t-2 border-white mt-2 pt-2'>
        {status === TranslationStatus.PENDING && 'Translating...'}
        {status === TranslationStatus.SUCCESS && translation}
        {status === TranslationStatus.ERROR && 'Sorry, something went wrong'}
      </p>}

    </p>
  </>)
}

export default Message