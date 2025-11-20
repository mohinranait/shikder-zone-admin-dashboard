import React, { createContext, useContext, useState } from "react";

type TProviderTypes = {
  product: { name: string } | null;
  setProduct: React.Dispatch<React.SetStateAction<{ name: string } | null>>;
};

const ProductContext = createContext<TProviderTypes | null>(null);
const ProductProvider = () => {
  const [product, setProduct] = useState<{ name: string } | null>(null);

  const productInfo: TProviderTypes = {
    product,
    setProduct,
  };
  return (
    <ProductContext.Provider value={productInfo}></ProductContext.Provider>
  );
};

export const useProduct = () => {
  const p = useContext(ProductContext);
  if (!p) return;
  return p;
};

export default ProductProvider;
