import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button } from '@mui/material';
import DataService from '../services/requestApi'
import { useSnackbar } from 'notistack';
const DistributorCreate = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
  const {
    register,
    handleSubmit,
    formState: { errors ,isSubmitting},
    watch,
    reset
  } = useForm({
    defaultValues: {
      user_name: '',
      user_type:"DISTRIBUTOR",
      password: '',
      mobile_number:"",
      store_name: '',
      city: '',
      address: '',
      store_type:"Retail",
      country:"india",
      referralCode:"",
      store_id:storeId,
      saas_id:saasId,
      timing:"",
    },
  }); 
  const password = watch('password');
  
  const onSubmit =async (data) => {
    console.log('Form Data:', data);
    try {
      const response = await DataService.CreteUser(data)
      if (response.data.status) {
        enqueueSnackbar('Distributor Added Successfully' , {variant:"success"})
        reset()
      }
    } catch (error) {
      enqueueSnackbar( error?.response?.data.message || error.message ||'Something Wrong in Add Distributor' , {variant:"error"})
      console.log(error)
    }
  };

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-semibold mb-6">Add Distributor</h2>
        <form
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            label="Distributor Name"
            variant="outlined"
            fullWidth
            {...register('user_name', { required: 'Distributor Name is required' })}
            error={!!errors.user_name}
            helperText={errors.user_name?.message}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register('confirm_password', { 
              required: 'Confirm Password is required', 
              validate: (value) =>  value === password || 'Passwords do not match',
            })}
            error={!!errors.confirm_password}
            helperText={errors.confirm_password?.message}
          />
          <TextField
            label="Store Name"
            variant="outlined"
            fullWidth
            {...register('store_name', { required: 'Store Name is required' })}
            error={!!errors.store_name}
            helperText={errors.store_name?.message}
          />
          <TextField
            label="City"
            variant="outlined"
            fullWidth
            {...register('city', { required: 'City is required' })}
            error={!!errors.city}
            helperText={errors.city?.message}
          />
          <TextField
            label="Mobile Number"
            variant="outlined"
            fullWidth
            {...register('mobile_number', { 
              required: 'Mobile Number is required', 
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Mobile Number must be 10 digits'
              }
            })}
            error={!!errors.mobile_number}
            helperText={errors.mobile_number?.message}
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            {...register('address', { required: 'Address is required' })}
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <TextField
            label="Timing (e.g., 10pm - 3pm)"
            variant="outlined"
            fullWidth
            {...register('timing', { required: 'Timing is required' })}
            error={!!errors.timing}
            helperText={errors.timing?.message}
          />
          <div className="md:col-span-3 flex justify-end">
            <Button variant="contained" color="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DistributorCreate;