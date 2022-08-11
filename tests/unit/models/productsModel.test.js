const sinon = require("sinon");
const { expect } = require("chai");
const productsModel = require("../../../models/productsModel");
const connection = require("../../../models/connection");

describe("Testa listagem de produtos", () => {
  const allProducts = [
    { id: 1, name: "Martelo de Thor" },
    { id: 2, name: "Traje de encolhimento" },
    { id: 3, name: "Escudo do Capitão América" },
  ];

  describe("Ao listar todos os produtos", () => {
    before(async () =>
      sinon.stub(connection, "execute").resolves([[allProducts]])
    );

    after(async () => connection.execute.restore());

    it("Verifica se é retornado um array", async () => {
      const products = await productsModel.getProducts();

      expect(products).to.be.an("array");
    });

    it("Verifica se são retornados todos os produtos", async () => {
      const products = await productsModel.getProducts();

      expect(products).to.be.equal(allProducts);
    });
  });

  describe("Ao listar um produto por ID", () => {
    describe("Caso o produto não exista", () => {
      before(async () => sinon.stub(connection, "execute").resolves([[]]));

      after(async () => connection.execute.restore());

      it("Verifica se é retornado undefined", async () => {
        const product = await productsModel.getProductById(103254987);

        expect(product).to.be.undefined;
      });
    });

    describe("Caso o produto exista", () => {
      before(async () =>
        sinon.stub(connection, "execute").resolves([[allProducts[0]]])
      );

      after(async () => connection.execute.restore());

      it("Verifica se o retorno é um objeto", async () => {
        const product = await productsModel.getProductById(1);

        expect(product).to.be.an("object");
      });

      it("Verifica se é retornado o produto buscado", async () => {
        const product = await productsModel.getProductById(1);

        expect(product).to.be.equal(allProducts[0]);
      });
    });
  });
});
