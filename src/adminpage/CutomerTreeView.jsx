import React, { useState } from 'react'
import CustomerTreeCanvas from '../admincomponents/Modals/CustomerTree'
import { useParams } from 'react-router-dom';
import DataService from '../services/requestApi'
const CutomerTreeView = () => {
    const {Custid} = useParams()
   const [customerData , setCustomerdata] = useState([])
      
    const fetchCustomerTree = async () => {
        try {
            const response = await DataService.GetMLMTree(Custid);
            if (response && response.data) {
                console.log('Customer Tree Data:', response.data);
                setCustomerdata(response?.data?.data)
                // You can update the customerData here if needed
            }
        } catch (error) {
            console.error('Error fetching customer tree:', error);
        }
    };

    React.useEffect(() => {
        fetchCustomerTree();
    }, [Custid]);


  return (
    <div>
        <CustomerTreeCanvas data={customerData}/>
    </div>
  )
}

export default CutomerTreeView