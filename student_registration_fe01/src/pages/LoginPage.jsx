import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Keep the CSS styling in a separate file

const LoginPage = () => {
  const navigate = useNavigate();

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      identifier: "", // Email or Registration ID
      password: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.identifier) {
        errors.identifier = "Email or Registration ID is required";
      }
      if (!values.password) {
        errors.password = "Password is required";
      }
      return errors;
    },
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        // Make API request to backend login endpoint
        const response = await axios.post(
          "http://localhost:8080/students/login", // Adjust the URL if needed
          {
            identifier: values.identifier,
            password: values.password,
          }
        );

        // Save the token and navigate to the dashboard
        const { student, token } = response.data.data;
        // console.log(response.data.data);
        localStorage.setItem("token", token);
        navigate("/dashboard", { state: { student } });
      } catch (error) {
        // Handle backend errors and add them to the Formik errors
        if (error.response && error.response.data) {
          setErrors({
            identifier: error.response.data.identifier,
            password: error.response.data.password,
            serverError: error.response.data.message, // General backend error
          });
        } else {
          setErrors({ serverError: "An unexpected error occurred." });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="form-container" onSubmit={formik.handleSubmit}>
        {/* Identifier Input */}
        <div className="input-container">
          <input
            type="text"
            id="identifier"
            name="identifier"
            placeholder="Email or Registration ID"
            value={formik.values.identifier}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.identifier && formik.touched.identifier
                ? "form-input error"
                : "form-input"
            }
          />
          {formik.errors.identifier && formik.touched.identifier && (
            <div className="error-message">{formik.errors.identifier}</div>
          )}
        </div>

        {/* Password Input */}
        <div className="input-container">
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={
              formik.errors.password && formik.touched.password
                ? "form-input error"
                : "form-input"
            }
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error-message">{formik.errors.password}</div>
          )}
        </div>

        {/* General Backend Error */}
        {formik.errors.serverError && (
          <div className="error-message server-error">
            {formik.errors.serverError}
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? "Logging in..." : "Login"}
        </button>
        <div className="register-link-container">
          Don't have an account?{" "}
          <a href="/" className="register-link">
            Register here
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
