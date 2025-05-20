import React from 'react'
import { useLocation } from 'react-router-dom'
import { Box, Typography, CardMedia } from '@mui/material';
const Singleblog = () => {
    const location = useLocation()
    const {blog} = location.state
  return (
     <Box
      sx={{
        width: '100vw',
        height: '100vh',
        overflowY: 'auto',
        bgcolor: '#fafafa',
        p: { xs: 2, md: 4 },
      }}
    >
      <Typography variant="h3" gutterBottom>
        {blog.title}
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Created on: {blog.created}
      </Typography>

      <CardMedia
        component="img"
        height="400"
        image={blog.image}
        alt={blog.title}
        sx={{
          width: '100%',
          objectFit: 'cover',
          borderRadius: 2,
          mb: 4,
        }}
      />

      <Box
        sx={{
          fontSize: '1.2rem',
          lineHeight: 1.8,
        }}
        dangerouslySetInnerHTML={{ __html: blog.description }}
      />
    </Box>
  )
}

export default Singleblog