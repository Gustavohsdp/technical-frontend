'use client'

import { FormValues } from '@/components/ModalRegisterCustomer'
import api from '@/lib/axios'
import { createContext, useState, type ReactNode } from 'react'

interface CustomerProps {
  id: string
  name: string
  email: string
  phone: string
  address: string
}

interface ICustomersContextData {
  getCustomerLocalStorage: () => void
  customer: CustomerProps | undefined
  createCustomer: (data: FormValues) => Promise<void>
}

const CustomersContext = createContext({} as ICustomersContextData)

const CustomersProvider = ({ children }: { children: ReactNode }) => {
  const [customer, setCustomer] = useState<CustomerProps>()

  async function createCustomer(data: FormValues) {
    try {
      const response = await api.post('/customer', data)

      localStorage.setItem('@mypharmacustomer', JSON.stringify(response.data))

      getCustomerLocalStorage()
    } catch (err) {
      console.log(err)
      throw err
    }
  }

  function getCustomerLocalStorage() {
    const storage = localStorage.getItem('@mypharmacustomer')
    const customer = storage && JSON.parse(storage)

    setCustomer(customer)
  }

  return (
    <CustomersContext.Provider
      value={{
        getCustomerLocalStorage,
        customer,
        createCustomer,
      }}
    >
      {children}
    </CustomersContext.Provider>
  )
}

export { CustomersProvider, CustomersContext, type ICustomersContextData }
