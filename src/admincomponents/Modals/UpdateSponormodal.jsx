import React, { useEffect, useState } from "react";
import { Modal, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import DataService from '../../services/requestApi'
import { useSnackbar } from "notistack";
const UpdateSponormodal = ({open, handleClose, id,GetUsers}) => {
    const {enqueueSnackbar} = useSnackbar()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        defaultValues: {
            referById: "",
        },
      });

        const onSubmit =async (data) => {
          try {
            const response = await DataService.UpdateSponsor(id, data.referById)
            if(response?.data?.status){
                enqueueSnackbar("Sponsor Updated Successfully",{variant:"success"})
                GetUsers()
                handleClose()
            }
          } catch (error) {
            console.log(error)
            enqueueSnackbar(error?.response?.data?.message || error.message|| "Something Wrong With Api",{variant:"error"})
          }
        };
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
                   Sponsor Id 
                 </label>
                 <input
                   type="text"
                   {...register("referById", { required: true })}
                   className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
                 />
                 {errors.referById && (
                   <span className="text-red-500 text-sm">
                     ReferById is required
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
  )
}

export default UpdateSponormodal