import React, { useEffect } from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import DataService from '../services/requestApi'
const Wallet = () => {
    const {  storeId } = JSON.parse(localStorage.getItem("user_data"));
    const columns = [
        { name: 'UserID', selector: row => row.userID, sortable: true },
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Type', selector: row => row.type, sortable: true },
        { name: 'Amount', selector: row => row.amount, sortable: true },
        { name: 'Date', selector: row => row.date, sortable: true },
    ];

   const [data, setData] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [count, setCount] = React.useState(1)
    const getWalletTransction = async ()=>{
    try {
        const response = await DataService.Wallettrsaction(storeId,page);
        console.log("Wallet Transaction", response.data.data);
        setData(response.data.data)
        setCount(response.data.count)
        // setWalletTransaction(response.data.data)
        
    } catch (error) {
        console.log(error)
    }
    }
    useEffect(() => {
        getWalletTransction()
    }
    , [])
    const handlePageChange = async (newPage) => {
        setPage(newPage);
    };


  return (
    <div className="p-6 mt-4 max-w-6xl mx-auto bg-white rounded">
     <CustomDataTable columns={columns} count={count} handlePageChange={handlePageChange} data={data} title={"Wallet Management"}/>
    </div>
  )
}

export default Wallet