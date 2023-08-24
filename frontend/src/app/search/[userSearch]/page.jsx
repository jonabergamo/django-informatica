'use client'
import React from 'react'
import ProductList from '../../../components/ProductList'

export default function page({ params }) {
    const userSearch = params.userSearch
  return (
    <div>
      <div className="px-32">
        {userSearch}
        <ProductList search={userSearch} />
      </div>
    </div>
  )
}
