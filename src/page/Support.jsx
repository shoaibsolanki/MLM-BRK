import { useState } from "react";
import { TextField, Button, Container, Grid, Typography, Paper } from "@mui/material";
import DataService from "../services/requestApi"; // Import DataService
import { useAuth } from "../contexts/AuthConext";

const Support = () => {
    const { saasid, storeid,authData} = useAuth();
    const { id,  } = authData;
  const [formData, setFormData] = useState({
    customer_name: "",
    email: "",
    mobile: "",
    issue: "",
    issue_description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      date: new Date().toISOString().split("T")[0], // Current date
      customer_name: formData.customer_name,
      email: formData.email,
      mobile: formData.mobile,
      customerId: id,
      issue: formData.issue,
      issue_description: formData.issue_description,
      saasId: saasid,
      status: "Open",
    };

    try {
      const response = await DataService.SaveComplaint(payload);
      console.log("Complaint Submitted:", response.data);
      alert("Complaint submitted successfully!");
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Failed to submit complaint.");
    }
  };

  return (
    <Container maxWidth="md" className="py-10">
      <Paper elevation={3} className="p-10 bg-white">
        <Typography variant="h5" className="mb-6 text-center font-semibold">
          Help and Support
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container mt={2} spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name"
                name="customer_name"
                variant="outlined"
                value={formData.customer_name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Mobile"
                name="mobile"
                variant="outlined"
                value={formData.mobile}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Issue"
                name="issue"
                variant="outlined"
                value={formData.issue}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Issue Description"
                name="issue_description"
                variant="outlined"
                value={formData.issue_description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} className="text-center">
              <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Support;
