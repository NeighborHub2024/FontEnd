import { Box } from "@mui/material";
import { Header } from "../../components";
import { Formik } from "formik";
const Form = () => {
  const handleFormSubmit = (values, actions) => {
    console.log(values);
    
  };
  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />

      
    </Box>
  );
};

export default Form;
