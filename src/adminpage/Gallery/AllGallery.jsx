import React, { useEffect, useState } from 'react';
import {
  Grid, Box, Typography, Breadcrumbs, Container, Button, Modal, TextField, IconButton
} from '@mui/material';
import { Image } from 'antd';
import CloseIcon from '@mui/icons-material/Close';
import DataService from '../../services/requestApi';

function AllGallery() {
  const [galleryItems, setGalleryItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState(['']);
  const { saasId, storeId } = JSON.parse(localStorage.getItem("user_data"));

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

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleLinkChange = (index, value) => {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
  };

  const addNewLink = () => {
    setLinks([...links, '']);
  };

  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
  
    // Append files
    files.forEach(file => {
      formData.append('file', file);
    });
  
    // Append non-empty links
    links.forEach(link => {
      if (link.trim()) {
        formData.append('link', link);
      }
    });
  
    // Log what’s going out
    for (let pair of formData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }
  
    try {
      const res = await DataService.Addgallery(saasId, storeId, formData);
      console.log(res.data); // show the API response
      if (res.data.status) {
        setOpenModal(false);
        fetchGalleryData();
        setFiles([]);
        setLinks(['']);
      } else {
        alert("API hit but failed to save data.");
      }
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };
  
  

  return (
    <Box bgcolor="#f8f9fa" py={5}>
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box
          mb={4}
          px={3}
          py={2}
          borderRadius={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          bgcolor="#e0f7fa"
        >
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="text.primary" fontWeight={600} fontSize="1.2rem">
              Gallery
            </Typography>
          </Breadcrumbs>
          <Button variant="contained" color="primary" onClick={() => setOpenModal(true)}>
            Add Gallery
          </Button>
        </Box>

        {/* Gallery Grid */}
        <Grid container spacing={2}>
          {galleryItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Box boxShadow={1} borderRadius={2} overflow="hidden" bgcolor="#fff" p={1}>
                {item.type === 'image' ? (
                  <Image
                    src={item.value}
                    alt={`Gallery item ${item.id}`}
                    width="100%"
                    style={{ borderRadius: '8px' }}
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
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Add Gallery Modal */}
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          <Box
            width={400}
            p={4}
            bgcolor="#fff"
            borderRadius={2}
            position="absolute"
            top="50%"
            left="50%"
            style={{ transform: 'translate(-50%, -50%)' }}
          >
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Add Gallery</Typography>
              <IconButton onClick={() => setOpenModal(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            <input type="file" multiple onChange={handleFileChange} />
            <Box mt={2}>
              <Typography fontWeight={600}>Video Links:</Typography>
              {links.map((link, index) => (
                <Box key={index} display="flex" alignItems="center" mt={1}>
                  <TextField
                    fullWidth
                    size="small"
                    value={link}
                    onChange={(e) => handleLinkChange(index, e.target.value)}
                  />
                  {links.length > 1 && (
                    <IconButton onClick={() => removeLink(index)} size="small">
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              ))}
              <Button size="small" onClick={addNewLink} style={{ marginTop: 8 }}>
                + Add Another Link
              </Button>
            </Box>

            <Box mt={3}>
              <Button fullWidth variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </Box>
  );
}

export default AllGallery;
