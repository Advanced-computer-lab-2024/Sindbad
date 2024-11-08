import { useState } from 'react';
import { Star } from 'lucide-react';

function StarRatingForm({ size, onRatingChange, rating }) {
    const totalStars = 5;
    const [hoveredRating, setHoveredRating] = useState(0);

    // Handle star click
    const handleClick = (rating) => {
        if (onRatingChange) onRatingChange(rating); // Update parent component or form
    };

    // Handle star hover
    const handleMouseEnter = (rating) => {
        setHoveredRating(rating);
    };

    // Reset hover when mouse leaves
    const handleMouseLeave = () => {
        setHoveredRating(0);
    };

    return (
        <div className="shrink-0 text-secondary flex items-center">
            {Array(totalStars)
                .fill()
                .map((_, i) => {
                    const starNumber = i + 1;
                    const isFilled = starNumber <= (hoveredRating || rating);
                    
                    return (
                        <Star
                            key={starNumber}
                            fill={isFilled ? '#fcd34d' : 'transparent'}
                            size={size}
                            onMouseEnter={() => handleMouseEnter(starNumber)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClick(starNumber)}
                            className="cursor-pointer pr-0.5"
                        />
                    );
                })}
        </div>
    );
}

export default StarRatingForm;