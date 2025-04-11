import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Box, Button, TextField } from "@mui/material";
import DataService from '../../services/requestApi'
import { useSnackbar } from "notistack";
const EditGiftModal = ({ open, handleClose, selectedGift ,fetchGifts}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const {enqueueSnackbar} = useSnackbar()
  React.useEffect(() => {
    if (open) {
      setValue("name", selectedGift?.name || "");
      setValue("totalAmount", selectedGift?.totalAmount || 0);
      setValue("giftAmount", selectedGift?.giftAmount || 0);
      setValue("gift", selectedGift?.gift || "");
      setValue("saasId", JSON.parse(localStorage.getItem("user_data")).saasId);
    }
  }, [open, selectedGift, setValue]);

  const onFormSubmit =async (data) => {
    try {
        const response = await DataService.EditGift(selectedGift.userID, data)
        if(response?.data?.status){
            fetchGifts()
            enqueueSnackbar("Gift Updated Successfully", {variant:"success"})
            handleClose()
        }else{
            enqueueSnackbar(response?.data?.message, {variant:"error"})
        }
    } catch (error) {
        enqueueSnackbar("Api Giving error ", {variant:"error"})
      console.log(error);
    }
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
            {...register("totalAmount", {
              required: "Total Amount is required",
            })}
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
