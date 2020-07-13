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
import { searchableItems } from "../../../shared/searchableItems";

const CraftingTool = ({ baseUrl, classes }) => {
  const [results, setResults] = useState([]);
  const [items, setItems] = useState([]);
  const [quality, setQualities] = useState("1");
  const [purchaseMarket, setPurchaseMarket] = useState("Caerleon");
  const [sellingMarket, setSellingMarket] = useState("Black Market");
  const [tier, setTier] = useState("T5");
  const [usageFee, setUsageFee] = useState("15");
  const [cityBonus, setCityBonus] = useState(false);
  const [returnRate, setReturnRate] = useState(15.2);
  const [typeOfOrder, setTypeOfOrder] = useState(2);

  useEffect(() => {
    fetchItemsCraftingProfit();
  }, [items, quality, purchaseMarket, sellingMarket, tier]);

  const fetchItemsCraftingProfit = async () => {
    console.log("here");

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

  const handleSelectChange = async (itemSelected, actionType) => {
    itemSelected = itemSelected.map((item) => {
      return `${tier}${item.value}`;
    });
    setItems([...itemSelected]);
  };

  return (
    <div>
      <div>
        <Select
          isMulti
          onChange={handleSelectChange}
          options={searchableItems}
        />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Cidadade</TableCell>
              <TableCell>Top buy price</TableCell>
              <TableCell>Top sell price</TableCell>
              <TableCell>Materials price ({purchaseMarket})</TableCell>
              <TableCell>Profit</TableCell>
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
                  typeOfOrder === 1
                    ? resourcesPriceSellOrder
                    : resourcesPriceBuyOrder;

                const materialsPrice =
                  typeOfOrder === 1
                    ? materialsPriceSellOrder
                    : materialsPriceBuyOrder;

                const profit =
                  resourcesPrice * (1 - 1 / (1 + returnRate / 100)) +
                  sell_price_min -
                  materialsPrice;

                return (
                  <TableRow key={index}>
                    <TableCell>{item.item_name}</TableCell>
                    <TableCell>{city}</TableCell>
                    <TableCell>{buy_price_max}</TableCell>
                    <TableCell>{sell_price_min}</TableCell>
                    <TableCell>{materialsPrice}</TableCell>
                    <TableCell>{profit.toFixed(0)}</TableCell>
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
