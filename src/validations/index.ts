//* Product === ValidationProduct (Title, Desc, Price, Image)

import { ICategory } from "../interfaces";

export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  category: { name: string; imageURL: string } | null;
  colors: string[];
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
    category: string;
    color: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    category: "",
    color: "",
  };

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Product Title must between 10 and 82 character";
  }
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 500
  ) {
    errors.description = "Description must between 10 and 82 character";
  }

  const validURl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);
  if (!product.title.trim() || !validURl) {
    errors.imageURL = "Invalid image URL";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "Price should be a number";
  }

  if (product.category === null) {
    errors.category = "you must select on category for each product";
  }

  if (product.colors.length === 0) {
    errors.color = "you must at least chose one color";
  }

  //** return an object
  return errors;
};
