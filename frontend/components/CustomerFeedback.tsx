"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Star } from "lucide-react";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "";

interface Review {
  _id: string;
  name: string;
  rating: number;
  feedback: string;
  createdAt: string;
}

export const CustomerFeedback = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Form state
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  // Fetch reviews on mount
  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      setReviewsLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/reviews`);
      setReviews(response.data.data || []);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
      setReviews([]);
    } finally {
      setReviewsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    if (!feedback.trim() || feedback.trim().length < 10) {
      setError("Feedback must be at least 10 characters");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/reviews`, {
        name: name.trim(),
        rating,
        feedback: feedback.trim(),
      });

      // Reload from MongoDB so the UI reflects the persisted document.
      await fetchReviews();

      // Reset form
      setName("");
      setRating(0);
      setFeedback("");
      setSuccess("Thank you! Your review has been posted successfully.");

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      const errorMsg =
        err.response?.data?.details?.name?.[0] ||
        err.response?.data?.details?.rating?.[0] ||
        err.response?.data?.details?.feedback?.[0] ||
        err.response?.data?.error ||
        "Failed to submit review";
      setError(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStars = (count: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) =>
          interactive ? (
            <motion.button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="cursor-pointer transition-all"
            >
              <Star
                size={28}
                className={`${
                  star <= (hoverRating || rating)
                    ? "fill-accent-primary text-accent-primary"
                    : "text-gray-300"
                } transition-all`}
              />
            </motion.button>
          ) : (
            <motion.span
              key={star}
              className={interactive ? "cursor-pointer transition-all" : ""}
            >
              <Star
                size={20}
                className={`${
                  star <= count
                    ? "fill-accent-primary text-accent-primary"
                    : "text-gray-300"
                } transition-all`}
              />
            </motion.span>
          )
        )}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="py-24 bg-bg-secondary" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-accent-primary font-semibold mb-4 tracking-[0.2em] uppercase text-sm"
          >
            Customer Feedback
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-serif font-bold text-text-primary mb-4"
          >
            Share Your <span className="text-accent-primary">Experience</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-text-secondary max-w-2xl mx-auto text-lg"
          >
            Share your experience with our Makhana
          </motion.p>
        </motion.div>

        {/* Review Submission Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16 bg-background p-8 rounded-3xl border border-border"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all"
                disabled={isLoading}
              />
            </motion.div>

            {/* Rating Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <label className="block text-sm font-semibold text-text-primary mb-4">
                Rating
              </label>
              <div className="flex items-center gap-4">
                {renderStars(rating, true)}
                {rating > 0 && (
                  <span className="text-text-secondary text-sm">
                    {rating} out of 5
                  </span>
                )}
              </div>
            </motion.div>

            {/* Feedback Field */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Your Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your experience with our Makhana (minimum 10 characters)"
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-bg-secondary border border-border text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all resize-none"
                disabled={isLoading}
              />
              <div className="mt-2 text-xs text-text-secondary">
                {feedback.length}/500 characters
              </div>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-600 text-sm"
              >
                {success}
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
              className="w-full py-3 px-6 bg-accent-primary hover:bg-accent-primary/90 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Submitting..." : "Submit Review"}
            </motion.button>
          </form>
        </motion.div>

        {/* Reviews Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-text-primary">
              What Our Customers Say
            </h3>
          </div>

          {reviewsLoading ? (
            <div className="text-center py-12">
              <p className="text-text-secondary">Loading reviews...</p>
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-text-secondary">
                No reviews yet. Be the first to share your experience!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, idx) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + idx * 0.1,
                    type: "spring",
                  }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-background p-6 rounded-2xl border border-border hover:shadow-glow-green transition-all"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {renderStars(review.rating)}
                  </div>

                  {/* Name */}
                  <h4 className="font-semibold text-text-primary mb-2">
                    {review.name}
                  </h4>

                  {/* Feedback */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-4">
                    "{review.feedback}"
                  </p>

                  {/* Date */}
                  <div className="text-xs text-text-secondary">
                    {formatDate(review.createdAt)}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
