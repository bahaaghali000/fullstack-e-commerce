import React from 'react'
import Skeleton from 'react-loading-skeleton'

const CartSkeleton = () => {
  return (
    <div className='cart__skeleton'>
        <Skeleton width={80} height={80} />
        <Skeleton width={80} />
        <Skeleton width={80} />
        <Skeleton width={80} />
        <Skeleton width={80} />
    </div>
  )
}

export default CartSkeleton