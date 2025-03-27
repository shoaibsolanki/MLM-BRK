import React from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import { Edit, Trash } from 'lucide-react';

const Rpbonusemange = () => {
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
            name: 'Status',
            selector: row => row.status,
            sortable: true,
        },
        {
            name: 'SaaS ID',
            selector: row => row.saasId,
            sortable: true,
        },
        {
            name: 'Actions',
            cell: row => (
                <div className='flex'>
                    <Edit className='cursor-pointer' />
                    <Trash className='cursor-pointer'/>
                </div>
            ),
        },
    ];

    const data = [
        {
            id: 2,
            createdAt: '2025-03-25',
            start_rp: 1,
            end_rp: 100,
            type: 'Early Buy Benefit',
            bonus: 5,
            status: 'Active',
            saasId: '22',
        },
    ];

    const handleEdit = row => {
        console.log('Edit action for:', row);
    };

    const handleDelete = row => {
        console.log('Delete action for:', row);
    };
  return (
    <div>
        <CustomDataTable columns={columns} data={data} title={"Rp Management"}/>
    </div>
  )
}

export default Rpbonusemange