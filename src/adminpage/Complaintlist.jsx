import React from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'

const Complaintlist = () => {
    const columns = [
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Mobile', selector: row => row.mobile, sortable: true },
        { name: 'Email', selector: row => row.email, sortable: true },
        { name: 'Subject', selector: row => row.subject, sortable: true },
        { name: 'Complaint', selector: row => row.complaint, sortable: true },
        { name: 'Date', selector: row => row.date, sortable: true },
    ];

    const data = [
        { id: 1, name: 'John Doe', mobile: '1234567890', email: 'john@example.com', subject: 'Issue 1', complaint: 'Complaint details 1', date: '2023-01-01' },
        { id: 2, name: 'Jane Smith', mobile: '0987654321', email: 'jane@example.com', subject: 'Issue 2', complaint: 'Complaint details 2', date: '2023-01-02' },
        // Add more data as needed
    ];
  return (
    <div>
        <CustomDataTable columns={columns} data={data} title={"Complaint Management"}/>
    </div>
  )
}

export default Complaintlist