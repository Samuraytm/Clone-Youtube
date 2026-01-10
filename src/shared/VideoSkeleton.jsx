const VideoSkeleton = () => {
    return (
      <div className="flex flex-col gap-3 animate-pulse">
        {/* Превью */}
        <div className="relative aspect-video rounded-xl bg-gray-300 dark:bg-zinc-800" />
        {/* Текст */}
        <div className="flex gap-3">
          <div className="h-9 w-9 rounded-full bg-gray-300 dark:bg-zinc-800 flex-shrink-0" />
          <div className="flex flex-col gap-2 w-full">
            <div className="h-4 w-[90%] bg-gray-300 dark:bg-zinc-800 rounded" />
            <div className="h-3 w-[60%] bg-gray-300 dark:bg-zinc-800 rounded" />
          </div>
        </div>
      </div>
    );
  };
  
  export default VideoSkeleton;