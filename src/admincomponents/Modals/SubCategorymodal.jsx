import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Modal, Box, TextField, Button } from "@mui/material";
import DataService from '../../services/requestApi'
import { useSnackbar } from "notistack";
const SubCategoryModal = ({ open, handleClose, onSubmit, defaultValues }) => {
    const { control, handleSubmit, reset  , setValue} = useForm();
    const {enqueueSnackbar} = useSnackbar()
    const handleFormSubmit = async(data) => {
        // onSubmit(data);
        // console.log(data)
        // reset();
        // handleClose();
        try {
            console.log(defaultValues)
            const response = await DataService.EditSubCategory(defaultValues.category_id, data)
            if(response.data.status){
            enqueueSnackbar('Sub Category updated Successfully', {variant : "success"})
            }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
      setValue('saas_id', defaultValues.saas_id)
      setValue('store_id', defaultValues.store_id)
    }, [open])
    

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