'use client'

import { useCustomers } from '@/hooks/useCustomers'
import { Transition } from '@headlessui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross1Icon } from '@radix-ui/react-icons'
import { clsx } from 'clsx'
import cogoToast from 'cogo-toast'
import { Fragment, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { Button } from './Button'

export type FormValues = {
  name: string
  email: string
  phone: string
  address: string
}

const schema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  phone: yup
    .string()
    .matches(
      /(\(?\d{2}\)?\s)?(\d{4,5}-\d{4})/,
      'Número de telefone celular inválido, ex: 00 00000-0000',
    )
    .required('Campo obrigatório'),
  address: yup.string().required('Campo obrigatório'),
})

export default function ModalRegisterCustomer() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const { getCustomerLocalStorage, createCustomer } = useCustomers()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    try {
      await createCustomer(data)

      getCustomerLocalStorage()

      setIsOpen(false)

      cogoToast.success('Cliente Cadastrado com sucesso')
    } catch (err: any) {
      cogoToast.error(`${err.message}`)
    }
  }

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Overlay className="fixed inset-0 z-20 bg-black/60 backdrop-blur-3xl" />

      <DialogPrimitive.Trigger asChild>
        <Button>Cadastrar cliente</Button>
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
                Cadastrar cliente
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 mb-6 text-sm font-normal text-gray-800 dark:text-gray-400">
                Informe os dados para realizar compras em nosso e-commerce
              </DialogPrimitive.Description>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-3">
                  <label
                    htmlFor="name"
                    className="block text-gray-400 font-normal mb-2"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className={`form-input w-full max-w-md flex items-center gap-3 text-md text-zinc-400 bg-white/5 border border-white/10 px-3 h-10 rounded-md ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="email"
                    className="block text-gray-400 font-normal mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className={`form-input w-full max-w-md flex items-center gap-3 text-md text-zinc-400 bg-white/5 border border-white/10 px-3 h-10 rounded-md${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="phone"
                    className="block text-gray-400 font-normal mb-2"
                  >
                    Telefone
                  </label>
                  <input
                    type="text"
                    id="phone"
                    {...register('phone')}
                    className={`form-input w-full max-w-md flex items-center gap-3 text-md text-zinc-400 bg-white/5 border border-white/10 px-3 h-10 rounded-md${
                      errors.phone ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="address"
                    className="block text-gray-400 font-normal mb-2"
                  >
                    Endereço
                  </label>
                  <input
                    type="text"
                    id="address"
                    {...register('address')}
                    className={`form-input w-full max-w-md flex items-center gap-3 text-md text-zinc-400 bg-white/5 border border-white/10 px-3 h-10 rounded-md${
                      errors.address ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 mt-1">
                      {errors.address.message}
                    </p>
                  )}
                </div>

                <div className="mt-10">
                  <Button type="submit">Cadastrar</Button>
                </div>
              </form>
              <DialogPrimitive.Close
                className={clsx(
                  'absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1',
                  'focus:outline-none focus-visible:ring focus-visible:bg-green-700 focus-visible:green-opacity-75',
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
