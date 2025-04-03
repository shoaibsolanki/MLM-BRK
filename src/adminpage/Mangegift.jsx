import React from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import { useState, useEffect } from 'react'
import DataService from '../services/requestApi'
import { Button } from '@mui/material'
import CreateGiftModal from '../admincomponents/Modals/CreateGiftModal'
const Mangegift = () => {
   const [open , setOpen ] = useState(false)

    const [gifts, setGifts] = useState([])
    const {  saasId } = JSON.parse(localStorage.getItem("user_data"));
    const fetchGifts = async () => {
        try {
            const response = await DataService.GetGifts(saasId)
            setGifts(response.data.data)
        } catch (error) {
            console.error('Error fetching gifts:', error)
        }
    }

    useEffect(() => {
        fetchGifts()
    }, [])

//   const data = [
//     // Example data
//     { id: 1, name: 'John Doe', age: 28 },
//     { id: 2, name: 'Jane Smith', age: 34 },
//   ]

  const columns = [
    // Example columns
    { name: 'ID', selector: row => row.userID, sortable: true },
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'gift', selector: row => row.gift, sortable: true },
    { name: 'Gift Amount', selector: row => row.giftAmount, sortable: true },
    { name: 'Total Amount', selector: row => row.totalAmount, sortable: true },
  ]

  return (
    <div>
        <div className='flex justify-between items-center bg-white rounded p-2'>
                <h1>Mange Gifts</h1>
                <Button onClick={()=>setOpen(true)} variant='contained' color='primary' >
                    Add Gift
                </Button>
            </div>
      <CustomDataTable
        title="User Data"
        data={gifts}
        columns={columns}
      />
      <CreateGiftModal open={open} handleClose={()=>setOpen(false)} fetchGifts={fetchGifts}/>
    </div>
  )
}

export default Mangegift