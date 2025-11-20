

export type TProductType = 'Single Product'| "Variable Product"| "Group Product"| "Affiliate"
export type TProductTypeLists = "General"| "Inventory"| "Shipping"| "Link Product"| "Attributes" | 'Variations'



type Delivery = {
  deliveryCharge: number;
  deliveryStatus: "Free" | "Pay";
}

type FeatureImage = {
  image: string;
  videoUrl?: string;
}

type Price = {
  discountValue: number;
  discountType: 'percent'|'fixed';
  productPrice: number;
}

export type OfferDate= {
  start_date?: Date;
  end_date?: Date;
  offerPrice: number;
}

type ExtraFeature= {
  label: string;
  value: string;
}

export type TVariation = {
  variantId:string;
  attributes:string[];
  attributeConfigs: {attrIndex:number, value:string}[]; 
  offerPirce: number;
  productPrice: number;
  description: string;
  image: string;
  sku:string;
  shipping:{
    weight: number ;
    length: number ;
    width: number ;
    height: number ;
  },
}

export type TProduct = {
  _id?:string;
  author: string;
  brand?: string[];
  category?: string[];
  details?: string;
  rating?: number;
  reviews?: number;
  isStock: number;
  isFeature: "Active" | "Inactive";
  delivery: Delivery;
  minStock: number;
  featureImage: FeatureImage;
  imageGallery?: string[];
  name: string;
  productName?: string;
  product_type: "Physical" | "Digital";
  price: Price;
  offerDate?: OfferDate;
  publish_date: Date;
  sellQuantity: number;
  slug: string;
  skuCode?: string;
  short_details?: string;
  status: "Active" | "Inactive";
  productShortDesc?: string;
  productFeatures?: {
    extraFeatures?: ExtraFeature[];
  };

  // Extra type
  variant:TProductType;
  manageStock: boolean;
  variations: TVariation[];
  shipping:{
    weight: string ;
    length: string ;
    width: string ;
    height: string ;
  },
  seo_title: string;
  seo_desc:string;
  seo_keyword:string[],
  attributes?: {
    attribute?:string;
    attributeConfig?:string[];
  }[],
  freeShipping: 'yes'|'no';
  shippingCharge: number;
  tax: number;
  returnTime:number;
}