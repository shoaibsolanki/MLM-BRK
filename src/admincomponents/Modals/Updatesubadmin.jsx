import React, { useEffect, useState } from 'react';
import { Modal, Box, Typography, TextField, Button, FormControlLabel, Checkbox } from '@mui/material';
import DataService from '../../services/requestApi'
import { useSnackbar } from 'notistack';
const Updatesubadmin = ({ open, handleClose ,id}) => {
    const {enqueueSnackbar} = useSnackbar()
   const [menuOptions , setMenuOption] = useState([])
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
    };
    const [selectedMenuId, setSelectedMenu] = useState([])
     const GetAllPermission= async ()=>{
        try {
          const response = await DataService.Adminpermisions(id)
          if(response?.data.status){
            setMenuOption(response?.data?.data?.permission)
            setSelectedMenu(response?.data?.data?.permission.filter(menu => menu.status).map(menu => menu.id.toString()));

          }
          
        } catch (error) {
          console.log(error)
        }
      }

      
        const onChange =(e)=>{
        const menuId = parseInt(e.target.value);
        if (e.target.checked) {
          setSelectedMenu((prev) => [...prev, menuId.toString()]);

        } else {
          setSelectedMenu((prev) => prev.filter((id) => id !== menuId.toString()));
        }
        }
         
        const AddPermission = async (e) => {
            e.preventDefault();
            try {
            if (selectedMenuId.length === 0) {
                enqueueSnackbar('Please select at least one menu option.', { variant: 'warning' });
                return;
            }

            const data = {
                pageId: selectedMenuId,
            };

            const response = await DataService.AddPermission(id, data);

            if (response?.data?.status) {
                enqueueSnackbar('Permissions updated successfully!', { variant: 'success' });
                handleClose(); // Close the modal after successful submission
            } else {
                enqueueSnackbar(response?.data?.message || 'Failed to update permissions.', { variant: 'error' });
            }
            } catch (error) {
            console.error('Error updating permissions:', error);
            enqueueSnackbar('An error occurred while updating permissions. Please try again.', { variant: 'error' });
            }
        };



        useEffect(() => {
            if(open){
                GetAllPermission()
            }
        }, [open])
        useEffect(() => {
         console.log(selectedMenuId )
        }, [selectedMenuId])
        

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Typography variant="h6" component="h2" gutterBottom>
                    Select Menu
                </Typography>
                <form onSubmit={AddPermission}>
                     <div className="mb-4">
                           <div className="flex flex-wrap gap-4">
                             {menuOptions.map((menu, idx) => (
                               <FormControlLabel
                                 key={idx}
                                 value={menu.id}
                                 control={
                                   <Checkbox
                                   checked={selectedMenuId.includes(menu.id.toString())}
                                   // {...register(`menu.${menu}`)}
                                   onChange={(e) => {onChange(e)}}
                                   />
                                 }
                                 label={menu.name}
                               />
                             ))}
                           </div>
                         </div>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{ mt: 2 }}
                    >
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default Updatesubadmin;