import React, { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import DataService from '../../services/requestApi'
import { useSnackbar } from "notistack";
const UpdateUserModal = ({ open, handleClose, selectedrow ,GetUsers}) => {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
  const {enqueueSnackbar} = useSnackbar()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      mobile_number: "",
      email: "",
      name: "",
      password: "",
      saas_id: "",
      store_id: "",
      direction: "",
    },
  });

  const onSubmit =async (data) => {
    try {
        const response = await DataService.UpdateUser(selectedrow.customerId, data)
        if(response?.data?.status){
            enqueueSnackbar('User Updated Successfully', {variant:"success"})
            handleClose()
            GetUsers()
        }else{
            enqueueSnackbar(response?.data?.message|| "Api Giving Error")
        }
    } catch (error) {
        console.log(error)
        enqueueSnackbar(error?.response?.data?.message || error.message|| "Something Wrong With Api",{variant:"error"})
    }
  };

  useEffect(() => {
    setValue("mobile_number", selectedrow.mobileNumber);
    setValue("email", selectedrow.email);
    setValue("name", selectedrow.name);
    setValue("password", selectedrow.password);
    setValue("saas_id", saasId);
    setValue("store_id", storeId);
  }, [open]);

  return (
    <div className="p-4">
      <Modal open={open} onClose={handleClose}>
        <Box className="absolute top-1/2 left-1/2 w-[95%] sm:w-[90%] md:w-[75%] lg:w-[50%] xl:w-[40%] max-h-[90vh] overflow-y-auto transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-4 sm:p-6">
          <h2 className="text-xl font-semibold mb-4 text-center">
            User Information
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Mobile Number
              </label>
              <input
                type="text"
                {...register("mobile_number", { required: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              />
              {errors.mobile_number && (
                <span className="text-red-500 text-sm">
                  Mobile number is required
                </span>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">Email is required</span>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">Name is required</span>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  Password is required
                </span>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">SaaS ID</label>
              <input
                type="text"
                {...register("saas_id", { required: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              />
              {errors.saas_id && (
                <span className="text-red-500 text-sm">
                  SaaS ID is required
                </span>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Store ID</label>
              <input
                type="text"
                {...register("store_id", { required: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              />
              {errors.store_id && (
                <span className="text-red-500 text-sm">
                  Store ID is required
                </span>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">
                Direction
              </label>
              <select
                {...register("direction", { required: true })}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
              >
                <option value="">Select Direction</option>
                <option value="org1">Org1</option>
                <option value="org2">Org2</option>
              </select>
              {errors.direction && (
                <span className="text-red-500 text-sm">
                  Direction is required
                </span>
              )}
            </div>

            <div className="text-center mt-6">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Submit
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateUserModal;
