import React, { useEffect, useState } from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import { Edit } from 'lucide-react';
import DataService from "../services/requestApi";
import EditMasterCategory from '../admincomponents/Modals/EditMasterCategory';
import { Button } from '@mui/material';
import AddMasterCategoryModal from '../admincomponents/Modals/AddMasterCategorymoad';
const Category = () => {
     const [open,setOpen] = useState(false)
    const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
    const [masterCategory, setMasterCategory] = useState([]);
    const [selectedCat, setSelectedCategory]= useState("")
    const getMatserCategory = async () => {
        try {
          const response = await DataService.GetMasterCategory(saasId, storeId);
          setMasterCategory(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getMatserCategory();
      }, []);
      
      const handleEdit = (row)=>{
        setSelectedCategory(row)
        setOpen(true)
      }
     
    const columns = [
        { name: 'Category Name', selector: row => row.masterCategoryName, sortable: true },
        { 
            name: 'Image', 
            selector: row => row.masterCategoryImage 
                ? <img src={row.masterCategoryImage} alt="category" style={{ width: '50px', height: '50px' }} /> 
                : 'No Image', 
            sortable: true 
        },
        { name: 'SaaS ID', selector: row => row.saasId, sortable: true },
        { name: 'Store ID', selector: row => row.store_id, sortable: true },
        { 
            name: 'Action', 
            selector: row => (
                <Edit className='cursor-pointer' onClick={() => handleEdit(row)} />
            ), 
            sortable: false 
        },
    ];

    
return (
    <div>
            <div className='flex justify-between items-center bg-white rounded p-2'>
                <h1>Mange Master Category</h1>
                <AddMasterCategoryModal getMatserCategory={getMatserCategory}/>
            </div>
            <CustomDataTable columns={columns} data={masterCategory} title="View Category" />
            <EditMasterCategory category={selectedCat} open={open} handleClose={() => setOpen(false)} />
    </div>
)
}

export default Category 