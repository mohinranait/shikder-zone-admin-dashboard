import { TProduct } from "@/types/product.type";

export const productValidation  = (product : TProduct) => {
    const errors : Record<string, string> = {};

    if(!product.name?.trim()){
        errors.name = "Product name is required";
    }

    if(product.variant === 'Single Product'){
        if(!product.price?.productPrice  ){
            errors.productPrice = "Price is required";
        }else if(product.price?.productPrice == 0){
            errors.productPrice = "0 Price value will be not accepted";
        }

      
    }

    return errors;
}