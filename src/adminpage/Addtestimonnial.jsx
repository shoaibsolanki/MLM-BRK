import React from 'react'
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";
import { useSnackbar } from 'notistack';
import DataService from '../services/requestApi'
const Addtestimonnial = () => {
    const { register, handleSubmit,setValue ,watch ,reset} = useForm();
    const {enqueueSnackbar} = useSnackbar()
    const handleQuillChange = (value) => {
        console.log(value);
        setValue("description" , value)
       
      };
      const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append('file', data.file[0]);
            formData.append('name', data.name);
            formData.append('description', data.description);

            const response = await DataService.Addtestimonial(saasId, storeId,formData);
            enqueueSnackbar('Testimonial added successfully!', { variant: 'success' });
            console.log(response);
            reset()
        } catch (error) {
            console.error(error);
            enqueueSnackbar('Failed to add testimonial. Please try again.', { variant: 'error' });
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
    <div>
            <form className='bg-white p-4 rounded' onSubmit={handleSubmit(onSubmit)}>
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
                    <Button type="submit" variant="contained" color="primary">
                            Submit
                    </Button>
            </form>
    </div>
)
}

export default Addtestimonnial