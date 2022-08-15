const sinon = require("sinon");
const { expect } = require("chai");
const salesModel = require("../../../models/salesModel");
const salesService = require("../../../services/salesService");

describe("Testa salesService", () => {
  describe("Ao cadastrar uma venda", () => {
    const noProductIdSaleBody = [{ productId: 1999, quantity: 9 }];
    const goodSaleBody = [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 2 },
    ];
    const notFoundResponse = { message: "Product not found|404" };

    describe("Caso o produto não exista no banco de dados", () => {
      before(async () => {
        sinon.stub(salesModel, "create").resolves();
        sinon.stub(salesModel, "createLink").resolves(true);
      });

      after(async () => {
        salesModel.create.restore();
        salesModel.createLink.restore();
      });

      it("Verifica se é retornado um erro", async () => {
        const response = await salesService.create(noProductIdSaleBody);

        expect(response).to.be.deep.equal(notFoundResponse);
      });
    });

    describe("Caso o produto exita no banco de dados", () => {
      before(async () => {
        sinon.stub(salesModel, "create").resolves(3);
        sinon.stub(salesModel, "createLink").resolves(true);
      });

      after(async () => {
        salesModel.create.restore();
        salesModel.createLink.restore();
      });

      it("Verifica se é retornado os detalhes da inserção", async () => {
        const response = await salesService.create(goodSaleBody);

        expect(response).to.be.deep.equal({ id: 3, itemsSold: goodSaleBody });
      });
    });
  });
});
