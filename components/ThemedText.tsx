import React from 'react'

type Props = {
  children: React.ReactNode
  styles: string
}

function ThemedText(props: Props) {
  const { children, styles } = props
  return (
    <p className={`dark:text-white ${styles}`}>
      {children}
    </p>
  )
}

export default ThemedText