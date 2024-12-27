// import React, { useState } from "react";
// import axios from "axios";
// import "./StudentRegistration.css"; // Import CSS file

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     qualification: "",
//     university: "",
//     grade: "",
//     years_of_study_start: "",
//     years_of_study_end: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:8080/students/register",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       const successMessage = response.data.message;
//       const studentName = response.data.student.name;
//       alert(`${studentName} ${successMessage}`);

//       //console.log(response.data);
//       //to see the results are successfully passed to the frontend
//       setErrors({}); // Clearing the errors on the successful registration
//       setFormData({
//         name: "",
//         qualification: "",
//         university: "",
//         grade: "",
//         years_of_study_start: "",
//         years_of_study_end: "",
//       });
//     } catch (error) {
//       //console.error("Error registering student:", error); -- to debug the code

//       if (error.response && error.response.data.errors) {
//         // Extracting and setting errors from the backend in state
//         const backendErrors = error.response.data.errors.reduce(
//           (errorCollection, errorObj) => {
//             errorCollection[errorObj.path] = errorObj.msg;
//             return errorCollection;
//           },
//           {}
//         );
//         setErrors(backendErrors);
//       } else {
//         alert("An error occurred. Please try again.");
//       }
//     }
//   };

//   return (
//     <div className="form-container">
//       <div className="title-container">
//         <img src="../src/assets/logo.png" className="title-logo" alt="" />
//         <h1 className="form-title">Student Registration</h1>
//       </div>

//       <form onSubmit={handleSubmit} className="registration-form">
//         <div className="input-container">
//           <input
//             type="text"
//             name="name"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="form-input"
//           />
//           {errors.name && <div className="error-message">{errors.name}</div>}
//         </div>
//         <div className="input-container">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="form-input"
//           />
//           {errors.email && <div className="error-message">{errors.email}</div>}
//         </div>
//         <div className="input-container">
//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className="form-input"
//           />
//           {errors.password && (
//             <div className="error-message">{errors.password}</div>
//           )}
//         </div>
//         <div className="input-container">
//           <input
//             type="password"
//             name="password"
//             placeholder="Name"
//             value={formData.name}
//             onChange={handleChange}
//             required
//             className="form-input"
//           />
//           {errors.name && <div className="error-message">{errors.name}</div>}
//         </div>

//         <div className="input-container">
//           <select
//             name="qualification"
//             value={formData.qualification}
//             onChange={handleChange}
//             required
//           >
//             <option value="" disabled>
//               Select Qualification
//             </option>
//             <option value="Secondary">Secondary</option>
//             <option value="Higher Secondary">Higher Secondary</option>
//             <option value="Undergraduate">Undergraduate</option>
//             <option value="Postgraduate">Postgraduate</option>
//           </select>
//           {errors.qualification && (
//             <div className="error-message">{errors.qualification}</div>
//           )}
//         </div>

//         <div className="input-container">
//           <input
//             type="text"
//             name="university"
//             placeholder="University"
//             value={formData.university}
//             onChange={handleChange}
//             required
//             className="form-input"
//           />
//           {errors.university && (
//             <div className="error-message">{errors.university}</div>
//           )}
//         </div>

//         <div className="input-container">
//           <input
//             type="number"
//             name="grade"
//             placeholder="Grade"
//             value={formData.grade}
//             onChange={handleChange}
//             step="0.01"
//             min="1.0"
//             max="10.0"
//             required
//             className="form-input"
//           />
//           {errors.grade && <div className="error-message">{errors.grade}</div>}
//         </div>

//         <div className="input-container">
//           <label htmlFor="years_of_study_start">Years of Study (From):</label>
//           <input
//             type="date"
//             name="years_of_study_start"
//             value={formData.years_of_study_start}
//             onChange={handleChange}
//             required
//             className="form-input"
//           />
//           {errors.years_of_study_start && (
//             <div className="error-message">{errors.years_of_study_start}</div>
//           )}
//         </div>

//         <div className="input-container">
//           <label htmlFor="years_of_study_end">Years of Study (To):</label>
//           <input
//             type="date"
//             name="years_of_study_end"
//             value={formData.years_of_study_end}
//             onChange={handleChange}
//             required
//             className="form-input"
//           />
//           {errors.years_of_study_end && (
//             <div className="error-message">{errors.years_of_study_end}</div>
//           )}
//         </div>

//         <button type="submit" className="submit-button">
//           Register
//         </button>
//       </form>
//     </div>
//   );
// };

// export default RegistrationForm;
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./StudentRegistration.css"; // Import CSS file
import logo from "../assets/logo.png";
const RegistrationForm = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    qualification: "",
    university: "",
    grade: "",
    years_of_study_start: "",
    years_of_study_end: "",
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    qualification: Yup.string().required("Qualification is required"),
    university: Yup.string().required("University is required"),
    grade: Yup.number()
      .min(1.0, "Grade must be at least 1.0")
      .max(10.0, "Grade cannot exceed 10.0")
      .required("Grade is required"),
    years_of_study_start: Yup.date().required("Start date is required"),
    years_of_study_end: Yup.date()
      .required("End date is required")
      .min(
        Yup.ref("years_of_study_start"),
        "End date must be after start date"
      ),
  });

  const handleSubmit = async (values, { resetForm, setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/students/register",
        values,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      const successMessage = response.data.message;
      alert(`${values.name} ${successMessage}`);
      resetForm();
    } catch (error) {
      if (error.response && error.response.data.errors) {
        console.error("Backend Validation Errors:", error.response.data.errors);
        alert("Backend Error: Please check your input.");
      } else {
        alert("An error occurred. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="title-container">
        <img src={logo} className="title-logo" alt="Logo" />
        <h1 className="form-title">Student Registration</h1>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="registration-form">
            <div className="input-container">
              <Field
                type="text"
                name="name"
                placeholder="Name"
                className="form-input"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
              <Field
                type="email"
                name="email"
                placeholder="Email"
                className="form-input"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="form-input"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="form-input"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
              <Field as="select" name="qualification" className="form-input">
                <option value="" disabled>
                  Select Qualification
                </option>
                <option value="Secondary">Secondary</option>
                <option value="Higher Secondary">Higher Secondary</option>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </Field>
              <ErrorMessage
                name="qualification"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
              <Field
                type="text"
                name="university"
                placeholder="University"
                className="form-input"
              />
              <ErrorMessage
                name="university"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
              <Field
                type="number"
                name="grade"
                placeholder="Grade"
                step="0.01"
                min="1.0"
                max="10.0"
                className="form-input"
              />
              <ErrorMessage
                name="grade"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
              <label>Years of Study (Start):</label>
              <Field
                type="date"
                name="years_of_study_start"
                className="form-input"
              />
              <ErrorMessage
                name="years_of_study_start"
                component="div"
                className="error-message"
              />
            </div>

            <div className="input-container">
              <label>Years of Study (End):</label>
              <Field
                type="date"
                name="years_of_study_end"
                className="form-input"
              />
              <ErrorMessage
                name="years_of_study_end"
                component="div"
                className="error-message"
              />
            </div>

            <button
              type="submit"
              className="submit-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
