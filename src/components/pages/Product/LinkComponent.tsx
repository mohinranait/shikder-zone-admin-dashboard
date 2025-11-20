import React, { useState } from "react";

import { X } from "lucide-react";
import SearchAndMultiSelect from "@/components/shared/SearchAndMultiSelect";

const LinkComponent = () => {
  // TODO -> UserThis pacakge here for select product
  // TODO => npm install react-search-autocomplete
  const [search, setSearch] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState([
    {
      _id: "1",
      name: "pr1",
    },
  ]);
  const [products] = useState([
    {
      _id: "1",
      name: "Pr 1",
    },
    {
      _id: "2",
      name: "Pr 2",
    },
    {
      _id: "3",
      name: "Pr 3",
    },
    {
      _id: "4",
      name: "Pr 4",
    },
  ]);
  const [showProducts, setShowProducts] = useState<
    {
      _id: string;
      name: string;
    }[]
  >([]);
  // const { product } = useAppSelector((state) => state.product);
  // const dispatch = useAppDispatch();

  // search products by Search value
  const handleSearch = (value: string) => {
    console.log(value);
    setSearch(value);

    const existsProducts: { _id: string; name: string }[] = products.filter(
      (prod) => prod.name.toLowerCase().includes(value.toLowerCase())
    );
    setShowProducts(existsProducts);
  };

  // handle select product method
  const handleSelectProduct = (
    product: { _id: string; name: string },
    action: "remove" | "add"
  ) => {
    if (action === "add") {
      setSearch("");
      setSelectedProducts((prev) => [...prev, product]);
      setShowProducts((prev) =>
        prev?.filter((prod) => prod._id !== product?._id)
      );
    } else if (action === "remove") {
      setSelectedProducts((prev) =>
        prev?.filter((prod) => prod?._id !== product?._id)
      );
      setShowProducts((prev) => [...prev, product]);
    }
  };

  return (
    <div className="p-4 flex flex-col gap-3">
      <div className="flex items-start">
        <div>
          <div className="w-[150px]">
            <label htmlFor="upsalss" className="text-sm text-muted-foreground">
              Upsalss
            </label>
          </div>
        </div>
        <div className="w-full">
          <SearchAndMultiSelect />
          <hr />
          {/* {selectedProducts?.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {selectedProducts?.map((prod, i) => (
                <li
                  key={i}
                  className="inline-flex items-center gap-1 px-2 py-1 text-xs text-slate-600 bg-slate-50 rounded hover:bg-slate-100"
                >
                  {prod?.name}
                  <X
                    onClick={() => handleSelectProduct(prod, "remove")}
                    className="text-slate-600 hover:text-slate-900 cursor-pointer "
                    size={12}
                  />
                </li>
              ))}
            </ul>
          )}

          <div className="relative ">
            <input
              type="text"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex h-8 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors   placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring   md:text-sm"
            />
            {showProducts?.length > 0 && (
              <ul className="absolute top-[32px] h-[100px] overflow-y-auto left-0 w-full">
                {showProducts?.map((prod, i) => (
                  <li
                    onClick={() => handleSelectProduct(prod, "add")}
                    key={i}
                    className="py-1 px-3 text-sm cursor-pointer rounded hover:bg-slate-100"
                  >
                    {prod?.name}
                  </li>
                ))}
              </ul>
            )}
          </div> */}
        </div>
      </div>

      <div className="flex items-start">
        <div>
          <div className="w-[150px]">
            <label htmlFor="upsalss" className="text-sm text-muted-foreground">
              Cros Salss
            </label>
          </div>
        </div>
        <div className="w-full">
          <SearchAndMultiSelect />
        </div>
      </div>
    </div>
  );
};

export default LinkComponent;
