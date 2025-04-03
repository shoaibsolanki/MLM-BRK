import React, { useEffect, useState } from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import DataService from '../services/requestApi'
const Rptransactions = () => {

    const [data, setData] = useState([])
    const {  saasId } = JSON.parse(localStorage.getItem("user_data"));
    const GetTranscation = async()=>{
        try {
            const response = await DataService.GetRpTransaction(saasId)
            if(response.data.status){
                setData(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    useEffect(() => {
        GetTranscation()
    }, [])
    

    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
            width: '100px',
        },
        {
            name: 'Customer ID',
            selector: row => row.customerId,
            sortable: true,
            width: '100px',
        },
        {
            name: 'Transaction Type',
            selector: row => row.transactionType,
            sortable: true,
            width: '100px',
        },
        {
            name: 'RP',
            selector: row => row.rp,
            sortable: true,
            width: '100px',
        },
        {
            name: 'SaaS ID',
            selector: row => row.saasId,
            sortable: true,
            width: '100px',
        },
        {
            name: 'Transaction Amount',
            selector: row => row.transactionAmount,
            sortable: true,
            width: '200px',
        },
        {
            name: 'Order ID',
            selector: row => row.orderId,
            sortable: true,
            width: '100px',
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
            width: '100px',
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
            width: '100px',
        },
        {
            name: 'Created At',
            selector: row => row.createdAt,
            sortable: true,
            width: '100px',
        },
    ];

    
  return (
    <div>
        <CustomDataTable columns={columns} data={data}/>
    </div>
  )
}

export default Rptransactions