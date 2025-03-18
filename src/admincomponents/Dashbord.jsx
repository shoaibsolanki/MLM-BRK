import React from "react";
import { Card, CardContent, Button } from "@mui/material";

const Dashboard = () => {
  const stats = [
    { value: "5601", label: "Total User" },
    { value: "5", label: "Total Orders" },
    { value: "26", label: "Total Product" },
    { value: "1", label: "Total Pending KYC" },
    { value: "1", label: "Total Approved KYC" },
    { value: "1", label: "Complaint" },
  ];

  return (
    <div className="p-6">
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
        {stats.map((stat, index) => (
          <Card key={index} className="flex flex-col items-center justify-center p-4">
            <CardContent className="text-center">
              <h2 className="text-3xl font-bold">{stat.value}</h2>
              <p className="text-gray-600">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
