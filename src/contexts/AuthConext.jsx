import React, { createContext, useContext, useEffect, useState } from "react";
// import Cookies from "js-cookie";
import DataService from "../services/requestApi";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [allOrders, setAllOrders] = useState();
  const [selectedCat, setSelectedCat] = useState();
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [stores, setStores] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [getaddress, setAddress] = useState({
    postalCode:null,
    route:null,
    town:null,
    street:null,
    Province:null,
    error: null,
  });
  const [location, setLocation] = React.useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  const [authData, setAuthData] = useState(() => {
    const storedAuthData = JSON.parse(localStorage.getItem("authData"));
    if (storedAuthData) {
      return storedAuthData;
    } else {
      return { token: null, user: null };
    }
  });
  const { id } = authData;
  // const isAuthenticated = localStorage.get("authToken");
  // console.log("isAuthenticated", isAuthenticated);
  const selectedStore = localStorage.getItem('selectedStore');
  const parsedStore = selectedStore ? JSON.parse(selectedStore) : null;
  const { saas_id, store_id ,address} = parsedStore || {};
  const fetchProductApi = async (page) => {
    try {
      console.log("stores get", saas_id, store_id);
      if (!store_id && !saas_id) {
        navigate("/landing");
        return;
      }

      const response = await DataService.FetchProductApi(store_id, saas_id, page.toString());
      console.log(response.data.data);
      if(response.data.next==null){
        setHasMore(false);
      }
      return response.data;
    } catch (error) {
      console.error("Product fetch error", error);
      throw new Error(error);
    }
  };

  const fetchAndSetProducts = async () => {
    try {
      const productsData = await fetchProductApi(page);
      if (productsData && productsData.data) {
        const newProducts = productsData.data.map((item) => ({
          ...item,
          new_price: item.price,
          image_name: item.image_name1,
        }));

        setProducts((prevProducts) => [...prevProducts, ...newProducts]);

        // Check if more products are available
        if (newProducts.length === 0) {
          setHasMore(false);
        } else {
          // Increment page number for the next fetch
          setPage((prevPage) => prevPage + 1);
        }
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };
  const getOrderHistory = async (store_id, saas_id, id) => {
    try {
      const response = await DataService.OrderHistory(store_id, saas_id, id);
      const reversedOrders = response.data.data.slice().reverse();
      setAllOrders(reversedOrders);
    } catch (error) {
      console.error(error);
    }
  };
  // console.log(allOrders);
  // useEffect(() => {
  //   if(store_id,saas_id,id){
  //     getOrderHistory(store_id, saas_id, id);
  //   }
  // }, [id]);

  // useEffect(() => {
  //   fetchAndSetProducts();
  // }, []);

  useEffect(() => {
    const storedAuthData = JSON.parse(localStorage.getItem("authData"));
    if (storedAuthData) {
      setAuthData(storedAuthData);
    }
  }, []);

  const login = (data, token) => {
    setAuthData(data);
    localStorage.setItem("authData", JSON.stringify(data));
    // Cookies.set("authToken", token, { expires: 7 });
  };

  const logout = () => {
    console.log("Logged Out");
    setAuthData({ token: null, user: null });
    localStorage.removeItem("token");
    localStorage.clear();
    // Cookies.remove("authToken");
    window.location.reload();
    // navigate("/login")
  };

  const DataByCatogory=async (id)=>{
    try {
      const response =await DataService.GetItemByCatogory(id, saas_id)
      console.log(response)
      if(response.data.status){
        const updatedProducts = response.data.data.map((item) => ({
          ...item,
          new_price: item.price,
        
        }));
        setHasMore(false)
        setProducts(updatedProducts)
        setSelectedCat(id)
      }
    } catch (error) {
      console.log(error)
    }
  }


  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
      const [snackbarMessage, setSnackbarMessage] = React.useState("");
      const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  
      const handleSnackbarClose = () => {
          setSnackbarOpen(false);
      };


      //new devlopment
        const [categories, setCategories] = useState([]);
        
        
        const saasid = "5";
        const storeid = "50001";
      
        const getCategory = async () => {
          try {
            const response = await DataService.GetMasterCategory(saasid,storeid);
            if (response?.data?.data?.length > 0) {
              setCategories(response.data.data);
              // DataByCatogory(response.data.data[0].category_id);
            }
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };


        // Seach state
        const [searchKeyword, setSearchKeyword] = useState('');
        const [searchResults, setSearchResults] = useState([]);
  return (
    <AuthContext.Provider
      value={{
        searchKeyword, setSearchKeyword, searchResults, setSearchResults,
        storeid,
        saasid,
        // new 
        getCategory,
        categories,
        snackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
        setSnackbarMessage,
        snackbarSeverity,
        setSnackbarSeverity,
        handleSnackbarClose,
        // snackbarSeverity,
        authData,
        // isAuthenticated,     
        allOrders,
        selectedCat,
        id,
        login,
        logout,
        products,
        setProducts,
        fetchAndSetProducts,
        isPaymentSuccessful,
        setIsPaymentSuccessful,
        getOrderHistory,
        DataByCatogory,
        setStores,
        stores,
        hasMore,
       
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
