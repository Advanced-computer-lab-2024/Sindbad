import { Star } from 'lucide-react';

function StarRating({ rating, size }) {
    const totalStars = 5;
    const fullStars = Math.floor(rating); // Number of full stars
    const hasHalfStar = rating % 1 !== 0; // Check if there is a half star
    const emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

    return (
        <div className="shrink-0 text-secondary flex gap-0.5 items-center">
            {/* Render full stars */}
            {Array(fullStars)
                .fill()
                .map((_, i) => (
                    <Star key={`full-${i}`} fill="#fcd34d" size={size} />
                ))}

            {/* Render half star using gradient */}
            {hasHalfStar && (
                <Star
                    key="half-star"
                    size={size}
                    style={{
                        fill: 'url(#halfGradient)',
                    }}
                />
            )}

            {/* Render empty stars */}
            {Array(emptyStars)
                .fill()
                .map((_, i) => (
                    <Star key={`empty-${i}`} fill="transparent" size={size} />
                ))}

            {/* Define the gradient for half-star */}
            <svg width="0" height="0">
                <defs>
                    <linearGradient id="halfGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="50%" stopColor="#fcd34d" />
                        <stop offset="50%" stopColor="transparent" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

export default StarRating;
