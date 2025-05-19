import React from "react";
import { Card, CardContent, Button } from "@mui/material";
import CustomDataTable from "./Microcomponents/DataTable";
import DataService from '../services/requestApi'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
   const navigate = useNavigate()
  // const columns = [
  //   { name: 'S.NO', selector: row => row.sno, sortable: true },
  //   { name: 'UserID', selector: row => row.userId, sortable: true },
  //   { name: 'Name', selector: row => row.name, sortable: true },
  //   { name: 'Password', selector: row => row.password, sortable: true },
  //   { name: 'Sponsor ID', selector: row => row.sponsorId, sortable: true },
  //   { name: 'Activation Status', selector: row => row.activationStatus, sortable: true },
  //   { name: 'Mobile Number', selector: row => row.mobileNumber, sortable: true },
  //   { name: 'Mobile Verification', selector: row => row.mobileVerification, sortable: true },
  //   { name: 'Email ID', selector: row => row.emailId, sortable: true },
  //   { name: 'Email Verification', selector: row => row.emailVerification, sortable: true },
  //   { name: 'Gender', selector: row => row.gender, sortable: true },
  //   { name: 'Creation Date', selector: row => row.creationDate, sortable: true },
  // ];

  // const data = [
  //   { sno: 1, userId: 'U001', name: 'John Doe', password: 'password123', sponsorId: 'S001', activationStatus: 'Active', mobileNumber: '1234567890', mobileVerification: 'Verified', emailId: 'john@example.com', emailVerification: 'Verified', gender: 'Male', creationDate: '2023-01-01' },
  //   { sno: 2, userId: 'U002', name: 'Jane Smith', password: 'password456', sponsorId: 'S002', activationStatus: 'Inactive', mobileNumber: '0987654321', mobileVerification: 'Not Verified', emailId: 'jane@example.com', emailVerification: 'Not Verified', gender: 'Female', creationDate: '2023-02-01' },
  //   // Add more data as needed
  // ];

  const columnsNewOrders = [
    { name: 'Order Number', selector: row => row.orderNumber, sortable: true },
    { name: 'User Name', selector: row => row.userName, sortable: true },
    { name: 'Pickup Center', selector: row => row.pickupCenter, sortable: true },
    { name: 'Total Amount', selector: row => row.totalAmount, sortable: true },
    { name: 'Order Status', selector: row => row.orderStatus, sortable: true },
    { name: 'Order Date', selector: row => row.orderDate, sortable: true },
    { name: 'Action', selector: row => row.action, sortable: true },
  ];

  const dataNewOrders = [
    { orderNumber: 'O001', userName: 'John Doe', pickupCenter: 'Center 1', totalAmount: 'Rs.100', orderStatus: 'Pending', orderDate: '2023-03-01', action: 'View' },
    { orderNumber: 'O002', userName: 'Jane Smith', pickupCenter: 'Center 2', totalAmount: 'Rs.200', orderStatus: 'Completed', orderDate: '2023-03-02', action: 'View' },
    // Add more data as needed
  ];

    const [dashboardData, setDashboardData] = useState([]);
    const {  saasId } = JSON.parse(localStorage.getItem("user_data"));
    const fetchDashboardData = async () => {
      try {
        const response = await DataService.DashBoardDataGet(saasId);
        setDashboardData(response.data.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    useEffect(() => {
      fetchDashboardData();
    }, []);


  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Popup Button */}
          <Card className="flex flex-col items-center justify-center p-4">
            <CardContent className="flex flex-col items-center">
              <Button variant="contained" color="secondary" disabled>
                Disabled
              </Button>
              <p className="mt-2 text-gray-600">Popup</p>
            </CardContent>
          </Card>

          {/* Dynamic Statistics Cards */}
          {dashboardData.map((stat, index) => (
            <Card onClick={()=>{
              if(stat.label == 'Total User'){
                navigate('/admin/users')
              }else if(stat.label =='Total Product'){
                navigate('/admin/products/list')
              }else if(stat.label == 'Complaint'){
                navigate('/admin/Complaint')
              }
            }} key={index} className="flex flex-col items-center justify-center p-4 cursor-pointer">
              <CardContent className="text-center">
                <h2 className="text-3xl font-bold">{stat.value}</h2>
                <p className="text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Data Tables */}
        {/* <div className="w-full mt-4">
          <CustomDataTable columns={columns} data={data} title="User Data" />
        </div> */}
        <div className="w-full ">
          <CustomDataTable columns={columnsNewOrders} data={dataNewOrders} title="New Orders" />
        </div>

        {/* KYC Pending Screen */}
        <div className="p-4 mt-4 bg-white rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-4">KYC Pending</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white rounded-lg">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 border">User Name</th>
                  <th className="py-2 px-4 border">Bank Name</th>
                  <th className="py-2 px-4 border">Account Number</th>
                  <th className="py-2 px-4 border">Apply Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="text-center">
                  <td className="py-2 px-4 border">Abhishek</td>
                  <td className="py-2 px-4 border">State Bank of India</td>
                  <td className="py-2 px-4 border">123456789</td>
                  <td className="py-2 px-4 border">06-10-2023</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
