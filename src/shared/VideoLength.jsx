import React from "react";
import moment from "moment";

const VideoLength = ({ time }) => {
    // Форматируем секунды в формат HH:mm:ss или mm:ss
    const videoLengthInSeconds = moment()
        ?.startOf("day")
        ?.seconds(time)
        ?.format("H:mm:ss");

    // Убираем лишний час, если видео короче 60 минут
    const formattedTime = videoLengthInSeconds.startsWith("0:") 
        ? videoLengthInSeconds.substring(2) 
        : videoLengthInSeconds;

    return (
        <span className="absolute bottom-2 right-2 bg-black/[0.8] py-1 px-2 text-white text-xs rounded-md">
            {formattedTime}
        </span>
    );
};

export default VideoLength;