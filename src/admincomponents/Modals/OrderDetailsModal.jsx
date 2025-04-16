import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import DataService from "../../services/requestApi";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { BASEURL } from "../../services/http-common";
import { useSnackbar } from "notistack";
const OrderDetailsModal = ({
  open,
  onClose,
  orderData,
  orderItems,
  customerAddress,
  GetOrders
}) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const { saasId, storeId} = JSON.parse(
    localStorage.getItem("user_data")
  );
  const [status, setStatus] = useState("")
  const {enqueueSnackbar} = useSnackbar()
  const [pdfUrl, setPdfUrl] = useState(null)
  useEffect(()=>{
   console.log(status)
  },[status])
  const transformedData = orderItems.map(item => ({
    order_id: item.order_id,
    order_date: item.order_date,
    item_id: item.item_id,
    colorList: null,
    item_name: item.item_name,
    conc_id: null,
    UOM: null,
    description: null,
    special_description: null,
    price: item.item_price,
    brand: null,
    sub_price: null,
    actual_price: null,
    price_pcs: null,
    product_qty: item.bill_qty,
    discount: 0,
    tax: 0,
    tax_percent: 0,
    status: "active",
    category: item.category,
    saas_id: item.saas_id,
    store_id: item.store_id,
    promo_id: null,
    image_name: null,
    hsn_code: null,
    tax_rate: 0,
    tax_code: 0,
    barcode: null,
    supplier_name: null,
    opening_qty: null,
    received_qty: null,
    sold_qty: null,
    closing_qty: null,
    product_cost: null,
    product_price: null,
    product_av_cost: null,
    mrp: null,
    dept: null,
    item_class: null,
    sub_class: null,
    item_code: null,
    salesManId: "",
    salesMan: "",
    newPrice: null,
    productQty: item.bill_qty,
    Discountper: 0
  }));

  const HandleSaveTransaction = async () => {
    if(status ===""){
      enqueueSnackbar('Please select the status',{variant:"info"})
        
        return
    }
    try {
      const data = {
        registerId: "REG1",
        storeId: storeId,
        saasId: saasId,
        tenderId: "TENDER1",
        customerName:orderData?.customer_name,
        customerNumber:orderData?.mobile_number,
        tender: {
          Cash:orderData?.order_value,
        },
        type: "Sale",
        cartItems: transformedData,
        orderId: orderData?.order_id,
        orderMobileNumber: "Danish"
      };
      const response = await DataService.OnlineTransaction(data);
      if(response.data.status){
        console.log(response.data.data)
        // setPdfUrl(response.data.data.pdf_file_name)
        handleStatusUpdate()
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  const handleChange = (e) => {
    setStatus(e.target.name); // Set the state to the selected checkbox's name
  };

  
    const handleStatusUpdate = async () => {
      if (!status) {
        enqueueSnackbar('Please select a status before updating' , {variant: "info"});
        
        return;
      }

      try {
        const res = await DataService.UpdateOrderByid(storeId, saasId, orderData?.order_id, status);
        if (res.data.status) {
          enqueueSnackbar('Order status updated successfully', {variant:"success"});
          
          setStatus("");
          GetOrders();
        } else {
          enqueueSnackbar('Failed to update order status',{variant:"error"});
          
        }
      } catch (error) {
        console.error('Error updating order status:', error);
        enqueueSnackbar('An error occurred while updating the order status', {variant:"error"});
        
      }
    };
  return (
    <>
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="order-details-modal"
      aria-describedby="order-details-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          maxWidth: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
       {!pdfUrl? <>
        <Typography variant="h4" component="h2" gutterBottom>
          Order Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Order Information
              </Typography>
              <Typography>Order ID: {orderData?.order_id}</Typography>
              <Typography>Order Date: {orderData?.order_date}</Typography>
              <Typography>Status: {orderData?.status}</Typography>
              <Typography>Payment Type: {orderData?.payment_type}</Typography>
              <Typography>Order Value: ₹{orderData?.order_value}</Typography>
              <Typography>
                Order Discount: ₹{orderData?.order_discount}
              </Typography>
              <Typography>Order Tax: ₹{orderData?.order_tax}</Typography>
              {/* <Typography>Net Amount: ₹{orderData?.net_amt || 'N/A'}</Typography> */}
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
              <Typography variant="h6" gutterBottom>
                Customer Information
              </Typography>
              <Typography>Name: {orderData?.customer_name}</Typography>
              <Typography>Mobile: {orderData?.mobile_number}</Typography>
              <Typography>Customer ID: {orderData?.customer_id}</Typography>
              <Typography>Store ID: {orderData?.store_id}</Typography>
              <Typography>SaaS ID: {orderData?.saas_id}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Typography variant="h6" gutterBottom>
            Order Items
          </Typography>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Weight</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orderItems &&
                  orderItems.map((item) => (
                    <TableRow key={item?.item_id}>
                      <TableCell>{item?.item_name}</TableCell>
                      <TableCell>{item?.category}</TableCell>
                      <TableCell align="right">{item?.bill_qty}</TableCell>
                      <TableCell align="right">₹{item?.item_price}</TableCell>
                      <TableCell align="right">{item?.gram}gm</TableCell>
                      <TableCell align="right">
                        ₹{(item?.bill_qty * item?.item_price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            Delivery Address
          </Typography>
          <Typography>{customerAddress?.address}</Typography>
          <Typography>Pincode: {customerAddress?.pincode}</Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: 2 ,mt:3}}>
          {/* <Typography variant="h6" gutterBottom>
          Delivered
          </Typography>
          <Typography variant="h6" gutterBottom>
          Delivered
          </Typography> */}
           <Box sx={{ display: "flex", flexDirection: "row" }}>
      <FormControlLabel
        checked={status === "Dispatched"}
        onChange={handleChange}
        control={<Checkbox name="Dispatched" />}
        label="Dispatched"
      />
      <FormControlLabel
        checked={status === "Cancel"}
        onChange={handleChange}
        control={<Checkbox name="Cancel" />}
        label="Cancel"
      />
    </Box>
        </Paper>
        <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
         {status === "Cancel"?
         <Button variant="contained" color="primary" onClick={handleStatusUpdate}>
         Cancel Order
       </Button>
         : <Button variant="contained" color="primary" onClick={HandleSaveTransaction}>
            Pick Pack
          </Button>}
        </Box>
        </>:
        <>
            
                {pdfUrl && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="h6" gutterBottom>
                            Order Invoice
                        </Typography>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                            <Viewer  fileUrl={`${BASEURL.ENDPOINT_URL}/transaction/pdf/${pdfUrl}`} 
                            plugins={[defaultLayoutPluginInstance]}
                            />
                            
                        </Worker>
                    </Box>
                    
                )}
                  <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="primary" onClick={()=>{onClose();
            setPdfUrl(null)
          }}>
            Close
          </Button>
          {/* <Button variant="contained" color="primary" onClick={HandleSaveTransaction}>
            Pick Pack
          </Button> */}
        </Box>
                </>}
        
      </Box>
    </Modal>
    
    </>
  );
};

export default OrderDetailsModal;
