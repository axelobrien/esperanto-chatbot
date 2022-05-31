import React, { useEffect, useRef } from 'react'
import { MessageType } from '../types/message'
import Message from './Message'
import ThemedDiv from './ThemedDiv'
import ThemedText from './ThemedText'

function MessageHistory(props: { messages: MessageType[] }) {
  const { messages } = props
  const dummy = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (messages.length > 0) dummy.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (<>
    <ThemedDiv styles='flex flex-col justify-start items-center rounded-xl max-w-2xl w-11/12 mb-8 mt-4 h-max max-h-[70vh] overflow-y-scroll'>
      
      {messages.length > 0 && <ThemedText styles='text-2xl font-semibold text-center my-3'>
        Click any response from the AI to translate it to English
      </ThemedText>}
      
      {messages?.map((message, index) => (
        <Message {...message} key={index}/>
      ))}

      <span ref={dummy}></span>

    </ThemedDiv>
  </>)
}

export default MessageHistory