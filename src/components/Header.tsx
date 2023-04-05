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
    <header className="fixed top-0 left-0 right-0 px-4 sm:px-8 md:px-12 lg:px-20 py-4 border-b border-white/10 flex flex-col sm:flex-row items-center justify-between w-full h-20 backdrop-blur-2xl">
      <div
        className="cursor-pointer mb-4 sm:mb-0 sm:w-full"
        onClick={handleHomePage}
      >
        <span className="font-inter font-bold text-2xl">MyPharma </span>
        <span className="font-inter font-light text-2xl">Shop</span>
      </div>

      <div className="flex items-center justify-end sm:w-auto ">
        <Dialog />

        {customer ? (
          <div className="w-full flex flex-row ml-10 items-center justify-between">
            <div>
              <Button onClick={handleMyOrders}>Pedidos</Button>
            </div>

            <div className=" w-full flex-col justify-between items-center sm:flex-row sm:items-center sm:ml-4 hidden md:block">
              <span className="font-bold flex-nowrap">
                {customer.name.split(' ')[0]}
              </span>
              <p className="text-sm">{customer.email}</p>
            </div>
          </div>
        ) : (
          <ModalRegisterCustomer />
        )}
      </div>
    </header>
  )
}
