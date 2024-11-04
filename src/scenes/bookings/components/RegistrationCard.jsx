import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const RegistrationDetails = ({ selectedRegistration }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Registration Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>License Plate:</strong> {selectedRegistration.licensePlate}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Vehicle Type:</strong> {selectedRegistration.vehicleType}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Driver's License:</strong> {selectedRegistration.driversLicenseNumber}
            </Typography>
          </Grid>
          {/* Add more fields as needed */}
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Owner Name:</strong> {selectedRegistration.ownerName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Registration Date:</strong> {selectedRegistration.registrationDate}
            </Typography>
          </Grid>
          {/* Add additional fields here */}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default RegistrationDetails;
