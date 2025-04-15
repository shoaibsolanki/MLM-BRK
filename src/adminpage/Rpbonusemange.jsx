import React, { useEffect, useState } from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import { Edit, Trash } from 'lucide-react';
import DataService from '../services/requestApi'
import { Button } from '@mui/material';
import AddRpBonusModal from '../admincomponents/Modals/AddRpbonusmodal';
import { useSnackbar } from 'notistack';
import EditRpBonusModal from '../admincomponents/Modals/EditRpbonusmodal';
const Rpbonusemange = () => {
    const { enqueueSnackbar } = useSnackbar()
    const [RpData, setRpData] = useState([])
    const [open , setOpen] = useState(false)
    const [edimodal, setEditmodal] = useState(false)
    const [selectedrow, setSelectedRow] = useState('')
    const handleClose =()=>{
        setOpen(false)
    }
    const {  saasId } = JSON.parse(localStorage.getItem("user_data"));
    const GetRpData = async ()=>{
        try {
            const response  = await DataService.GetRpData(saasId)
            if (response.data.status){
                setRpData(response.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
   
    useEffect(() => {
      GetRpData()
    }, [])


    const handleDelete = async(id) => {
        try {
            const response = await DataService.DeleteRp(id)
            if(response.data.status){
                enqueueSnackbar("Deleted Successfully", {variant:"success"})
                GetRpData()
            }
        } catch (error) {
            console.log(error)
        }
        
    };
    const columns = [
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
        {
            name: 'Created At',
            selector: row => row.createdAt,
            sortable: true,
        },
        {
            name: 'Start RP',
            selector: row => row.start_rp,
            sortable: true,
        },
        {
            name: 'End RP',
            selector: row => row.end_rp,
            sortable: true,
        },
        {
            name: 'Type',
            selector: row => row.type,
            sortable: true,
        },
        {
            name: 'Bonus',
            selector: row => row.bonus,
            sortable: true,
        },
        {
            name: 'Designation',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div className='flex'>
                    <Edit className='cursor-pointer' onClick={()=>{setEditmodal(true)
                        setSelectedRow(row)
                    }}/>
                    <Trash className='cursor-pointer' onClick={()=>handleDelete(row.id)}/>
                </div>
            ),
        },
    ];

   
    
  return (
    <div>
        <div className='flex justify-between items-center bg-white rounded p-2'>
                        <h1>Mange Rp Bonus</h1>
                        <Button 
                            variant='contained'
                            color='primary'
                            // className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            onClick={() => setOpen(true)}
                        >
                            Add RP Bonus
                        </Button>
                    </div>
        <CustomDataTable columns={columns} data={RpData} title={"Rp Management"}/>
        <AddRpBonusModal GetRpData={GetRpData} open={open} handleClose={handleClose}/>
        <EditRpBonusModal GetRpData={GetRpData} selectedrow={selectedrow} open={edimodal} handleClose={()=>setEditmodal(false)} />
    </div>
  )
}

export default Rpbonusemange