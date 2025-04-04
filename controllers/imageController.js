const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
const Image = require('../models/Image');
const logger = require('../config/logger');

// Upload and compress image
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const originalPath = req.file.path;
    const compressedPath = path.join(
      path.dirname(originalPath),
      `compressed-${req.file.filename}`
    );

    // Compress image using Sharp
    await sharp(originalPath)
      .jpeg({ 
        quality: 80,
        progressive: true,
        optimizeCoding: true
      })
      .toFile(compressedPath);

    const originalSize = req.file.size;
    const compressedSize = fs.statSync(compressedPath).size;
    const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

    // Save to database
    const image = await Image.create({
      originalName: req.file.originalname,
      originalSize,
      originalPath,
      compressedSize,
      compressedPath,
      compressionRatio
    });

    logger.info(`Image uploaded and compressed: ${image.originalName}`);

    res.status(201).json({
      message: 'Image uploaded and compressed successfully',
      image
    });
  } catch (error) {
    logger.error(`Error uploading image: ${error.message}`);
    res.status(500).json({ message: 'Error processing image' });
  }
};

// Get all images
exports.getImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    logger.error(`Error fetching images: ${error.message}`);
    res.status(500).json({ message: 'Error fetching images' });
  }
};

// Download compressed image
exports.downloadImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Set headers for file download
    res.setHeader('Content-Disposition', `attachment; filename=compressed-${image.originalName}`);
    res.setHeader('Content-Type', 'image/jpeg');

    // Send the file
    res.sendFile(image.compressedPath, { root: '.' });

    logger.info(`Image downloaded: ${image.originalName}`);
  } catch (error) {
    logger.error(`Error downloading image: ${error.message}`);
    res.status(500).json({ message: 'Error downloading image' });
  }
};

// Get analytics
exports.getAnalytics = async (req, res) => {
  try {
    const totalImages = await Image.countDocuments();
    const totalOriginalSize = await Image.aggregate([
      { $group: { _id: null, total: { $sum: '$originalSize' } } }
    ]);
    const totalCompressedSize = await Image.aggregate([
      { $group: { _id: null, total: { $sum: '$compressedSize' } } }
    ]);
    const averageCompression = await Image.aggregate([
      { $group: { _id: null, avg: { $avg: '$compressionRatio' } } }
    ]);

    res.json({
      totalImages,
      totalOriginalSize: totalOriginalSize[0]?.total || 0,
      totalCompressedSize: totalCompressedSize[0]?.total || 0,
      averageCompression: averageCompression[0]?.avg || 0
    });
  } catch (error) {
    logger.error(`Error fetching analytics: ${error.message}`);
    res.status(500).json({ message: 'Error fetching analytics' });
  }
}; 