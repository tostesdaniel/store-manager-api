const sinon = require("sinon");
const { expect } = require("chai");
const productsModel = require("../../../models/productsModel");
const connection = require("../../../models/connection");

describe("Testa productsModel", () => {
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

      expect(products).to.be.deep.equal([allProducts]);
    });
  });

  describe("Ao listar um produto por ID", () => {
    describe("Caso o produto não exista", () => {
      before(async () => sinon.stub(connection, "execute").resolves([[]]));

      after(async () => connection.execute.restore());

      it("Verifica se é retornado um array vazio", async () => {
        const product = await productsModel.getProductById(103254987);

        expect(product).to.be.an("array").that.is.empty;
      });
    });

    describe("Caso o produto exista", () => {
      before(async () =>
        sinon.stub(connection, "execute").resolves([[allProducts[0]]])
      );

      after(async () => connection.execute.restore());

      it("Verifica se o retorno é um array", async () => {
        const product = await productsModel.getProductById(1);

        expect(product).to.be.an("array");
      });

      it("Verifica se é retornado o produto buscado", async () => {
        const product = await productsModel.getProductById(1);

        expect(product).to.be.deep.equal([allProducts[0]]);
      });
    });
  });

  describe("Ao cadastrar um produto", () => {
    const newProduct = { name: "New product" };

    before(async () =>
      sinon.stub(connection, "execute").resolves([{ insertId: 4 }])
    );

    after(async () => connection.execute.restore());

    it("Verifica se ao cadastrar um produto, é retornado os dados do produto", async () => {
      const product = await productsModel.create(newProduct);

      expect(product).to.be.deep.equal({ id: 4, name: "New product" });
    });
  });
});
