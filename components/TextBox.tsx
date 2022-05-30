import React, { useState } from 'react'

type Props = {
  changeCallback?: (text: string) => void
  submitCallback?: (text: string) => void
}

function TextBox(props: Props) {
  const { changeCallback, submitCallback } = props
  const [text, setText] = useState('')
  
  return (<>
    <form 
      onSubmit={(e) => {
      e.preventDefault()
      submitCallback && submitCallback(text)
      }}
      className='flex flex-col sm:flex-row mx-auto'
    >
      <input
        type={'text'}
        className="resize-none max-w-[80vw] text-2xl sm:text-3xl p-4 bg-light-background-100 dark:bg-slate-800 dark:text-white rounded-xl shadow-xl focus:outline-none" 
        placeholder="Ask me anything..." 
        maxLength={30}
        onChange={(e) => {
          setText(e.target.value)
          changeCallback && changeCallback(e.target.value)
        }}
        spellCheck={true}
      />

      <button
        className="bg-[#2fc896] text-white text-2xl sm:text-3xl p-4 my-4 sm:my-0 mx-0 sm:mx-4 rounded-xl shadow-xl focus:outline-none"
        type="submit"
      >
        Submit
      </button>

    </form>  
  </>)
}

export default TextBox