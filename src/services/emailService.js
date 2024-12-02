import { supabase } from '../lib/supabaseClient';

export const sendContactEmail = async ({ name, email, message }) => {
  try {
    // Store in Supabase first
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert([{ name, email, message }]);

    if (dbError) throw dbError;

    // Send email using Resend
    const emailData = {
      from: 'Discover Erin <info@discovererin.ca>',
      to: 'info@discovererin.ca',
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Log email attempt
    console.log('Sending contact email:', emailData);

    // TODO: Implement actual email sending once Resend is set up
    console.log('Email would be sent:', emailData);

    return { success: true };
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
};

export const sendBusinessSubmissionEmail = async (businessData) => {
  try {
    // Format the email content
    const emailContent = `
      <h2>New Business Submission</h2>
      
      <h3>Basic Information</h3>
      <p><strong>Business Name:</strong> ${businessData.name}</p>
      <p><strong>Category:</strong> ${businessData.categoryName || businessData.category}</p>
      ${businessData.subCategoryName ? `<p><strong>Sub-Category:</strong> ${businessData.subCategoryName}</p>` : ''}
      <p><strong>Community:</strong> ${businessData.locationName || businessData.locations}</p>
      
      <h3>Location Information</h3>
      <p><strong>Address:</strong> ${businessData.address1}</p>
      ${businessData.address2 ? `<p><strong>Address 2:</strong> ${businessData.address2}</p>` : ''}
      <p><strong>Postal Code:</strong> ${businessData.postal_code}</p>
      ${businessData.google_maps ? `<p><strong>Google Maps:</strong> <a href="${businessData.google_maps}">${businessData.google_maps}</a></p>` : ''}
      ${businessData.lat ? `<p><strong>Latitude:</strong> ${businessData.lat}</p>` : ''}
      ${businessData.lon ? `<p><strong>Longitude:</strong> ${businessData.lon}</p>` : ''}
      
      <h3>Contact Information</h3>
      <p><strong>Email:</strong> ${businessData.email}</p>
      ${businessData.phone ? `<p><strong>Phone:</strong> ${businessData.phone}</p>` : ''}
      ${businessData.website ? `<p><strong>Website:</strong> <a href="${businessData.website}">${businessData.website}</a></p>` : ''}
      ${businessData.facebook ? `<p><strong>Facebook:</strong> <a href="${businessData.facebook}">${businessData.facebook}</a></p>` : ''}
      ${businessData.instagram ? `<p><strong>Instagram:</strong> <a href="${businessData.instagram}">${businessData.instagram}</a></p>` : ''}
      
      ${businessData.summary ? `
        <h3>Business Description</h3>
        <p>${businessData.summary}</p>
      ` : ''}
      
      ${businessData.picture ? `
        <h3>Business Photo</h3>
        <p><a href="${businessData.picture}">View uploaded photo</a></p>
      ` : ''}
    `;

    const emailData = {
      from: 'Discover Erin <info@discovererin.ca>',
      to: 'info@discovererin.ca',
      subject: `New Business Submission: ${businessData.name}`,
      html: emailContent
    };

    // Log email attempt
    console.log('Sending business submission email:', emailData);

    // TODO: Implement actual email sending once Resend is set up
    console.log('Email would be sent:', emailData);

    return { success: true };
  } catch (error) {
    console.error('Error sending business submission email:', error);
    throw error;
  }
};
