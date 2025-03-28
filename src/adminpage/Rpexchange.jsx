import React, { useEffect, useState } from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import DataService from '../services/requestApi'
import { Edit } from 'lucide-react';
import RpEditModal from '../admincomponents/Modals/RpEditmodal';
const Rpexchange = () => {
    const {  saasId } = JSON.parse(localStorage.getItem("user_data"));
    const [data, setData] = useState([])
    const GetValue=async()=>{
        try {
            const response  = await DataService.GetRpBonusvalue(saasId)
            console.log(response)

            if(response.data.status){
                setData(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        GetValue()
    }, [])
    
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => row.type || 'N/A',
            sortable: true,
        },
        {
            name: 'RP',
            selector: row => row.rp,
            sortable: true,
        },
        {
            name: 'Value',
            selector: row => row.value,
            sortable: true,
        },
        {
            name: 'Unit Value',
            selector: row => row.unitValue,
            sortable: true,
        },
        {
            name: 'Saas ID',
            selector: row => row.saasId,
            sortable: true,
        },
        {
            name: 'Store ID',
            selector: row => row.storeId,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                
                    <Edit className='cursor-pointer'/>
            ),
        },
    ];


  return (
    <div>
        <CustomDataTable  columns={columns} data={data}/>
        <RpEditModal />
    </div>
  )
}

export default Rpexchange