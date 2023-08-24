import React from 'react'

export default function page({ params }) {
    const userSearch = params.userSearch
  return (
      <div>{userSearch}</div>
  )
}
