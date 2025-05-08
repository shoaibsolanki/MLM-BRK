import { User } from "lucide-react"
import DataService from '../services/requestApi'
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Button } from "@mui/material"
import { useSnackbar } from "notistack"
import { ArrowBack } from "@mui/icons-material"
import { Image } from "antd"
export default function UserKYCScreen() {
  const [userData, setUserData] = useState({})
  const {enqueueSnackbar} = useSnackbar()
  const navigate = useNavigate()
  const {
    applicantName,
    fatherName,
    accountHolderName,
    bankName,
    accountNumber,
    ifsc_code,
    mobileNumber,
    addhaarNumber,
    panNO,
    email,
    userName,
    bankImg,
    aadharFrontImg,
    aadharBackImg,
    pancardImg,
    gstImg,
    status,
    pincode,
    gstAddress,
    nomineeName
  } = userData
  const {id} = useParams()

  const { storeId, saasId } = JSON.parse(localStorage.getItem("user_data"));
  const GetKycData = async ()=>{
    try {
        
        const response = await DataService.GetCustomerKycDetail(saasId,storeId,id)
        setUserData(response?.data?.data)

    } catch (error) {
        console.log(error)
    }
  }
  
  useEffect(() => {
    if(id){
        GetKycData()
    }
  }, [id])
  
  const UpdateKycStatus= async (status)=>{
    try {
        const response = await DataService.UpdateKycForCutomer(saasId,storeId,id,status)
        if(response.data.status){
            enqueueSnackbar('Kyc Updated Successfully' , {variant:"success"})
            GetKycData()
        }else{
            enqueueSnackbar(response?.data?.message || "Kyc Update Failed" , {variant:"error"})
        }
    } catch (error) {
        enqueueSnackbar(error?.response?.data?.message || error?.message || "Kyc Update Failed" , {variant:"error"})
        console.log(error)
    }
  }










  return (
    <div className="max-w-5xl mx-auto p-6 bg-white">
      <h1 className="text-xl font-bold mb-6 pb-2 border-b"><ArrowBack className="cursor-pointer" onClick={()=> navigate(-1)} /> User KYC ({applicantName}) - <span className={`${status =='Pending' ?'text-red-700':'text-green-700'}`}>{status}</span> </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <h2 className="font-semibold mb-1">User Name</h2>
          <p>{userName}</p>
        </div>
        <div>
          <h2 className="font-semibold mb-1">Email</h2>
          <p>{email}</p>
        </div>
        <div>
          <h2 className="font-semibold mb-1">Mobile</h2>
          <p>{mobileNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <h2 className="font-semibold mb-1">Father Name</h2>
          <p>{fatherName || '-'}</p>
        </div>
        <div>
          <h2 className="font-semibold mb-1">Account Holder</h2>
          <p>{accountHolderName || '-'}</p>
        </div>
        <div>
          <h2 className="font-semibold mb-1">Aadhar Number</h2>
          <p>{addhaarNumber || '-'}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <h2 className="font-semibold mb-1">Bank Name</h2>
          <p>{bankName}</p>
        </div>
        <div>
          <h2 className="font-semibold mb-1">IFSC Code</h2>
          <p>{ifsc_code}</p>
        </div>
        <div>
          <h2 className="font-semibold mb-1">Account Number</h2>
          <p>{accountNumber}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <h2 className="font-semibold mb-1">PAN Card Number</h2>
          <p>{panNO || '-'}</p>
        </div>
        <div>
          <h2 className="font-semibold mb-1">Pin Code</h2>
          <p>{pincode || '-'}</p>
        </div>
        <div>
          <h2 className="font-semibold mb-1">GST Address</h2>
          <p>{gstAddress || '-'}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div>
          <h2 className="font-semibold mb-1">Nominee Name</h2>
          <p>{nomineeName || '-'}</p>
        </div>
      </div>
      <Image.PreviewGroup
    preview={{
      onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
    }}>
      <div className="border-t pt-6 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h2 className="font-semibold mb-2">Bank Image</h2>
            <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center overflow-hidden">
              {bankImg ? (
                <Image  src={bankImg} alt="Bank" className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-gray-400" />
              )}
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Aadhar Front</h2>
            <div className="w-32 h-32 bg-sky-400 rounded flex items-center justify-center overflow-hidden">
              {aadharFrontImg ? (
                <Image src={aadharFrontImg} alt="Aadhar Front" className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-white" />
              )}
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">Aadhar Back</h2>
            <div className="w-32 h-32 bg-red-900 rounded flex items-center justify-center overflow-hidden">
              {aadharBackImg ? (
                <Image src={aadharBackImg} alt="Aadhar Back" className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-white" />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h2 className="font-semibold mb-2">Pancard Image</h2>
            <div className="w-32 h-32 bg-sky-400 rounded flex items-center justify-center overflow-hidden">
              {pancardImg ? (
                <Image src={pancardImg} alt="Pancard" className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-white" />
              )}
            </div>
          </div>
          <div>
            <h2 className="font-semibold mb-2">GST Image</h2>
            <div className="w-32 h-32 bg-red-900 rounded flex items-center justify-center overflow-hidden">
              {gstImg ? (
                <Image src={gstImg} alt="GST" className="w-full h-full object-cover" />
              ) : (
                <User className="w-16 h-16 text-white" />
              )}
            </div>
          </div>
        </div>
      </div>
      </Image.PreviewGroup>
    { status == 'Pending' && <Button onClick={()=>{UpdateKycStatus('Approved')}} sx={{marginTop:"10px"}} variant="contained" color="success"  >Approve Kyc </Button>}
    </div>
  )
}
