import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import DataService from "../services/requestApi";
import { useSnackbar } from "notistack";
const Combomange = () => {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
  const [selectedcategory, setSelectedCategory] = useState("");
  const [masterCategory, setMasterCategory] = useState([]);
  const [subcategories, setSubCategories] = useState([])
  const [selectedsubcategory, setSelectedsubCategory]= useState('')
  const [list, setList]=useState([])
  const [selecteditemlist, setSelecteditemlist] = useState([]);
  const [comboImage, setComboImage] = useState(null)
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Set initial values for saasId and storeId
  React.useEffect(() => {
    setValue("saasId", saasId);
    setValue("storeId", storeId);
  }, [setValue, saasId, storeId]);

  const getMatserCategory = async () => {
    try {
      const response = await DataService.GetMasterCategory(saasId, storeId);
      setMasterCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMatserCategory();
  }, []);

   const subCategory = async ()=>{
          try {
            const response = await DataService.GetSubCategory(saasId,storeId,selectedcategory)
            console.log(response)
            setSubCategories(response.data.data)
          } catch (error) {
            console.log(error)
          }
        }
       useEffect(() => {
         if(selectedcategory){
          subCategory()
         }
       }, [selectedcategory])

       const getItemData = async ()=>{
        try {
            const response = await DataService.GetItembySubcategory(saasId,storeId,selectedsubcategory)
            setList(response.data.data)
        } catch (error) {
            console.log(error)
        }
       }
         useEffect(() => {
            if(selectedsubcategory){
                getItemData()
            }
        },[selectedsubcategory])

  const onSubmit = async (data) => {
    // e.preventDefault();
    console.log(data);
    if (data.itemIdLists.length < 2) {
      enqueueSnackbar("Please select at least two items", { variant: "error" });
      return;
    }
    try {
      const response = await DataService.AddCombo(data);
      console.log(response);
      if (response.data.status) {
        enqueueSnackbar("Combo Added Successfully", { variant: "success" });
        reset();
        setSelecteditemlist([]);
        if(comboImage){
            addComboImage(response.data.data.comboId)
        }
      } else {
        enqueueSnackbar(response.data.message, { variant: "error" });
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: "error" });
      console.log(error);
    }
  };
  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setSelecteditemlist(typeof value === "string" ? value.split(",") : value);
    setValue(
      "itemIdLists",
      typeof value === "string" ? value.split(",") : value
    );
  };

  const addComboImage = async (id) => {
    try {
        let formData = new FormData();
        formData.append('file', comboImage);
        console.log(formData, comboImage);
        const response = await DataService.AddComboimage(id, formData);
        console.log(response);
    } catch (error) {
        console.log(error);
    }
  }

const handleComboImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
        setComboImage(file);
        // setValue("comboImage", file); // Set the file in the form data
    }
};
  

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Submit New Combo</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-2"
      >
        <TextField
          label="Price"
          name="price"
          type="number"
          sx={{ mt: 2 }}
          {...register("price", { required: "price is required" })}
          error={!!errors.price}
          helperText={errors.price ? errors.price.message : ""}
          fullWidth
        />
        <TextField
          label="Start Date"
          name="startDate"
          type="date"
          {...register("startDate", { required: "Start Date is Required" })}
          error={!!errors.startDate}
          helperText={errors.startDate ? errors.startDate.message : ""}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="End Date"
          name="endDate"
          type="date"
          {...register("endDate", { required: "End Date is Required" })}
          error={!!errors.endDate}
          helperText={errors.endDate ? errors.endDate.message : ""}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          onChange={(e) => {
            setSelectedCategory(e.target.value);
          }}
          label="Category"
          select
          fullWidth
          variant="outlined"
        >
          <MenuItem value="">
            <em>Select Category</em>
          </MenuItem>
          {masterCategory.map((category) => (
            <MenuItem
              key={category.masterCategoryId}
              value={category.masterCategoryId}
            >
              {category.masterCategoryName}
            </MenuItem>
          ))}
        </TextField>
        <TextField
                  name='category'
                //   value={productData?.category}
                  onChange={(e) =>{ setSelectedsubCategory(e.target.value)}}
                  label="Sub Category"
                  select
                  fullWidth
                  variant="outlined"
                  >
                  <MenuItem value="">
                    <em>Select Sub Category</em>
                  </MenuItem>
                  {subcategories.map((subcategory) => (
                    <MenuItem key={subcategory.id} value={subcategory.category}>
                    {subcategory.category}
                    </MenuItem>
                  ))}
                  </TextField>
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
              <MenuItem key={itemId.item_ID} value={itemId.item_ID}>
                {itemId.item_name}
              </MenuItem>
            ))}
          </Select>
          {errors.itemIdLists && (
            <p style={{ color: "red" }}>{errors.itemIdLists.message}</p>
          )}
        </FormControl>
        <TextField
            type="file"
            inputProps={{ accept: "image/*" }}
            onChange={handleComboImageChange}
            fullWidth
            variant="outlined"
            // label="Upload File"
        />
        <Button disabled={isSubmitting} variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Combomange;
