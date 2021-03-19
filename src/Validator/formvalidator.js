export const Loginvalidator = (values) => {
    let errors = {};
    let isvalid = true;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Cannot be blank";
      isvalid = false;
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
      isvalid = false;
    }
    if (!values.password) {
      errors.password = "Cannot be blank";
      isvalid = false
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
      isvalid = false
    }
    return [errors, isvalid];
  };