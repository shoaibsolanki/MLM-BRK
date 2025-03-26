import React from 'react';
import { TextField, Button } from '@mui/material';

const DistributorCreate = () => {
  return (
    <div className="flex justify-center  bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6">Add Distributor</h2>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TextField
            label="Distributor Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Center Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="City"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Mobile"
            variant="outlined"
            fullWidth
          />
          <TextField
            label="Timings"
            variant="outlined"
            fullWidth
            className="md:col-span-3"
          />
          <div className="md:col-span-3 flex justify-end">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DistributorCreate;