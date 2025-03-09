// controllers/productController.js
import Product from '../models/productModel.js';
import Collection from '../models/collectionModel.js';

// @desc    Create a new product
// @route   POST /api/admin/products
// @access  Admin
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl, collection } = req.body;

    // Check if collection exists if provided
    if (collection) {
      const existingCollection = await Collection.findById(collection);
      if (!existingCollection) {
        return res.status(404).json({
          success: false,
          message: 'Collection not found'
        });
      }
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      stock,
      imageUrl: imageUrl || 'default-product.jpg',
      collection: collection || null,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    // Build query
    const queryObj = { ...req.query };
    
    // Fields to exclude from filtering
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach(field => delete queryObj[field]);

    // Filter by collection if provided
    if (req.query.collection) {
      queryObj.collection = req.query.collection;
    }
    
    // Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    // Find products
    let query = Product.find(JSON.parse(queryStr));
    
    // Sort
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    
    // Execute query
    const products = await query;
    
    // Count total
    const total = await Product.countDocuments(JSON.parse(queryStr));
    
    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: products
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('collection');
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Update a product
// @route   PUT /api/admin/products/:id
// @access  Admin
export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, imageUrl, collection } = req.body;

    // Check if collection exists if provided
    if (collection) {
      const existingCollection = await Collection.findById(collection);
      if (!existingCollection) {
        return res.status(404).json({
          success: false,
          message: 'Collection not found'
        });
      }
    }

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    // Update fields
    product = await Product.findByIdAndUpdate(
      req.params.id, 
      { 
        name, 
        description, 
        price, 
        category, 
        stock, 
        imageUrl, 
        collection: collection || null 
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Delete a product
// @route   DELETE /api/admin/products/:id
// @access  Admin
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: 'Product not found' 
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};

// @desc    Get related products (same collection or category)
// @route   GET /api/products/:id/related
// @access  Public
export const getRelatedProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    // Find products in the same collection or category, excluding the current product
    const query = {
      _id: { $ne: req.params.id },
      $or: [
        { category: product.category }
      ]
    };
    
    // Add collection to query if the product belongs to a collection
    if (product.collection) {
      query.$or.push({ collection: product.collection });
    }
    
    const relatedProducts = await Product.find(query).limit(4);
    
    res.status(200).json({
      success: true,
      count: relatedProducts.length,
      data: relatedProducts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error', 
      error: error.message 
    });
  }
};