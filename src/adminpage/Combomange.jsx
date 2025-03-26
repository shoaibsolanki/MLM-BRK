import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import DataService from '../services/requestApi'
import { useSnackbar } from 'notistack';
const Combomange = () => {
    const {storeId,saasId} = JSON.parse(localStorage.getItem('user_data'))
  
  const list = [
    {
    itemname: "Food",
    itemId: "93922"
  },
    {
    itemname: "Fooditems",
    itemId: "93923"
  },
]
  const [selecteditemlist, setSelecteditemlist] = useState([])
  const { enqueueSnackbar } = useSnackbar();
const {
         register,
         handleSubmit,
         setValue,
         reset,
         formState: { errors ,isSubmitting,},
      } = useForm();

// Set initial values for saasId and storeId
React.useEffect(() => {
  setValue('saasId', saasId);
  setValue('storeId', storeId);
}, [setValue, saasId, storeId]);


  const onSubmit = async(data) => {
    // e.preventDefault();
    console.log(data);
    if (data.itemIdLists.length < 2) {
        enqueueSnackbar("Please select at least two items", { variant: 'error' });
        return;
    }
    try {
        const response =await DataService.AddCombo(data)
        console.log(response)
        if(response.data.status){
            enqueueSnackbar("Combo Added Successfully", { variant: 'success'})
            reset()
            setSelecteditemlist([])
        }else{
            enqueueSnackbar(response.data.message, { variant: 'error'})

        }
    } catch (error) {
        enqueueSnackbar(error?.message, { variant: 'error'})
        console.log(error)
    }
  };
  const onChange = (e)=>{
    const {
        target: { value },
    } = e;
    setSelecteditemlist(typeof value === 'string' ? value.split(',') : value);
    setValue('itemIdLists', typeof value === 'string' ? value.split(',') : value)
  }
   
return (
    <div className="p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Submit New Combo</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2">
            <TextField
                label="Price"
                name="price"
                type="number"
                sx={{mt:2}}
                {...register('price', { required: 'price is required'})}
                error={!!errors.price}
                helperText={errors.price ? errors.price.message :""}
                fullWidth
            />
            <TextField
                label="Start Date"
                name="startDate"
                type="date"
                
                {...register('startDate', {required:"Start Date is Required"})}
                error={!!errors.startDate}
                helperText={errors.startDate ? errors.startDate.message:""}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <TextField
                label="End Date"
                name="endDate"
                type="date"
                {...register('endDate', {required:"End Date is Required"})}
                error={!!errors.endDate}
                helperText={errors.endDate ? errors.endDate.message:""}
                fullWidth
                InputLabelProps={{
                    shrink: true,
                }}
            />
            <FormControl sx={{ mt: 1 }}>
                <InputLabel id="demo-multiple-name-label">Item Lists</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={selecteditemlist}
                    onChange={onChange}
                    // {...register('itemIdLists', {required:"Item ID Lists is Required"})}
                    error={!!errors.itemIdLists}
                    input={<OutlinedInput label="Item ID Lists" />}
                >
                    {list.map((itemId) => (
                        <MenuItem key={itemId.itemId} value={itemId.itemId}>
                            {itemId.itemname}
                        </MenuItem>
                    ))}
                </Select>
                {errors.itemIdLists && <p style={{ color: 'red' }}>{errors.itemIdLists.message}</p>}
            </FormControl>
            <Button variant="contained" color="primary" type="submit">
                Submit
            </Button>
        </form>
    </div>
);
};

export default Combomange;