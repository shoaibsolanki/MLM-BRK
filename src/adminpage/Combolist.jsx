import React, { useEffect, useState } from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import DataService from '../services/requestApi'
import { Delete, Edit, Trash, Variable } from 'lucide-react'
import { useSnackbar } from 'notistack'
import EditComboModal from '../admincomponents/Modals/EditCombo'
const Combolist = () => {
       const { enqueueSnackbar } = useSnackbar();
    const [combodata , setCombolist] = useState([])
    const {saasId, storeId } = JSON.parse(localStorage.getItem("user_data"))
    const [open, setOpen] = useState(false)
    const [selectedData, setSelectedData] = useState('')
    

    const handleClose =()=>{
        setOpen(false)
    }

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
   
    const DeleteCombo = async (id)=>{
        try {
            const response = await DataService.DeleteCombo(id)
            if(response.data.status){
                enqueueSnackbar("Combo Deleted Successfully", { variant: "success"})
                GetCombolist()
            }
        } catch (error) {
            console.log(error)
        }
    }

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
    {
        name: 'Actions',
        cell: (row) => (
            <div style={{ display: 'flex', gap: '10px' }}>
                <Edit className='cursor-pointer' onClick={()=>{setOpen(true)
                    setSelectedData(row)
                }}/>
                <Trash className='cursor-pointer' onClick={()=>{DeleteCombo(row.comboId)}}/>
            </div>
        ),
    },
];


  return (
    <div>
        <CustomDataTable  columns={columns} data={combodata} title={"Combo Management"} />
        <EditComboModal GetCombolist={GetCombolist} open={open} handleClose={handleClose} comboData={selectedData} />
    </div>
  )
}

export default Combolist