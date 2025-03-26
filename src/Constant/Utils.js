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
        const addressComponents = data.results[0].address_components;
        const postalCode = addressComponents.find(component =>
          component.types.includes('postal_code')
        )?.long_name || "Postal code not found";
        const Route = data.results.find(component =>
          component.types.includes('route')
        )?.formatted_address || "Route not found";
        // Set the address and log the postal code
        setAddress(formattedAddress);
        console.log("Formatted Address:", formattedAddress);
        console.log("Postal Code:", postalCode);
        console.log("Postal Code:", Route);
        
      } else {
        console.error("No address found for the given coordinates.");
        setAddress("No address found.");
        console.log(data);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setAddress(`Error: ${error.message}`);
    }
  };;
  
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude: latitude,
            longitude: longitude,
            error: null,
          });
          GetAddressByCoordinates(latitude, longitude);
          console.log(latitude, longitude)
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

  export getLocation