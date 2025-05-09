import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Checkbox, Button, FormControlLabel } from '@mui/material';
import DataService from '../services/requestApi';
import { useSnackbar } from 'notistack';
import CustomDataTable from '../admincomponents/Microcomponents/DataTable';
import { Edit, Trash } from 'lucide-react';
import Updatesubadmin from '../admincomponents/Modals/Updatesubadmin';


const CreateAdminForm = () => {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data")) || {};
  const [open , setOpen] = useState(false)
  const [id , setId] = useState("")
  const [menuOptions , setMenuOption] = useState([])
  const { enqueueSnackbar} = useSnackbar()
  const { handleSubmit,formState: { errors ,isSubmitting}, register, setValue ,watch ,reset} = useForm({
    defaultValues: {
      user_name: "",
      user_type: "subadmin",
      password: "",
      mobile_number: "",
      referralCode: "",
      store_name: "",
      store_id: storeId,
      saas_id: saasId,
      register_id: "REG1",
      city: "",
      special_price: "",
      category_name: "",
      state: "",
      country: "India",
      brand_logo: "",
      taxable: true,
      gst_code: "",
      hsn_code: "",
      store_type: "Retail",
      address: "",
      timing: ""
    }
  });
  setValue('store_id', storeId)
  setValue('saas_id', saasId)
  const password = watch('password');
  const onSubmit = async (data) => {
    try {
      if(selectedmenuid?.length < 1){

        enqueueSnackbar("Select At least One Page" , {variant: "error"})
      }
      console.log(data)
      const response = await DataService.CreteUser(data);
      if (response.data.status) {
        AddPermission(response?.data?.data?.user_data?.userId)
        enqueueSnackbar("Admin Added Successfully" , {variant: "success"})
        reset({ user_name: "",
          user_type: "subadmin",
          password: "",
          mobile_number: "",
          referralCode: "",
          store_name: "",
          store_id: storeId,
          saas_id: saasId,
          register_id: "REG1",
          city: "",
          special_price: "",
          category_name: "",
          state: "",
          country: "India",
          brand_logo: "",
          taxable: true,
          gst_code: "",
          hsn_code: "",
          store_type: "Retail",
          address: "",
          timing: ""
        })
      } else {
        enqueueSnackbar("Failed To Add Admin" , {variant: "error"})
      }
    } catch (error) {
      console.error('Error creating admin:', error);
      enqueueSnackbar('Error creating admin', {variant:"error"});
    }
  };

  const GetAllPermission= async ()=>{
    try {
      const response = await DataService.GetAllPermission()
      if(response?.data.status){
        setMenuOption(response?.data?.data)
      }
      
    } catch (error) {
      console.log(error)
    }
  }
  const [data , setData] = useState([])
  const GetSubtomainList = async () =>{
    try {
      const response = await DataService.GetSubAdmin(saasId, storeId)
       if(response.data.status){
        setData(response.data.data)
       }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    GetAllPermission()
    GetSubtomainList()
  }, [])
  
  // 
  const [selectedmenuid , setSelectedmenu] = useState([])
  const onChange =(e)=>{
  const menuId = parseInt(e.target.value);
  if (e.target.checked) {
    setSelectedmenu((prev) => [...prev, menuId.toString()]);
  } else {
    setSelectedmenu((prev) => prev.filter((id) => id !== menuId.toString()));
  }
  }

  const AddPermission= async (id)=>{
    try {
      const data ={
        "pageId": selectedmenuid
      }
      const response = await DataService.AddPermission(id, data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
      { name: 'userName', selector: row => row.userName, sortable: true },
      { name: 'Password', selector: row => row.password, sortable: true },
      { name: 'Action', selector: row => <>
      <Trash onClick={()=> handleDelete(row.userId)} className='cursor-pointer'/>
        <Edit className='cursor-pointer' onClick={()=>{
          setId(row.userId)
          setOpen(true)}} />
      </>, sortable: true },
    ]

  const handleDelete = async (id) => {
    try {
      const response = await DataService.DeleteUser(id);
      if (response.data.status) {
        enqueueSnackbar("User deleted successfully", { variant: "success" });
        GetSubtomainList(); // Refresh the data
      } else {
        enqueueSnackbar("Failed to delete user", { variant: "error" });
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      enqueueSnackbar('Error deleting user', { variant: "error" });
    }
  };





    
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 max-w-6xl mx-auto bg-white rounded">
      <h2 className="text-lg font-semibold mb-4">Create Admin</h2>

      {/* Input fields */}
      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-6 mb-6">
        <TextField
                   label="User Name"
                   variant="outlined"
                   fullWidth
                   {...register('user_name', { required: 'Name is required' })}
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
      </div>

      {/* Menu checkboxes */}
      <div className="mb-4">
        <p className="font-medium mb-2">Select Menu</p>
        <div className="flex flex-wrap gap-4">
          {menuOptions.map((menu, idx) => (
            <FormControlLabel
              key={idx}
              value={menu.pageIndex}
              control={
                <Checkbox
                // {...register(`menu.${menu}`)}
                onChange={(e) => {onChange(e)}}
                />
              }
              label={menu.name}
            />
          ))}
        </div>
      </div>

      {/* Submit button */}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
    


    <div className="p-6 mt-4 max-w-6xl mx-auto bg-white rounded">
     <CustomDataTable columns={columns} data={data} />
    </div>
    
    <Updatesubadmin id={id} open={open} handleClose={()=> setOpen(false)} />


</>
  );
};

export default CreateAdminForm;
