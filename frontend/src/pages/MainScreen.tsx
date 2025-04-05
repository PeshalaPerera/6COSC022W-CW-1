import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import DashboardPanel from "../components/DashboardPanel";
import SearchPanel from "../components/SearchPanel";
import AdminPanel from "../components/AdminPanel";
import worldMapLeft from "../assets/world-map-one.png"; // Left panel background
import worldMapRight from "../assets/world-map-two.png"; // Right panel background

const MainScreen = () => {
  const [currentView, setCurrentView] = useState("register"); // default view

  const renderView = () => {
    switch (currentView) {
      case "login":
        return <LoginForm switchView={setCurrentView} />;
      case "dashboard":
        return <DashboardPanel />;
      case "search":
        return <SearchPanel />;
      case "admin":
        return <AdminPanel />;
      default:
          return <RegisterForm switchView={setCurrentView} />;
    }
  };  

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left Panel with background image */}
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${worldMapLeft})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "4rem",
          overflow: "hidden",
        }}
      >
        {/* Overlay to darken image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(23,139,147, 0.85)",
            zIndex: 0,
          }}
        ></div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            color: "#ffffff",
            textAlign: "center",
            paddingTop: "4rem",
            paddingBottom: "2rem",
          }}
        >
          <h1
            style={{
              fontSize: "2.9rem",
              fontWeight: "800",
              marginBottom: "1rem",
              textShadow: "1px 1px 4px rgba(0,0,0,0.4)",
              fontFamily: "Segoe UI, Roboto, sans-serif",
            }}
          >
            🌐 SecureAPI
          </h1>

          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "600",
              marginBottom: "1rem",
              color: "#f9f9f9",
            }}
          >
            Explore the World Securely
          </h2>

          <p
            style={{
              fontSize: "1.3rem",
              lineHeight: "1.8",
              maxWidth: "500px",
              margin: "0 auto",
              color: "#f0f0f0",
              fontWeight: 500,
            }}
          >
            This platform acts as a secure bridge between users and the
            RestCountries API.
            <br />
            Authenticate, manage your API keys, track usage, and explore
            detailed country data — all in one place.
          </p>
        </div>

        {/* Navigation */}
        {/* <div style={{ marginTop: "2rem", position: "relative", zIndex: 1 }}>
          {["login", "register", "dashboard", "search", "admin"].map((view) => (
            <button
              key={view}
              onClick={() => setCurrentView(view)}
              style={{
                margin: "0.25rem 0",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                border: "none",
                backgroundColor: currentView === view ? "#fff" : "#14796b",
                color: currentView === view ? "#14796b" : "#fff",
                fontWeight: "bold",
                cursor: "pointer",
                width: "100%",
              }}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div> */}
      </div>

      {/* Right Panel with background image */}
      <div
        style={{
          flex: 1,
          backgroundImage: `url(${worldMapRight})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          overflowY: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Overlay to soften background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            // backgroundColor: 'rgba(227, 242, 253, 0.85)', // light blue transparent
            backgroundColor: "rgba(227, 242, 253, 0.4)", // change 0.85 to 0.5 or 0.4
            zIndex: 0,
          }}
        ></div>

        {/* Rendered view content */}
        <div style={{ position: "relative", zIndex: 1 }}>{renderView()}</div>
      </div>
    </div>
  );
};

export default MainScreen;
