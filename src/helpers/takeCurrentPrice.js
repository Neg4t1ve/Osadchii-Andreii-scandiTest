export const takeCurrentPrice = (activeCurrency, prices) => {
  // going through array of prices, checks the currency and return needed value
  const currentPrice = prices
    .map((item) => {
      if (item.currency.symbol === activeCurrency) {
        return item.amount;
      }
      return null;
    })
    .filter((item) => !!item)
    .join("");
  return +currentPrice;
};
