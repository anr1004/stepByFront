import { useState } from "react";
import search from "../../assets/icons/Search.svg";
import Icon from "../common/Icon";

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("검색어: ", searchTerm);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="relative flex min-w-105 py-2 px-4 border-b-2 "
    >
      <input
        type="text"
        placeholder="상품 검색"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="grow focus:outline-none"
      />
      <button type="submit" className="cursor-pointer">
        <Icon src={search} alt="search" height={22} width={22}></Icon>
      </button>
    </form>
  );
};

export default SearchBar;
