module.exports = mongoose => {
    const Review = mongoose.model(
        "review",
        mongoose.Schema(
            {
                rating: String,
                feedback: String,
                house_id: String,
                email: String
            },
            { timestamps: true }
        )
    );
    return Review;
  };