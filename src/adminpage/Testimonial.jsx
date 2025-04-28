import React from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import DataService from '../services/requestApi'
const Testimonial = () => {

    const columns = [
        {
            name: 'SaaS ID',
            selector: row => row.saasId,
            sortable: true,
        },
        {
            name: 'Store ID',
            selector: row => row.storeId,
            sortable: true,
        },
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Image',
            selector: row => <img src={row.image} alt="item" style={{ width: '50px', height: '50px' }} />,
        },
        {
            name: 'Created Date',
            selector: row => row.created,
            sortable: true,
        },
        {
            name: 'ID',
            selector: row => row.id,
            sortable: true,
        },
    ];
     
    const FetchData = async ()=>{
        try {
            
        } catch (error) {
            console.log(error)
        }
    }

    const data = [
        {
            saasId: "6",
            storeId: "60001",
            name: "YourNameHere",
            description: "YourDescriptionHere",
            image: "http://103.148.165.246:8088/test/api/v1/item/get-image-filename/0cbd7479-550f-4cca-abbc-d6478dc5930cdow",
            created: "2025-04-28",
            id: 2
        }
    ];

  return (
    <div>

   <CustomDataTable columns={columns} data={data}/>

    </div>
  )
}

export default Testimonial