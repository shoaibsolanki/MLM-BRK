import { TextField, Button, Container, Grid, Typography, Paper } from '@mui/material';


const Support = () => {
  return (
      
    <Container maxWidth="md" className="py-10">
      <Paper elevation={3} className="p-10 bg-white">
        {/* <Typography variant="h5" className="mb-6 text-center font-semibold">
          Contact Us
        </Typography> */}
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField fullWidth label="Name" variant="outlined" className="mb-4" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Mobile" variant="outlined" className="mb-4" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Email" type="email" variant="outlined" className="mb-4" />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Subject" variant="outlined" className="mb-4" />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={4} label="Message" variant="outlined" className="mb-4" />
          </Grid>
          <Grid item xs={12} className="text-center">
            <button variant="contained" color="primary" className="bg-green-500 text-white px-6 py-2">
              Submit
            </button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
     
       
  );
};

export default Support;
