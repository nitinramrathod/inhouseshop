import { empty_star_icon, filled_star_icon } from "@/assets/icons/common"

const Rating = ({ rating = 3 }: { rating?: number }) => {
    return (
        <div className="flex items-center gap-1">

            {[...Array(rating)].map((_, index) => (
                <span key={`filled-${index}`}>{filled_star_icon}</span>
            ))}

            {/* Render empty stars */}
            {[...Array(5 - rating)].map((_, index) => (
                <span key={`empty-${index}`}>{empty_star_icon}</span>
            ))}
        </div>
    )
}
export default Rating