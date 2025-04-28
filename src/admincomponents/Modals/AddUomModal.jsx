import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
Modal,
Box,
Typography,
TextField,
Button,
} from '@mui/material';
import DataService from '../../services/requestApi'
import { useSnackbar } from 'notistack';
const AddUomModal = ({ open, handleClose, GetUomdata }) => {
const { register, handleSubmit, setValue, formState: { errors } } = useForm();

const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
const {enqueueSnackbar}=useSnackbar()
useEffect(() => {
  setValue("saas_id", saasId)
  setValue("store_id", storeId)
}, [open])


 
const handleFormSubmit = async(data) => {
   try {
    const response = await DataService.AddUom(data)
    if(response.data.status){
        enqueueSnackbar('Created Successfully', {variant:"success"})
        handleClose()
        GetUomdata()
    }
   } catch (error) {
    console.log(error)
   }
};



return (
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="add-uom-modal-title"
        aria-describedby="add-uom-modal-description"
    >
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
            }}
        >
            <Typography id="add-uom-modal-title" variant="h6" component="h2" mb={2}>
                Create UOM
            </Typography>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
               
                <TextField
                    fullWidth
                    label="UOM Name"
                    variant="outlined"
                    margin="normal"
                    {...register('uom_name', { required: 'UOM Name is required' })}
                    error={!!errors.uom_name}
                    helperText={errors.uom_name?.message}
                />

                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button onClick={handleClose} color="secondary" sx={{ mr: 2 }}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </Box>
            </form>
        </Box>
    </Modal>
);
};

export default AddUomModal;