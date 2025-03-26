import React, { useEffect, useState } from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import DataService from '../services/requestApi'
const Combolist = () => {

    const [combodata , setCombolist] = useState([])
    const {saasId, storeId } = JSON.parse(localStorage.getItem("user_data"))
    const GetCombolist = async ()=>{
        try {
            const response = await DataService.GetCombolist(saasId, storeId)
            if (response?.data?.data && Array.isArray(response.data.data)) {
                setCombolist(response.data.data);
            } else {
                console.error("Unexpected response format:", response);
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
    GetCombolist()
    },[])

const columns = [
    {
        name: 'Combo ID',
        selector: row => row.comboId,
        sortable: true,
    },
    {
        name: 'Items',
        selector: (row) => row.item_data.map(item => item.item_name).join(', '),
        sortable: false,
    },
    {
        name: 'Price',
        selector: (row) => `${row.price}`,
        sortable: true,
    },
    {
        name: 'Image',
        selector: (row) =>  <img src={row.image} alt="Combo" style={{ width: '50px', height: '50px' }} />,
    },
];


  return (
    <div>
        <CustomDataTable  columns={columns} data={combodata} title={"Combo Management"} />
    </div>
  )
}

export default Combolist