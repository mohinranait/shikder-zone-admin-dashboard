import { X } from "lucide-react";
import React, { useState } from "react";
const items = [
  {
    value: "1",
    name: "Prod 1",
  },
  {
    value: "2",
    name: "Prod 2",
  },
  {
    value: "3",
    name: "Prod 3",
  },
  {
    value: "4",
    name: "Prod 4",
  },
  {
    value: "5",
    name: "Prod 5",
  },
];
const SearchAndMultiSelect = () => {
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState([...items]);
  const [selecteds, setSelecteds] = useState<{ name: string; value: string }[]>(
    []
  );

  const handleSearch = (text: string) => {
    setSearch(text);
    console.log(text);
  };

  const handleSelectData = (data: string, action: "add" | "remove") => {
    if (action == "add") {
      const fidnOption = options?.find((option) => option?.value === data);
      if (fidnOption) {
        setSelecteds((prev) => [...prev, fidnOption]);
        setSearch("");
      }
    } else {
      setSelecteds((prev) => prev?.filter((d) => d.value !== data));
    }
  };

  return (
    <div className="relative w-full">
      <div className="border  border-slate-200 p-1">
        {selecteds?.length > 0 && (
          <ul className="flex flex-wrap gap-2 ">
            {selecteds?.map((item, index) => (
              <li
                key={index}
                className="px-3 py-[2px] inline-flex gap-1 items-center rounded bg-slate-50 text-sm text-slate-700 hover:bg-slate-100 "
              >
                {item?.name}
                <X
                  onClick={() => handleSelectData(item?.value, "remove")}
                  className="text-slate-700 hover:text-slate-950 cursor-pointer"
                  size={12}
                />
              </li>
            ))}
          </ul>
        )}

        <div className="w-full">
          <input
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            type="search"
            className="w-full  rounded focus-visible:outline-none "
            placeholder="Search"
          />
        </div>
      </div>
      {options?.length > 0 && search && (
        <ul className="flex flex-col  gap-1 absolute top-full z-10 shadow border border-slate-50 left-0 bg-white w-full p-2 ">
          {options?.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleSelectData(option?.value, "add")}
              className="rounded text-sm text-slate-700 py-1 px-2 cursor-pointer bg-slate-50 hover:bg-slate-100 "
            >
              {option?.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchAndMultiSelect;
