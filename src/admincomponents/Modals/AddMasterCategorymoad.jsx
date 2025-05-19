import React, { useEffect, useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import DataService from "../../services/requestApi";
import { useSnackbar } from "notistack";
const AddMasterCategoryModal = ({ getMatserCategory }) => {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, reset, setValue } = useForm();
  const [file, setFile] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    setValue("saas_id", saasId);
    setValue("store_id", storeId);
  }, [open]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    try {
      if(!file) {
        enqueueSnackbar("Please select an image file", { variant: "error" });
        return;
      }
      const response = await DataService.AddMasterCategory(data);
      if (response.data.status) {
        enqueueSnackbar("Category Add Successfully", { variant: "success" });
        getMatserCategory();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Master Category
      </Button>
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
          <Typography variant="h6" component="h2" mb={2}>
            Add Master Category
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="master_category_name"
              control={control}
              defaultValue=""
              rules={{ required: "Category Name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Category Name"
                  fullWidth
                  margin="normal"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
            <TextField
              type="file"
              onChange={onChange}
              InputProps={{
                            inputProps: {
                                accept: '.jpg,.jpeg,.png,.gif'
                            }
                        }}
              variant="outlined"
              fullWidth
            />
            <small className="text-gray-500">
              270px X 200px (jpg, jpeg, png, gif, svg)
            </small>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button
                onClick={handleClose}
                variant="outlined"
                color="secondary"
                sx={{ mr: 1 }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddMasterCategoryModal;
