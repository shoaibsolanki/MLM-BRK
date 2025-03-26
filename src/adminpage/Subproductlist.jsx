import React from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import { Edit } from 'lucide-react';

const Subproductlist = () => {
    const handleEdit = (id) => {
        console.log(`Edit item with id: ${id}`);
        // Add your edit logic here
    };

    const columns = [
        { name: 'Combo Name', selector: row => row.comboName, sortable: true },
        { name: 'Product Name', selector: row => row.productName, sortable: true },
        { name: 'DP Price', selector: row => row.dpPrice, sortable: true },
        { name: 'GST', selector: row => row.gst, sortable: true },
        { name: 'HSN Code', selector: row => row.hsnCode, sortable: true },
        { 
            name: 'Action', 
            selector: row => (
                <Edit />
            ), 
            sortable: false 
        }
    ];

    const data = [
        { id: 1, comboName: 'Combo 1', productName: 'Product 1', dpPrice: 100, gst: 18, hsnCode: '1234', action: 'Edit' },
        { id: 2, comboName: 'Combo 2', productName: 'Product 2', dpPrice: 200, gst: 18, hsnCode: '5678', action: 'Edit' },
        // Add more data as needed
    ];
  return (
    <div>
        <CustomDataTable columns={columns} data={data} title="Sub Products"/>
    </div>
  )
}

export default Subproductlist