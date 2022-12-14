const sinon = require("sinon");
const { expect } = require("chai");
const salesService = require("../../../services/salesService");
const salesController = require("../../../controllers/salesController");
const {
  allSalesResponse,
  noProductIdSaleBody,
  notFoundResponse,
  goodSaleBody,
  formattedSingleSaleResponse,
  saleNotFoundResponse,
  validSaleBody,
  updatedSaleResponse,
} = require("../mocks/sales");

describe("Testa salesController", () => {
  describe("Ao cadastrar uma venda", () => {
    describe("Caso o produto não exista no banco de dados", () => {
      const req = {};
      const res = {};
      let next;

      before(() => {
        req.body = noProductIdSaleBody;
        res.status = res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();

        sinon.stub(salesService, "create").resolves(notFoundResponse);
      });

      after(() => salesService.create.restore());

      it("Verifica se next é chamado com objeto de erro", async () => {
        await salesController.create(req, res, next);

        expect(next.calledWith(notFoundResponse)).to.be.true;
      });
    });

    describe("Caso o produto exista no banco de dados", () => {
      const req = {};
      const res = {};
      let next;

      before(() => {
        req.body = goodSaleBody;
        res.status = res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();

        sinon
          .stub(salesService, "create")
          .resolves({ id: 3, itemsSold: goodSaleBody });
      });

      after(() => salesService.create.restore());

      it("Verifica se status é chamado com status 201", async () => {
        await salesController.create(req, res, next);

        expect(res.status.calledWith(201)).to.be.true;
      });

      it("Verifica se json é chamado com os detalhes da inserção", async () => {
        await salesController.create(req, res, next);

        expect(res.json.calledWith({ id: 3, itemsSold: goodSaleBody })).to.be
          .true;
      });
    });
  });

  describe("Ao listar vendas", () => {
    describe("Ao listar todas as vendas ", () => {
      const req = {};
      const res = {};

      before(() => {
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, "get").resolves(allSalesResponse);
      });

      after(() => salesService.get.restore());

      it("Verifica se status é chamado com código 200", async () => {
        await salesController.get(req, res);

        expect(res.status.calledWith(200)).to.be.true;
      });

      it("Verifica se json é chamado com todas as vendas", async () => {
        await salesController.get(req, res);

        expect(res.json.calledWith(allSalesResponse)).to.be.true;
      });
    });

    describe("Ao listar uma venda que não existe", () => {
      const req = {};
      const res = {};
      let next;

      before(() => {
        req.params = { id: 1999 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();

        sinon
          .stub(salesService, "getById")
          .resolves({ message: "Sale not found|404" });
      });

      after(() => salesService.getById.restore());

      it("Verifica se next é chamado com a mensagem de erro", async () => {
        await salesController.getById(req, res, next);

        expect(next.calledWith({ message: "Sale not found|404" })).to.be.true;
      });
    });

    describe("Ao listar uma venda que existe", () => {
      const req = {};
      const res = {};
      let next;

      before(() => {
        req.params = { id: 2 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        next = sinon.stub().returns();

        sinon
          .stub(salesService, "getById")
          .resolves(formattedSingleSaleResponse);
      });

      after(() => salesService.getById.restore());

      it("Verifica se status é chamado com código 200", async () => {
        await salesController.getById(req, res, next);

        expect(res.status.calledWith(200)).to.be.true;
      });

      it("Verifica se json é chamado com a venda buscada", async () => {
        await salesController.getById(req, res, next);

        expect(res.json.calledWith(formattedSingleSaleResponse)).to.be.true;
      });
    });
  });

  describe("Ao deletar uma venda", () => {
    describe("Caso a venda não exista", () => {
      const req = {};
      const res = {};
      let next;

      before(() => {
        req.params = { id: 1999 };
        next = sinon.stub().returns();

        sinon.stub(salesService, "delete").resolves(saleNotFoundResponse);
      });

      after(() => salesService.delete.restore());

      it("Verifica que next é chamado com objeto de erro", async () => {
        await salesController.delete(req, res, next);

        expect(next.calledWith(saleNotFoundResponse)).to.be.true;
      });
    });

    describe("Caso a venda exista", () => {
      const req = {};
      const res = {};
      let next;

      before(() => {
        req.params = { id: 2 };
        res.status = sinon.stub().returns(res);
        res.end = sinon.stub().returns();
        next = sinon.stub().returns();

        sinon.stub(salesService, "delete").resolves(true);
      });

      after(() => salesService.delete.restore());

      it("Verifica que status é chamado com código 204", async () => {
        await salesController.delete(req, res, next);

        expect(res.status.calledWith(204)).to.be.true;
      });

      it("Verifica que end é chamado", async () => {
        await salesController.delete(req, res, next);

        expect(res.end.called).to.be.true;
      });
    });
  });

  describe("Ao atualizar uma venda", () => {
    const salesControllerMock = {
      update: () => {},
    };

    describe("Caso a venda não exista", () => {
      const req = {};
      const res = {};
      let next;

      before(() => {
        req.body = validSaleBody;
        req.params = { id: 1999 };
        next = sinon.stub().returns();
      });

      it("Verifica se next é chamado com objeto de erro", async () => {
        await salesController.update(req, res, next);

        expect(next.calledWith(saleNotFoundResponse)).to.be.true;
      });
    });

    describe("Caso a venda exista", () => {
      const req = {};
      const res = {};
      let next;

      before(() => {
        req.body = validSaleBody;
        req.params = { id: 2 };
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();

        sinon.stub(salesService, "update").resolves(updatedSaleResponse);
      });

      after(() => salesService.update.restore());

      it("Verifica se status é chamado com código 200", async () => {
        await salesController.update(req, res, next);

        expect(res.status.calledWith(200)).to.be.true;
      });

      it("Verifica se json é chamado com os detalhes da venda atualizada", async () => {
        await salesController.update(req, res, next);

        expect(res.json.calledWith(updatedSaleResponse)).to.be.true;
      });
    });
  });
});
