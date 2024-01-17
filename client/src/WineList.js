import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const WineList = () => {
  //jhgiku
  const [wines, setWines] = useState([])

  useEffect(() => {
    // Fetch the list of wines from the server when the component mounts
    const fetchWines = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/wines')
        setWines(response.data)
        console.log(wines)
      } catch (error) {
        console.error('Error fetching wines:', error)
      }
    }

    fetchWines()
  })
  //jhgigks

  // const wines = [
  //   {
  //     id: 1,
  //     name: 'Wine A',
  //     year: 2020,
  //     type: 'Red',
  //     varietal: 'Cabernet Sauvignon',
  //     rating: 4.5,
  //     consumed: true,
  //     dateConsumed: '2022-01-10',
  //   },
  //   {
  //     id: 2,
  //     name: 'Wine B',
  //     year: 2019,
  //     type: 'White',
  //     varietal: 'Chardonnay',
  //     rating: 3.8,
  //     consumed: false,
  //     dateConsumed: null,
  //   },
  //   // Add more wines as needed
  // ]

  return (
    <div className='container mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-5'>List of Wines</h1>
      {/* Add Wine Button */}
      <button
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 focus:outline-none focus:shadow-outline'
        // onClick={handleAddWine}
      >
        <Link
          to='/add-wine'
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 inline-block'
        >
          Add Wine
        </Link>
      </button>
      <table className='min-w-full border rounded'>
        <thead>
          <tr className='bg-gray-200'>
            <th className='border w-1/6 py-2 px-4'>Name</th>
            <th className='border w-1/6 py-2 px-4'>Year</th>
            <th className='border w-1/6 py-2 px-4'>Type</th>
            <th className='border w-1/6 py-2 px-4'>Varietal</th>
            <th className='border w-1/6 py-2 px-4'>Rating</th>
            <th className='border w-1/6 py-2 px-4'>Consumed</th>
            <th className='border w-1/6 py-2 px-4'>Date Consumed</th>
          </tr>
        </thead>
        <tbody>
          {wines.map((wine) => (
            <tr key={wine.id}>
              <td className='border py-2 px-4'>{wine.name}</td>
              <td className='border py-2 px-4'>{wine.year}</td>
              <td className='border py-2 px-4'>{wine.type}</td>
              <td className='border py-2 px-4'>{wine.varietal}</td>
              <td className='border py-2 px-4'>{wine.rating || 'N/A'}</td>
              <td className='border py-2 px-4'>
                {wine.consumed ? 'Yes' : 'No'}
              </td>
              <td className='border py-2 px-4'>{wine.dateConsumed || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WineList
