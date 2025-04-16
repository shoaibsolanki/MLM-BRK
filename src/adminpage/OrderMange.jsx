import React from 'react';
import CustomDataTable from '../admincomponents/Microcomponents/DataTable';
import { File } from 'lucide-react';
import DataService from '../services/requestApi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import OrderDetailsModal from '../admincomponents/Modals/OrderDetailsModal';

const OrderMange = () => {
    const [page, setPage] = useState(1);
    const [size, setSize] = useState(10);
    const [data, setData] = useState([]);
    const [count , setCount] = useState("")
    const [open, setOpen] = useState(false)
  const [orderData , setOrderData]= useState({})
  const [orderItem, setOrderItem] = useState([])
  const [Address, setAddress] = useState({})
  const [isLoading, setIsLoading]= useState(false)
    const {  saasId ,storeId} = JSON.parse(localStorage.getItem("user_data"));
    const navigate = useNavigate()
    useEffect(() => {
        fetchOrdersByPage()
    }, [page, size]);

    const getOrderDetail =async (orderId)=>{
        setIsLoading(true)
        try {
          const res = await DataService.GetOrderDetail(saasId, storeId, orderId)
          if(res.data.status){
            setOrderData(res.data.data)
            const address = await DataService.GetAddress(saasId, storeId, res.data.data.address_id)
            if(address.data.status){
              setAddress(address.data.data)
            }
            const orderItem = await DataService.GetOrderItemData(saasId, storeId, orderId)
            if(orderItem.data.status){
              setOrderItem(orderItem.data.data || [])
            }
            if(res.data.status && address.data.status && orderItem.data.status){
              setIsLoading(false)
              setOpen(true)
            }
          }
        } catch (error) {
          setIsLoading(false)
          console.log(error)
        }finally{
          setIsLoading(false)
        }
      }


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
            selector: row => (<>
            <div>{row.status}</div>
            {row.status =='PENDING' && <Button variant='contained' onClick={()=>getOrderDetail(row.order_id)} >
                Change
                </Button>}
            </>),
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <div className="flex gap-2">
                    <File className='cursor-pointer' onClick={()=>row.status =='Dispatched'? navigate(`/admin/InvoiceView/${row?.order_id}`): navigate(`/admin/vieworder/${row?.order_id}`)}/>
                </div>
            ),
        },
    ];

 
    

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
            <OrderDetailsModal GetOrders={fetchOrdersByPage} open={open} onClose={()=>setOpen(false)} orderData={orderData} orderItems={orderItem} customerAddress={Address}/>
        </div>
    );
};

export default OrderMange;