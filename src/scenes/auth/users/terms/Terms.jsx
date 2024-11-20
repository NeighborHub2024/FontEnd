import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" sx={{ backgroundColor: '#fff', borderRadius: 2, padding: 3, boxShadow: 3, marginTop: 6, marginBottom: 6 }}>
      <Typography variant="h3" align="center" color="primary" gutterBottom>
        Terms and Conditions
      </Typography>

      <Typography variant="body1" paragraph>
        Welcome to Neighbor Ride! These terms and conditions outline the rules and regulations for the use of the Neighbor Ride app, provided by Renolation Mobile.
      </Typography>

      <Typography variant="h5" color="primary" gutterBottom>
        1. Acceptance of Terms
      </Typography>
      <Typography variant="body1" paragraph>
        By accessing and using the Neighbor Ride app, you agree to comply with these Terms and Conditions. If you do not agree with any part of these terms, you are not authorized to use the Service.
      </Typography>

      <Typography variant="h5" color="primary" gutterBottom>
        2. User Responsibilities
      </Typography>
      <Typography variant="body1" paragraph>
        Users agree to use the Neighbor Ride app in accordance with all applicable laws and regulations. Users should not misuse the Service, such as interfering with the app’s operation, transmitting harmful or illegal content, or violating the rights of others.
      </Typography>

      <Typography variant="h5" color="primary" gutterBottom>
        3. Privacy and Data Collection
      </Typography>
      <Typography variant="body1" paragraph>
        Your use of the Service is subject to our Privacy Policy. We collect and use your data as described in our Privacy Policy, which is available in the app and on our website.
      </Typography>

      <Typography variant="h5" color="primary" gutterBottom>
        4. Service Availability
      </Typography>
      <Typography variant="body1" paragraph>
        We aim to keep the Neighbor Ride app available at all times, but we do not guarantee uninterrupted access. The app may be unavailable due to maintenance or other reasons.
      </Typography>

      <Typography variant="h5" color="primary" gutterBottom>
        5. Third-Party Services
      </Typography>
      <Typography variant="body1" paragraph>
        The app may contain links to third-party websites or services that are not controlled by Renolation Mobile. We are not responsible for the content or practices of any third-party services.
      </Typography>

      <Typography variant="h5" color="primary" gutterBottom>
        6. Limitation of Liability
      </Typography>
      <Typography variant="body1" paragraph>
        To the fullest extent permitted by law, Renolation Mobile is not liable for any direct, indirect, incidental, special, or consequential damages resulting from your use of the app or any services provided.
      </Typography>

      <Typography variant="h5" color="primary" gutterBottom>
        7. Changes to Terms
      </Typography>
      <Typography variant="body1" paragraph>
        Renolation Mobile reserves the right to update or modify these Terms and Conditions at any time. We will notify you of significant changes, and you should review the terms periodically to stay informed.
      </Typography>

      <Typography variant="h5" color="primary" gutterBottom>
        8. Governing Law
      </Typography>
      <Typography variant="body1" paragraph>
        These Terms and Conditions are governed by the laws of the jurisdiction in which Renolation Mobile is located. Any disputes arising under these terms shall be resolved in the applicable courts of that jurisdiction.
      </Typography>

      <Typography variant="h5" color="primary" gutterBottom>
        9. Contact Us
      </Typography>
      <Typography variant="body1" paragraph>
        If you have any questions or concerns about these Terms and Conditions, please contact us at{' '}
        <Link href="mailto:phuoc@renolation.com">phuoc@renolation.com</Link>.
      </Typography>

      <Box mt={3} display="flex" justifyContent="center">
        <Typography variant="body2">
          These Terms and Conditions were created using a template from{' '}
          <Link href="https://www.termsfeed.com">TermsFeed</Link>.
        </Typography>
      </Box>
    </Container>
  );
};

export default TermsAndConditions;
