import React from 'react'

type Props = {
  children: React.ReactNode
  styles?: string
  attributes?: React.HTMLAttributes<HTMLParagraphElement>
}

function ThemedText(props: Props) {
  const { children, styles, attributes } = props
  return (
    <p className={`dark:text-white ${styles}`} {...attributes}>
      {children}
    </p>
  )
}

export default ThemedText