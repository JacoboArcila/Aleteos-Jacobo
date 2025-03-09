// src/Backend/models/collectionModel.js
import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Collection name is required'],
    trim: true,
    maxlength: [100, 'Collection name cannot exceed 100 characters'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Collection description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  imageUrl: {
    type: String,
    default: 'default-collection.jpg'
  },
  featured: {
    type: Boolean,
    default: false
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

// Virtual for products in this collection
collectionSchema.virtual('products', {
  ref: 'Product',
  localField: '_id',
  foreignField: 'collection',
  justOne: false
});

const Collection = mongoose.model('Collection', collectionSchema);

export default Collection;