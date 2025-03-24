import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Button } from '@mui/material';
import { styled } from "@mui/system";
import { color } from 'framer-motion';
import DataService from '../services/requestApi'
const AddProduct = () => {
    const StyledButton = styled(Button)({
        marginTop: "20px",
        padding: "12px",
        fontSize: "16px",
        fontWeight: "bold",
        borderRadius: "8px",
        backgroundColor: "#383a3a", // Gray Button
        color: "#fff", // White Text for Contrast
        transition: "0.3s",
        "&:hover": {
          backgroundColor: "#e6b800", // Slightly Darker Gold on Hover
          color: "#1e1e1e", // Black Text for Contrast
        },
      });
      const {storeId,saasId} = JSON.parse(localStorage.getItem('user_data'))
      const [masterCategory, setMasterCategory] = useState([])
      const getMatserCategory = async () =>{
        try {
          const response = await DataService.GetMasterCategory(saasId,storeId)
          setMasterCategory(response.data.data)
        } catch (error) {
          console.log(error)
        }
      }

      useEffect(() => {
        getMatserCategory()
      }, [])
      

  return (
    <div className="p-6 bg-white rounded">
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="form-group">
          <TextField
            label="Category"
            select
            fullWidth
            variant="outlined"
          >
            <MenuItem value="">
              <em>Select Category</em>
            </MenuItem>
            {/* Add more options here */}
          </TextField>
        </div>
        <div className="form-group">
          <TextField
            label="Sub Category"
            select
            fullWidth
            variant="outlined"
          >
            <MenuItem value="">
              <em>Select Category</em>
            </MenuItem>
            {/* Add more options here */}
          </TextField>
        </div>
        <div className="form-group">
          <TextField
            label="Product Name"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            label="Product ID"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            label="HSN Code"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            label="Stock"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            label="GST"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            label="Combo"
            select
            fullWidth
            variant="outlined"
          >
            <MenuItem value="">
              <em>Select Type</em>
            </MenuItem>
            {/* Add more options here */}
          </TextField>
        </div>
        <div className="form-group">
          <TextField
            label="MRP"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            label="Description"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            label="Reward Point"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            label="Weight"
            fullWidth
            variant="outlined"
          />
        </div>
       
        <div className="form-group">
          <label className="block mb-2">Thumbnail Image</label>
          <input type="file" className="block w-full text-sm text-gray-500  border-2 p-1 rounded" />
          <small className="text-gray-500">270px X 200px (jpg, jpeg, png, gif, svg)</small>
        </div>
        {Array.from({ length: 7 }, (_, i) => (
          <div className="form-group" key={i}>
            <label className="block mb-2">Product Image {i + 1}</label>
            <input type="file" className="block w-full text-sm text-gray-500 border-2 p-1 rounded" />
            <small className="text-gray-500">300px X 300px (jpg, jpeg, png, gif, svg)</small>
          </div>
        ))}
         <div className="form-group">
         <label className="block mb-2">Product Video</label>
          <TextField
            label="Video URL"
            fullWidth
            variant="outlined"
          />
        </div>
        
         
        <div className="form-group col-span-full">
          <StyledButton variant="contained" color="primary" fullWidth>
            Submit
          </StyledButton>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;