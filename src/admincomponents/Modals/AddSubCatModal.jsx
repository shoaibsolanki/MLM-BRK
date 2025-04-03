import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Box, TextField, Button, MenuItem } from '@mui/material';
import DataService from '../../services/requestApi'
import { useSnackbar } from 'notistack';
const AddSubCatModal = ({ open, handleClose ,getsubcategory}) => {
    const { register, handleSubmit, setValue , formState: { errors } } = useForm();
    const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
    const {enqueueSnackbar} = useSnackbar()
    const [masterCategory, setMasterCategory] = useState([]);
    const [file, setFile] = useState(null)
    const onFormSubmit = async(data) => {
       
        try {
            const response = await DataService.AddSubCategory(data)
            if(response.data.status){
                if(file){
                  await  fetchSubCategoryById(response.data.data.category_id)
                }
                enqueueSnackbar('SubCategory Created Successfully' , {variant:"success"})
                handleClose();
                getsubcategory()
            }
        } catch (error) {
            console.log(error)
        }
    };
    
    const getMatserCategory = async () => {
        try {
          const response = await DataService.GetMasterCategory(saasId, storeId);
          setMasterCategory(response.data.data);
        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getMatserCategory();
      }, []);

    useEffect(() => {
      setValue('saas_id',saasId)
      setValue('store_id', storeId)
    }, [open])
    
 const onChange = async (e) => {
        const file = e.target.files[0];
        setFile(file)
    };

    const fetchSubCategoryById = async (id) => {
        try {
            const formData = new FormData();
                formData.append("file", file);
            const response = await DataService.AddSubCatImage(id,formData);
            if (response.data.status) {
                enqueueSnackbar('SubCategory fetched successfully', { variant: "success" });
                // return response.data.data;
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Failed to fetch SubCategory', { variant: "error" });
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-20"
                sx={{ outline: 'none' }}
            >
                <h2 className="text-xl font-semibold mb-4">Add Sub Category</h2>
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                    <TextField
                        label="Sub Category Name"
                        fullWidth
                        {...register('category', { required: 'Sub Category Name is required' })}
                        error={!!errors.category}
                        helperText={errors.category?.message}
                    />
                    <TextField
                        label="Category"
                        select
                        fullWidth
                        variant="outlined"
                        {...register('master_category_id', { required: 'Category is required' })}
                        error={!!errors.master_category_id}
                        helperText={errors.master_category_id?.message}
                    >
                        <MenuItem value="">
                            <em>Select Category</em>
                        </MenuItem>
                        {masterCategory.map((category) => (
                            <MenuItem
                                key={category.masterCategoryId}
                                value={category.masterCategoryId}
                            >
                                {category.masterCategoryName}
                            </MenuItem>
                        ))}
                    </TextField>
                    
                            <TextField
                                type="file"
                                onChange={onChange}
                                inputProps={{ accept: "image/*" }}
                                variant="outlined"
                                fullWidth
                            />
                    
                    
                    <div className="flex justify-end space-x-4">
                        <Button onClick={handleClose} variant="outlined" color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Add
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};

export default AddSubCatModal;