import React from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import { Edit } from 'lucide-react';

const Allproduct = () => {
    const columns = [
        { name: 'Category', selector: row => row.category, sortable: true },
        { name: 'Sub Category', selector: row => row.subCategory, sortable: true },
        { name: 'Product Name', selector: row => row.productName, sortable: true },
        { name: 'Combo', selector: row => row.combo, sortable: true },
        { name: 'MRP', selector: row => row.mrp, sortable: true },
        { name: 'Discount/Flat', selector: row => row.discount, sortable: true },
        { name: 'DP Price', selector: row => row.dpPrice, sortable: true },
        { name: 'Reward Point', selector: row => row.rewardPoint, sortable: true },
        { name: 'BV', selector: row => row.bv, sortable: true },
        { 
            name: 'Action', 
            cell: row => <Edit  />, 
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
        { name: 'GST', selector: row => row.gst, sortable: true },
        { name: 'Product ID', selector: row => row.productId, sortable: true },
        { name: 'HSN Code', selector: row => row.hsnCode, sortable: true },
        { name: 'Stock', selector: row => row.stock, sortable: true },
    ];

    const data = [
        {
            category: 'Electronics',
            subCategory: 'Mobile',
            productName: 'iPhone 12',
            combo: 'No',
            mrp: 799,
            discount: '10%',
            dpPrice: 719,
            rewardPoint: 50,
            bv: 100,
            action: 'Buy',
            gst: '18%',
            productId: 'P12345',
            hsnCode: '8517',
            stock: 20,
        },
        // Add more data objects as needed
    ];
  return (
    <div>
        <CustomDataTable columns={columns} data={data} title="All Product"/>
    </div>
  )
}

export default Allproduct