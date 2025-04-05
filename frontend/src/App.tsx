import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainScreen from "./pages/MainScreen";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<MainScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
