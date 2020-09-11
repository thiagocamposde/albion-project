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
