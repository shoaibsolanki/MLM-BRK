import React, { useState } from 'react'
import DataService from '../../services/requestApi'
import ReactQuill from 'react-quill';
import { Button, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import "react-quill/dist/quill.snow.css";
const AddBlog = () => {
    const [productData, setProductData] = useState([])
    const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
    const {enqueueSnackbar} = useSnackbar()
    const [isLoding , setIsloading] = useState(false)
    const handleQuillChange = (value) => {
        console.log(value);
        setProductData({
          ...productData,
          description: value, // Hardcoded the key here since ReactQuill doesn't provide event
        });
      };

      const handleInputChange = (e)=>{
        const {name , value} = e.target
        console.log(name ,value)
        setProductData({
            ...productData,
            [name]:value,
        })
      }
      const handleFileChange = (e)=>{
        const file = e.target.files[0];
        setProductData({
            ...productData,
            ["file"]: file
        });
      }

    const HandleAddBlog = async () => {
      if (!productData.title || !productData.description || !productData.file) {
        enqueueSnackbar("Please fill in all required fields.", { variant: "warning" });
        return;
      }
      setIsloading(true)
      const formData = new FormData();
      formData.append("title", productData.title);
      formData.append("description", productData.description);
      formData.append("file", productData.file);

      try {
        const response = await DataService.AddBlog(saasId, storeId, formData);
        if (response?.status === 200) {
        enqueueSnackbar("Blog added successfully!", { variant: "success" });
        setProductData({}); // Reset form
        } else {
        enqueueSnackbar(response?.message || "Failed to add blog.", { variant: "error" });
        }
      } catch (error) {
        console.error("Error adding blog:", error);
        enqueueSnackbar("An error occurred while adding the blog.", { variant: "error" });
      }finally{
        setIsloading(false)
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
    <div className='bg-white rounded p-8'>
        <h1 className='text-2xl my-2'>Add Blog</h1>
    <form className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
         <div className="form-group">
                  <TextField
                    name="title"
                    value={productData?.title}
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
         <div className="form-group md:col-span-3  md:h-[130px] h-[180px]">
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
                <Button disabled ={isLoding} onClick={HandleAddBlog} variant='contained' >
                    Submit
                </Button>
    </form>
    </div>
  )
}

export default AddBlog