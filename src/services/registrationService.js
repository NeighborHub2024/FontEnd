export const getRegistrationForms = async () => {
    try {
      const response = await fetch("https://gh-neighborhub-569199407036.asia-southeast1.run.app/api/v1/registrationForm/getAllRegistrationForm");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("There was an error fetching the registration forms:", error);
      return [];
    }
  };

  export const acceptRegistrationForm = async (registrationId) => {
    try {
      const response = await fetch(`https://gh-neighborhub-569199407036.asia-southeast1.run.app/api/v1/registrationForm/acceptRegisForm/${registrationId}`, {
        method: 'PUT',
      });
  
      if (!response.ok) {
        throw new Error('Failed to accept registration form');
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error in accepting registration form:", error);
      throw error;
    }
  };
  