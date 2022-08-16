const sinon = require("sinon");
const { expect } = require("chai");
const salesModel = require("../../../models/salesModel");
const salesService = require("../../../services/salesService");
const {
  formattedSalesResponse,
  formattedSingleSaleResponse,
  noProductIdSaleBody,
  notFoundResponse,
  goodSaleBody,
  saleNotFoundResponse,
  validSaleBody,
  updatedSaleResponse,
} = require("../mocks/sales");

describe("Testa salesService", () => {
  describe("Ao cadastrar uma venda", () => {
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
    describe("Ao listar todas as vendas", () => {
      before(async () =>
        sinon.stub(salesModel, "get").resolves(formattedSalesResponse)
      );

      after(async () => salesModel.get.restore());

      it("Verifica se é possível listar todas as vendas com sucesso", async () => {
        const response = await salesService.get();

        expect(response).to.be.deep.equal(formattedSalesResponse);
      });
    });

    describe("Ao listar uma venda que não existe", () => {
      before(async () =>
        sinon
          .stub(salesModel, "getById")
          .resolves({ message: "Sale not found" })
      );

      after(async () => salesModel.getById.restore());

      it("Verifica se é retornado um erro", async () => {
        const response = await salesService.getById(1999);

        expect(response).to.be.deep.equal({ message: "Sale not found|404" });
      });
    });

    describe("Ao listar uma venda que existe", () => {
      before(async () =>
        sinon.stub(salesModel, "getById").resolves(formattedSingleSaleResponse)
      );

      after(async () => salesModel.getById.restore());

      it("Verifica se é possível listar a venda com sucesso", async () => {
        const response = await salesService.getById(2);

        expect(response).to.be.deep.equal(formattedSingleSaleResponse);
      });
    });
  });

  describe("Ao deletar uma venda", () => {
    describe("Caso a venda não exista", () => {
      before(async () => sinon.stub(salesModel, "delete").resolves(true));

      after(async () => salesModel.delete.restore());

      it("Verifica que não é possível deletar a venda com sucesso", async () => {
        const response = await salesService.delete(1999);

        expect(response).to.be.deep.equal(saleNotFoundResponse);
      });
    });

    describe("Caso a venda exista", () => {
      before(async () => sinon.stub(salesModel, "delete").resolves(true));

      after(async () => salesModel.delete.restore());

      it("Verifica que retorna true", async () => {
        const response = await salesService.delete(2);

        expect(response).to.equal(true);
      });
    });
  });

  describe("Ao atualizar uma venda", () => {
    describe("Caso a venda não exista", () => {
      before(async () => sinon.stub(salesModel, "update").resolves(1999));

      after(async () => salesModel.update.restore());

      it("Verifica se retorna mensagem de erro", async () => {
        const response = await salesService.update(1999, validSaleBody);

        expect(response).to.be.deep.equal(saleNotFoundResponse);
      });
    });

    describe("Caso a venda exista", () => {
      before(async () => sinon.stub(salesModel, "update").resolves(2));

      after(async () => salesModel.update.restore());

      it("Verifica se é retornado os dados atualizados da venda", async () => {
        const response = await salesService.update(2, validSaleBody);

        expect(response).to.be.deep.equal(updatedSaleResponse);
      });
    });
  });
});
