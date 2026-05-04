import { useState } from "react";

function SearchBar() {
  const [search, setSearch] = useState("");

  return (
    <div className="flex items-center">
      <div className="relative w-80">
        <input
          type="text"
          placeholder="Search product name, SKU, or batch.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-85 h-10 pl-10 pr-4 border rounded-lg
                     focus:ring-2 focus:ring-blue-500 bg-[#F6F8F6]"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>
    </div>
  );
}

export default SearchBar;