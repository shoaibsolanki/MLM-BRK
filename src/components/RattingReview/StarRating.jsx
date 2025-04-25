import PropTypes from 'prop-types';
import { useState } from 'react';
import { Star } from 'lucide-react';

export function StarRating({ rating, onChange, readonly = false, size = 24 }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseEnter = (index) => {
    if (readonly) return;
    setHoverRating(index);
  };

  const handleMouseLeave = () => {
    if (readonly) return;
    setHoverRating(0);
  };

  const handleClick = (index) => {
    if (readonly || !onChange) return;
    onChange(index);
  };

  return (
    <div className="flex" role="group" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((index) => {
        const filled = hoverRating ? index <= hoverRating : index <= rating;
        
        return (
          <button
            key={index}
            type="button"
            aria-label={`${index} star${index !== 1 ? 's' : ''}`}
            className={`p-0.5 bg-transparent border-0 ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(index)}
            disabled={readonly}
          >
            <Star
              size={size}
              className={`transition-colors duration-200 ${
                filled 
                  ? 'text-amber-400 fill-amber-400' 
                  : 'text-gray-300'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  size: PropTypes.number
};
