import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Box, TextField, Button } from "@mui/material";
import DataService from '../../services/requestApi'
import { useSnackbar } from "notistack";
const SubCategoryModal = ({ open, handleClose, getsubcategory, defaultValues }) => {
    const { control, handleSubmit, reset  , setValue} = useForm();
    const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
    const {enqueueSnackbar} = useSnackbar()
    const handleFormSubmit = async(data) => {
        // onSubmit(data);
        // console.log(data)
       
        try {
            console.log(defaultValues)
            const response = await DataService.EditSubCategory(defaultValues.category_id, data)
            if(response.data.status){
                getsubcategory()
                reset();
                handleClose();
                enqueueSnackbar('Sub Category updated Successfully', {variant : "success"})
            }
        } catch (error) {
            enqueueSnackbar('Error in Update Sub Category', {variant : "error"})
            console.log(error)
        }
    };

    useEffect(() => {
      setValue('saas_id', saasId)
      setValue('store_id', storeId)
    }, [open])
 
    const onChange = async (e) => {
        const file = e.target.files[0];
        try {
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const response = await DataService.AddSubCatImage(defaultValues.category_id ,formData)
                if(response.data.status){
                    getsubcategory()
                    enqueueSnackbar("Image Updated Successfully", {variant: "success"})
                }
            }
        } catch (error) {
            enqueueSnackbar("Error Occurred In Image Update", {variant: "error"})
            console.log(error)
        }
        
    };
 
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                className="bg-white p-6 rounded-lg shadow-lg"
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                }}
            >
                <h2 className="text-xl font-semibold mb-4">Edit Sub Category</h2>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <Controller
                        name="category"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Sub Category Name"
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                    <Controller
                        name="file"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                type="file"
                                onChange={onChange}
                                inputProps={{ accept: "image/*" }}
                                variant="outlined"
                                fullWidth
                            />
                        )}
                    />
                   
                    <div className="flex justify-end space-x-2">
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => {
                                reset();
                                handleClose();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};

export default SubCategoryModal;