import React from 'react'
import { useExchangeRates } from '../hooks/useExchangeRates'

const Dashboard = () => {

  const query = useExchangeRates()

  
  return (
    <div>Hi<button className='btn'>Hello</button><>{JSON.stringify(query.exchangeRates)}</></div>
  )
}

export default Dashboard