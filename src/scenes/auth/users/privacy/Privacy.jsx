import React from 'react';
import { Box, Typography, Button, Link, List, ListItem } from '@mui/material';

const PrivacyPolicy = () => {
  return (
    <Box sx={{ maxWidth: '800px', margin: '20px auto', padding: '20px', backgroundColor: '#fff', borderRadius: 2, boxShadow: 3,  margin: 12 }}>
      <Typography variant="h3" align="center" sx={{ color: '#2a4d69', fontWeight: 'bold' }}>
        Privacy Policy
      </Typography>

      <Typography sx={{ marginTop: 2 }}>
        Renolation Mobile built the Neighbor Ride app as a Free app. This SERVICE is provided by Renolation Mobile at no cost and is intended for use as is.
      </Typography>
      <Typography sx={{ marginTop: 2 }}>
        This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decides to use our Service.
      </Typography>
      <Typography sx={{ marginTop: 2 }}>
        If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold' }}>
        Information Collection and Use
      </Typography>
      <Typography>
        For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information. The information that we request will be retained on your device and is not collected by us in any way.
      </Typography>
      <Typography>
        The app does use third-party services that may collect information used to identify you.
      </Typography>
      <Typography>
        Link to the privacy policy of third-party service providers used by the app:
      </Typography>
      <List>
        <ListItem>
          <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Play Services</Link>
        </ListItem>
      </List>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold' }}>
        Log Data
      </Typography>
      <Typography>
        Whenever you use our Service, in case of an error in the app, we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, configuration of the app, the time and date of your use of the Service, and other statistics.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold' }}>
        Cookies
      </Typography>
      <Typography>
        This Service does not use cookies explicitly. However, the app may use third-party code and libraries that use cookies to collect information and improve their services. You have the option to either accept or refuse these cookies.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold' }}>
        Service Providers
      </Typography>
      <Typography>
        We may employ third-party companies and individuals due to the following reasons:
      </Typography>
      <List>
        <ListItem>To facilitate our Service;</ListItem>
        <ListItem>To provide the Service on our behalf;</ListItem>
        <ListItem>To perform Service-related services; or</ListItem>
        <ListItem>To assist us in analyzing how our Service is used.</ListItem>
      </List>
      <Typography>
        These third parties have access to your Personal Information to perform tasks on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold' }}>
        Security
      </Typography>
      <Typography>
        We value your trust in providing us your Personal Information, and we strive to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet or electronic storage is 100% secure.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold' }}>
        Links to Other Sites
      </Typography>
      <Typography>
        This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold' }}>
        Children’s Privacy
      </Typography>
      <Typography>
        These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years of age.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold' }}>
        Changes to This Privacy Policy
      </Typography>
      <Typography>
        We may update our Privacy Policy from time to time. You are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.
      </Typography>

      <Typography variant="h5" sx={{ marginTop: 4, color: '#2a4d69', fontWeight: 'bold' }}>
        Contact Us
      </Typography>
      <Typography>
        If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at <Link href="mailto:phuoc@renolation.com">phuoc@renolation.com</Link>.
      </Typography>
      <Typography sx={{ marginTop: 2, fontStyle: 'italic' }}>
        This privacy policy page was created at <Link href="https://privacypolicytemplate.net" target="_blank">privacypolicytemplate.net</Link> and modified/generated by <Link href="https://app-privacy-policy-generator.nisrulz.com/" target="_blank">App Privacy Policy Generator</Link>.
      </Typography>
    </Box>
  );
};

export default PrivacyPolicy;
