import React, { useEffect, useState } from 'react'
import CustomDataTable from '../../admincomponents/Microcomponents/DataTable'
import DataService from '../../services/requestApi'
import { useParams } from 'react-router-dom'

const LeveWiseIncome = () => {
    const {name} = useParams()
    const {  saasId } = JSON.parse(localStorage.getItem("user_data"));
    const [data, setData] = useState([])
    const Fetchdata = async () => {
        try {
            const response = await DataService.GetIncomeByDesignations(saasId, name);
            if (response?.data?.status) {
                setData(response.data.data || []);
            } else {
                console.error(`Error: Received status code ${response.status}`);
            }
        } catch (error) {
            console.error("An error occurred while fetching data:", error.message);
        }
    }
    
    useEffect(() => {
      Fetchdata()
    }, [name])
    

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
            selector: row => new Date(row.createdAt).toLocaleString(),
            sortable: true,
        },
    ];

  return (
    <>
     <CustomDataTable title={`${name} Income`} columns={columns} data={data}/>
    </>
  )
}

export default LeveWiseIncome