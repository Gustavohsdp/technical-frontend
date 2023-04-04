'use client'

import { ReactNode } from 'react'

import { CustomersProvider } from '@/contexts/CustomersContext'
import { ProductsProvider } from '@/contexts/ProductsContext'

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <CustomersProvider>
        <ProductsProvider>{children}</ProductsProvider>
      </CustomersProvider>
    </>
  )
}

export { Providers }
