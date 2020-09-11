import React, { useEffect, useState } from "react";

import { getItemsCraftingProfit } from "../../../api/data-project.api";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "react-select";
import TextField from "@material-ui/core/TextField";
import { searchableItems } from "../../../shared/searchableItems";
import { itemTiers } from "../../../shared/itemTiers";
import { itemQualities } from "../../../shared/itemQualities";
import { purchaseMarkets, sellingMarkets } from "../../../shared/markets";
import { returnRates } from "../../../shared/returnRates";
import { orderTypes } from "../../../shared/orderTypes";

const CraftingTool = ({ baseUrl, classes }) => {
  const [results, setResults] = useState([]);
  const [items, setItems] = useState([]);
  const [quality, setQuality] = useState("1");
  const [purchaseMarket, setPurchaseMarket] = useState("Caerleon");
  const [sellingMarket, setSellingMarket] = useState("Black Market");
  const [tier, setTier] = useState("T4");
  const [usageFee, setUsageFee] = useState("15");
  const [orderType, setOrderType] = useState(1);
  const [returnRate, setReturnRate] = useState({
    id: 1,
    withoutFocus: 15,
    withFocus: 45,
  });

  const fetchItemsCraftingProfit = async () => {
    if (items.length > 0) {
      const response = await getItemsCraftingProfit(
        items,
        quality,
        purchaseMarket,
        sellingMarket,
        tier
      );
      setResults(response.data);
    }
  };

  const handleItemsChange = async (selectedItems, actionType) => {
    if (selectedItems) {
      selectedItems = selectedItems.map((item) => {
        return `${item.value}`;
      });
      setItems([...selectedItems]);
    }
  };

  const handleTierChange = async (itemSelected, actionType) => {
    setTier(itemSelected.value);
  };

  const handleQualityChange = async (itemSelected, actionType) => {
    setQuality(itemSelected.value);
  };

  const handlePurchaseMarketChange = async (itemSelected, actionType) => {
    setPurchaseMarket(itemSelected.value);
  };

  const handleSellingMarketChange = async (itemSelected, actionType) => {
    setSellingMarket(itemSelected.value);
  };

  const handleReturnRateChange = async (itemSelected, actionType) => {
    setReturnRate(itemSelected.value);
  };

  const handleTypeOfOrderChange = async (itemSelected, actionType) => {
    setOrderType(itemSelected.value);
  };

  const handleSearch = async () => {
    fetchItemsCraftingProfit();
  };

  return (
    <div className={classes.root}>
      <div class="searchbar" className={classes.searchbar}>
        <Select
          isMulti
          onChange={handleItemsChange}
          options={searchableItems}
          placeholder="Search for items..."
        />
        <button color="primary" onClick={handleSearch}>
          Make me rich!
        </button>
      </div>
      <div id="filters-container" className={classes.filtersContainer}>
        <Select
          onChange={handleTierChange}
          options={itemTiers}
          value={itemTiers.filter((row) => row.value === tier)}
        />
        <Select
          onChange={handleQualityChange}
          options={itemQualities}
          value={itemQualities.filter((row) => row.value === quality)}
        />
        <Select
          onChange={handlePurchaseMarketChange}
          options={purchaseMarkets}
          value={purchaseMarkets.filter((row) => row.value === purchaseMarket)}
        />
        <Select
          onChange={handleSellingMarketChange}
          options={sellingMarkets}
          value={sellingMarkets.filter((row) => row.value === sellingMarket)}
        />
        <Select
          onChange={handleReturnRateChange}
          value={returnRates.filter((row) => row.value.id === returnRate.id)}
          options={returnRates}
        />
        <Select
          onChange={handleTypeOfOrderChange}
          value={orderTypes.filter((row) => row.value === orderType)}
          options={orderTypes}
        />
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Materials price</TableCell>
              <TableCell>Top buy price</TableCell>
              <TableCell>Top sell price</TableCell>
              <TableCell>Profit</TableCell>
              <TableCell>Profit (focus)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((itemGroup) => {
              return itemGroup.map((item, index) => {
                const { city, buy_price_max, sell_price_min } = item.itemPrices;

                const {
                  materialsPriceSellOrder,
                  materialsPriceBuyOrder,
                  resourcesPriceSellOrder,
                  resourcesPriceBuyOrder,
                } = item.craftingRequirements;

                const resourcesPrice =
                  orderType === 1
                    ? resourcesPriceSellOrder
                    : resourcesPriceBuyOrder;

                const materialsPrice =
                  orderType === 1
                    ? materialsPriceSellOrder
                    : materialsPriceBuyOrder;

                const profit =
                  resourcesPrice *
                    (1 - 1 / (1 + returnRate.withoutFocus / 100)) +
                  sell_price_min -
                  materialsPrice;

                const profitWithFocus =
                  resourcesPrice * (1 - 1 / (1 + returnRate.withFocus / 100)) +
                  sell_price_min -
                  materialsPrice;

                return (
                  <TableRow key={index}>
                    <TableCell>{item.item_name}</TableCell>
                    <TableCell>{materialsPrice}</TableCell>
                    <TableCell>{buy_price_max}</TableCell>
                    <TableCell>{sell_price_min}</TableCell>
                    <TableCell
                      className={profit >= 0 ? classes.profit : classes.loss}
                    >
                      {profit.toFixed(0)}
                    </TableCell>
                    <TableCell
                      className={profit >= 0 ? classes.profit : classes.loss}
                    >
                      {profitWithFocus.toFixed(0)}
                    </TableCell>
                  </TableRow>
                );
              });
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CraftingTool;
