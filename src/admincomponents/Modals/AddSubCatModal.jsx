import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Box, TextField, Button } from '@mui/material';
import DataService from '../../services/requestApi'
import { useSnackbar } from 'notistack';
const AddSubCatModal = ({ open, handleClose ,getsubcategory}) => {
    const { register, handleSubmit, setValue , formState: { errors } } = useForm();
    const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
    const {enqueueSnackbar} = useSnackbar()
    const onFormSubmit = async(data) => {
       
        try {
            const response = await DataService.AddSubCategory(data)
            if(response.data.status){
                enqueueSnackbar('SubCategory Created Successfully' , {variant:"success"})
                handleClose();
                getsubcategory()
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
      setValue('saas_id',saasId)
      setValue('store_id', storeId)
    }, [open])
    


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
                        error={!!errors.subCategoryName}
                        helperText={errors.subCategoryName?.message}
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