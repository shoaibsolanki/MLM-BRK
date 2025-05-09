import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Backdrop,
  Fade,
} from "@mui/material";
import DataService from "../../services/requestApi";
import ReactQuill from "react-quill";
import { useSnackbar } from "notistack";
import "react-quill/dist/quill.snow.css";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const UpdateBlogModal = ({ open, handleClose, selected, getData }) => {
  const [productData, setProductData] = useState([]);
  const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
  const { enqueueSnackbar } = useSnackbar();
  const [isLoding, setIsloading] = useState(false);
  const handleQuillChange = (value) => {
    console.log(value);
    setProductData({
      ...productData,
      description: value, // Hardcoded the key here since ReactQuill doesn't provide event
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData({
      ...productData,
      ["file"]: file,
    });
  };

  useEffect(() => {
    if (open) {
      setProductData({
        ...productData,
        name: selected?.title,
        description: selected?.description,
      });
    }
  }, [open]);

  const HandleAddBlog = async () => {
    if (!productData.name || !productData.description ) {
      enqueueSnackbar("Please fill in all required fields.", {
        variant: "warning",
      });
      return;
    }
    setIsloading(true);
    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("file", productData.file);

    try {
      const response = await DataService.UpdateBlogbyid(selected?.id, formData);
      if (response?.status === 200) {
        enqueueSnackbar("Blog Updated successfully!", { variant: "success" });
        setProductData({}); // Reset form
        getData();
        handleClose();
      } else {
        enqueueSnackbar(response?.message || "Failed to Update blog.", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      enqueueSnackbar("An error occurred while adding the blog.", {
        variant: "error",
      });
    } finally {
      setIsloading(false);
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
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" mb={2}>
            Update Blog
          </Typography>
          <form className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="form-group">
              <TextField
                name="name"
                value={productData?.name}
                onChange={handleInputChange}
                label="Title"
                fullWidth
                variant="outlined"
              />
            </div>
            <div className="form-group">
              <label className="block mb-2">Thumbnail Image</label>
              <input
                onChange={handleFileChange}
                type="file"
                className="block w-full text-sm text-gray-500  border-2 p-1 rounded"
              />
              <small className="text-gray-500">
                270px X 200px (jpg, jpeg, png, gif, svg)
              </small>
            </div>
            <div className="form-group md:col-span-3   h-[180px]">
              <ReactQuill
                theme="snow"
                name="description"
                value={productData?.description}
                onChange={handleQuillChange}
                modules={modules}
                formats={formats}
                style={{ height: "100px" }}
              />
            </div>
            <Button
              disabled={isLoding}
              onClick={HandleAddBlog}
              variant="contained"
            >
              Submit
            </Button>
            <Button
              onClick={handleClose}
              variant="contained"
            >
              Close
            </Button>
          </form>
        </Box>
      </Fade>
    </Modal>
  );
};

export default UpdateBlogModal;
