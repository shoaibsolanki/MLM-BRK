import React from "react";
import CustomDataTable from "../admincomponents/Microcomponents/DataTable";
import { useState, useEffect } from "react";
import DataService from "../services/requestApi";
import { Button } from "@mui/material";
import CreateGiftModal from "../admincomponents/Modals/CreateGiftModal";
import { Edit, TrashIcon } from "lucide-react";
import EditGiftModal from "../admincomponents/Modals/EditGiftModal";
import { useSnackbar } from "notistack";
const Mangegift = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedGift, setSelectedGift] = useState(null);
  const [gifts, setGifts] = useState([]);
  const {enqueueSnackbar} = useSnackbar()
  const { saasId } = JSON.parse(localStorage.getItem("user_data"));
  const fetchGifts = async () => {
    try {
      const response = await DataService.GetGifts(saasId);
      setGifts(response.data.data);
    } catch (error) {
      console.error("Error fetching gifts:", error);
    }
  };

  useEffect(() => {
    fetchGifts();
  }, []);

  const onEdit = (row) => {
    setSelectedGift(row);
    setEditOpen(true);
  };

  const onDelete = async (id) => {
    try {
     const response =  await DataService.DeleteGift(id);
      if(response?.data?.status){
        enqueueSnackbar("Gift Deleted Successfully", {variant: "success"})
        fetchGifts(); // Refresh the list after deletion
      }
      
    } catch (error) {
      console.error("Error deleting gift:", error);
    }
  };

  const columns = [
    // Example columns
    { name: "ID", selector: (row) => row.userID, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "gift", selector: (row) => row.gift, sortable: true },
    { name: "Gift Amount", selector: (row) => row.giftAmount, sortable: true },
    {
      name: "Total Amount",
      selector: (row) => row.totalAmount,
      sortable: true,
    },
    {
      name: "Edit",
      cell: (row) => (
        <>
          <Edit className="cursor-pointer"  onClick={()=>onEdit(row)}/>
            <TrashIcon className="cursor-pointer" onClick={()=>onDelete(row.userID)}/>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center bg-white rounded p-2">
        <h1>Mange Gifts</h1>
        <Button
          onClick={() => setOpen(true)}
          variant="contained"
          color="primary"
        >
          Add Gift
        </Button>
      </div>
      <CustomDataTable title="User Data" data={gifts} columns={columns} />
      <EditGiftModal fetchGifts={fetchGifts} open={editOpen} handleClose={()=> setEditOpen(false)}  selectedGift={selectedGift}/>
      <CreateGiftModal
        open={open}
        handleClose={() => setOpen(false)}
        fetchGifts={fetchGifts}
      />
    </div>
  );
};

export default Mangegift;
