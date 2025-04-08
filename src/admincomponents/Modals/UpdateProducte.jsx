import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Box, Button, TextField, Typography } from "@mui/material";

const UpdateProductModal = ({ open, handleClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: "8px",
    };

    const handleFormSubmit = (data) => {
        onSubmit(data);
        handleClose();
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" className="mb-4 text-center">
                    Update Product
                </Typography>
                <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                    <TextField
                        label="Item Name"
                        fullWidth
                        {...register("item_name", { required: "Item name is required" })}
                        error={!!errors.item_name}
                        helperText={errors.item_name?.message}
                    />
                    <TextField
                        label="Item Code"
                        fullWidth
                        {...register("item_code", { required: "Item code is required" })}
                        error={!!errors.item_code}
                        helperText={errors.item_code?.message}
                    />
                    <TextField
                        label="Special Description"
                        fullWidth
                        multiline
                        rows={3}
                        {...register("special_description")}
                    />
                    <TextField
                        label="Price"
                        type="number"
                        fullWidth
                        {...register("price", { required: "Price is required" })}
                        error={!!errors.price}
                        helperText={errors.price?.message}
                    />
                    <TextField
                        label="Actual Price"
                        type="number"
                        fullWidth
                        {...register("actual_price")}
                    />
                    <TextField
                        label="Product Cost"
                        type="number"
                        fullWidth
                        {...register("product_cost")}
                    />
                    <TextField
                        label="Discount"
                        type="number"
                        fullWidth
                        {...register("discount")}
                    />
                    <TextField
                        label="Tax"
                        type="number"
                        fullWidth
                        {...register("tax")}
                    />
                    <TextField
                        label="SaaS ID"
                        fullWidth
                        {...register("saas_id")}
                    />
                    <TextField
                        label="Store ID"
                        fullWidth
                        {...register("store_id")}
                    />
                    <TextField
                        label="Category"
                        fullWidth
                        {...register("category")}
                    />
                    <TextField
                        label="Barcode"
                        fullWidth
                        {...register("barcode")}
                    />
                    <TextField
                        label="Opening Quantity"
                        type="number"
                        fullWidth
                        {...register("opening_qty")}
                    />
                    <TextField
                        label="Received Quantity"
                        type="number"
                        fullWidth
                        {...register("received_qty")}
                    />
                    <TextField
                        label="UOM"
                        fullWidth
                        {...register("UOM")}
                    />
                    <div className="flex justify-end space-x-4">
                        <Button onClick={handleClose} variant="outlined" color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Update
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};

export default UpdateProductModal;