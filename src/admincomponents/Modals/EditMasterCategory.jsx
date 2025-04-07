import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import DataService from '../../services/requestApi'
import { useSnackbar } from 'notistack';
const EditMasterCategory = ({getMatserCategory, open, handleClose, category }) => {
    const [categoryName, setCategoryName] = useState(category?.masterCategoryName || '');
    const { enqueueSnackbar } = useSnackbar();
    const handleSave = async () => {
        try {
            const response = await DataService.updateMasterCategory(category.masterCategoryId, categoryName)
            if(response.data.status){
                enqueueSnackbar('Master Category Updated Successfully', {variant:"success"})
                getMatserCategory()
                handleClose()
            } 
        } catch (error) {
            console.log(error)
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
                    Edit Master Category
                </Typography>
                <TextField
                    fullWidth
                    label="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    variant="outlined"
                    margin="normal"
                />
                <TextField
                    fullWidth
                    type="file"
                    inputProps={{ accept: "image/*" }}
                    onChange={(e) => console.log(e.target.files[0])}
                    variant="outlined"
                    margin="normal"
                />
                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button onClick={handleClose} variant='outlined' color="secondary" sx={{ mr: 1 }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained" color="primary">
                        Save
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default EditMasterCategory;