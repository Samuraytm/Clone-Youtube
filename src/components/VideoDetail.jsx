import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiOutlineLike, AiFillLike } from "react-icons/ai"; // Добавили залитую иконку
import { MdOutlineWatchLater, MdWatchLater } from "react-icons/md"; // Иконки для Watch Later
import { abbreviateNumber } from "js-abbreviation-number";

import { fetchDataFromApi } from "../utils/Api";
import { Context } from "../context/ContextApi";
import SuggestionVideoCard from "./SuggestionVideoCard";

function VideoDetail() {
  const [video, setVideo] = useState();
  const [relatedVideos, setRelatedVideos] = useState();
  const { id } = useParams();
  
  // Извлекаем функции и состояния из контекста
  const { 
    setLoading, 
    likedVideos, 
    toggleLike, 
    watchLater, 
    toggleWatchLater 
  } = useContext(Context);

  // Проверяем состояния для текущего видео
  const isLiked = likedVideos.includes(id);
  const isInWatchLater = watchLater.some((v) => v.videoId === id);

  useEffect(() => {
    document.getElementById("root").classList.add("custom-h");
    fetchVideoDetails();
    fetchRelatedVideos();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchVideoDetails = () => {
    setLoading(true);
    fetchDataFromApi(`video/details/?id=${id}`).then((res) => {
      setVideo(res);
      setLoading(false);
    });
  };

  const fetchRelatedVideos = () => {
    setLoading(true);
    fetchDataFromApi(`video/related-contents/?id=${id}`).then((res) => {
      setRelatedVideos(res);
      setLoading(false);
    });
  };

  return (
    <div className="flex justify-center flex-row h-[calc(100%-56px)] bg-white dark:bg-black">
      <div className="w-full max-w-[1280px] flex flex-col lg:flex-row">
        <div className="flex flex-col lg:w-[calc(100%-350px)] xl:w-[calc(100%-400px)] px-4 py-3 lg:py-6 overflow-y-auto no-scrollbar">
          <div className="h-[200px] md:h-[400px] lg:h-[400px] xl:h-[550px] ml-[-16px] lg:ml-0 mr-[-16px] lg:mr-0">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              controls
              width="100%"
              height="100%"
              style={{ backgroundColor: "#000000" }}
              playing={true}
            />
          </div>

          <div className="text-black dark:text-white font-semibold text-sm md:text-xl mt-4 line-clamp-2">
            {video?.title}
          </div>

          <div className="flex justify-between flex-col md:flex-row mt-4">
            <div className="flex">
              <div className="flex items-start">
                <div className="flex h-11 w-11 rounded-full overflow-hidden">
                  <img
                    src={video?.author?.avatar[0]?.url}
                    alt="avatar"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div className="flex flex-col ml-3">
                <div className="text-black dark:text-white text-md font-semibold flex items-center">
                  {video?.author?.title}
                  {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                    <BsFillCheckCircleFill className="text-black/[0.5] dark:text-white/[0.5] text-[12px] ml-1" />
                  )}
                </div>
                <div className="text-black/[0.7] dark:text-white/[0.7] text-sm">
                  {video?.author?.stats?.subscribersText}
                </div>
              </div>
            </div>

            {/* БЛОК КНОПОК: ЛАЙК И СОХРАНЕНИЕ */}
            <div className="flex text-black dark:text-white mt-4 md:mt-0 gap-3">
              {/* Кнопка ЛАЙК */}
              <button
                onClick={() => toggleLike(id)}
                className={`flex items-center justify-center h-11 px-6 rounded-3xl transition-colors ${
                  isLiked 
                    ? "bg-blue-600 text-white" 
                    : "dark:bg-white/[0.15] bg-black/[0.1] hover:bg-black/[0.2] dark:hover:bg-white/[0.25]"
                }`}
              >
                {isLiked ? (
                  <AiFillLike className="text-xl mr-2" />
                ) : (
                  <AiOutlineLike className="text-xl mr-2" />
                )}
                <span className="text-sm font-medium">
                  {video?.stats?.likes ? abbreviateNumber(video?.stats?.likes, 2) : "Like"}
                </span>
              </button>

              {/* Кнопка ПОСМОТРЕТЬ ПОЗЖЕ */}
              <button
                onClick={() => toggleWatchLater(video)}
                className={`flex items-center justify-center h-11 px-6 rounded-3xl transition-colors ${
                  isInWatchLater 
                    ? "bg-green-600 text-white" 
                    : "dark:bg-white/[0.15] bg-black/[0.1] hover:bg-black/[0.2] dark:hover:bg-white/[0.25]"
                }`}
              >
                {isInWatchLater ? (
                  <MdWatchLater className="text-xl mr-2" />
                ) : (
                  <MdOutlineWatchLater className="text-xl mr-2" />
                )}
                <span className="text-sm font-medium">
                  {isInWatchLater ? "Added" : "Watch Later"}
                </span>
              </button>

              {/* Просмотры (просто инфо) */}
              <div className="hidden sm:flex items-center justify-center h-11 px-6 rounded-3xl dark:bg-white/[0.15] bg-black/[0.1]">
                <span className="text-sm font-medium">
                  {`${abbreviateNumber(video?.stats?.views, 2)} Views`}
                </span>
              </div>
            </div>
          </div>
          
          {/* Добавим описание видео */}
          <div className="mt-4 p-3 bg-black/[0.05] dark:bg-white/[0.1] rounded-xl text-sm text-black dark:text-white">
             <div className="font-bold mb-1">
                {abbreviateNumber(video?.stats?.views, 0)} views
             </div>
             <div className="whitespace-pre-wrap line-clamp-4">
                {video?.description}
             </div>
          </div>
        </div>

        <div className="flex flex-col py-6 px-4 overflow-y-auto lg:w-[350px] xl:w-[400px] no-scrollbar">
          {relatedVideos?.contents?.map((item, index) => {
            if (item?.type !== "video") return false;
            return <SuggestionVideoCard key={index} video={item?.video} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default VideoDetail;