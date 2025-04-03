import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal, Box, Button, TextField } from "@mui/material";
import DataService from '../../services/requestApi'
import { useSnackbar } from "notistack";

const CreateGiftModal = ({ open, handleClose,  fetchGifts}) => {
    const { register, handleSubmit,setValue, formState: { errors } } = useForm();
    const {  saasId } = JSON.parse(localStorage.getItem("user_data"));
    const {enqueueSnackbar} = useSnackbar()
    useEffect(() => {
      setValue('saasId',saasId)
    }, [])
    


    const onFormSubmit =async (data) => {
        console.log(data)
        try {
            const response  = await DataService.CreateGifts(data)
            if(response.data.status){
                fetchGifts()
                enqueueSnackbar('Gift Added Successfully', {variant:"success"})
            }else{
                enqueueSnackbar(response.data.message, {variant:"error"})
                
            }
        } catch (error) {
            console.log(error)
            enqueueSnackbar(' Error in Add Gift', {variant:"error"})
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-20"
                component="form"
                onSubmit={handleSubmit(onFormSubmit)}
            >
                <h2 className="text-xl font-bold mb-4">Create Gift</h2>
                <div className="mb-4">
                    <TextField
                        label="Name"
                        fullWidth
                        {...register("name", { required: "Name is required" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        label="Total Amount"
                        type="number"
                        fullWidth
                        {...register("totalAmount", { required: "Total Amount is required" })}
                        error={!!errors.totalAmount}
                        helperText={errors.totalAmount?.message}
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        label="Gift Amount"
                        type="number"
                        fullWidth
                        {...register("giftAmount", { required: "Gift Amount is required" })}
                        error={!!errors.giftAmount}
                        helperText={errors.giftAmount?.message}
                    />
                </div>
                <div className="mb-4">
                    <TextField
                        label="Gift"
                        fullWidth
                        {...register("gift", { required: "Gift is required" })}
                        error={!!errors.gift}
                        helperText={errors.gift?.message}
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <Button onClick={handleClose} className="mr-2" color="secondary" variant="outlined">
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default CreateGiftModal;