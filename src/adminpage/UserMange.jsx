import React, { useEffect, useState } from "react";
import CustomDataTable from "../admincomponents/Microcomponents/DataTable";
import { Edit } from "lucide-react";
import { Button } from "@mui/material";
import DataService from '../services/requestApi'
const UserMange = () => {
  
  const {  saasId } = JSON.parse(localStorage.getItem("user_data"));
  const [data, setData] = useState([])

  const GetUsers =async ()=>{
    try {
     const response = await  DataService.GetAllCustomer(saasId)
     if(response.data.status){
     setData(response.data.data)
     }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    GetUsers()
  }, [])
  


  const columns = [
    { name: "S.NO", selector: (row, index) => index + 1, sortable: true },
    { name: "UserID", selector: (row) => row.customerId, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Password", selector: (row) => row.password, sortable: true },
    { name: "Sponsor ID", selector: (row) => row.refferBy, sortable: true },
    {
      name: "Activation Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Mobile Number",
      selector: (row) => row.mobileNumber,
      sortable: true,
    },
    {
      name: "Mobile Verification",
      selector: (row) => {
        return row.mobileVerification ? (
          <div className=" rounded text-white bg-green-600 p-3 ">
           Verified
          </div>
        ) : (
          <div className="rounded text-white bg-red-600 p-3">
            Unverified
          </div>
        );
      },
      sortable: true,
    },
    { name: "Email ID", selector: (row) => row.email, sortable: true },
    {
      name: "Email Verification",
      selector: (row) => {
        return row.emailVerification ? (
          <div className=" rounded text-white bg-green-600 p-3 ">
            Verified 
          </div>
        ) : (
          <div className="rounded text-white bg-red-600 p-3">
           Unverified 
          </div>
        );
      },
      sortable: true,
    },
    { name: "Gender", selector: (row) => row.gender, sortable: true },
    {
      name: "Creation Date",
      selector: (row) => row.createdAt,
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => <Edit />,
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
    {
        name: "Change Sponsor",
        cell: (row)=>{return(
            <Button variant="contained" color="secondary" size="small" o nClick={() => handleEdit(row)}>
            Change Sponsor
        </Button>
        )},
        ignoreRowClick: true,
        allowOverflow: true,
        button : true
    }
  ];

  
  const handleEdit = (row) => {
    // Handle edit action
    console.log("Edit row:", row);
  };

  return (
    <div>
      <CustomDataTable
        title={"User Management"}
        columns={columns}
        data={data}
      />
    </div>
  );
};

export default UserMange;
