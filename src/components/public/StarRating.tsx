import { useReviewStore } from "@/store/review-store";

const StarRating = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (val: number) => void;
}) => {
  const { setHovered, hovered } = useReviewStore();

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          className={`text-2xl ${
            (hovered ?? value) >= star ? "text-yellow-400" : "text-gray-300"
          } transition-colors`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default StarRating;
