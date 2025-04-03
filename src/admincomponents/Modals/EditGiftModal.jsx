import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Box, Button, TextField } from "@mui/material";

const EditGiftModal = ({ open, handleClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: "Exclusive Gift",
            totalAmount: 500.0,
            giftAmount: 50.0,
            gift: "Special discount on next purchase",
            saasId: "SAAS12345",
        },
    });

    const onFormSubmit = (data) => {
        onSubmit(data);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-20"
                sx={{ outline: "none" }}
            >
                <h2 className="text-xl font-bold mb-4">Edit Gift</h2>
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                    <TextField
                        label="Name"
                        fullWidth
                        {...register("name", { required: "Name is required" })}
                        error={!!errors.name}
                        helperText={errors.name?.message}
                    />
                    <TextField
                        label="Total Amount"
                        type="number"
                        fullWidth
                        {...register("totalAmount", { required: "Total Amount is required" })}
                        error={!!errors.totalAmount}
                        helperText={errors.totalAmount?.message}
                    />
                    <TextField
                        label="Gift Amount"
                        type="number"
                        fullWidth
                        {...register("giftAmount", { required: "Gift Amount is required" })}
                        error={!!errors.giftAmount}
                        helperText={errors.giftAmount?.message}
                    />
                    <TextField
                        label="Gift"
                        fullWidth
                        {...register("gift", { required: "Gift description is required" })}
                        error={!!errors.gift}
                        helperText={errors.gift?.message}
                    />
                    
                    <div className="flex justify-end space-x-4">
                        <Button onClick={handleClose} variant="outlined" color="secondary">
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

export default EditGiftModal;