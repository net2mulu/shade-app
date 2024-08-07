import { createContext, useState, useEffect } from "react";

export const ShadeContext = createContext();

export const ShadeProvider = ({ children }) => {
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [newOffset, setNewOffset] = useState(0);
  const [shadeData, setShadeData] = useState([]);

  const handlePageClick = (selected) => {
    const selectedPage = selected.selected + 1;
    const off = (selectedPage - 1) * itemsPerPage;
    setPage(selectedPage);
    setNewOffset(off);
  };

  const reset = () => {
    setShadeData([]);
    setPage(1);
    setTotal(1);
    setNewOffset(0);
  };
  useEffect(() => {}, []);

  return (
    <ShadeContext.Provider
      value={{
        itemsPerPage,
        page,
        total,
        newOffset,
        shadeData,
        setShadeData,
        setTotal,
        handlePageClick,
        reset,
      }}
    >
      {children}
    </ShadeContext.Provider>
  );
};
