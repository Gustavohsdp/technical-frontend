import { useContext } from 'react'

import {
  ProductsContext,
  IProductsContextData,
} from '@/contexts/ProductsContext'

const useProducts = (): IProductsContextData => {
  return useContext(ProductsContext)
}

export { useProducts }
