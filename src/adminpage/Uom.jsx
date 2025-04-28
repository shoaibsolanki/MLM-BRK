import React, { useEffect, useState } from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import { Button } from '@mui/material';
import DataService from '../services/requestApi'
import AddUomModal from '../admincomponents/Modals/AddUomModal';
import EditModal from '../admincomponents/Modals/EditModal';
import { useSnackbar } from 'notistack';
import { Edit, Trash } from 'lucide-react';
const Uom = () => {

    
  const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
    const [data, setData] = useState([])
    const [open, setopen] = useState(false)
    const [editopen, setEditOpen] = useState(false)
    const [id, setId] = useState('')
     const {enqueueSnackbar} = useSnackbar()
    const handleDelete = async (id) => {
        try {
            const response = await DataService.DeleteUom(id);
            if (response.data.status) {
                GetUomdata();
                enqueueSnackbar("UOM deleted successfully",{variant:"success"});
            } else {
                enqueueSnackbar("Failed to delete UOM",{variant:"error"});
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar("An error occurred while deleting UOM",{variant:"error"});
        }
    };
    
     const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'SaaS ID',
            selector: row => row.saasId,
            sortable: true,
        },
        {
            name: 'Store ID',
            selector: row => row.storeId,
            sortable: true,
        },
        {
            name: 'UOM Name',
            selector: row => row.uomname,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <div className='flex'>
                    <Trash className='cursor-pointer' onClick={()=>handleDelete(row.id)} />
                    <Edit className='cursor-pointer' onClick={()=>{setEditOpen(true)
                        setId(row.id)
                    }}  style={{ marginRight: '5px' }}/>
                        
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const GetUomdata = async ()=>{
        try {
            const response = await DataService.GetUom(saasId, storeId)
            if(response.data.status){
                setData(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
  
    useEffect(() => {
      GetUomdata()
    }, [])
    

  
  return (
    <div>
        <div className='flex justify-between items-center bg-white rounded p-2'>
                        <h1>Mange UOM</h1>
                        <Button onClick={()=>setopen(true)} variant='contained' >
                            Add UOM
                        </Button>
                    </div>
        <CustomDataTable columns={columns} data={data}/>
        <AddUomModal open={open} handleClose={()=>setopen(false)} GetUomdata={GetUomdata}  />
            <EditModal open={editopen} handleClose={()=>setEditOpen(false)} id={id} GetUomdata={GetUomdata}  />
    </div>
  )
}

export default Uom