import React from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Box, Button, TextField } from '@mui/material';

const EditRpBonusModal = ({ open, handleClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onFormSubmit = (data) => {
        // onSubmit(data);
        handleClose();
    };

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
                            {...register('end_rp', { required: 'End RP is required' })}
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