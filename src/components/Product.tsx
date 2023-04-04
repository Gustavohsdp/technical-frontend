'use client'

import { ProductProps } from '@/contexts/ProductsContext'
import { useProducts } from '@/hooks/useProducts'
import { formatCurrency } from '@/utils/formatCurrency'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from './Button'

interface ProductDataProps {
  product: ProductProps
}

export function Product({ product }: ProductDataProps) {
  const router = useRouter()
  const { addCart, cart, removeCart } = useProducts()

  function handleNavigationProductDetails() {
    router.push(`/product/${product.sku}`)
  }

  const productAddedToCart = cart.find((item) => item.id === product.id)

  return (
    <div className="h-80 w-full bg-gray-800 rounded-lg px-4 py-4 flex justify-center items-center flex-col ">
      <div className="cursor-pointer" onClick={handleNavigationProductDetails}>
        <div>
          <Image
            alt={product.name}
            src="https://d3ugyf2ht6aenh.cloudfront.net/stores/001/572/355/products/juflfb8-4686-008_zoom1-removebg-preview1-117cddabbce0dace0c16801931826518-480-0.webp"
            height="160"
            width="160"
            className="object-contain"
            quality={100}
          />
        </div>

        <div className="text-center mt-4">
          <p className="text-md font-inter font-bold ">{product.name}</p>
          <span className="text-2xl">
            {formatCurrency(product.unitaryValue)}
          </span>
        </div>
      </div>

      <div className="w-full mt-4">
        <Button
          onClick={() => {
            productAddedToCart ? removeCart(product) : addCart(product)
          }}
          isAdded={!!productAddedToCart}
        >
          {productAddedToCart ? 'Remover do carrinho' : 'Adicionar ao carrinho'}
        </Button>
      </div>
    </div>
  )
}
