import { useContext } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Context } from "../context/ContextApi";
import LeftNav from "./LeftNav";
import VideoCard from "./VideoCard";
import CategoriesBar from "./CategoriesBar";
import VideoSkeleton from "../shared/VideoSkeleton";
import ShortsCard from "./ShortsCard";

const Feed = () => {
  // Достаем новые пропсы для пагинации из контекста
  const { loading, searchResult, fetchMoreData, hasMore } = useContext(Context);

  return (
    <div className="flex flex-row h-[calc(100%-56px)]">
      <LeftNav />
      
      {/* Важно: добавляем id, чтобы InfiniteScroll знал, какой элемент скроллится */}
      <div 
        id="scrollableDiv" 
        className="grow w-[calc(100%-240px)] h-full overflow-y-auto bg-white dark:bg-black no-scrollbar"
      >
        <CategoriesBar />

        <InfiniteScroll
          dataLength={searchResult?.length || 0}
          next={fetchMoreData} // Вызывается при достижении конца
          hasMore={hasMore}    // Зависит от наличия nextPageToken
          loader={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
              {[...Array(4)].map((_, i) => <VideoSkeleton key={`skeleton-${i}`} />)}
            </div>
          }
          scrollableTarget="scrollableDiv"
          endMessage={
            <p className="text-center text-gray-500 py-5">Вы посмотрели все видео</p>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-5">
            {/* Первая загрузка (скелетоны) */}
            {loading && searchResult.length === 0 ? (
              [...Array(12)].map((_, i) => <VideoSkeleton key={i} />)
            ) : (
              <>
                {/* Первые 8 видео */}
                {searchResult?.slice(0, 8).map((item, index) => (
                  item?.type === "video" && (
                    <VideoCard key={`${item?.video?.videoId}-${index}`} video={item?.video} />
                  )
                ))}

                {/* Секция SHORTS (показываем только один раз в начале списка) */}
                {searchResult.length > 0 && (
                  <div className="col-span-full py-4 border-y border-gray-200 dark:border-white/[0.1] my-4">
                    <div className="flex items-center gap-2 mb-4">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/f/fc/Youtube_shorts_icon.svg" 
                        width={24} 
                        alt="shorts-icon" 
                      />
                      <span className="text-xl font-bold text-black dark:text-white">Shorts</span>
                    </div>
                    <div className="flex gap-4 overflow-x-auto no-scrollbar">
                       {searchResult?.slice(10, 18).map((item, index) => (
                         item?.type === "video" && (
                            <ShortsCard key={`shorts-${index}`} video={item?.video} />
                         )
                       ))}
                    </div>
                  </div>
                )}

                {/* Все остальные видео после шортсов */}
                {searchResult?.slice(8).map((item, index) => (
                  item?.type === "video" && (
                    <VideoCard key={`${item?.video?.videoId}-${index}`} video={item?.video} />
                  )
                ))}
              </>
            )}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default Feed;