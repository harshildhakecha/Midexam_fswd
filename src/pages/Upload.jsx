import { useState } from 'react';
import api from '../config/axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setMessage('');
      setUploadedImage(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const response = await api.post('/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadedImage(response.data.image);
      setFile(null);
      setPreview(null);
      setMessage('Image uploaded and compressed successfully!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error uploading image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-2xl w-full mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Upload & Compress Image
          </h2>
          
          <div className="mb-8">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors duration-300">
              <div className="space-y-4">
                <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div className="text-gray-600">
                  <label className="cursor-pointer">
                    <span className="text-blue-600 font-semibold">Click to upload</span> or drag and drop
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <p className="text-sm text-gray-500 mt-2">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          {preview && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Preview</h3>
              <div className="relative aspect-video rounded-lg overflow-hidden">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {uploadedImage && (
            <div className="mb-8 p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-800 font-medium">Image compressed successfully!</p>
                  <p className="text-sm text-green-600">
                    Original: {(uploadedImage.originalSize / 1024).toFixed(2)} KB
                    <br />
                    Compressed: {(uploadedImage.compressedSize / 1024).toFixed(2)} KB
                    <br />
                    Saved: {uploadedImage.compressionRatio.toFixed(2)}%
                  </p>
                </div>
                <button
                  onClick={() => window.open(`http://localhost:5000/api/images/${uploadedImage._id}/download`, '_blank')}
                  className="ml-4 inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            className={`w-full py-4 px-6 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105
              ${uploading || !file
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
              }`}
          >
            {uploading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Compressing...
              </div>
            ) : (
              'Upload & Compress'
            )}
          </button>

          {message && !uploadedImage && (
            <div className="mt-4 p-4 rounded-lg bg-red-50">
              <p className="text-red-800">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload; 