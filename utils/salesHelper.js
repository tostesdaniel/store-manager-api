const salesHelper = {
  formatAllSales: (sales) =>
    sales.map(({ sale_id: saleId, date, product_id: productId, quantity }) => ({
      saleId,
      date,
      productId,
      quantity,
    })),
  formatSingleSale: (sales) =>
    sales.map(({ date, product_id: productId, quantity }) => ({
      date,
      productId,
      quantity,
    })),
};

module.exports = salesHelper;
