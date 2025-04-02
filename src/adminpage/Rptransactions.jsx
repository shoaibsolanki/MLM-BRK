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
        },
        {
            name: 'Customer ID',
            selector: row => row.customerId,
            sortable: true,
        },
        {
            name: 'Transaction Type',
            selector: row => row.transactionType,
            sortable: true,
        },
        {
            name: 'RP',
            selector: row => row.rp,
            sortable: true,
        },
        {
            name: 'SaaS ID',
            selector: row => row.saasId,
            sortable: true,
        },
        {
            name: 'Transaction Amount',
            selector: row => row.transactionAmount,
            sortable: true,
        },
        {
            name: 'Order ID',
            selector: row => row.orderId,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Created At',
            selector: row => row.createdAt,
            sortable: true,
        },
    ];

    
  return (
    <div>
        <CustomDataTable columns={columns} data={data}/>
    </div>
  )
}

export default Rptransactions