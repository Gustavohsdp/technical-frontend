'use client'

import api from '@/lib/axios'
import cogoToast from 'cogo-toast'
import { createContext, useState, type ReactNode } from 'react'

export interface ProductProps {
  id: string
  name: string
  description: string
  sku: string
  unitaryValue: string
  categoryId: string
  active: boolean
  createdAt: string
  updatedAt: string
}
interface CategoriesProps {
  id: string
  name: string
}

interface IProductsContextData {
  getProducts: () => Promise<void>
  addCart: (product: ProductProps) => void
  removeCart: (product: ProductProps) => void
  cart: ProductProps[]
  products: ProductProps[] | undefined
  product: ProductProps | undefined
  handleFilteredProducts: (name: string) => ProductProps[]
  filteredProducts: ProductProps[]
  orderByHighestPrice: () => ProductProps[]
  sortByLowestPrice: () => ProductProps[]
  sortByAscendingName: () => ProductProps[]
  sortByDescendingName: () => ProductProps[]
  filterByCategory: (categoryId: string) => ProductProps[]
  getProductBySku: (sku: string) => Promise<ProductProps>
  removeAllCart: () => void
  categories: CategoriesProps[]
  getCategories: () => Promise<void>
}

const ProductsContext = createContext({} as IProductsContextData)

const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<ProductProps[] | undefined>(
    undefined,
  )
  const [product, setProduct] = useState<ProductProps | undefined>(undefined)
  const [filteredProducts, setFilteredProducts] = useState<ProductProps[]>()
  const [cart, setCart] = useState<ProductProps[]>([])
  const [categories, setCategories] = useState<CategoriesProps[]>([])

  function orderByHighestPrice() {
    const sortedProducts = [...filteredProducts!].sort(
      (a, b) => parseFloat(b.unitaryValue) - parseFloat(a.unitaryValue),
    )
    setFilteredProducts(sortedProducts)
  }

  function sortByLowestPrice() {
    const sortedProducts = [...filteredProducts!].sort((a, b) => {
      const priceA = parseFloat(a.unitaryValue)
      const priceB = parseFloat(b.unitaryValue)

      if (priceA < priceB) {
        return -1
      }
      if (priceA > priceB) {
        return 1
      }
      return 0
    })
    setFilteredProducts(sortedProducts)
  }

  function sortByAscendingName() {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()

      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }
      return 0
    })
    setFilteredProducts(sortedProducts)
  }

  function sortByDescendingName() {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      const nameA = a.name.toLowerCase()
      const nameB = b.name.toLowerCase()

      if (nameA > nameB) {
        return -1
      }
      if (nameA < nameB) {
        return 1
      }
      return 0
    })
    setFilteredProducts(sortedProducts)
  }

  function filterByCategory(categoryId: string) {
    if (filteredProducts.length === 0) {
      setFilteredProducts(products)
    }

    const productsByCategory = products.filter((product) => {
      return product.categoryId === categoryId
    })

    if (productsByCategory.length === 0) {
      setFilteredProducts([])
    } else {
      setFilteredProducts(productsByCategory)
    }
  }

  function handleFilteredProducts(name: string) {
    setFilteredProducts(() =>
      products?.filter((product) =>
        product.name.toLowerCase().includes(name.toLowerCase()),
      ),
    )
  }

  async function getProducts() {
    try {
      const response = await api.get('/product')

      setProducts(response.data)
      setFilteredProducts(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  async function getProductBySku(sku: string) {
    try {
      const response = await api.get(`/product/${sku}`)

      setProduct(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  async function getCategories() {
    try {
      const response = await api.get('/category')

      setCategories(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  function addCart(product: ProductProps) {
    const productAlreadyAdd = cart.find((item) => item.id === product.id)

    if (productAlreadyAdd) {
      return cogoToast.warn('Já adicionado')
    }

    setCart((prevItems) => [...prevItems, product])
    return cogoToast.success('Produto adicionado ao carrinho')
  }

  function removeCart(product: ProductProps) {
    const productIndex = cart.findIndex((item) => item.id === product.id)

    if (productIndex >= 0) {
      const updatedCart = [...cart]
      updatedCart.splice(productIndex, 1)
      setCart(updatedCart)
      cogoToast.success('Produto removido do carrinho')
    } else {
      cogoToast.error('Erro ao remover o produto do carrinho')
    }
  }

  function removeAllCart() {
    setCart([])
  }

  return (
    <ProductsContext.Provider
      value={{
        getProducts,
        products,
        addCart,
        cart,
        removeCart,
        handleFilteredProducts,
        filteredProducts,
        orderByHighestPrice,
        sortByLowestPrice,
        sortByAscendingName,
        sortByDescendingName,
        filterByCategory,
        getProductBySku,
        product,
        removeAllCart,
        categories,
        getCategories,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export { type IProductsContextData, ProductsContext, ProductsProvider }
