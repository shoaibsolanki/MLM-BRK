import React, { useEffect, useState } from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import { Edit } from 'lucide-react';
import DataService from '../services/requestApi'
import { Button } from '@mui/material';
import DistributorEditModal from '../admincomponents/Modals/Distibutoredit';
const Distibutorlist = () => {
    const[page , setPage] = useState(1)
    const [size,  setSize] = useState(10)
    const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
    const [data, setData] = useState([])
    const [Count , setCount] = useState('')
    const [open, setOpen] = useState(false)
    const [distributorData , setDistributorData] = useState('')
    const GetDistributorsData=  async ()=>{
        try {
        const response = await DataService.GetDistributor(page, size , saasId, storeId)
        setData(response.data.data || [])
        setCount(response.data.totalElements)
        } catch (error) {
            console.log(error)
        }
    }
     
    useEffect(() => {
      GetDistributorsData()
    }, [page, size])
    




    const columns = [
        { name: 'Distributor Name', selector: row => row.userName, sortable: true },
        { name: 'Password', selector: row => row.password, sortable: true },
        { name: 'Store Name', selector: row => row.storeName, sortable: true },
        // { name: 'Address', selector: row => row.address, sortable: true },
        { name: 'City', selector: row => row.city, sortable: true },
        { name: 'Mobile', selector: row => row.mobileNumber, sortable: true },
        { 
            name: 'Action', 
            selector: row => <Edit className='cursor-pointer' onClick={()=> {setOpen(true);
                setDistributorData(row)
            }}/>, 
            sortable: false 
        }
    ];
    
    const handlePageChange = (page) => {
        setPage(page)
        console.log(`Page changed to: ${page}`);
        // Call your API here with the new page number
    };
     
    const handleRowsPerPageChange = (newLimit, page) => {
        setSize(newLimit)
        console.log("Rows per page changed to:", newLimit);
        console.log("Current Page:", page);
        // Call your API or function here based on the new limit
    };
    // const data = [
    //     {
    //         id: 1,
    //         distributorName: 'John Doe',
    //         password: 'password123',
    //         centerName: 'Center 1',
    //         address: '123 Main St',
    //         city: 'New York',
    //         mobile: '123-456-7890',
    //         timings: '9 AM - 5 PM',
    //         action: 'Edit/Delete'
    //     },
    //     {
    //         id: 2,
    //         distributorName: 'Jane Smith',
    //         password: 'password456',
    //         centerName: 'Center 2',
    //         address: '456 Elm St',
    //         city: 'Los Angeles',
    //         mobile: '987-654-3210',
    //         timings: '10 AM - 6 PM',
    //         action: 'Edit/Delete'
    //     }
    // ];
  return (
    <div>
        <CustomDataTable  columns={columns} data={data} title="Distributor List" handlePageChange={handlePageChange} handleRowsPerPageChange={handleRowsPerPageChange} count={Count}/>
        <DistributorEditModal GetDistributorsData={GetDistributorsData} distributorData={distributorData} open={open} handleClose={()=>setOpen(false)}/>
    </div>
  )
}

export default Distibutorlist