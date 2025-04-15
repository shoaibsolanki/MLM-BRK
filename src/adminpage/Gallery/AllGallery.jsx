import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Breadcrumbs, Link, Container } from '@mui/material';
import DataService from '../../services/requestApi'; // Adjust the path as needed

function AllGallery() {
  const [galleryItems, setGalleryItems] = useState([]);

  const {  saasId,storeId } = JSON.parse(localStorage.getItem("user_data"));

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    try {
      const res = await DataService.GetGalleryLink(saasId, storeId);
      if (res.data.status && Array.isArray(res.data.data)) {
        setGalleryItems(res.data.data);
      }
    } catch (error) {
      console.error('Error fetching gallery data:', error);
    }
  };

  return (
    <Box bgcolor="#f8f9fa" py={5}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Box mb={4}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary">Gallery</Typography>
          </Breadcrumbs>
        </Box>

        {/* Gallery Items */}
        <Grid container spacing={2}>
          {galleryItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Box boxShadow={1} borderRadius={2} overflow="hidden" bgcolor="#fff">
                {item.type === 'image' ? (
                  <img
                    src={item.value}
                    alt={`Gallery item ${item.id}`}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                ) : item.type === 'link' ? (
                  <iframe
                    src={item.value}
                    title={`Video ${item.id}`}
                    allowFullScreen
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                  ></iframe>
                ) : null}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default AllGallery;
