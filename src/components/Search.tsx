'use client'

import { useProducts } from '@/hooks/useProducts'

export function Search() {
  const { handleFilteredProducts } = useProducts()

  return (
    <input
      type="text"
      className="w-full max-w-md flex items-center gap-3 text-md text-zinc-400 bg-white/5 border border-white/10 px-3 h-14 rounded-md"
      placeholder="Pesquisar produtos..."
      onChange={(e) => handleFilteredProducts(e.target.value)}
    />
  )
}
