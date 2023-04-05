'use client'

import { Header } from '@/components/Header'
import { Loading } from '@/components/Loading'
import { Ordenation } from '@/components/Ordenation'
import { Product } from '@/components/Product'
import { Search } from '@/components/Search'
import { SelectCategory } from '@/components/SelectCategory'
import { useCustomers } from '@/hooks/useCustomers'
import { useProducts } from '@/hooks/useProducts'
import { useEffect } from 'react'

const HomePage = () => {
  const { filteredProducts, getProducts, products } = useProducts()
  const { getCustomerLocalStorage } = useCustomers()

  useEffect(() => {
    getProducts()
    getCustomerLocalStorage()
  }, [])

  return (
    <div className="w-screen h-screen ">
      <Header />
      <main className="px-4 sm:px-8 md:px-16 lg:px-24 w-screen mx-auto pt-24">
        <div className="flex flex-row flex-wrap items-center justify-between">
          <Search />
          <div className="gap-3 flex flex-row flex-wrap mt-3 sm:mt-0 md:flex-nowrap">
            <SelectCategory />
            <Ordenation />
          </div>
        </div>

        {!products ? (
          <div className="mt-56">
            <Loading />
          </div>
        ) : filteredProducts && filteredProducts.length > 0 ? (
          <div className="w-full grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
            {filteredProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center mt-56">
            <h1 className="font-medium text-lg">
              Não há produtos para serem exibidos
            </h1>
          </div>
        )}
      </main>
    </div>
  )
}

export default HomePage
