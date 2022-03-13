import { getAllItems } from "../api/productApi";

export const getItems = async (setItem) => {
    try {
      getAllItems().then((response) => {
        setItem(response.data);
      });
    } catch (e) {
      console.log("Error: ", e);
    }
  };