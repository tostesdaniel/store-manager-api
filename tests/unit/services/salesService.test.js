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

  describe("Ao listar vendas", () => {
    const allSalesResponse = [
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
    ];

    describe("Ao listar todas as vendas", () => {
      it("Verifica se é possível listar todas as vendas com sucesso", async () => {
        const response = await salesService.get();

        expect(response).to.be.deep.equal(allSalesResponse);
      });
    });

    describe("Ao listar uma venda que não existe", () => {
      it("Verifica se é retornado um erro", async () => {
        const response = await salesService.getById(1999);

        expect(response).to.be.deep.equal({ message: "Sale not found" });
      });
    });

    describe("Ao listar uma venda que existe", () => {
      it("Verifica se é possível listar a venda com sucesso", async () => {
        const response = await salesService.getById(2);

        expect(response).to.be.deep.equal([allSalesResponse[2]]);
      });
    });
  });
});
