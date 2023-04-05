'use client'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { Loading } from '@/components/Loading'
import { useCustomers } from '@/hooks/useCustomers'
import { useProducts } from '@/hooks/useProducts'
import { formatCurrency } from '@/utils/formatCurrency'
import Image from 'next/image'
import { useEffect } from 'react'

interface ProductDetailsProps {
  params: {
    sku: string
  }
}

export default function ProductDetails(props: ProductDetailsProps) {
  const { addCart, getProductBySku, product, removeCart, cart } = useProducts()
  const { getCustomerLocalStorage } = useCustomers()

  useEffect(() => {
    getProductBySku(props.params.sku)
  }, [props.params.sku])

  useEffect(() => {
    getCustomerLocalStorage()
  }, [])

  const productAddedToCart = cart.find((item) => item.id === product?.id)

  return (
    <main className="px-4 sm:px-8 md:px-16 lg:px-24 w-full mx-auto pt-24 flex flex-col items-center justify-center">
      <Header />

      {product ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4 sm:mb-0 xs:mt-96">
            <Image
              alt="Camiseta"
              src="https://d3ugyf2ht6aenh.cloudfront.net/stores/001/572/355/products/juflfb8-4686-008_zoom1-removebg-preview1-117cddabbce0dace0c16801931826518-480-0.webp"
              height="600"
              width="600"
              quality={100}
            />
          </div>

          <div className="flex flex-col justify-between">
            <div className="my-4 gap-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-inter font-bold mb-6">
                {product.name}
              </h1>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <span className="text-2xl sm:text-4xl font-inter font-medium text-green-700">
                  {formatCurrency(product.unitaryValue)}
                </span>

                <p className="font-bold text-gray-50 mt-4 sm:mt-0 sm:ml-4">
                  SKU-{product.sku.toLocaleUpperCase()}
                </p>
              </div>

              <p className="font-normal text-gray-300 mt-6">
                {product.description}
              </p>
            </div>

            <div className="w-full py-9">
              <Button
                onClick={() => {
                  productAddedToCart ? removeCart(product) : addCart(product)
                }}
                isAdded={!!productAddedToCart}
              >
                {productAddedToCart
                  ? 'Remover do carrinho'
                  : 'Adicionar ao carrinho'}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </main>
  )
}
