import { supabase } from '../lib/supabaseClient';

export const submitContactForm = async ({ name, email, message }) => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          message,
          submitted_at: new Date().toISOString()
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

export const submitBusiness = async (businessData) => {
  try {
    let pictureUrl = null;

    // Handle image upload if present
    if (businessData.image) {
      try {
        const fileExt = businessData.image.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
        const filePath = `business-photos/${fileName}`;

        console.log('Attempting to upload image:', {
          bucket: 'upload',
          filePath,
          fileType: businessData.image.type,
          fileSize: businessData.image.size
        });

        const { error: uploadError } = await supabase.storage
          .from('upload')
          .upload(filePath, businessData.image, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Detailed upload error:', uploadError);
          throw uploadError;
        }

        pictureUrl = `${process.env.REACT_APP_SUPABASE_URL}/storage/v1/object/public/upload/${filePath}`;
        console.log('Image uploaded successfully:', pictureUrl);
      } catch (uploadError) {
        console.error('Detailed image upload error:', uploadError);
        throw new Error(`Failed to upload image: ${uploadError.message}`);
      }
    }

    // Log the IDs we're trying to use
    console.log('Using IDs:', {
      category: parseInt(businessData.category, 10),
      sub_category: businessData.sub_category ? parseInt(businessData.sub_category, 10) : null,
      locations: parseInt(businessData.locations, 10)
    });

    // Prepare submission data
    const submissionData = {
      name: businessData.name,
      category: parseInt(businessData.category, 10),
      sub_category: businessData.sub_category ? parseInt(businessData.sub_category, 10) : null,
      locations: parseInt(businessData.locations, 10),
      address1: businessData.address1,
      address2: businessData.address2 || null,
      postal_code: businessData.postal_code,
      phone: businessData.phone || null,
      email: businessData.email,
      website: businessData.website || null,
      google_maps: businessData.google_maps || null,
      facebook: businessData.facebook || null,
      instagram: businessData.instagram || null,
      summary: businessData.summary || null,
      lat: businessData.lat ? parseFloat(businessData.lat) : null,
      lon: businessData.lon ? parseFloat(businessData.lon) : null,
      picture: pictureUrl,
      status: 'pending'
    };

    // Log the exact data being submitted
    console.log('Submitting business data:', JSON.stringify(submissionData, null, 2));

    // Submit to database
    const { data, error } = await supabase
      .from('business_submissions')
      .insert([submissionData]);

    if (error) {
      console.error('Database error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });

      // Handle specific error cases
      if (error.code === '23503') { // Foreign key violation
        if (error.details?.includes('category')) {
          throw new Error('Invalid category selected');
        }
        if (error.details?.includes('sub_category')) {
          throw new Error('Invalid sub-category selected');
        }
        if (error.details?.includes('locations')) {
          throw new Error('Invalid community selected');
        }
        throw new Error('Invalid reference data selected');
      }

      throw error;
    }

    console.log('Business submitted successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Full submission error:', error);
    // Return a more user-friendly error message
    throw new Error(
      error.message.includes('upload')
        ? `Image upload failed: ${error.message}`
        : error.message || 'Failed to submit business. Please try again later.'
    );
  }
};

// Helper function to check submission status
export const checkSubmissionStatus = async (submissionId) => {
  try {
    const { data, error } = await supabase
      .from('business_submissions')
      .select('status')
      .eq('id', submissionId)
      .single();

    if (error) throw error;
    return data.status;
  } catch (error) {
    console.error('Error checking submission status:', error);
    throw error;
  }
};

// Helper function to get all submissions for admin review
export const getBusinessSubmissions = async () => {
  try {
    const { data, error } = await supabase
      .from('business_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching business submissions:', error);
    throw error;
  }
};

// Helper function to get all contact submissions for admin review
export const getContactSubmissions = async () => {
  try {
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('submitted_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    throw error;
  }
};
