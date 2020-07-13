import request from "../util/request";

export const getItemsCraftingProfit = async (
  items,
  quality,
  purchaseMarket,
  sellingMarket,
  tier
) => {
  try {
    return await request.post(`/crafting/items/profit`, {
      items: items,
      quality: quality,
      purchaseMarket: purchaseMarket,
      sellingMarket: sellingMarket,
      tier: tier,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export const getMovie = async (movieId) => {
  try {
    const response = await request.get(`/tmbd/movie/${movieId}`);
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};

export const search = async (query) => {
  try {
    const response = await request.get(`/tmbd/movie/search?query=${query}`);
    return response.data.results;
  } catch (err) {
    console.log(err.message);
  }
};
