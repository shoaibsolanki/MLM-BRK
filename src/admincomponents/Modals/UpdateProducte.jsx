import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import DataService from "../../services/requestApi";
import { useSnackbar } from "notistack";
import { Trash } from "lucide-react";
import { useState } from "react";
import { Add } from "@mui/icons-material";
const UpdateProductModal = ({ open, handleClose, selectedRow, fetchData }) => {
  const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
  const { enqueueSnackbar } = useSnackbar();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      item_name: "",
      item_code: "",
      special_description: "",
      price: "",
      actual_price: "",
      product_cost: "",
      discount: "",
      tax: "",
      saas_id: "",
      store_id: "",
      category: "",
      barcode: "",
      opening_qty: "",
      received_qty: "",
      UOM: "",
      rp:""
    },
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { xs: "90%", sm: "80%", md: "70%", lg: "60%" }, // Responsive width
    bgcolor: "background.paper",
    boxShadow: 24,
    p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
    borderRadius: "8px",
    maxHeight: "90vh", // Set max height dynamically
    overflowY: "auto",
  };

  useEffect(() => {
    if (selectedRow) {
      console.log(selectedRow);
      reset({
        item_name: selectedRow?.item_name || "",
        item_code: selectedRow?.item_code || "",
        special_description: selectedRow?.special_description || "",
        price: selectedRow?.price || "",
        actual_price: selectedRow?.actual_price || "",
        product_cost: selectedRow?.product_cost || "",
        discount: selectedRow?.discount || "",
        tax: selectedRow?.tax || "",
        saas_id: saasId,
        store_id: storeId,
        category: selectedRow?.category || "",
        barcode: selectedRow?.barcode || "",
        opening_qty: selectedRow?.opening_qty || "",
        received_qty: selectedRow?.received_qty || "",
        UOM: selectedRow?.UOM || "",
        rp:selectedRow?.rp || "",
      });
      getImagesByItemId();
    }
  }, [selectedRow, reset, saasId, storeId]);

  const handleFormSubmit = async (data) => {
    try {
      const response = await DataService.UpdateItem(selectedRow?.item_id, data);
      if (response?.data?.status) {
        enqueueSnackbar("Product updated successfully!", {
          variant: "success",
        });
        fetchData();
        handleClose();
      } else {
        enqueueSnackbar(
          response?.data?.message ||
            "Failed to update product. Please try again.",
          {
            variant: "error",
          }
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
      enqueueSnackbar(
        error?.response?.data?.message || "An unexpected error occurred.",
        { variant: "error" }
      );
    }
  };
  const [addedimages, setAddedimages] = useState([]);
  const [files, setFiles] = useState(Array(3).fill(null));
  const handleFileChange = (event, index) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files[0]; // Store the selected file
    console.log(newFiles);
    setFiles(newFiles);
  };
  const removeFileInput = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };
  const addFileInput = () => {
    setFiles([...files, null]); // Add a new empty file input
  };

  const handleUpload = async () => {
    const formData = new FormData();
    const validFiles = files.filter((file) => file); // Filter out null or undefined values

    if (validFiles.length === 0) {
      enqueueSnackbar("Please select at least one file to upload.", {
        variant: "warning",
      });
      return;
    }

    validFiles.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await DataService.AddImages(
        selectedRow?.item_id,
        formData
      );
      if (response?.data?.status) {
        enqueueSnackbar("Images uploaded successfully!", {
          variant: "success",
        });
        getImagesByItemId();
        setFiles(Array(3).fill(null)); // Reset file inputs
      } else {
        enqueueSnackbar(
          response?.data?.message ||
            "Failed to upload images. Please try again.",
          { variant: "error" }
        );
      }
    } catch (error) {
      console.error("Upload Failed:", error);
      enqueueSnackbar(
        error?.response?.data?.message ||
          "An unexpected error occurred during upload.",
        { variant: "error" }
      );
    }
  };

  const getImagesByItemId = async () => {
    try {
      const response = await DataService.getImgbyItemId(selectedRow?.item_id);
      if (response.data.status) {
        console.log("Images fetched successfully:", response.data.data);
        setAddedimages(response.data.data); // Return the array of images
        if (response.data.data.length > 0) {
          setFiles(Array(0).fill(null));
        }else{
            setFiles(Array(3).fill(null));
        }
      } else {
        console.log("Failed to fetch images");
        setAddedimages([]);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      setAddedimages([]);
    }
  };

  const handleImageChange = async (e, id) => {
    const file = e.target.files[0];

    if (!file) {
      enqueueSnackbar("No file selected. Please choose an image.", {
        variant: "warning",
      });
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      enqueueSnackbar(
        "Invalid file type. Please upload a valid image (jpg, png, gif, svg).",
        { variant: "error" }
      );
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      enqueueSnackbar("File size exceeds 5MB. Please upload a smaller image.", {
        variant: "error",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await DataService.ImagesUpdate(id, formData);

      if (response?.status === 200) {
        enqueueSnackbar("Image uploaded successfully!", { variant: "success" });
        getImagesByItemId(); // Refresh the data after uploading the image
      } else {
        enqueueSnackbar(
          response?.data?.message ||
            "Failed to upload image. Please try again.",
          { variant: "error" }
        );
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      enqueueSnackbar(
        error?.response?.data?.message ||
          "An unexpected error occurred during image upload.",
        { variant: "error" }
      );
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" className="mb-4 ">
          Update Product
        </Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Item Name"
                fullWidth
                {...register("item_name", {
                  required: "Item name is required",
                })}
                error={!!errors.item_name}
                helperText={errors.item_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Item Code"
                fullWidth
                {...register("item_code", {
                  required: "Item code is required",
                })}
                error={!!errors.item_code}
                helperText={errors.item_code?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Special Description"
                fullWidth
                multiline
                rows={3}
                {...register("special_description")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Price"
                type="number"
                fullWidth
                {...register("price", { required: "Price is required" })}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Actual Price"
                type="number"
                fullWidth
                {...register("actual_price")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Product Cost"
                type="number"
                fullWidth
                {...register("product_cost")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Discount"
                type="number"
                fullWidth
                {...register("discount")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Tax"
                type="number"
                fullWidth
                {...register("tax")}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <TextField label="SaaS ID" fullWidth {...register("saas_id")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Store ID" fullWidth {...register("store_id")} />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField label="Category" fullWidth {...register("category")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Barcode" fullWidth {...register("barcode")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Opening Quantity"
                type="number"
                fullWidth
                {...register("opening_qty")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Received Quantity"
                type="number"
                fullWidth
                {...register("received_qty")}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="UOM" fullWidth {...register("UOM")} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="RP" fullWidth {...register("rp")} />
            </Grid>

            {addedimages?.map((image, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                key={index}
                className="flex items-center"
              >
                <label style={{ cursor: "pointer" }}>
                  <img
                    src={image.image}
                    alt="Thumbnail"
                    style={{
                      width: "300px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <input
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => handleImageChange(e, image.imageId)}
                  />
                </label>
              </Grid>
            ))}

            {files.map((file, index) => (
              <Grid item xs={12} sm={6}>
                <div className="form-group" key={index}>
                  <label className="block mb-2">
                    Product Image {index + 1}
                  </label>
                  <input
                    accept="image/*"
                    onChange={(event) => handleFileChange(event, index)}
                    type="file"
                    className="block w-full text-sm text-gray-500 border-2 p-1 rounded"
                  />
                  <small className="text-gray-500">
                    300px X 300px (jpg, jpeg, png, gif, svg)
                  </small>
                  <IconButton
                    onClick={() => removeFileInput(index)}
                    color="error"
                  >
                    <Trash />
                  </IconButton>
                </div>
              </Grid>
            ))}
            <Grid item xs={12} sm={6} className="flex items-center">
              <Button
                onClick={addFileInput}
                startIcon={<Add />}
                variant="outlined"
              >
                Add More Files
              </Button>
            </Grid>
          </Grid>
          <div className="flex justify-end space-x-4 mt-4">
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
            <Button
              type="button"
              onClick={handleUpload}
              variant="contained"
              color="primary"
            >
              New Image Add
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default UpdateProductModal;
