'use client'

import { useCustomers } from '@/hooks/useCustomers'
import { useProducts } from '@/hooks/useProducts'
import api from '@/lib/axios'
import { formatCurrency } from '@/utils/formatCurrency'
import { Transition } from '@headlessui/react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'
import cogoToast from 'cogo-toast'
import { ShoppingCart, Trash2 } from 'lucide-react'
import { Fragment, useState } from 'react'

interface DialogProps {}

export function Dialog(props: DialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  const { cart, removeCart, removeAllCart } = useProducts()
  const { customer } = useCustomers()

  const totalValueCart = cart.reduce((accumulator, value) => {
    const numericValue = parseFloat(value.unitaryValue.replace(',', '.'))
    return accumulator + numericValue
  }, 0)

  const isDisabled = cart.length === 0

  async function handleNewPurchases(cart: any) {
    if (!customer) {
      return cogoToast.error(
        'Para realizar uma compra, é preciso ter um usuário cadastrado.',
      )
    }

    const newOrder = {
      customerId: customer.id,
      totalValue: totalValueCart.toFixed(2),
      productIds: cart.map((product) => product.id),
    }

    try {
      await api.post('/order', newOrder)

      setIsOpen(false)
      removeAllCart()
      cogoToast.success('Compra realizada com sucesso.')
    } catch (err) {
      console.log(err)
      setIsOpen(false)
      cogoToast.error('Erro ao realizar a compra')
    }
  }

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Overlay className="fixed inset-0 z-20 bg-black/60 backdrop-blur-3xl" />

      <DialogPrimitive.Trigger asChild>
        <div className="relative cursor-pointer">
          <ShoppingCart size={32} className="" />
          <span className="bg-green-700 text-white rounded-full py-0 px-2 inline-block top-[-8px] left-6 absolute">
            {cart.length}
          </span>
        </div>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className={clsx(
                'fixed z-50',
                'w-[95vw] max-w-md rounded-lg p-4 md:w-full',
                'top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]',
                'bg-white dark:bg-gray-800',
                'focus:outline-none focus-visible:ring focus-visible:bg-green-500 focus-visible:green-opacity-75',
              )}
            >
              <DialogPrimitive.Title className="text-lg font-bold text-gray-900 dark:text-gray-100">
                Carrinho de compras
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 mb-6 text-sm font-normal text-gray-800 dark:text-gray-400">
                Items adicionados ao carrinho de compras
              </DialogPrimitive.Description>

              {cart.map((product) => (
                <div className="flex  justify-between pt-3" key={product.id}>
                  <div className="flex flex-row gap-2">
                    <Trash2
                      color="#e73b3b"
                      size={24}
                      className="cursor-pointer"
                      onClick={() => removeCart(product)}
                    />
                    <h3>{product.name}</h3>
                  </div>

                  <h2>{formatCurrency(product.unitaryValue)}</h2>
                </div>
              ))}

              <div className="border-b border-gray-600 my-1 mt-4"></div>

              <div className="mt-4 flex  text-lg font-bold lex justify-between">
                <h3> Valor total: </h3>
                <h2>{formatCurrency(totalValueCart.toFixed(2))}</h2>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  disabled={isDisabled}
                  onClick={() => handleNewPurchases(cart)}
                  className={`w-full inline-flex select-none justify-center rounded-md px-4 py-3 text-sm font-medium
                  ${
                    isDisabled
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-700 hover:bg-green-600'
                  }
                  text-white border border-transparent`}
                >
                  Comprar
                </button>
              </div>

              <DialogPrimitive.Close
                className={clsx(
                  'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
                  'focus:outline-none  focus-visible:green-700 focus-visible:gray-600',
                )}
              >
                <Cross1Icon className="h-4 w-4 text-gray-500 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400" />
              </DialogPrimitive.Close>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  )
}
