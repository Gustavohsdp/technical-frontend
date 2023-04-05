'use client'

import { Button } from '@/components/Button'
import { Header } from '@/components/Header'
import { MyOrders } from '@/components/MyOrders'
import { useCustomers } from '@/hooks/useCustomers'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Orders() {
  const { myOrders, orders, customer } = useCustomers()

  const router = useRouter()

  function handleHomePage() {
    router.push('/')
  }

  useEffect(() => {
    myOrders()
  }, [customer])

  return (
    <main className="px-4 sm:px-8 md:px-16 lg:px-24 w-full mx-auto pt-24 flex flex-col">
      <Header />

      {orders && orders?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
          {orders?.map((order) => (
            <MyOrders key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="h-60 w-full flex justify-center items-center flex-col">
          <p>
            Não foi encontrado compras, volte para pagina de produtos para
            realizar o seu primeiro pedido.
          </p>

          <div className=" w-full max-w-md mt-10">
            <Button onClick={handleHomePage}>Produtos</Button>
          </div>
        </div>
      )}
    </main>
  )
}
