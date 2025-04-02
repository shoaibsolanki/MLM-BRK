import React, { useEffect, useState } from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import { Edit } from 'lucide-react';
import DataService from '../services/requestApi'
import SubCategoryModal from '../admincomponents/Modals/SubCategorymodal';
import { Button } from '@mui/material';
import AddSubCatModal from '../admincomponents/Modals/AddSubCatModal';
const SubCategoryPage = () => {
    
    const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
    const [data, setData] = useState([])
    const [selectedSubCat, setSelectedsubcat] = useState('')
    const [open, setOpen] = useState(false)
    const [addmodal, setAddmodal] =useState(false)

    const fetchSubCategories = async () => {
        try {
            const response = await DataService.GetSubCategory(saasId, storeId)
            setData(response.data.data)
            console.log(response); // Handle the fetched data as needed
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };
   
    useEffect(() => {
      fetchSubCategories()
    }, [])

    const handleEdit = (row) => {
        // Handle edit action here
        setSelectedsubcat(row)
        setOpen(true)
       
    };

    const columns = [
        { name: 'Category Name', selector: row => row.category_name || 'N/A', sortable: true },
        { 
            name: 'Image', 
            selector: row => (
                <img 
                    src={row.image_path} 
                    alt="category" 
                    style={{ width: '50px', height: '50px' }} 
                />
            ), 
            sortable: true 
        },
        { 
            name: 'Action', 
            selector: row => (
                <Edit className='cursor-pointer' onClick={()=>handleEdit(row)}/>
            ), 
            sortable: true 
        },
    ];

    
  return (
    <div>
        <div className='flex justify-between items-center bg-white rounded p-2'>
                        <h1>Mange Master Category</h1>
                        <Button
                           variant='contained'
                           color='primary'
                            onClick={()=>setAddmodal(true)}
                        >
                            Add Sub Category
                        </Button>
                    </div>
          <CustomDataTable columns={columns} data={data} title="Mange Sub Category"/>
          <SubCategoryModal open={open} handleClose={()=>setOpen(false)} defaultValues={selectedSubCat} getsubcategory={fetchSubCategories}/>
            <AddSubCatModal  open={addmodal} handleClose={()=> setAddmodal(false)}  getsubcategory={fetchSubCategories}/>
    </div>
  )
}

export default SubCategoryPage