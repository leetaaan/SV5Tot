import React from 'react'

const NodataMessage = ({message}) => {
  return (
    <div className='p-4 text-center w-full rounded-full bg-grey/50 mt-4'>
        <p>{message}</p>
    </div>
  )
}

export default NodataMessage