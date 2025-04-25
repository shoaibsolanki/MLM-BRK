import PropTypes from 'prop-types';
import { ThumbsUp } from 'lucide-react';
import { StarRating } from './StarRating.jsx';

export function ReviewCard({ review, onMarkHelpful }) {
    const formattedDate = new Date(review.date).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
    
    return (
        <article className="bg-white rounded-lg shadow-sm p-6 mb-4 border border-gray-100">
            <header className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-lg">{review.name}</h3>
                    <div className="flex items-center mt-1">
                        <StarRating rating={review.rating} readonly size={18} />
                        <time dateTime={review.date} className="ml-2 text-sm text-gray-500">
                            {formattedDate}
                        </time>
                    </div>
                </div>
            </header>
            
            <div className="mt-3 text-gray-700">
                <p>{review.comment}</p>
            </div>
            
            <footer className="mt-4 flex items-center">
                <button 
                    onClick={() => onMarkHelpful(review.id)}
                    className="flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors duration-200"
                    aria-label={`Mark as helpful (${review.helpful} people found this helpful)`}
                >
                    <ThumbsUp size={16} className="mr-1" />
                    {/* <span>Helpful ({review.helpful})</span> */}
                </button>
            </footer>
        </article>
    );
}

ReviewCard.propTypes = {
    review: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        helpful: PropTypes.number.isRequired
    }).isRequired,
    onMarkHelpful: PropTypes.func.isRequired
};
