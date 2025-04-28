import React from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import DataService from '../../services/requestApi'
import { useSnackbar } from 'notistack';
const EditModal = ({ open, handleClose, id ,GetUomdata}) => {
    const { control, handleSubmit } = useForm();
   const {enqueueSnackbar} = useSnackbar()
    const onSubmit =async (data) => {
        try {
            const response = await DataService.EditUom(id,data.uom)
            if(response.data.status){
                GetUomdata()
                handleClose()
                enqueueSnackbar("Uom Updated Successfully", {variant: "success"})
            }
        } catch (error) {
            console.log(error)
            enqueueSnackbar("Got error in Api", {variant: "error"})
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
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
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="uom"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="UOM"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Update UOM
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default EditModal;