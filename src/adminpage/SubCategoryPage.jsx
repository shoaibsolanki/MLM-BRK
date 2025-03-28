import React from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import { Edit } from 'lucide-react';

const SubCategoryPage = () => {
    const handleEdit = (id) => {
        // Handle edit action here
        console.log(`Edit category with id: ${id}`);
    };

    const columns = [
        { name: 'Category Name', selector: row => row.category_name, sortable: true },
        { name: 'Sub Category Name', selector: row => row.sub_category, sortable: true },
        { 
            name: 'Image', 
            selector: row => <img src={row.userId} alt="category" style={{ width: '50px', height: '50px' }} />, 
            sortable: true 
        },
        { name: 'Creation Date', selector: row => row.created_date, sortable: true },
        { 
            name: 'Action', 
            selector: row => (
                <Edit className='cursor-pointer'/>
            ), 
            sortable: true 
        },
    ];

    const data = [
        { id: 1, category_name: 'Electronics', sub_category:"Charger", userId: 'https://via.placeholder.com/50', created_date: '2023-01-01' },
        { id: 2, category_name: 'Books', sub_category:"Book", userId: 'https://via.placeholder.com/50', created_date: '2023-02-01' },
        { id: 3, category_name: 'Clothing', sub_category:"Shirt", userId: 'https://via.placeholder.com/50', created_date: '2023-03-01' },
        { id: 4, category_name: 'Home Appliances', sub_category:"Mixture Machine ", userId: 'https://via.placeholder.com/50', created_date: '2023-04-01' },
    ];
  return (
    <div>
          <CustomDataTable columns={columns} data={data} title="Mange Sub Category"/>
    </div>
  )
}

export default SubCategoryPage