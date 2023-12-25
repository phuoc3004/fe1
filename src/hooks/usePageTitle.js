import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const usePageTitle = () => {
  const { pathname } = useLocation();
  const pathArr = pathname.split("/").filter((item) => item);

  useEffect(() => {
    const pathLength = pathArr.length;
    document.title = `${pathArr[pathLength - 1]}- CLOTHES SHOP`;
  }, [pathArr]);
};
export default usePageTitle;
