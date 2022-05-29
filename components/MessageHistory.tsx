import React, { useEffect } from 'react'
import { MessageType } from '../types/message'
import Message from './Message'
import ThemedDiv from './ThemedDiv'

function MessageHistory(props: { messages: MessageType[] }) {
  const { messages } = props

  return (<>
    <ThemedDiv styles='flex flex-col justify-start items-center rounded-xl h-max max-w-2xl w-11/12 mb-8 mt-4 max-h-[70vh] overflow-y-scroll'>

      {messages?.map((message, index) => (
        <Message {...message} key={index}/>
      ))}

    </ThemedDiv>
  </>)
}

export default MessageHistory