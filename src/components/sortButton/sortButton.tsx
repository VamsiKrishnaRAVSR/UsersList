import React from "react";
import { FaSortDown, FaSortUp } from "react-icons/fa";

const SortButton = (props: {
  sortByName: String[];
  setSortByName: React.Dispatch<React.SetStateAction<string[]>>;
  name: string;
}) => {
  const { sortByName, setSortByName, name } = props;
  const data = sortByName;
  const up = data[1] === "Asc" && data[0] === name ? "up" : "";
  const down = data[1] === "Desc" && data[0] === name ? "up" : "";

  return (
    <div className="buttonComponent">
      <FaSortUp
        className={`${up}`}
        onClick={() => setSortByName([name, "Asc"])}
      />
      <FaSortDown
        className={`${down}`}
        onClick={() => setSortByName([name, "Desc"])}
      />
    </div>
  );
};

export default SortButton;
