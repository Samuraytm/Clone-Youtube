import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import LeftNavMenuItem from "./LeftNavMenuItem";
import { Context } from "../context/ContextApi";
import { categories } from "../utils/Constants";

function LeftNav() {
  const { selectCategories, setSelectCategories, mobileMenu } = useContext(Context);
  const navigate = useNavigate();

  const clickHandle = (name, type) => {
    switch (type) {
      case "category":
      case "home":
        setSelectCategories(name);
        navigate("/");
        break;
      default:
        break;
    }
  };

  return (
    // Добавляем динамическую ширину: если mobileMenu активно - показываем полностью
    <div
      className={`md:block overflow-y-auto h-full py-4 bg-white dark:bg-black absolute md:relative z-10 transition-all duration-300 
        ${mobileMenu ? "w-[240px] translate-x-0" : "w-[70px] md:w-[240px] translate-x-[-240px] md:translate-x-0"}`}
    >
      <div className="flex px-2 md:px-5 flex-col">
        {categories?.map((item, index) => (
          <React.Fragment key={`${item.name}-${index}`}>
            <LeftNavMenuItem
              // Если меню свернуто (на мобилках), можно скрывать текст, но оставим как в YouTube
              text={mobileMenu ? (item.type === "home" ? "Home" : item.name) : (item.type === "home" ? "Home" : item.name)}
              icon={item.icon}
              action={() => clickHandle(item.name, item.type)}
              className={`${
                selectCategories === item.name ? "bg-black/[0.15] dark:bg-white/[0.15]" : ""
              } ${!mobileMenu ? "md:justify-start justify-center" : ""}`}
            />
            {item.divider && (
              <hr className="my-5 border-white/[0.2] dark:border-black/[0.2]" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default LeftNav;