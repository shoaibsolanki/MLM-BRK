import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Box, Button, TextField } from '@mui/material';
import DataService from '../../services/requestApi'
import { useSnackbar } from 'notistack';
const EditRpBonusModal = ({ open, handleClose, selectedrow ,GetRpData}) => {
    const { register,setValue, handleSubmit, formState: { errors } } = useForm();
    const {enqueueSnackbar} = useSnackbar()
    const onFormSubmit = async (data) => {
        try {
           const response = await DataService.UpdateRpBounse(selectedrow.id, data);
           if(response.data.status){
               enqueueSnackbar('RP bonus updated successfully!', { variant: 'success' });
               handleClose();
               GetRpData()
           }else{
               enqueueSnackbar(response.data.message || 'Failed to update RP bonus', { variant: 'error' });
           }
        } catch (error) {
            console.error('Error updating RP bonus:', error);
            enqueueSnackbar(error.response?.data?.message || 'Failed to update RP bonus', {
                variant: 'error'
            });
        }
    };

    React.useEffect(() => {
        if (selectedrow) {
            setValue('start_rp', selectedrow.start_rp);
            setValue('end_rp', selectedrow.end_rp);
            setValue('bonus', selectedrow.bonus);
            setValue('title', selectedrow.title);
        }
    }, [selectedrow]);


    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-20"
                style={{ outline: 'none' }}
            >
                <h2 className="text-xl font-bold mb-4">Edit RP Bonus</h2>
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
                    <div>
                        <TextField
                            label="Start RP"
                            type="number"
                            fullWidth
                            {...register('start_rp', { required: 'Start RP is required' })}
                            error={!!errors.start_rp}
                            helperText={errors.start_rp?.message}
                        />
                    </div>
                    <div>
                        <TextField
                            label="End RP"
                            type="number"
                            fullWidth
                            {...register("end_rp", { 
                            required: "End RP is required", 
                            validate: value => 
                                parseFloat(value) > parseFloat(watch("start_rp")) || "End RP must be greater than to Start RP"
                        })}
                            error={!!errors.end_rp}
                            helperText={errors.end_rp?.message}
                        />
                    </div>
                    {/* <div>
                        <TextField
                            label="Type"
                            fullWidth
                            {...register('type', { required: 'Type is required' })}
                            error={!!errors.type}
                            helperText={errors.type?.message}
                        />
                    </div> */}
                    <div>
                        <TextField
                            label="Bonus"
                            type="number"
                            fullWidth
                            {...register('bonus', { required: 'Bonus is required' })}
                            error={!!errors.bonus}
                            helperText={errors.bonus?.message}
                        />
                    </div>
                    <div>
                         <TextField
                                                label="Title"
                                                type="Text"
                                                fullWidth
                                                {...register("title", { required: "title is required" })}
                                                error={!!errors.title}
                                                helperText={errors.title?.message}
                                            />
                    </div>
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

export default EditRpBonusModal;