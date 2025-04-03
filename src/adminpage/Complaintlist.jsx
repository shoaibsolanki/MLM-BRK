import React, { useState } from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import DataService from '../services/requestApi'
import { useEffect } from 'react';
import { Button } from '@mui/material';
const Complaintlist = () => {

  const [data, setData] = useState([])
  const {  saasId } = JSON.parse(localStorage.getItem("user_data"));
  const GetComplain = async ()=>{
    try {
      const response = await DataService.GetComplain(saasId)
      if(response.data.status){
        setData(response.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    GetComplain();
  }, []);


    const columns = [
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Mobile', selector: row => row.mobile, sortable: true },
        { name: 'Email', selector: row => row.email, sortable: true },
        { name: 'Subject', selector: row => row.subject, sortable: true },
        { name: 'Complaint', selector: row => row.complaint, sortable: true },
        { name: 'Date', selector: row => row.date, sortable: true },
    ];

    // const data = [
    //     { id: 1, name: 'John Doe', mobile: '1234567890', email: 'john@example.com', subject: 'Issue 1', complaint: 'Complaint details 1', date: '2023-01-01' },
    //     { id: 2, name: 'Jane Smith', mobile: '0987654321', email: 'jane@example.com', subject: 'Issue 2', complaint: 'Complaint details 2', date: '2023-01-02' },
    //     // Add more data as needed
    // ];
  return (
    <div>
      {/* <div className='flex justify-between items-center bg-white rounded p-2'>
                              <h1 className='text-xl'>Complaint Management</h1>
                              <Button
                                 variant='contained'
                                 color='primary'
                                  // onClick={()=>setAddmodal(true)}
                              >
                                 Add Complaint
                              </Button>
                          </div> */}
        <CustomDataTable columns={columns} data={data} title={"Complaint Management"}/>
    </div>
  )
}

export default Complaintlist