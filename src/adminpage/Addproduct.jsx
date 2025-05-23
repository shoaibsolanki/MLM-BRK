import React, { useEffect, useState } from "react";
import { TextField, MenuItem, Button, IconButton } from "@mui/material";
import { styled } from "@mui/system";
import { color } from "framer-motion";
import DataService from "../services/requestApi";
import { useSnackbar } from "notistack";
import { Add } from "@mui/icons-material";
import { Trash } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
  const [tumbnailimage, setTumbnailimage] = useState(null);
  const navigate = useNavigate()
  const handletumbnail = (e) => {
    const file = e.target.files[0];
    setTumbnailimage(file);
  };
  const [productData, setProductData] = useState({
    item_name: "",
    price: 0,
    price_pcs: 0,
    discount: 0,
    special_description: "",
    description: "",
    discount_type: "",
    opening_qty: 0,
    actual_price: 0,
    mrp: 0,
    brand: "",
    tax: 0,
    status: "",
    saas_id: "",
    store_id: "",
    hsn_code: "",
    promo_id: "",
    category: "",
    barcode: "",
    conc_id: "",
    dept: "",
    item_class: "",
    sub_class: "",
    item_code: "",
    class_code: 0,
    dept_code: 0,
    combo: "",
    UOM: "",
    rp: 0,
    videoUrl: "",
    colorList: [],
  });
  useEffect(() => {
    setProductData((prevData) => ({
      ...prevData,
      saas_id: saasId,
      store_id: storeId,
    }));
  }, [saasId, storeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "discount" &&
      productData.discount_type === "percentage" &&
      value > 100
    ) {
      enqueueSnackbar("Discount percentage cannot exceed 100.", {
        variant: "error",
      });
      return;
    }
    if (
      name === "discount" &&
      productData.discount_type === "flat" &&
      value > Number(productData.actual_price)
    ) {
      enqueueSnackbar("Discount Not More then Mrp.", { variant: "error" });
      return;
    }
    console.log(name, value);
    setProductData({
      ...productData,
      [name]: value,
    });
  };
  const handleQuillChange = (value) => {
    console.log(value);
    setProductData({
      ...productData,
      description: value, // Hardcoded the key here since ReactQuill doesn't provide event
    });
  };

  const StyledButton = styled(Button)({
    marginTop: "20px",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    borderRadius: "8px",
    backgroundColor: "#383a3a", // Gray Button
    color: "#fff", // White Text for Contrast
    transition: "0.3s",
    "&:hover": {
      backgroundColor: "#e6b800", // Slightly Darker Gold on Hover
      color: "#1e1e1e", // Black Text for Contrast
    },
  });

  const [masterCategory, setMasterCategory] = useState([]);
  const [selectedcategory, setSelectedCategory] = useState("");
  const [subcategories, setSubCategories] = useState([]);
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

  useEffect(() => {
    if (productData.discount_type === "percentage" && productData.discount) {
      const discountValue =
        (productData.actual_price * productData.discount) / 100;
      setProductData((prevData) => ({
        ...prevData,
        // discount: discountValue,
        price: productData.actual_price - discountValue,
      }));
    } else if (productData.discount_type === "flat" && productData.discount) {
      const discountValue = productData.discount;
      setProductData((prevData) => ({
        ...prevData,
        // discount: discountValue,
        price: productData.actual_price - discountValue,
      }));
    }
  }, [productData.discount, productData.discount_type]);

  const addProduct = async () => {
    console.log(productData);
    if (
      !productData.item_name ||
      !productData.price ||
      !productData.description ||
      !productData.actual_price||
      !tumbnailimage
    ) {
      enqueueSnackbar(
        "Please fill in all required fields: Product Name, Price, Description, and MRP , Thumbnail Image",
        { variant: "error" }
      );
      return;
    }

    if(productData.item_code.length < 8 || productData.hsn_code.length < 4){
      enqueueSnackbar(
        "Please fill in all required fields: Product ID Minimum 8 and HSN Code Minimum 4",
        { variant: "error" }
      );
      return;
    }

    try {
      const response = await DataService.AddProduct(productData);
      if (response.data.status) {
        enqueueSnackbar("Product Added Successfully", { variant: "success" });
        handleUpload(response.data.data.item_id);
        AddThumbnailImage(response.data.data.item_id);
        navigate('products/list')
        setProductData({
          item_name: "",
          price: 0,
          price_pcs: 0,
          discount: 0,
          discount_type: "",
          special_description: "",
          description: "",
          opening_qty: 0,
          actual_price: 0,
          mrp: 0,
          brand: "",
          tax: 0,
          status: "",
          saas_id: "",
          store_id: "",
          hsn_code: "",
          promo_id: "",
          category: "",
          barcode: "",
          conc_id: "",
          dept: "",
          item_class: "",
          sub_class: "",
          item_code: "",
          class_code: 0,
          dept_code: 0,
          combo: "",
          UOM: "",
          rp: 0,
          videoUrl: "",
          colorList: [],
        });
      }
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Failed to add product. Please try again later.", {
        variant: "error",
      });
    }
  };

  const AddThumbnailImage = async (id) => {
    try {
      const formData = new FormData();
      if (!tumbnailimage) {
        console.log("Thumbnail image not found");
        return;
      }
      formData.append("file", tumbnailimage);
      const response = await DataService.AddThumbnailImage(id, formData);
    } catch (error) {
      console.log(error);
    }
  };

  const [files, setFiles] = useState(Array(3).fill(null));

  const handleFileChange = (event, index) => {
    const newFiles = [...files];
    newFiles[index] = event.target.files[0]; // Store the selected file
    console.log(newFiles);
    setFiles(newFiles);
  };

  const addFileInput = () => {
    setFiles([...files, null]); // Add a new empty file input
  };

  const removeFileInput = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleUpload = async (id) => {
    const formData = new FormData();
    const validFiles = files.filter((file) => file !== null); // Filter out null values
    validFiles.forEach((file) => {
      formData.append("file", file);
    });
    console.log(formData, validFiles, files);
    if (validFiles.length <= 0) {
      return;
    }
    try {
      const response = await DataService.AddImages(id, formData);
      console.log("Upload Success:", response.data);
      setFiles(Array(3).fill(null));
    } catch (error) {
      console.error("Upload Failed:", error);
    }
  };

 const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ['small', false, 'large', 'huge'] }], // Add this line
    ['bold', 'underline', 'italic'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['clean'],
    ['code-block'],
  ],
};

      const formats = [
  'font',
  'size', // Add this line
  'bold',
  'underline',
  'italic',
  'color',
  'background',
  'list',
  'bullet',
  'align',
  'link',
  'image',
  'video',
  'clean',
  'code-block',
];

  const [uomlist, setUomlist] = useState([]);

  const GetUomList = async () => {
    try {
      const response = await DataService.GetUom(saasId, storeId);
      if (response.data.status) {
        setUomlist(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetUomList();
  }, []);

  return (
    <div className="p-6 bg-white rounded">
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="form-group">
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
        </div>
        <div className="form-group">
          <TextField
            name="category"
            value={productData?.category}
            onChange={handleInputChange}
            label="Sub Category"
            select
            fullWidth
            variant="outlined"
          >
            <MenuItem value="">
              <em>Select Sub Category</em>
            </MenuItem>
            {subcategories &&
              subcategories?.map((subcategory) => (
                <MenuItem
                  key={subcategory.id}
                  value={subcategory.category_name}
                >
                  {subcategory.category_name}
                </MenuItem>
              ))}
          </TextField>
        </div>
        <div className="form-group">
          <TextField
            name="item_name"
            value={productData?.item_name}
            onChange={handleInputChange}
            label="Product Name"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            name="item_code"
            inputProps={{ minLength: 8 }}
            value={productData?.item_code}
            onChange={handleInputChange}
            label="Product ID"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            name="hsn_code"
            inputProps={{ minLength: 4 }}

            value={productData?.hsn_code}
            onChange={handleInputChange}
            label="HSN Code"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            name="opening_qty"
            value={productData?.opening_qty}
            onChange={handleInputChange}
            label="Stock"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            name="tax"
            value={productData?.tax}
            onChange={handleInputChange}
            label="GST"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            name="combo"
            value={productData?.combo}
            onChange={handleInputChange}
            label="Combo"
            select
            fullWidth
            variant="outlined"
          >
            <MenuItem value="">
              <em>Select Type</em>
            </MenuItem>
            <MenuItem value="YES">
              <em>YES</em>
            </MenuItem>
            <MenuItem value="No">
              <em>No</em>
            </MenuItem>

            {/* Add more options here */}
          </TextField>
        </div>
        <div className="form-group">
          <TextField
            name="actual_price"
            value={productData?.actual_price}
            onChange={handleInputChange}
            label="MRP"
            fullWidth
            variant="outlined"
          />
        </div>

        <div className="form-group">
          <div className="form-group">
            {/* <label className="block mb-2">Discount Type</label> */}
            <div className="flex items-center my-2">
              <label className="mr-4">
                <input
                  type="radio"
                  name="discount_type"
                  value="percentage"
                  checked={productData.discount_type === "percentage"}
                  onChange={handleInputChange}
                />
                Percentage
              </label>
              <label>
                <input
                  type="radio"
                  name="discount_type"
                  value="flat"
                  checked={productData.discount_type === "flat"}
                  onChange={handleInputChange}
                />
                Flat
              </label>
            </div>
          </div>
          <TextField
            name="discount"
            type="number"
            value={productData?.discount}
            onChange={handleInputChange}
            label="Discount"
            fullWidth
            variant="outlined"
          />
        </div>

        <div className="form-group">
          <TextField
            name="price"
            value={productData?.price}
            onChange={handleInputChange}
            label="Price"
            fullWidth
            variant="outlined"
          />
        </div>

        <div className="form-group">
          <TextField
            name="rp"
            value={productData?.rp}
            onChange={handleInputChange}
            label="Reward Point"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <TextField
            name="UOM"
            value={productData?.UOM}
            onChange={handleInputChange}
            label="Unit"
            fullWidth
            variant="outlined"
            select
          >
            <MenuItem value="">
              <em>Select Uom</em>
            </MenuItem>
           {uomlist && uomlist?.map((el)=>{return(

            <MenuItem value={el.uomname}>
              <em>{el.uomname}</em>
            </MenuItem>)})}
            
          </TextField>
        </div>
        <div className="form-group">
          {/* <label className="block mb-2">Product Video</label> */}
          <TextField
            name="videoUrl"
            value={productData?.videoUrl}
            onChange={handleInputChange}
            label="Video URL"
            fullWidth
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <label className="block mb-2">Thumbnail Image</label>
          <input
          accept="image/*"
            onChange={handletumbnail}
            type="file"
            className="block w-full text-sm text-gray-500  border-2 p-1 rounded"
          />
          <small className="text-gray-500">
            270px X 200px (jpg, jpeg, png, gif, svg)
          </small>
        </div>
        {/* <div> */}
        {files.map((file, index) => (
          <div className="form-group" key={index}>
            <label className="block mb-2">Product Image {index + 1}</label>
            <input
              accept="image/*"
              onChange={(event) => handleFileChange(event, index)}
              type="file"
              className="block w-full text-sm text-gray-500 border-2 p-1 rounded"
            />
            <small className="text-gray-500">
              300px X 300px (jpg, jpeg, png, gif, svg)
            </small>
            <IconButton onClick={() => removeFileInput(index)} color="error">
              <Trash />
            </IconButton>
          </div>
        ))}
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

        {/* </div> */}
        {/* {Array.from({ length: 7 }, (_, i) => (
          <div className="form-group" key={i}>
            <label className="block mb-2">Product Image {i + 1}</label>
            <input type="file" className="block w-full text-sm text-gray-500 border-2 p-1 rounded" />
            <small className="text-gray-500">300px X 300px (jpg, jpeg, png, gif, svg)</small>
          </div>
        ))} */}

        {/*          
        <div className="form-group col-span-full">
         <Button onClick={addFileInput} startIcon={<Add />} variant="outlined">
        Add More Files
      </Button>
      <Button onClick={handleUpload} variant="contained" color="primary" style={{ marginLeft: 8 }}>
        Upload
      </Button>
        </div> */}
        <div className="form-group col-span-full">
          <StyledButton
            onClick={addFileInput}
            startIcon={<Add />}
            variant="outlined"
          >
            Add More Files
          </StyledButton>
          <StyledButton
            onClick={addProduct}
            variant="contained"
            color="primary"
            fullWidth
          >
            Submit
          </StyledButton>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
