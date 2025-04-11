import React from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import DataService from '../../services/requestApi'
import { useSnackbar } from "notistack";
const RpEditModal = ({ open, handleClose ,selected, fetchData}) => {
    const { control,setValue, handleSubmit } = useForm({
        defaultValues: {
            type: "",
            rp: "",
            value: "",
            saasId: "",
            storeId: "",
        },
    });
   
    const {enqueueSnackbar } = useSnackbar()

    React.useEffect(() => {
        if (selected) {
            setValue("type", selected.type || "");
            setValue("rp", selected.rp || "");
            setValue("value", selected.value || "");
            setValue("saasId", selected.saasId || "");
            setValue("storeId", selected.storeId || "");
        }
    }, [selected, setValue]);


    const onSubmitForm = async (data) => {
        try {
            const response = await DataService.UpdateRpValue(data);
            if (response?.data?.status) {
                enqueueSnackbar("Update successful", { variant: "success" });
                fetchData();
                handleClose();
            } else {
                console.error("Update failed:", response?.data?.message || "Unknown error");
                enqueueSnackbar(response?.data?.message || "Failed to update RP value. Please try again.", { variant: "error" });
            }
        } catch (error) {
            console.error("Error updating RP value:", error);
            enqueueSnackbar("An error occurred while updating RP value. Please check your connection and try again.", { variant: "error" });
        }
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                className="bg-white p-6 rounded-lg shadow-lg w-96 mx-auto mt-20"
                sx={{ outline: "none" }}
            >
                <h2 className="text-xl font-bold mb-4">Edit Rupee Details</h2>
                <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
                    <Controller
                        name="type"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Type"
                                variant="outlined"
                            />
                        )}
                    />
                    <Controller
                        name="rp"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="RP"
                                type="number"
                                variant="outlined"
                            />
                        )}
                    />
                    <Controller
                        name="value"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Value"
                                type="number"
                                variant="outlined"
                            />
                        )}
                    />
                    {/* <Controller
                        name="saasId"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Saas ID"
                                variant="outlined"
                            />
                        )}
                    />
                    <Controller
                        name="storeId"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth
                                label="Store ID"
                                variant="outlined"
                            />
                        )}
                    /> */}
                    <div className="flex justify-end space-x-4">
                        <Button variant="outlined" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Save
                        </Button>
                    </div>
                </form>
            </Box>
        </Modal>
    );
};

export default RpEditModal;