import React from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import { Edit } from 'lucide-react';
import DataService from '../services/requestApi'
import { useEffect, useState } from 'react';
import UpdateProductModal from '../admincomponents/Modals/UpdateProducte';
import { BASEURL } from '../services/http-common';
const Allproduct = () => {
    const {saasId , storeId} = JSON.parse(localStorage.getItem("user_data"))
    const [page, setPage] = useState(1)
    const [count , setCount] = useState(0)
    const [selectedRow, setSelectedRow] = useState('')

    const handleEdit = (row)=>{
        setSelectedRow(row)
        setOpen(true)
    }

    const columns = [
       { name: 'Item ID', selector: row => row.item_id, sortable: true },
       { name: 'Item Name', selector: row => row.item_name, sortable: true },
       { name: 'UOM', selector: row => row.UOM, sortable: true },
       { 
          name: 'Thumbnail', 
          selector: row => (
             <label style={{ cursor: 'pointer' }}>
                <img 
                    src={BASEURL.ENDPOINT_URL+`/item/get-image/${row?.item_id}`} 
                    alt="Thumbnail" 
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                />
                <input 
                    type="file" 
                    style={{ display: 'none' }} 
                    onChange={(e) => handleImageChange(e, row)} 
                />
             </label>
          ), 
          sortable: false 
       },
       { name: 'Stock', selector: row => row.stock, sortable: true },
       { name: 'Description', selector: row => row.description, sortable: true },
       { name: 'Price', selector: row => row.price, sortable: true },
       { name: 'Actual Price', selector: row => row.actual_price, sortable: true },
       { name: 'Discount', selector: row => row.discount, sortable: true },
       { name: 'Tax', selector: row => row.tax, sortable: true },
       { name: 'Category', selector: row => row.category, sortable: true },
       { 
          name: 'Action', 
          cell: row => <Edit className='cursor-pointer' onClick={()=>handleEdit(row)}/>, 
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
       },
       { name: 'HSN Code', selector: row => row.hsn_code, sortable: true },
       { name: 'Barcode', selector: row => row.barcode, sortable: true },
       { name: 'Status', selector: row => row.status, sortable: true },
    ];

    const handleImageChange = async(e, row) => {
       const file = e.target.files[0];
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await DataService.AddThumbnailImage(row.item_id, formData);
        if (response.status === 200) {
          console.log('Image uploaded successfully');
          fetchData(); // Refresh the data after uploading the image
        } else {
          console.error('Error uploading image:', response.data.message);
        }
      } catch (error) {
        console.log(error)
      }
    };
   const [open, setOpen] = useState(false)
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await DataService.GetItemByPage(saasId,storeId,page);
            if (response && response.data) {
                setData(response.data.data || []);
                setCount(response.data.count|| 0)
            } else {
                console.warn("No data received from the API.");
                setData([]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        }
    };

    useEffect(() => {

        fetchData();
    }, [page]);

    const handlePageChange = async (newPage) => {
        setPage(newPage);
    };


  return (
    <div>
        <CustomDataTable count={count} handlePageChange={handlePageChange} columns={columns} data={data} title="All Product"/>
        <UpdateProductModal
        open={open}
        handleClose={() => setOpen(false)}
        selectedRow={selectedRow}
        fetchData={fetchData}
        />
    </div>
  )
}

export default Allproduct