import React from 'react';
import { Box, Typography, Link, List, ListItem } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Box sx={{ maxWidth: '800px', margin: '20px auto', padding: { xs: '16px', md: '32px' }, backgroundColor: '#fff', borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h3" align="center" sx={{ color: '#2a4d69', fontWeight: 'bold', fontSize: { xs: '1.5rem', md: '2rem' } }}>
        Privacy Policy
      </Typography>

      <Typography sx={{ marginTop: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}>
        Renolation Mobile built the Neighbor Ride app as a Free app. This SERVICE is provided by Renolation Mobile at no cost and is intended for use as is.
      </Typography>

      <Typography sx={{ marginTop: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}>
        This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decides to use our Service.
      </Typography>

      <Typography sx={{ marginTop: 2, fontSize: { xs: '0.875rem', md: '1rem' } }}>
        If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
        Information Collection and Use
      </Typography>
      <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
        For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained on your device and is not collected by us in any way.
      </Typography>
      <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
        The app does use third-party services that may collect information used to identify you.
      </Typography>

      <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
        Link to the privacy policy of third-party service providers used by the app:
      </Typography>
      <List>
        <ListItem>
          <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener" sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, color: '#2a4d69' }}>
            Google Play Services
          </Link>
        </ListItem>
      </List>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
        Log Data
      </Typography>
      <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
        Whenever you use our Service, in case of an error in the app, we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, configuration of the app, the time and date of your use of the Service, and other statistics.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
        Cookies
      </Typography>
      <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
        This Service does not use cookies explicitly. However, the app may use third-party code and libraries that use cookies to collect information and improve their services. You have the option to either accept or refuse these cookies.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
        Service Providers
      </Typography>
      <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
        We may employ third-party companies and individuals due to the following reasons:
      </Typography>
      <List>
        <ListItem sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>To facilitate our Service;</ListItem>
        <ListItem sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>To provide the Service on our behalf;</ListItem>
        <ListItem sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>To perform Service-related services; or</ListItem>
        <ListItem sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>To assist us in analyzing how our Service is used.</ListItem>
      </List>

      <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
        These third parties have access to your Personal Information to perform tasks on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
        Security
      </Typography>
      <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
        We value your trust in providing us your Personal Information, and we strive to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet or electronic storage is 100% secure.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
        Links to Other Sites
      </Typography>
      <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
        This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
        Children’s Privacy
      </Typography>
      <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
        These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years of age.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
        Changes to This Privacy Policy
      </Typography>
      <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
        We may update our Privacy Policy from time to time. You are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
        Contact Us
      </Typography>
      <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
        If you have any questions or suggestions about our Privacy Policy, please do not hesitate to contact us at info@neighborhub.vn.
      </Typography>
    </Box>
  );
};

export default PrivacyPolicy;
