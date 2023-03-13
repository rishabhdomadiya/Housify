module.exports = mongoose => {
  const House = mongoose.model(
      "house",
      mongoose.Schema(
          {
              title: String,
              description: String,
              selectedFile: String,
              address: { street: String, province: String, city: String },
              category: String,
              rooms: String,
              people_count: Number,
              bathrooms: Number,
              price: Number,
              email: String,
              phone: Number
          },
          { timestamps: true }
      )
  );
  return House;
};