import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabaseClient';
import { sendBusinessSubmissionEmail } from '../services/emailService';
import { submitBusiness } from '../services/submissionService';

const MAX_IMAGE_SIZE = 800; // Maximum width/height for uploaded images

const resizeImage = (file) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Calculate new dimensions while maintaining aspect ratio
      if (width > height) {
        if (width > MAX_IMAGE_SIZE) {
          height = Math.round((height * MAX_IMAGE_SIZE) / width);
          width = MAX_IMAGE_SIZE;
        }
      } else {
        if (height > MAX_IMAGE_SIZE) {
          width = Math.round((width * MAX_IMAGE_SIZE) / height);
          height = MAX_IMAGE_SIZE;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        resolve(new File([blob], file.name, {
          type: 'image/jpeg',
          lastModified: Date.now(),
        }));
      }, 'image/jpeg', 0.8);
    };
    img.onerror = reject;
  });
};

const SubmitBusiness = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    sub_category: '',
    locations: '',
    address1: '',
    address2: '',
    postal_code: '',
    phone: '',
    email: '',
    website: '',
    google_maps: '',
    facebook: '',
    instagram: '',
    summary: '',
    lat: '',
    lon: ''
  });
  
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const { data: categoriesData } = await supabase
          .from('categories')
          .select('*')
          .order('name');
        setCategories(categoriesData || []);

        // Fetch communities
        const { data: communitiesData } = await supabase
          .from('communities')
          .select('*')
          .order('name');
        setCommunities(communitiesData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load form data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (formData.category) {
        try {
          const { data } = await supabase
            .from('sub_categories')
            .select('*')
            .eq('category', formData.category)
            .order('name');
          setSubCategories(data || []);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      } else {
        setSubCategories([]);
      }
    };

    fetchSubCategories();
  }, [formData.category]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const resizedImage = await resizeImage(file);
        setSelectedImage(resizedImage);
        setPreviewUrl(URL.createObjectURL(resizedImage));
      } catch (error) {
        console.error('Error processing image:', error);
        setError('Failed to process image. Please try again.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      // Log form data for debugging
      console.log('Form Data:', {
        ...formData,
        category: Number(formData.category),
        sub_category: formData.sub_category ? Number(formData.sub_category) : null,
        locations: Number(formData.locations)
      });

      // Get category, subcategory, and location names for email
      const category = categories.find(c => c.id === Number(formData.category));
      const subCategory = subCategories.find(sc => sc.id === Number(formData.sub_category));
      const location = communities.find(l => l.id === Number(formData.locations));

      console.log('Found references:', {
        category: category?.name,
        subCategory: subCategory?.name,
        location: location?.name
      });

      const businessData = {
        ...formData,
        image: selectedImage || null,
        categoryName: category?.name,
        subCategoryName: subCategory?.name,
        locationName: location?.name
      };

      // Log the final business data being submitted
      console.log('Submitting business data:', {
        ...businessData,
        image: selectedImage ? {
          name: selectedImage.name,
          type: selectedImage.type,
          size: selectedImage.size
        } : null
      });

      try {
        // Submit to Supabase
        const result = await submitBusiness(businessData);
        console.log('Business submitted successfully:', result);

        // Send email notification
        await sendBusinessSubmissionEmail(businessData);
        console.log('Email notification sent successfully');

        setStatus('success');
        setFormData({
          name: '',
          category: '',
          sub_category: '',
          locations: '',
          address1: '',
          address2: '',
          postal_code: '',
          phone: '',
          email: '',
          website: '',
          google_maps: '',
          facebook: '',
          instagram: '',
          summary: '',
          lat: '',
          lon: ''
        });
        setSelectedImage(null);
        setPreviewUrl('');
      } catch (submitError) {
        console.error('Detailed submission error:', submitError);
        throw submitError;
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setError(error.message || 'Failed to submit business. Please try again later.');
      setStatus('error');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const inputClasses = `
    mt-2 block w-full rounded-lg 
    border border-gray-300 
    shadow-sm 
    focus:border-green-500 focus:ring-2 focus:ring-green-500 
    hover:border-gray-400
    text-base py-3 px-4
    bg-white
  `;
  
  const labelClasses = "block text-base font-medium text-gray-700 mb-1";

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <div className="flex-1 bg-gray-50">
        <div className="max-w-[1200px] mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="bg-white shadow-sm rounded-lg p-8 sm:p-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-10">Submit Your Business</h1>
            
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Basic Information */}
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold text-gray-900 border-b pb-2">Basic Information</h2>
                
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      Business Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="category" className={labelClasses}>
                      Category *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="sub_category" className={labelClasses}>
                      Sub-Category (Optional)
                    </label>
                    <select
                      id="sub_category"
                      name="sub_category"
                      value={formData.sub_category}
                      onChange={handleChange}
                      disabled={!formData.category}
                      className={`${inputClasses} ${!formData.category ? 'bg-gray-50 cursor-not-allowed' : ''}`}
                    >
                      <option value="">Select a sub-category</option>
                      {subCategories.map(subCategory => (
                        <option key={subCategory.id} value={subCategory.id}>{subCategory.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="locations" className={labelClasses}>
                      Community *
                    </label>
                    <select
                      id="locations"
                      name="locations"
                      required
                      value={formData.locations}
                      onChange={handleChange}
                      className={inputClasses}
                    >
                      <option value="">Select a community</option>
                      {communities.map(community => (
                        <option key={community.id} value={community.id}>{community.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold text-gray-900 border-b pb-2">Location Information</h2>
                
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="address1" className={labelClasses}>
                      Address Line 1 *
                    </label>
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      required
                      value={formData.address1}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="address2" className={labelClasses}>
                      Address Line 2 (Optional)
                    </label>
                    <input
                      type="text"
                      id="address2"
                      name="address2"
                      value={formData.address2}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="postal_code" className={labelClasses}>
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      required
                      value={formData.postal_code}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="google_maps" className={labelClasses}>
                      Google Maps Link (Optional)
                    </label>
                    <input
                      type="url"
                      id="google_maps"
                      name="google_maps"
                      value={formData.google_maps}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="lat" className={labelClasses}>
                      Latitude (Optional)
                    </label>
                    <input
                      type="number"
                      step="any"
                      id="lat"
                      name="lat"
                      value={formData.lat}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="lon" className={labelClasses}>
                      Longitude (Optional)
                    </label>
                    <input
                      type="number"
                      step="any"
                      id="lon"
                      name="lon"
                      value={formData.lon}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold text-gray-900 border-b pb-2">Contact Information</h2>
                
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className={labelClasses}>
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className={labelClasses}>
                      Website (Optional)
                    </label>
                    <input
                      type="url"
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className={inputClasses}
                    />
                  </div>

                  <div>
                    <label htmlFor="facebook" className={labelClasses}>
                      Facebook Link (Optional)
                    </label>
                    <input
                      type="url"
                      id="facebook"
                      name="facebook"
                      value={formData.facebook}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="https://facebook.com/yourbusiness"
                    />
                  </div>

                  <div>
                    <label htmlFor="instagram" className={labelClasses}>
                      Instagram Link (Optional)
                    </label>
                    <input
                      type="url"
                      id="instagram"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      className={inputClasses}
                      placeholder="https://instagram.com/yourbusiness"
                    />
                  </div>
                </div>
              </div>

              {/* Business Details */}
              <div className="space-y-8">
                <h2 className="text-2xl font-semibold text-gray-900 border-b pb-2">Business Details</h2>
                
                <div>
                  <label htmlFor="summary" className={labelClasses}>
                    Business Description (Optional)
                  </label>
                  <textarea
                    id="summary"
                    name="summary"
                    rows={6}
                    value={formData.summary}
                    onChange={handleChange}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label className={labelClasses}>
                    Business Photo (Optional)
                  </label>
                  <div className="mt-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="block w-full text-base text-gray-500
                        file:mr-4 file:py-3 file:px-4
                        file:rounded-lg file:border-0
                        file:text-base file:font-medium
                        file:bg-green-50 file:text-green-700
                        hover:file:bg-green-100
                        border border-gray-300 rounded-lg"
                    />
                  </div>
                  {previewUrl && (
                    <div className="mt-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="h-48 w-auto object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                  <p className="mt-2 text-base text-gray-500">
                    Image will be automatically resized to optimize loading times.
                  </p>
                </div>
              </div>

              {error && (
                <div className="rounded-lg bg-red-50 p-4 border border-red-100">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-red-800">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full flex justify-center py-4 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {status === 'submitting' ? 'Submitting...' : 'Submit Business'}
                </button>
              </div>

              {status === 'success' && (
                <div className="rounded-lg bg-green-50 p-4 border border-green-100">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-6 w-6 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-base font-medium text-green-800">
                        Business submitted successfully! We will review your submission and get back to you soon.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SubmitBusiness;
