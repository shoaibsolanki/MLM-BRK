import axios from 'axios';
import DataService from "../../services/requestApi";

const API_BASE_URL = 'https://your-api-url.com'; // Replace with your actual API URL
const saasid = "22";
const storeid = "22001";
export const getCategories = async () => {
  try {
    const response =  await DataService.GetMasterCategory(saasid,storeid);
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const getCategory = async (id) => {
  try {
    const response =  await DataService.GetSubCategory(saasid,storeid,id);
    return response;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

export const getProducts = async () => {
  try {
    const response =  await DataService.GetItemByPage(saasid,storeid,"1");
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products?categoryId=${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

export const getProductsBySubcategory = async (categoryId, subcategoryId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products?categoryId=${categoryId}&subcategoryId=${subcategoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products by subcategory:", error);
    return [];
  }
};

export const getFeaturedProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/products?featured=true`);
    return response.data;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
};
