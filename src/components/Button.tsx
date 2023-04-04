import { ButtonHTMLAttributes, ReactNode } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  isAdded?: boolean
}

export function Button({ children, isAdded = false, ...props }: ButtonProps) {
  return (
    <button
      className={`py-3 px-4 ${
        isAdded ? 'bg-red-700' : 'bg-green-700'
      }  rounded font-semibold text-white text-sm w-full transition-colors ${
        isAdded ? 'hover:bg-red-600' : 'hover:bg-green-600'
      }   focus:ring-2 ring-white`}
      {...props}
    >
      {children}
    </button>
  )
}
