import React from 'react'

type Props = {
  children: React.ReactNode
  class?: string
  attributes?: React.HTMLAttributes<HTMLParagraphElement>
}

function ThemedText(props: Props) {
  const { children, class: styles, attributes } = props
  return (
    <p className={`dark:text-white ${styles}`} {...attributes}>
      {children}
    </p>
  )
}

export default ThemedText