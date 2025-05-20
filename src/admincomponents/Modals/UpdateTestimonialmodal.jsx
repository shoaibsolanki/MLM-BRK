import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import {
Modal,
Box,
Typography,
TextField,
Button,
IconButton,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import DataService from '../../services/requestApi'
const style = {
position: 'absolute',
top: '50%',
left: '50%',
transform: 'translate(-50%, -50%)',
width: 400,
bgcolor: 'background.paper',
boxShadow: 24,
p: 4,
borderRadius: 2,
};

const UpdateTestimonialModal = ({ open, handleClose, FetchData, defaultValues }) => {
const { register, handleSubmit,setValue ,watch ,reset} = useForm();
 const {enqueueSnackbar} = useSnackbar()
const handleQuillChange = (value) => {
    console.log(value);
    setValue("description" , value)
   
  };

  useEffect(() => {
    
    setValue('name' ,defaultValues?.name)
    setValue('description' ,defaultValues?.description)

  }, [open])
  

  

    
const handleFormSubmit = async(data) => {
    try {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        if (data.file && data.file[0]) {
            formData.append('file', data.file[0]);
        }
        const response = await DataService.EditTestimonail(defaultValues.id, data);
        if(response.data.status){
            enqueueSnackbar('Testimonial updated successfully!', { variant: 'success' });
            handleClose()
            FetchData()
        }
} catch (error) {
        console.log(error);
        enqueueSnackbar('Failed to update testimonial.', { variant: 'error' });
}
};
const modules = {
    toolbar: [
      [{ font: [] }],
      ["bold", "underline", "italic"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ table: [] }],
      ["link", "image", "video"],
      ["clean"],
      ["code-block"],
    ],
  };

  const formats = [
    "font",
    "bold",
    "underline",
    "italic",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
    "image",
    "video",
    "clean",
    "code-block",
  ];



return (
    <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Update Testimonial</Typography>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Box>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                 <TextField
                                           {...register('file')}
                                           type="file"
                                           label="Upload File"
                                           InputProps={{
                            inputProps: {
                                accept: '.jpg,.jpeg,.png,.gif'
                            }
                        }}
                                           fullWidth
                                           margin="normal"
                                   />
                                   <TextField
                                           {...register('name')}
                                           label="Name"
                                           variant="outlined"
                                           fullWidth
                                           margin="normal"
                                   />
                                   <div className="form-group md:col-span-3  md:h-[170px] h-[225px]">
                                           <ReactQuill
                                                   theme="snow"
                                                   name="description"
                                                   value={watch("description") || ""}
                                                   onChange={handleQuillChange}
                                                   modules={modules}
                                                   formats={formats}
                                                   style={{ height: "100px" }}
                                           />
                                   </div>
                <Box mt={2} display="flex" justifyContent="flex-end">
                    <Button onClick={handleClose} color="secondary" sx={{ mr: 1 }}>
                        Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                        Update
                    </Button>
                </Box>
            </form>
        </Box>
    </Modal>
);
};

export default UpdateTestimonialModal;