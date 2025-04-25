import React, { useEffect, useState } from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import { Edit, Trash } from 'lucide-react';
import DataService from "../services/requestApi";
import EditMasterCategory from '../admincomponents/Modals/EditMasterCategory';
import AddMasterCategoryModal from '../admincomponents/Modals/AddMasterCategorymoad';
import { useSnackbar } from 'notistack';
const Category = () => {
     const [open,setOpen] = useState(false)
    const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
    const [masterCategory, setMasterCategory] = useState([]);
    const [selectedCat, setSelectedCategory]= useState("")
     const { enqueueSnackbar } = useSnackbar();
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

      const DeleteCategory = async (id)=>{
        try {
          const response = await DataService.DeleteCategory(id)
          if(response.data.status){
            enqueueSnackbar('Master Category Deleted Successfully', {variant:"success"})
            getMatserCategory()
          }
        } catch (error) {
          console.log(error)
        }
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
              <div className='flex '>
                <Edit className='cursor-pointer' onClick={() => handleEdit(row)} />
                <Trash className='cursor-pointer' onClick={()=> DeleteCategory(row.masterCategoryId)}/>
              </div>
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
            <EditMasterCategory getMatserCategory={getMatserCategory} category={selectedCat} open={open} handleClose={() => setOpen(false)} />
    </div>
)
}

export default Category 