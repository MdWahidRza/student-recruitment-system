import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar */}
        {/* <Navbar /> */}

        {/* Main Content */}
        <main>
          <AppRoutes />
        </main>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
