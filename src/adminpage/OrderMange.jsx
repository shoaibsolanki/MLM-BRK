import React from 'react';
import CustomDataTable from '../admincomponents/Microcomponents/DataTable';
import { File } from 'lucide-react';

const OrderMange = () => {
    const columns = [
        {
            name: 'Order Number',
            selector: row => row.orderNumber,
            sortable: true,
        },
        {
            name: 'User Name',
            selector: row => row.userName,
            sortable: true,
        },
        {
            name: 'Payment Mode',
            selector: row => row.paymentMode,
            sortable: true,
        },
        {
            name: 'Total Amount',
            selector: row => row.totalAmount,
            sortable: true,
        },
        {
            name: 'Order Status',
            selector: row => row.orderStatus,
            sortable: true,
        },
        {
            name: 'Order Date',
            selector: row => row.orderDate,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <button onClick={() => handlePrint(row)}>
                    <File />
                </button>
            ),
        },
    ];

    const data = [
        {
            orderNumber: '001',
            userName: 'John Doe',
            paymentMode: 'Credit Card',
            totalAmount: '$100.00',
            orderStatus: 'Shipped',
            orderDate: '2023-10-01',
        },
        {
            orderNumber: '002',
            userName: 'Jane Smith',
            paymentMode: 'PayPal',
            totalAmount: '$150.00',
            orderStatus: 'Processing',
            orderDate: '2023-10-02',
        },
        {
            orderNumber: '003',
            userName: 'Alice Johnson',
            paymentMode: 'Debit Card',
            totalAmount: '$200.00',
            orderStatus: 'Delivered',
            orderDate: '2023-10-03',
        },
        {
            orderNumber: '004',
            userName: 'Bob Brown',
            paymentMode: 'Credit Card',
            totalAmount: '$250.00',
            orderStatus: 'Cancelled',
            orderDate: '2023-10-04',
        },
    ];

    const handlePrint = (row) => {
        // Implement your print functionality here
        console.log('Print', row);
    };

    return (
        <div>
            <CustomDataTable
                title={"Order Management"}
                columns={columns}
                data={data}
            />
        </div>
    );
};

export default OrderMange;