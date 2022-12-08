import axios from "axios";

export const getTezosPrice = async (): Promise<number> => {
  try {
    const response = await axios.get("https://api.tzkt.io/v1/quotes/last");
    return parseFloat(response.data?.usd);
  } catch (error) {
    console.log(error);
    return 0;
  }
};
