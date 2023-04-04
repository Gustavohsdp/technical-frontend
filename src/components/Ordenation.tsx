/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useProducts } from '@/hooks/useProducts'
import { ChangeEvent, useEffect, useState } from 'react'

interface ordernationProps {
  id: number
  option: string
}

const ordernation: ordernationProps[] = [
  {
    id: 1,
    option: 'Maior preço',
  },
  {
    id: 2,
    option: 'Menor preço',
  },
  {
    id: 3,
    option: 'Nome crescente',
  },
  {
    id: 4,
    option: 'Nome decrescente',
  },
]

export function Ordenation() {
  const [selectedOrdenation, setSelectedOrdenation] = useState<
    number | undefined
  >(undefined)

  const {
    orderByHighestPrice,
    sortByLowestPrice,
    sortByAscendingName,
    sortByDescendingName,
  } = useProducts()

  function handleOrdenationChange(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedOrdenation(Number(event.target.value))
  }

  useEffect(() => {
    if (selectedOrdenation === 1) {
      orderByHighestPrice()
    }

    if (selectedOrdenation === 2) {
      sortByLowestPrice()
    }

    if (selectedOrdenation === 3) {
      sortByAscendingName()
    }
    if (selectedOrdenation === 4) {
      sortByDescendingName()
    }
  }, [selectedOrdenation])

  return (
    <div className="">
      <select
        id="ordenation"
        name="ordenation"
        value={selectedOrdenation}
        onChange={handleOrdenationChange}
        className=" text-base border-gray-300 focus:outline-none  w-64 max-w-md flex items-center gap-3 text-md text-zinc-400 bg-white/5 border border-white/10 px-3 h-14 rounded-md"
      >
        <option value="">Selecione uma ordenação</option>
        {ordernation.map((ordenation: ordernationProps) => (
          <option key={ordenation.id} value={ordenation.id}>
            {ordenation.option}
          </option>
        ))}
      </select>
    </div>
  )
}
