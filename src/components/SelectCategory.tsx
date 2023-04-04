/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useProducts } from '@/hooks/useProducts'
import { ChangeEvent, useEffect, useState } from 'react'

export function SelectCategory() {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  )

  const { filterByCategory, getCategories, categories } = useProducts()

  function handleCategoryChange(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedCategory(event.target.value)
  }

  useEffect(() => {
    if (selectedCategory !== undefined) {
      filterByCategory(selectedCategory)
    }
  }, [selectedCategory])

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <div className="">
      <select
        id="category"
        name="category"
        value={selectedCategory}
        onChange={handleCategoryChange}
        className=" w-full text-base border-gray-300 focus:outline-none max-w-md flex items-center gap-3 text-md text-zinc-400 bg-white/5 border border-white/10 px-3 h-14 rounded-md"
      >
        <option value="">Selecione uma categoria</option>
        {categories.map((category: { id: string; name: string }) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  )
}
