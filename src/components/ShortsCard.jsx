import React from "react";

const ShortsCard = ({ video }) => {
  return (
    <div className="flex flex-col min-w-[150px] md:min-w-[200px] cursor-pointer">
      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-slate-800">
        <img
          src={video?.thumbnails?.[0]?.url}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
          alt="shorts"
        />
      </div>
      <div className="mt-2 text-sm font-bold line-clamp-2 text-white">
        {video?.title}
      </div>
      <div className="text-gray-400 text-xs mt-1">
        {video?.stats?.viewsText || "1M views"}
      </div>
    </div>
  );
};

export default ShortsCard;