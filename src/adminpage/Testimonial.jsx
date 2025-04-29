import React, { useEffect, useState } from 'react'
import CustomDataTable from '../admincomponents/Microcomponents/DataTable'
import DataService from '../services/requestApi'
import DOMPurify from 'dompurify'
import { Edit, Trash } from 'lucide-react'
import { useSnackbar } from 'notistack'
import UpdateTestimonialModal from '../admincomponents/Modals/UpdateTestimonialmodal'
const Testimonial = () => {
    const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
   const {enqueueSnackbar} =useSnackbar()
const [open, setOpen] = useState(false)
const [selected,setSelectedRow] =useState("")
    const handleDelete = async (id) => {
        try {
            const response = await DataService.DeleteTestimonial(id);
            console.log(response.data);
            if(response.data.status){
                enqueueSnackbar('Testimonial Deleted Successfully', {variant: "success"})
                FetchData()
            }
        } catch (error) {
            enqueueSnackbar('Error Occur in Api', {variant: "error"})
            console.log(error);
        }
    }

    const handleEdit =(row)=>{
        setOpen(true)
        setSelectedRow(row)
    }


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
            cell: row => (
              <div
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(row.description) }}
                style={{ maxWidth: '200px', overflow: 'hidden' }}
              />
            ),
            sortable: true
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
        {
            name: 'Actions',
            cell: row => (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={() => handleEdit(row)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Edit className="lucide lucide-edit" style={{ fontSize: '20px', color: '#007bff' }}/>
                    </button>
                    <button onClick={() => handleDelete(row.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <Trash className="lucide lucide-trash" style={{ fontSize: '20px', color: '#dc3545' }}/>
                    </button>
                </div>
            ),
        },
    ];
     const [data,setData]= useState([])
    const FetchData = async () => {
        try {
            const response = await DataService.GetTestimonial(saasId, storeId);
            console.log(response.data);
            setData(response.data.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        FetchData()
    }, [])
    

  return (
    <div>

   <CustomDataTable columns={columns} data={data}/>
   <UpdateTestimonialModal FetchData={FetchData} open={open} handleClose={()=>setOpen(false)} defaultValues={selected} />
    </div>
  )
}

export default Testimonial