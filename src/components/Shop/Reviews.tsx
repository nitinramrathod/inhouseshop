import { Star } from 'lucide-react';
import { memo } from 'react';

const Reviews = ({ averageRating, reviewCount }) => {
    return (
        <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-1">
                {
                    Array.from({ length: 5 }).map((_, i) => {
                        const isField = i < Math.round(averageRating);
                        return (
                            <Star strokeWidth={2.75} key={`review_${i}`} size={'1rem'} className={isField ? "text-yellow fill-yellow" : "text-yellow-400"} />
                        )
                    })
                }
            </div>

            {reviewCount > 0 && <p className="text-custom-sm">( {reviewCount} )</p>}
        </div>
    );
};

export default memo(Reviews);