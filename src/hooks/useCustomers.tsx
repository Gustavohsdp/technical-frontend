import {
  CustomersContext,
  ICustomersContextData,
} from '@/contexts/CustomersContext'
import { useContext } from 'react'

const useCustomers = (): ICustomersContextData => {
  return useContext(CustomersContext)
}

export { useCustomers }
