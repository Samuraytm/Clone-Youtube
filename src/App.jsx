import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { AppContext } from "./context/ContextApi";
import { ThemeProvider } from "./context/ThemeContext"; // ← ДОБАВЬ ЭТОТ ИМПОРТ

import Header from "./components/Header";
import Feed from "./components/Feed";
import SearchResult from "./components/SearchResult";
import VideoDetail from "./components/VideoDetail";
import WatchLater from "./components/WatchLater";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider> 
        <AppContext>
          <div className="flex flex-col min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
            <Header />
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/searchResult/:searchQuery" element={<SearchResult />} />
              <Route path="/video/:id" element={<VideoDetail />} />
              <Route path="/watchLater" element={<WatchLater />} />
            </Routes>
          </div>
        </AppContext>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;