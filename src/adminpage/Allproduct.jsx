import React from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import { Edit } from 'lucide-react';
import DataService from '../services/requestApi'
import { useEffect, useState } from 'react';
const Allproduct = () => {
    const {saasId , storeId} = JSON.parse(localStorage.getItem("user_data"))
    const [page, setPage] = useState(1)
    const [count , setCount] = useState(0)
     const columns = [
        { name: 'Item ID', selector: row => row.item_id, sortable: true },
        { name: 'Item Name', selector: row => row.item_name, sortable: true },
        { name: 'UOM', selector: row => row.UOM, sortable: true },
        { name: 'Stock', selector: row => row.stock, sortable: true },
        { name: 'Description', selector: row => row.description, sortable: true },
        { name: 'Price', selector: row => row.price, sortable: true },
        { name: 'Actual Price', selector: row => row.actual_price, sortable: true },
        { name: 'Discount', selector: row => row.discount, sortable: true },
        { name: 'Tax', selector: row => row.tax, sortable: true },
        { name: 'Category', selector: row => row.category, sortable: true },
        { 
            name: 'Action', 
            cell: row => <Edit />, 
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        { name: 'HSN Code', selector: row => row.hsn_code, sortable: true },
        { name: 'Barcode', selector: row => row.barcode, sortable: true },
        { name: 'Status', selector: row => row.status, sortable: true },
    ];

    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await DataService.GetItemByPage(saasId,storeId,page);
            if (response && response.data) {
                setData(response.data.data || []);
                setCount(response.data.count|| 0)
            } else {
                console.warn("No data received from the API.");
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        }
    };

    useEffect(() => {

        fetchData();
    }, [page]);

    const handlePageChange = async (newPage) => {
        setPage(newPage);
    };


  return (
    <div>
        <CustomDataTable count={count} handlePageChange={handlePageChange} columns={columns} data={data} title="All Product"/>
    </div>
  )
}

export default Allproduct