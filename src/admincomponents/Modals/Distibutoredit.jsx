import React from "react";
import { useForm } from "react-hook-form";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import DataService from '../../services/requestApi'
import { useSnackbar } from "notistack";
const DistributorEditModal = ({
  open,
  handleClose,
  distributorData,
  GetDistributorsData
}) => {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      user_name: "",
      user_type: "DISTRIBUTOR",
      password: "",
      mobile_number: "",
      store_name: "",
      city: "",
      address: "",
      store_type: "Retail",
      country: "india",
      referralCode: "",
      store_id: storeId,
      saas_id: saasId,
    },
  });

React.useEffect(() => {
    if (distributorData) {
        reset({
            user_name: distributorData?.userName,
            user_type: "DISTRIBUTOR",
            password: distributorData?.password,
            mobile_number: distributorData?.mobileNumber,
            store_name: distributorData?.storeName,
            city: distributorData?.city,
            address: distributorData?.address,
            store_type: "Retail",
            country: "india",
            referralCode: "",
            storeId: storeId,
            saasId: saasId,
            status:true
        });
    }
}, [distributorData, reset, storeId, saasId]);
  const { enqueueSnackbar } = useSnackbar()
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  const submitHandler =async(data) => {
    // onSubmit(data);
    console.log(data)
    handleClose();
    try {
        const response = await DataService.EditDistributor(distributorData.userId, data)
        if(response.data.status){
            GetDistributorsData()
            enqueueSnackbar('Updated Successfully', {variant:"success"})
        }
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" mb={2}>
          Update Distributor
        </Typography>
        <form onSubmit={handleSubmit(submitHandler)}>
          <TextField
            fullWidth
            label="Name"
            {...register("user_name", { required: "Name is required" })}
            error={!!errors.user_name}
            helperText={errors.user_name?.message}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Mobil"
            {...register("mobile_number", {
              required: "Mobil number is required",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Mobile Number must be 10 digits",
              },
            })}
            error={!!errors.mobile_number}
            helperText={errors.mobile_number?.message}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register("password", { required: "Password is required" })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label="Store Name"
            variant="outlined"
            sx={{mt:1}}
            fullWidth
            {...register("store_name", { required: "Password is required" })}
            error={!!errors.store_name}
            helperText={errors.store_name?.message}
          />
          
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button variant="outlined" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={isSubmitting}>
              Update
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default DistributorEditModal;
