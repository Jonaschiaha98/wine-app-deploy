import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddWine = () => {
  const [wineData, setWineData] = useState({
    name: '',
    year: '',
    type: '',
    varietal: '',
    rating: '',
    consumed: false,
    dateConsumed: '',
    // Add other fields as needed
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setWineData({ ...wineData, [name]: value })
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setWineData({
      ...wineData,
      [name]: checked,
      dateConsumed: checked ? wineData.dateConsumed : '',
    })
  }
  const navigate = useNavigate()

  const handleAddWine = async () => {
    console.log(wineData)
    try {
      // Make a POST request to the server to add a new wine
      await axios.post('http://localhost:3000/api/wines', wineData)
      navigate('/')
      // Optionally, you can redirect the user or perform other actions after adding the wine
    } catch (error) {
      console.error('Error adding wine:', error)
    }
  }

  // const [wineData, setWineData] = useState({
  //   name: '',
  //   year: '',
  //   type: '',
  //   varietal: '',
  //   rating: '',
  //   consumed: false,
  //   dateConsumed: '',
  // })

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target
  //   setWineData({
  //     ...wineData,
  //     [name]: value,
  //   })
  // }

  // const handleAddWine = () => {
  //   // Add logic to send wineData to the backend for storage
  //   console.log('Adding wine:', wineData)
  //   // Reset form after adding
  //   setWineData({
  //     name: '',
  //     year: '',
  //     type: '',
  //     varietal: '',
  //     rating: '',
  //     consumed: false,
  //     dateConsumed: '',
  //   })
  // }

  return (
    <div className='container mx-auto mt-10'>
      <h1 className='text-2xl font-bold mb-5'>Add Wine</h1>
      <form className='lg:grid lg:grid-cols-2 lg:gap-4 md:grid md:grid-cols-2 md:gap-4 sm:grid sm:grid-cols-1'>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='name'
          >
            Wine Name
          </label>
          <input
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='name'
            type='text'
            placeholder='Enter wine name'
            name='name'
            value={wineData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='year'
          >
            Year
          </label>
          <input
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='year'
            type='number'
            placeholder='Enter year'
            name='year'
            value={wineData.year}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='type'
          >
            Type
          </label>
          <input
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='type'
            type='text'
            placeholder='Enter type'
            name='type'
            value={wineData.type}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='varietal'
          >
            Varietal
          </label>
          <input
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='varietal'
            type='text'
            placeholder='Enter varietal'
            name='varietal'
            value={wineData.varietal}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='rating'
          >
            Rating
          </label>
          <input
            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='rating'
            type='number'
            placeholder='Enter rating'
            name='rating'
            value={wineData.rating}
            onChange={handleInputChange}
          />
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='consumed'
          >
            Consumed
          </label>
          <input
            className='mr-2 leading-tight'
            id='consumed'
            type='checkbox'
            name='consumed'
            checked={wineData.consumed}
            onChange={handleCheckboxChange}
          />
          <span className='text-gray-700'>Did you consume this wine?</span>
        </div>
        {wineData.consumed && (
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='dateConsumed'
            >
              Date Consumed
            </label>
            <input
              className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='dateConsumed'
              type='date'
              name='dateConsumed'
              value={wineData.dateConsumed}
              onChange={handleInputChange}
            />
          </div>
        )}
        <div className='mb-4 col-span-2'>
          <button
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
            onClick={handleAddWine}
          >
            Add Wine
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddWine
