import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, Breadcrumbs, Container } from '@mui/material';
import DataService from '../services/requestApi'; // Adjust the path as needed
import { useAuth } from '../contexts/AuthConext';
import { Image } from 'antd';

function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const { storeid, saasid } = useAuth();

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const fetchGalleryData = async () => {
    try {
      const res = await DataService.GetGalleryLink(saasid, storeid);
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
        <Box
          mb={2}
          px={3}
          py={2}
          borderRadius={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="#e0f7fa"
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary">Gallery</Typography>
          </Breadcrumbs>
        </Box>

        {/* Gallery Items */}
        <Grid container spacing={2}>
          {galleryItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Box boxShadow={1} borderRadius={2} overflow="hidden" bgcolor="#fff" p={2}>
                {item.type === 'image' ? (
                  <Image
                    src={item.value}
                    alt={`Gallery item ${item.id}`}
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                ) : item.type === 'link' ? (
                  <iframe
                    src={
                      item.value.includes('watch?v=')
                        ? item.value.replace('watch?v=', 'embed/')
                        : item.value
                    }
                    title={`Video ${item.id}`}
                    width="100%"
                    height="250"
                    style={{ border: 0, borderRadius: '8px' }}
                    allowFullScreen
                  />
                ) : null}
                {/* Description */}
                {item.description && (
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {item.description}
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Gallery;
