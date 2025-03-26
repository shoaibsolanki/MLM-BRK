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
  const isAuthenticated = localStorage.get("authToken");
  console.log("isAuthenticated", isAuthenticated);
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
    localStorage.removeItem("authData");
    localStorage.clear();
    // Cookies.remove("authToken");
    window.location.reload();
    navigate("/login")
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
  const GetAddressByCoordinates = async (latitude, longitude) => {
    try {
      const GOOGLE_API_KEY = "AIzaSyC9AHMzRRjBrAhpqI1m2xErTCH_3h-kLlE"; // Replace with your actual Google Maps API key
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
      );
      
      const data = await response.json();
      
      if (data.status === 'OK' && data.results.length > 0) {
        // Extract the formatted address
        const formattedAddress = data.results[0].formatted_address;
        
        // Extract postal code from address components
        const addressComponents = await data.results.find(component =>
          component.types.includes('route')
        )?.address_components || "Postal code not found";
        const PostalCode =await addressComponents.find(component =>
          component.types.includes('postal_code')
        )?.long_name || "Postal code not found";
        const Route =await data.results.find(component =>
          component.types.includes('route')
        )?.formatted_address || "Route not found";
        // Set the address and log the postal code
        // setAddress(formattedAddress);
        // console.log("Formatted Address:", addressComponents.find(component =>
        //   component.types.includes('route')
        // ).long_name);
        // console.log("Postal Code:", PostalCode);
        // console.log("Postal Code:", Route);
        setAddress({
          postalCode: PostalCode,
          route: Route,
          town: addressComponents.find(component =>
            component.types.includes('locality') ||
            component.types.includes('political')
          ).long_name,
          street: addressComponents.find(component =>
            component.types.includes('route')
          ).long_name,
          Province: addressComponents.find(component =>
            component.types.includes('administrative_area_level_1')
          ).long_name,
          error: null,
        })
        
      } else {
        console.error("No address found for the given coordinates.");
        setAddress({
          postalCode: null,
          route: null,
          town: null,
          street: null,
          Province:null,
          error: "No address found for the given coordinates.",
        });
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress({
        postalCode: null,
        route: null,
        town: null,
        street: null,
        Province:null,
        error: "Error fetching address.",
      });
    }
  };;
  
  const getLocation =async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async(position) => {
          const { latitude, longitude } = position.coords;
          await GetAddressByCoordinates(latitude, longitude);
          setLocation({
            latitude: latitude,
            longitude: longitude,
            error: null,
          });
          // console.log(latitude, longitude)
        },
        (error) => {
          setLocation({ ...location, error: error.message });
        },
        {
          enableHighAccuracy: true, // Use high accuracy mode for better results
        }
      );
    } else {
      setLocation({ ...location, error: "Geolocation is not supported by this browser." });
    }
  };
  const getLocationAndOpenMaps = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // setUserLocation({ latitude, longitude });

          // Open Google Maps with directions, using the restaurant's address
          const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(address)}&travelmode=driving`;
          window.open(googleMapsUrl, '_blank'); // Open in new tab
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to retrieve your location');
        },
        {
          enableHighAccuracy: true,
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
      const [snackbarMessage, setSnackbarMessage] = React.useState("");
      const [snackbarSeverity, setSnackbarSeverity] = React.useState("success");
  
      const handleSnackbarClose = () => {
          setSnackbarOpen(false);
      };

  return (
    <AuthContext.Provider
      value={{
        snackbarOpen,
        setSnackbarOpen,
        snackbarMessage,
        setSnackbarMessage,
        snackbarSeverity,
        setSnackbarSeverity,
        handleSnackbarClose,
        snackbarSeverity,
        authData,
        isAuthenticated,
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
        getLocation,
        location,
        getaddress,
        getLocationAndOpenMaps
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
