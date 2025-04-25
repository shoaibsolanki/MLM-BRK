import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { StarRating } from './StarRating.jsx';
import DataService from '../../services/requestApi.js'; // Adjust path if needed
import { useAuth } from '../../contexts/AuthConext.jsx';

export function ReviewFormModal({ open, onClose, onSubmit, customerId, itemId,}) {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
    const { saasid,storeid ,id} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

   

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    if (!comment.trim()) {
      setError('Please enter your review');
      return;
    }

    const reviewPayload = {
      customerId:id, // from props
      itemId :itemId,
      review: comment,
      rating,
      type: "Item",
      saasId :saasid,
      storeId :storeid,
    };

    try {
      await DataService.addreview(reviewPayload);

      // Optionally update local UI
      onSubmit({
        id: Date.now().toString(),
        name,
        rating,
        comment,
        date: new Date().toISOString(),
        helpful: 0,
      });

      // Reset
      setName('');
      setRating(0);
      setComment('');
      setError('');
      onClose();
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error('Review submit error:', err);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="review-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="review-modal-title" variant="h6" component="h2" mb={2}>
          Write a Review
        </Typography>

        {error && (
          <Box
            sx={{
              mb: 2,
              p: 2,
              bgcolor: 'error.light',
              color: 'error.main',
              borderRadius: 1,
            }}
          >
            {error}
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          {/* <Box mb={2}>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your name"
            />
          </Box> */}

          <Box mb={2}>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <div id="rating">
              <StarRating rating={rating} onChange={setRating} />
            </div>
          </Box>

          <Box mb={2}>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
              Your Review
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Tell us your experience..."
            ></textarea>
          </Box>

          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Submit Review
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

ReviewFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  customerId: PropTypes.number.isRequired,
  itemId: PropTypes.number.isRequired,
  saasId: PropTypes.string.isRequired,
  storeId: PropTypes.string.isRequired,
};
