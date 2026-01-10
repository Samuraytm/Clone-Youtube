import React, { useContext } from "react";
import { Context } from "../context/ContextApi";

const keywords = ["All", "JavaScript", "React JS", "Music", "Gaming", "Live", "Coding", "News", "Movies", "Recently uploaded"];

const CategoriesBar = () => {
  const { selectCategories, setSelectCategories } = useContext(Context);

  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar py-3 px-5 bg-white dark:bg-black sticky top-0 z-10">
      {keywords.map((name, i) => (
        <button
          key={i}
          onClick={() => setSelectCategories(name)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
            ${selectCategories === name 
              ? "bg-black text-white dark:bg-white dark:text-black" 
              : "bg-gray-100 text-black hover:bg-gray-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700"
            }`}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default CategoriesBar;