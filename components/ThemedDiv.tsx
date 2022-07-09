import React from 'react'

type Props = {
  children: React.ReactNode
  styles?: string
  attributes?: React.HTMLAttributes<HTMLDivElement>
}

function ThemedDiv(props: Props) {
  const { children, styles } = props
  return (
    <div className={`dark:bg-gray-800 bg-light-background-100 ${styles}`}>
      {children}
    </div>
  )
}

export default ThemedDiv