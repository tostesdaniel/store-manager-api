module.exports = {
  allSalesResponse: [
    {
      sale_id: 1,
      date: "2022-08-16T00:06:39.000Z",
      product_id: 1,
      quantity: 5,
    },
    {
      sale_id: 1,
      date: "2022-08-16T00:06:39.000Z",
      product_id: 2,
      quantity: 10,
    },
    {
      sale_id: 2,
      date: "2022-08-16T00:06:39.000Z",
      product_id: 3,
      quantity: 15,
    },
  ],
  formattedSalesResponse: [
    {
      saleId: 1,
      date: "2022-08-16T00:06:39.000Z",
      productId: 1,
      quantity: 5,
    },
    {
      saleId: 1,
      date: "2022-08-16T00:06:39.000Z",
      productId: 2,
      quantity: 10,
    },
    {
      saleId: 2,
      date: "2022-08-16T00:06:39.000Z",
      productId: 3,
      quantity: 15,
    },
  ],
  singleSaleResponse: [
    {
      date: "2022-08-16T00:06:39.000Z",
      product_id: 3,
      quantity: 15,
    },
  ],
  formattedSingleSaleResponse: [
    {
      date: "2022-08-16T00:06:39.000Z",
      productId: 3,
      quantity: 15,
    },
  ],
  noProductIdSaleBody: [{ productId: 1999, quantity: 9 }],
  validSaleBody: [{ productId: 2, quantity: 15 }],
  updatedSaleResponse: {
    saleId: 2,
    itemsUpdated: [{ productId: 2, quantity: 15 }],
  },
  goodSaleBody: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 2 },
  ],
  notFoundResponse: { message: "Product not found|404" },
  saleNotFoundResponse: { message: "Sale not found|404" },
};
