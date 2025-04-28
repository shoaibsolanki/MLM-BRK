import React from 'react'
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';

const Addtestimonnial = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };
  return (
    <div>

        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    {...register('file')}
                    type="file"
                    label="Upload File"
                    InputLabelProps={{ shrink: true }}
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
                <TextField
                    {...register('description')}
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        );
        

    </div>
  )
}

export default Addtestimonnial