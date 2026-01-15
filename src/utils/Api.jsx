import axios from "axios";

const BASE_URL = "https://youtube138.p.rapidapi.com";

const options = {
  params: {
    hl: "en",
    gl: "in",
  },
  headers: {
    // Твой новый рабочий ключ
    "X-RapidAPI-Key": "c26550c969msh110003f2363e2dfp1c11f5jsn24518fc2f8a0",
    "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
  },
};

export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    return data;
  } catch (error) {
    console.error("Ошибка при запросе к API:", error.response?.status || error.message);
    // Возвращаем пустую структуру, чтобы .map() в Feed.jsx не выдавал ошибку undefined
    return { contents: [] }; 
  }
};