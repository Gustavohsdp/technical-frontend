import { OrderProps } from '@/contexts/CustomersContext'
import { formatCurrency } from '@/utils/formatCurrency'

interface MyOrdersProps {
  order: OrderProps
}

export function MyOrders({ order }: MyOrdersProps) {
  return (
    <div className="bg-gray-800 w-full rounded-lg px-4 py-4 flex justify-start  flex-col ">
      <div className="flex gap-2 items-center">
        <span className="font-bold text-lg">Pedido:</span>
        <p className="font-medium text-green-600 text-md">{order.id}</p>
      </div>

      {order.items.map((product) => (
        <>
          <div className="flex gap-2 items-center">
            <span className="font-bold text-lg">Produto:</span>
            <p className="font-medium text-green-600 text-md">
              {product.product.name}
            </p>
          </div>

          <div className="flex gap-2 items-center">
            <span className="font-bold text-lg">Valor unitário:</span>
            <p className="font-medium text-green-600 text-md">
              {formatCurrency(product.product.unitaryValue)}
            </p>
          </div>
        </>
      ))}

      <div className="flex gap-2 items-center">
        <span className="font-bold text-lg">Valor total: </span>
        <p className="font-medium text-green-600 text-md">
          {formatCurrency(order.totalValue)}
        </p>
      </div>
    </div>
  )
}
