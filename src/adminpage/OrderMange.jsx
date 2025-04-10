import React from 'react';
import CustomDataTable from '../admincomponents/Microcomponents/DataTable';
import { File } from 'lucide-react';
import DataService from '../services/requestApi';
import { useState, useEffect } from 'react';

const OrderMange = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [data, setData] = useState([]);
    const [count , setCount] = useState("")
    const {  saasId } = JSON.parse(localStorage.getItem("user_data"));
    useEffect(() => {
        fetchOrdersByPage()
    }, [page, size]);
    const columns = [
        {
            name: 'Order ID',
            selector: row => row.order_id,
            sortable: true,
        },
        {
            name: 'Customer Name',
            selector: row => row.customer_name,
            sortable: true,
        },
        {
            name: 'Mobile Number',
            selector: row => row.mobile_number,
            sortable: true,
        },
        {
            name: 'Order Date',
            selector: row => row.order_date,
            sortable: true,
        },
        {
            name: 'Order Quantity',
            selector: row => row.order_qty,
            sortable: true,
        },
        {
            name: 'Order Value',
            selector: row => row.order_value,
            sortable: true,
        },
        {
            name: 'Payment Type',
            selector: row => row.payment_type,
            sortable: true,
        },
        {
            name: 'Status',
            selector: row => row.status,
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

    // const data = [
    //     {
    //         orderNumber: '001',
    //         userName: 'John Doe',
    //         paymentMode: 'Credit Card',
    //         totalAmount: '$100.00',
    //         orderStatus: 'Shipped',
    //         orderDate: '2023-10-01',
    //     },
    //     {
    //         orderNumber: '002',
    //         userName: 'Jane Smith',
    //         paymentMode: 'PayPal',
    //         totalAmount: '$150.00',
    //         orderStatus: 'Processing',
    //         orderDate: '2023-10-02',
    //     },
    //     {
    //         orderNumber: '003',
    //         userName: 'Alice Johnson',
    //         paymentMode: 'Debit Card',
    //         totalAmount: '$200.00',
    //         orderStatus: 'Delivered',
    //         orderDate: '2023-10-03',
    //     },
    //     {
    //         orderNumber: '004',
    //         userName: 'Bob Brown',
    //         paymentMode: 'Credit Card',
    //         totalAmount: '$250.00',
    //         orderStatus: 'Cancelled',
    //         orderDate: '2023-10-04',
    //     },
    // ];

    const handlePrint = (row) => {
        // Implement your print functionality here
        console.log('Print', row);
    };

    const fetchOrdersByPage = async () => {
        try {
            const response = await DataService.GetAllOrderBypage(saasId,page, size);
            console.log('Fetched Orders:', response.data);
            setData(response.data.data)
            setCount(response.data.count)
            // You can update the state with the fetched data if needed
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };
   
    const handleRowsPerPageChange = (newSize) => {
        setSize(newSize);
    };

    return (
        <div>
            <CustomDataTable
                count= {count}
                handlePageChange={handlePageChange}
                handleRowsPerPageChange={handleRowsPerPageChange}
                title={"Order Management"}
                columns={columns}
                data={data}
            />
        </div>
    );
};

export default OrderMange;