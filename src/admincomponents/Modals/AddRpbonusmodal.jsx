import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal, Box, Button, TextField, MenuItem } from "@mui/material";
import DataService from '../../services/requestApi'
import { useSnackbar } from "notistack";
const AddRpBonusModal = ({ open, handleClose ,GetRpData}) => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [bonustype, setBonusType] = useState([])
    const {  saasId } = JSON.parse(localStorage.getItem("user_data"));
    const { enqueueSnackbar } = useSnackbar()
    const onFormSubmit = async (data) => {
        try {
            const response = await DataService.CreateBonus(data)
            if(response.data.status){
                handleClose();
                enqueueSnackbar("Rp Bonus Added Successfully", {variant:"success"})
                GetRpData()
            }else{
                enqueueSnackbar(response.data.message, {variant:"error"})

            }
        } catch (error) {
            console.log(error)
        }
    };
    const GetType = async ()=>{
        try {
            const response = await DataService.BonusType()
            if(response.data.status){
                setBonusType(response.data.data)
                
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
      GetType()
      setValue('saasId',saasId)
    }, [open])
    

    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: "8px",
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={modalStyle} className="space-y-4">
                <h2 className="text-lg font-bold text-center">Add RP Bonus</h2>
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                    <TextField
                        label="Start RP"
                        type="number"
                        fullWidth
                        {...register("start_rp", { required: "Start RP is required" })}
                        error={!!errors.start_rp}
                        helperText={errors.start_rp?.message}
                    />
                    <TextField
                        label="End RP"
                        type="number"
                        fullWidth
                        {...register("end_rp", { required: "End RP is required" })}
                        error={!!errors.end_rp}
                        helperText={errors.end_rp?.message}
                    />
                    <TextField
                        label="Type"
                        select
                        fullWidth
                        {...register("type", { required: "Type is required" })}
                        error={!!errors.type}
                        helperText={errors.type?.message}
                    >
                        {/* <MenuItem value="Other Type">Other Type</MenuItem> */}
                        {bonustype && bonustype.map((el)=> <MenuItem value="Early Buy Benefit">{el.type}</MenuItem>)}
                    </TextField>
                    <TextField
                        label="Bonus"
                        type="number"
                        fullWidth
                        {...register("bonus", { required: "Bonus is required" })}
                        error={!!errors.bonus}
                        helperText={errors.bonus?.message}
                    />
                    <TextField
                        label="Title"
                        type="Text"
                        fullWidth
                        {...register("title", { required: "title is required" })}
                        error={!!errors.title}
                        helperText={errors.title?.message}
                    />
                    <div className="flex justify-end space-x-2">
                        <Button onClick={handleClose} variant="outlined" color="secondary">
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};

export default AddRpBonusModal;