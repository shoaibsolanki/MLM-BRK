import React from "react";
import CustomDataTable from "../admincomponents/Microcomponents/DataTable";
import { Edit } from "lucide-react";
import { Button } from "@mui/material";

const UserMange = () => {
  const columns = [
    { name: "S.NO", selector: (row) => row.sno, sortable: true },
    { name: "UserID", selector: (row) => row.userId, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Password", selector: (row) => row.password, sortable: true },
    { name: "Sponsor ID", selector: (row) => row.sponsorId, sortable: true },
    {
      name: "Activation Status",
      selector: (row) => row.activationStatus,
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
        return row.mobileVerification == "Verified" ? (
          <div className=" rounded text-white bg-green-600 p-3 ">
            {row.mobileVerification}
          </div>
        ) : (
          <div className="rounded text-white bg-red-600 p-3">
            {row.mobileVerification}
          </div>
        );
      },
      sortable: true,
    },
    { name: "Email ID", selector: (row) => row.emailId, sortable: true },
    {
      name: "Email Verification",
      selector: (row) => {
        return row.emailVerification == "Verified" ? (
          <div className=" rounded text-white bg-green-600 p-3 ">
            {row.emailVerification}
          </div>
        ) : (
          <div className="rounded text-white bg-red-600 p-3">
            {row.emailVerification}
          </div>
        );
      },
      sortable: true,
    },
    { name: "Gender", selector: (row) => row.gender, sortable: true },
    {
      name: "Creation Date",
      selector: (row) => row.creationDate,
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

  const data = [
    {
      sno: 1,
      userId: "U001",
      name: "John Doe",
      password: "password123",
      sponsorId: "S001",
      activationStatus: "Active",
      mobileNumber: "1234567890",
      mobileVerification: "Verified",
      emailId: "john.doe@example.com",
      emailVerification: "Verified",
      gender: "Male",
      creationDate: "2023-01-01",
    },
    // Add more data as needed
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
