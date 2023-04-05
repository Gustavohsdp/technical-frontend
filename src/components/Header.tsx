'use client'

import { useCustomers } from '@/hooks/useCustomers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from './Button'
import { Dialog } from './Modal'
import ModalRegisterCustomer from './ModalRegisterCustomer'

export function Header() {
  const router = useRouter()

  function handleHomePage() {
    router.push('/')
  }

  function handleMyOrders() {
    router.push('/orders')
  }

  const { customer, getCustomerLocalStorage } = useCustomers()

  useEffect(() => {
    getCustomerLocalStorage()
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 px-4 sm:px-8 md:px-12 lg:px-20 py-4 border-b border-white/10 flex items-center justify-between w-full h-20 flex-row backdrop-blur-2xl">
      <div className="cursor-pointer" onClick={handleHomePage}>
        <span className="font-inter font-bold text-2xl">MyPharma </span>
        <span className="font-inter font-light text-2xl">Shop</span>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 justify-center">
        <Dialog />

        {customer ? (
          <>
            <div>
              <Button onClick={handleMyOrders}>Meus pedidos</Button>
            </div>

            <div className="hidden sm:block">
              <span className="font-bold">{customer.name}</span>
              <p className="text-sm">{customer.email}</p>
            </div>
          </>
        ) : (
          <ModalRegisterCustomer />
        )}
      </div>
    </header>
  )
}
