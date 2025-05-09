import React, { useEffect, useState } from 'react'
import CustomDataTable from '../../admincomponents/Microcomponents/DataTable'
import { Edit, Trash } from 'lucide-react';
import DataService from "../../services/requestApi"
import DOMPurify from 'dompurify'
import { useSnackbar } from 'notistack';
import UpdateBlogModal from './UpdateBlogModal';
const ViewBlogs = () => {

    const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
    const {enqueueSnackbar} = useSnackbar()
    const [data ,setData] = useState([]) 
    const [open , setOpen] = useState(false)
    const [selected , setSelected] = useState('')
const getData = async  ()=>{
    try {
        const response = await DataService.GetAllBlogs(saasId, storeId)
        setData(response.data.data)
    } catch (error) {
        console.log(error)
    }
} 

 const DeleteBlog = async(id)=>{
    try {
        const response =  await DataService.DeleteBlog(id)
        if(response.data.status){
            getData()
            enqueueSnackbar("Deleted Successfully", {variant:"success"})
        }else{
            enqueueSnackbar(response?.data?.message || "Something is Wrong", {variant:"error"})
        }
    } catch (error) {
        enqueueSnackbar(error?.message || "Something is Wrong", {variant:"error "})
        console.log(error)
    }
 }
   
 const handledit = (row)=>{
    setOpen(true)
    setSelected(row)
 }
  

    const columns = [
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row =><div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(row.description) }}
            style={{ maxWidth: '200px', overflow: 'hidden' }}
          />,
            sortable: true,
        },
        {
            name: 'Image',
            selector: row => <img src={row.image} alt={row.title} style={{ width: '50px', height: '50px' }} />,
        },
        {
            name:"Action",
            selector: row=> <div className='flex'>
            <Trash onClick={()=>DeleteBlog(row.id)} className='cursor-pointer' />
                <Edit onClick={()=>handledit(row)} className='cursor-pointer' />
            </div>
        }
    ];
    


useEffect(() => {
  getData()
}, [])

  return (
    <div>
        <CustomDataTable columns={columns} data={data} title={"Mange Blog"}/>
        <UpdateBlogModal getData={getData} selected={selected} open={open} handleClose={()=> setOpen(false)} />
    </div>
  )
}

export default ViewBlogs