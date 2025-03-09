// src/Backend/models/productModel.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price must be positive']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: {
      values: ['Collares', 'Pendientes', 'Pulsera'],
      message: '{VALUE} is not a valid category'
    }
  },
  stock: {
    type: Number,
    required: [true, 'Product stock is required'],
    min: [0, 'Stock cannot be negative'],
    default: 0
  },
  imageUrl: {
    type: String,
    default: 'default-product.jpg'
  },
  // Optional reference to collection
  collection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
    required: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add virtual for checking if in stock
productSchema.virtual('inStock').get(function() {
  return this.stock > 0;
});

// Add a virtual for collection name if it exists
productSchema.virtual('collectionName').get(function() {
  return this.collection ? this.collection.name : null;
});

// Pre-find middleware to populate collection if needed
productSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'collection',
    select: 'name'
  });
  next();
});

const Product = mongoose.model('Product', productSchema);

export default Product;