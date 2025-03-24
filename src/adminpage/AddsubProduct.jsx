import React from 'react';
import { TextField, Button, MenuItem, Grid, Typography, Container } from '@mui/material';

const AddsubProduct = () => {
  return (
    <Container maxWidth="sm" sx={{bgcolor:"white" , p:4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Add Sub Product
      </Typography>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Combo Name"
              fullWidth
              variant="outlined"
              margin="normal"
            >
              <MenuItem value="">
                <em>Select Combo</em>
              </MenuItem>
              {/* Add more options here */}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Product Name"
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="HSN Code"
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="GST"
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="DP"
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Weight"
              fullWidth
              variant="outlined"
              margin="normal"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default AddsubProduct;