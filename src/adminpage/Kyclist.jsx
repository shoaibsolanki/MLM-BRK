import React, { useEffect, useState } from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import DataService from '../services/requestApi'
import { Edit, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Kyclist = () => {
    const {  saasId } = JSON.parse(localStorage.getItem("user_data"));
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const GetKycData= async()=>{
        try {
            const response = await DataService.GetListkyc(saasId)
            if (response.data.status) {
                setData(response?.data.data || [])
            }
        } catch (error) {
            console.log(error )
        }
    }

    useEffect(() => {
        GetKycData()
    }, [])
    
   const column = [
  
    {
        name: 'Name',
        selector: row => row.userName,
        sortable: true,
    },
    {
        name: 'Bank Name',
        selector: row => row.bankName,
        sortable: true,
    },
    {
        name: 'Account Number',
        selector: row => row.accountNo,
        sortable: true,
    },
    {
        name: 'status',
        selector: row =>( 
            <>
            <div className={`${row.status =='Pending' ? 'bg-red-700': 'bg-green-600'} text-white p-2 rounded`}>{row.status}</div>
            </>
        ),
        sortable: true,
    },
    {
        name: 'Date Of Apply',
        selector: row => row.applyDate,
        sortable: true,
    },
   
    {
        name: 'Action',
        cell: row => (
            <div className="flex gap-2">
              <Eye className='cursor-pointer' onClick={()=>navigate(`/admin/userkyc/${row?.customerId}`)} />
            </div>
        ),
    },
];




  return (
    <div>
        <CustomDataTable  data={data} columns={column} title={"KYC Management"} />
    </div>
  )
}

export default Kyclist