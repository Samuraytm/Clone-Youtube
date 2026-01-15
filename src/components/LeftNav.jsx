import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItem from "./LeftNavMenuItem";
import { Context } from "../context/ContextApi";
import { categories } from "../utils/Constants";

function LeftNav() {
  // Убедись, что в ContextApi переменная называется selectCategories (или selectedCategory)
  // В твоем последнем ContextApi было selectedCategory. Исправляю здесь под него:
  const { selectedCategory, setSelectedCategory, mobileMenu } = useContext(Context);
  const navigate = useNavigate();

  const clickHandle = (name, type) => {
    switch (type) {
      case "category":
      case "home":
        setSelectedCategory(name);
        navigate("/");
        break;
      default:
        break;
    }
  };

  return (
    <div
      className={`md:block overflow-y-auto h-full py-4 bg-white dark:bg-black absolute md:relative z-10 transition-all duration-300 no-scrollbar
        ${mobileMenu ? "w-[240px] translate-x-0" : "w-0 md:w-[240px] -translate-x-full md:translate-x-0"}`}
    >
      <div className="flex px-5 flex-col">
        {categories?.map((item, index) => (
          <React.Fragment key={`${item.name}-${index}`}>
            <LeftNavMenuItem
              text={item.type === "home" ? "Home" : item.name}
              icon={item.icon}
              action={() => clickHandle(item.name, item.type)}
              className={`${
                selectedCategory === item.name ? "bg-black/[0.1] dark:bg-white/[0.15]" : ""
              }`}
            />
            {item.divider && (
              // Исправлено: темная линия для светлой темы, светлая для темной
              <hr className="my-5 border-black/[0.1] dark:border-white/[0.2]" />
            )}
          </React.Fragment>
        ))}
        <hr className="my-5 border-black/[0.1] dark:border-white/[0.2]" />
        <div className="text-black/[0.5] dark:text-white/[0.5] text-[12px]">
            Clone by Gemini 2026
        </div>
      </div>
    </div>
  );
}

export default LeftNav;