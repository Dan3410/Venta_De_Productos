import { getAllItems } from "../api/productApi";

export const getItems = (setItem, setErrorMessage) => {
  try {
    getAllItems().then((response) => {
      if (response.status === 200) setItem(response.products);
      else setErrorMessage("Error retrieving products")
    });
  } catch (e) {
    console.log("Error: ", e);
  }
};
