const express = require("express");
const axios = require("axios");
const config = require("../config/tmdb");
const itemsData = require("../shared/items");
const { forEach } = require("../shared/items");
const util = require("util");

const router = express.Router();

router.get("/tmbd/movie/upcoming", async (req, res) => {
  const page = req.query.page || 1;
  const genres = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${config.apiKey}&language=en-US`
  );
  const upcomingMovies = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${config.apiKey}&language=en-US&page=${page}&region=US`
  );

  upcomingMovies.data.results = upcomingMovies.data.results.map((movie) => {
    movie.genres = genres.data.genres.filter((item) => {
      return movie.genre_ids.includes(item.id);
    });
    return movie;
  });
  res.send(upcomingMovies.data);
});

router.get("/tmbd/movie/search", async (req, res) => {
  const query = req.query.query || "";
  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${config.apiKey}&language=en-US&query=${query}&page=1&include_adult=true`
  );
  res.send(response.data);
});

router.get("/tmbd/movie/:id", async (req, res) => {
  const movieId = req.params.id;
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${config.apiKey}&language=en-US`
  );
  res.send(response.data);
});

router.post("/crafting/items/profit", async (req, res) => {
  const { items, quality, purchaseMarket, sellingMarket, tier } = req.body;

  let response = [];

  try {
    // para cada item, pega suas informações de crafting (materiais, etc...) e adiciona no objeto response com o seguinte formato:
    // craftingRequirements: materiais de crafting
    // enchantment: encantamento do item (.1, .2, .3)

    response = await Promise.all(
      items.map(async (item) => {
        let groupItems = [];
        try {
          const itemData = await axios.get(
            `https://gameinfo.albiononline.com/api/gameinfo/items/${item}/data`
          );
          groupItems.push({
            item_name: itemData.data.uniqueName,
            craftingRequirements: itemData.data.craftingRequirements,
            enchantment: itemData.enchantmentLevel,
          });

          itemData.data.enchantments.enchantments.forEach((element) => {
            groupItems.push({
              item_name: `${itemData.data.uniqueName}@${element.enchantmentLevel}`,
              craftingRequirements: element.craftingRequirements,
              enchantment: element.enchantmentLevel,
            });
          });
        } catch (error) {
          console.log("ERROR 1.....", error);
        }

        // para cada item em response, pega suas informações de preço
        groupItems = await Promise.all(
          groupItems.map(async (item) => {
            let query = `${item.item_name}?locations=${sellingMarket}&qualities=${quality}`;

            try {
              const itemPrices = await axios.get(
                `https://www.albion-online-data.com/api/v2/stats/prices/${query}`
              );

              return { ...item, itemPrices: { ...itemPrices.data[0] } };
            } catch (error) {
              console.log("error", JSON.stringify(error));
            }
          })
        );

        // para cada item na response, faz um loop em seus materiais e pega o preço de cada um e adiciona essas info no craftresourceList (materialPrices)
        groupItems = await Promise.all(
          groupItems.map(async (item) => {
            item.craftingRequirements.craftResourceList = await Promise.all(
              item.craftingRequirements.craftResourceList.map(
                async (material) => {
                  try {
                    let materialUniqueName = material.uniqueName;

                    if (
                      !materialUniqueName.includes("ARTEFACT") &&
                      item.enchantment
                    ) {
                      materialUniqueName = materialUniqueName.concat(
                        `@${item.enchantment}`
                      );
                    }

                    let query = `${materialUniqueName}?locations=${purchaseMarket}`;

                    const materialPricesResult = await axios.get(
                      `https://www.albion-online-data.com/api/v2/stats/prices/${query}`
                    );

                    return {
                      ...material,
                      materialPrices: {
                        ...materialPricesResult.data[0],
                      },
                      totalPriceSellOrder:
                        material.count *
                        materialPricesResult.data[0].sell_price_min,
                      totalPriceBuyOrder:
                        material.count *
                        materialPricesResult.data[0].buy_price_max,
                    };
                  } catch (error) {
                    console.log("ERROR2");
                  }
                }
              )
            );

            const materialsPriceSellOrder = item.craftingRequirements.craftResourceList.reduce(
              (accumulator, resource) => {
                return accumulator + resource.totalPriceSellOrder;
              },
              0
            );

            const resourcesPriceSellOrder = item.craftingRequirements.craftResourceList.reduce(
              (accumulator, resource) => {
                return (
                  accumulator +
                  (resource.uniqueName.includes("ARTEFACT")
                    ? 0
                    : resource.totalPriceSellOrder)
                );
              },
              0
            );

            const materialsPriceBuyOrder = item.craftingRequirements.craftResourceList.reduce(
              (accumulator, resource) => {
                return accumulator + resource.totalPriceBuyOrder;
              },
              0
            );

            const resourcesPriceBuyOrder = item.craftingRequirements.craftResourceList.reduce(
              (accumulator, resource) => {
                return (
                  accumulator +
                  (resource.uniqueName.includes("ARTEFACT")
                    ? 0
                    : resource.totalPriceBuyOrder)
                );
              },
              0
            );

            return {
              ...item,
              craftingRequirements: {
                ...item.craftingRequirements,
                materialsPriceSellOrder,
                materialsPriceBuyOrder,
                resourcesPriceBuyOrder,
                resourcesPriceSellOrder,
              },
            };
          })
        );
        console.log("groupItems...", groupItems);
        return groupItems;
      })
    );
  } catch (error) {
    console.log(error);
  }

  res.send(response);
});

module.exports = router;
