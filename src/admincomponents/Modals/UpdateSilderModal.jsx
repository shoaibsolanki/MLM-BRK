import React, { useState } from 'react';
import { Modal, Box, Typography, Button, TextField } from '@mui/material';
import DataService from '../../services/requestApi'
import { useSnackbar } from 'notistack';
const UpdateSliderModal = ({ open, handleClose ,Banners}) => {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const [file3, setFile3] = useState(null);
    const {enqueueSnackbar} = useSnackbar()
    const handleFileChange = (e, setFile) => {
        setFile(e.target.files[0]);
    };
    const {  saasId } = JSON.parse(localStorage.getItem("user_data"));

    const handleSubmit = async () => {
        if (!file1 && !file2 && !file3) {
            enqueueSnackbar('Please select at least one file to upload.', { variant: 'warning' });
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file1', file1 || null);
            formData.append('file2', file2 || null);
            formData.append('file3', file3 || null);

            const response = await DataService.UpdateSlider(saasId, formData);
            enqueueSnackbar('Slider updated successfully!', { variant: 'success' });
            handleClose();
            Banners()
        } catch (error) {
            console.error('Error updating slider:', error);
            enqueueSnackbar('Failed to update slider. Please try again.', { variant: 'error' });
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
                <Typography variant="h6" component="h2" mb={2}>
                    Update Slider
                </Typography>
                <Box mb={2}>
                    <TextField
                        type="file"
                        fullWidth
                        onChange={(e) => handleFileChange(e, setFile1)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        type="file"
                        fullWidth
                        onChange={(e) => handleFileChange(e, setFile2)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        type="file"
                        fullWidth
                        onChange={(e) => handleFileChange(e, setFile3)}
                    />
                </Box>
                <Box display="flex" justifyContent="space-between">
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        Submit
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default UpdateSliderModal;