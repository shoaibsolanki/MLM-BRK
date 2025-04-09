import React, { useState } from 'react'
import DataService from '../services/requestApi'
import { Button } from '@mui/material'
import UpdateSliderModal from '../admincomponents/Modals/UpdateSilderModal'
const MangeSlider = () => {
    const [open, setOpen] = useState(false)
    const [baners, setBanners] = useState()
    const {saasId} = JSON.parse(localStorage.getItem("user_data"))
     const Banners = async () => {
        try {
            const response = await DataService.GetAllBanner(saasId);
            console.log(response.data);
            setBanners(response.data)
        } catch (error) {
            console.error('Error fetching banners:', error);
        }
    };

    React.useEffect(() => {
        Banners();
    }, []);



return (
    <>
    <div>
         <div className='flex justify-between items-center bg-white rounded p-2'>
                <h1>Mange Slider</h1>
                <Button variant='contained' 
                onClick={()=>setOpen(true)}
                >
                    Update Slide
                </Button>
            </div>
        <div>
            {baners && (
                <>
                    <img
                        src={baners.brand_logo}
                        style={{ margin: '10px', maxWidth: '100%' }}
                        alt="Banner Logo"
                    />
                    <img
                        src={baners.banner_logo}
                        style={{ margin: '10px', maxWidth: '100%' }}
                        alt="Banner Logo 1"
                    />
                    <img
                        src={baners.banner_logo1}
                        style={{ margin: '10px', maxWidth: '100%' }}
                        alt="Banner Logo 1"
                    />
                </>
            )}
        </div>
    </div>
    <UpdateSliderModal open={open} handleClose={()=> setOpen(false)}  Banners={Banners}/>
    </>
)
}

export default MangeSlider