import React, { useEffect, useState } from "react";
import { Modal, TextField, Button, Box } from "@mui/material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useForm } from "react-hook-form";
import DataService from "../../services/requestApi";
import { useSnackbar } from "notistack";
const EditComboModal = ({GetCombolist, open, handleClose, comboData }) => {
  const [formData, setFormData] = useState(comboData);
  const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
  const [selectedcategory, setSelectedCategory] = useState("");
  const [masterCategory, setMasterCategory] = useState([]);
  const [subcategories, setSubCategories] = useState([]);
  const [selecteditemlist, setSelecteditemlist] = useState([]);
  const [selectedsubcategory, setSelectedsubCategory] = useState("");
  const [list, setList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  React.useEffect(() => {
    console.log(comboData)
    setValue("saasId", saasId);
    setValue("storeId", storeId);
    setValue("startDate", comboData.startDate)
    setValue("endDate", comboData.endDate)
    setValue("price", comboData.price)
    // const itemIdArray = comboData.item_data?.map((item) =>
    //     typeof item === "object" && item.item_ID ? item.item_ID.toString() : item.toString()
    // );
    // setValue("itemIdLists", itemIdArray)
    // setSelecteditemlist(itemIdArray);
  }, [open]);

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

  const subCategory = async () => {
    try {
      const response = await DataService.GetSubCategory(
        saasId,
        storeId,
        selectedcategory
      );
      console.log(response);
      setSubCategories(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (selectedcategory) {
      subCategory();
    }
  }, [selectedcategory]);

  const getItemData = async () => {
    try {
      const response = await DataService.GetItembySubcategory(
        saasId,
        storeId,
        selectedsubcategory
      );
      setList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (selectedsubcategory) {
      getItemData();
    }
  }, [selectedsubcategory]);

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

  const onSubmit = async(data) => {
    console.log(data)
    try {
        const response = await DataService.EditCombo( comboData.comboId,data) 
        if(response.data.status){
            enqueueSnackbar("Combo Updated Successfully", {variant:"success"})
            GetCombolist()
        }
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
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
            name="category"
            //   value={productData?.category}
            onChange={(e) => {
              setSelectedsubCategory(e.target.value);
            }}
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
          
          <Button
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
          <Button
          onClick={handleClose}
            variant="contained"
            color="primary"
            type="button"
          >
            Close
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default EditComboModal;
