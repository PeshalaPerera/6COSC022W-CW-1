import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import LoginForm from "../components/LoginForm";
import DashboardPanel from "../components/DashboardPanel";
import SearchPanel from "../components/SearchPanel";
import AdminPanel from "../components/AdminPanel";
import worldMapLeft from "../assets/world-map-one.png";
import worldMapRight from "../assets/world-map-two.png";
import { useAuth } from "../context/AuthContext";

const MainScreen = () => {
  const [leftView, setLeftView] = useState("");
  const [rightView, setRightView] = useState("register");
  const { token, logout, user } = useAuth();

  const renderView = () => {
    if (rightView === "login") return <LoginForm switchView={setRightView} />;
    if (rightView === "register")
      return <RegisterForm switchView={setRightView} />;
    if (rightView === "search") return <SearchPanel />;
    if (rightView === "admin") return <AdminPanel />;
    return null;
  };

  const handleLogout = () => {
    console.log("🔒 Logging out...");
    logout();
    setRightView("register");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
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

          {(!token ||
            (leftView !== "dashboard" && leftView !== "adminDashboard")) && (
            <>
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
            </>
          )}

          {token &&
            leftView === "dashboard" &&
            user?.email !== "admin@gmail.com" && (
              <div>
                <DashboardPanel />
              </div>
            )}
          {token &&
            leftView === "adminDashboard" &&
            user?.email === "admin@gmail.com" && (
              <div>
                <AdminPanel />
              </div>
            )}
        </div>
      </div>

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
          padding: "4rem",
          alignItems: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(227, 242, 253, 0.4)",
            zIndex: 0,
          }}
        ></div>

        {token && (
          <div
            style={{
              position: "absolute",
              top: "1rem",
              right: "1.5rem",
              zIndex: 2,
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => {
                  if (user?.email === "admin@gmail.com") {
                    setLeftView("adminDashboard");
                  } else {
                    setLeftView("dashboard");
                  }
                  setRightView("search");
                }}
                style={{
                  backgroundColor: "#178b93",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Dashboard
              </button>
              <button
                onClick={handleLogout}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                  border: "none",
                  padding: "0.5rem 1rem",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </div>
          </div>
        )}

        <div style={{ position: "relative", zIndex: 1 }}>{renderView()}</div>
      </div>
    </div>
  );
};

export default MainScreen;
