import React from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import { Edit } from 'lucide-react';

const Distibutorlist = () => {
    const columns = [
        { name: 'Distributor Name', selector: row => row.distributorName, sortable: true },
        { name: 'Password', selector: row => row.password, sortable: true },
        { name: 'Center Name', selector: row => row.centerName, sortable: true },
        { name: 'Address', selector: row => row.address, sortable: true },
        { name: 'City', selector: row => row.city, sortable: true },
        { name: 'Mobile', selector: row => row.mobile, sortable: true },
        { name: 'Timings', selector: row => row.timings, sortable: true },
        { 
            name: 'Action', 
            selector: row => <Edit />, 
            sortable: false 
        }
    ];

    const data = [
        {
            id: 1,
            distributorName: 'John Doe',
            password: 'password123',
            centerName: 'Center 1',
            address: '123 Main St',
            city: 'New York',
            mobile: '123-456-7890',
            timings: '9 AM - 5 PM',
            action: 'Edit/Delete'
        },
        {
            id: 2,
            distributorName: 'Jane Smith',
            password: 'password456',
            centerName: 'Center 2',
            address: '456 Elm St',
            city: 'Los Angeles',
            mobile: '987-654-3210',
            timings: '10 AM - 6 PM',
            action: 'Edit/Delete'
        }
    ];
  return (
    <div>
        <CustomDataTable columns={columns} data={data} title="Distributor List"/>
    </div>
  )
}

export default Distibutorlist