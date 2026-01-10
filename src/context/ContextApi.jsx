/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { fetchDataFromApi } from "../utils/Api";

export const Context = createContext();

export const AppContext = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [selectCategories, setSelectCategories] = useState("New");
  const [mobileMenu, setMobileMenu] = useState(false);
  
  // Новые состояния для бесконечной прокрутки и сохранений
  const [nextPageToken, setNextPageToken] = useState(null);
  const [likedVideos, setLikedVideos] = useState(JSON.parse(localStorage.getItem("likedVideos")) || []);
  const [watchLater, setWatchLater] = useState(JSON.parse(localStorage.getItem("watchLater")) || []);

  // Синхронизация с LocalStorage
  useEffect(() => {
    localStorage.setItem("likedVideos", JSON.stringify(likedVideos));
  }, [likedVideos]);

  useEffect(() => {
    localStorage.setItem("watchLater", JSON.stringify(watchLater));
  }, [watchLater]);

  useEffect(() => {
    // При смене категории всегда загружаем с нуля
    fetchSelectedCategoryData(selectCategories);
  }, [selectCategories]);

  const fetchSelectedCategoryData = (query, isLoadMore = false) => {
    if (!isLoadMore) setLoading(true);

    // Формируем URL. Если это дозагрузка, добавляем токен страницы
    let apiQuery = `search/?q=${encodeURIComponent(query)}`;
    if (isLoadMore && nextPageToken) {
      apiQuery += `&cursor=${nextPageToken}`; // или &pageToken в зависимости от вашего API
    }

    fetchDataFromApi(apiQuery)
      .then((res) => {
        let contents = res?.contents || res?.items || [];
        const nextCursor = res?.cursorNext || res?.nextPageToken || null;

        setSearchResult((prev) => {
          // Если дозагрузка — склеиваем массивы, если новая категория — заменяем
          return isLoadMore ? [...prev, ...contents] : contents;
        });
        
        setNextPageToken(nextCursor);
      })
      .catch((err) => console.error("API Error:", err))
      .finally(() => setLoading(false));
  };

  // Функция, которую будет вызывать Infinite Scroll
  const fetchMoreData = () => {
    if (nextPageToken) {
      fetchSelectedCategoryData(selectCategories, true);
    }
  };

  // Логика лайков и сохранений
  const toggleLike = (videoId) => {
    setLikedVideos(prev => 
      prev.includes(videoId) ? prev.filter(id => id !== videoId) : [...prev, videoId]
    );
  };

  const toggleWatchLater = (video) => {
    setWatchLater(prev => {
      const exists = prev.find(v => v.videoId === video.videoId);
      return exists ? prev.filter(v => v.videoId !== video.videoId) : [...prev, video];
    });
  };

  return (
    <Context.Provider value={{
      loading, setLoading,
      searchResult,
      selectCategories, setSelectCategories,
      mobileMenu, setMobileMenu,
      fetchMoreData, hasMore: !!nextPageToken,
      likedVideos, toggleLike,
      watchLater, toggleWatchLater
    }}>
      {children}
    </Context.Provider>
  );
};