import React, { useContext } from "react";
import { Context } from "../context/ContextApi";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";

const WatchLater = () => {
  const { watchLater } = useContext(Context);

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      <div className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-white dark:bg-black no-scrollbar">
        <div className="p-5">
          <div className="text-xl md:text-2xl font-bold mb-6 text-black dark:text-white border-b border-gray-200 dark:border-white/[0.1] pb-2">
            Смотреть позже ({watchLater.length})
          </div>

          {watchLater.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {watchLater.map((video) => (
                <VideoCard key={video?.videoId} video={video} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
              <span className="text-lg">Ваш список пуст</span>
              <p className="text-sm">Добавляйте видео, чтобы посмотреть их позже.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WatchLater;