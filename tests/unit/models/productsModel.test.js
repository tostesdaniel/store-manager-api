const sinon = require("sinon");
const { expect } = require("chai");
const productsModel = require("../../../models/productsModel");
const connection = require("../../../models/connection");
const { allProducts, oneProduct } = require("../mocks/products");

describe("Testa productsModel", () => {
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

  describe("Ao atualizar um produto", () => {
    const updatedProduct = { id: 1, name: "Mjolnir" };

    before(async () =>
      sinon.stub(productsModel, "getProductById").resolves([updatedProduct])
    );

    after(async () => productsModel.getProductById.restore());

    it("Verifica se é retornado o produto alterado", async () => {
      const product = await productsModel.update(1, { name: "Mjolnir" });

      expect(product).to.be.deep.equal(updatedProduct);
    });
  });

  describe("Ao buscar por nome de um produto", () => {
    describe("Caso não seja passado um termo na busca", () => {
      before(() => sinon.stub(connection, "execute").resolves([allProducts]));

      after(() => connection.execute.restore());

      it("Verifica se é retornado todos os produtos", async () => {
        const response = await productsModel.search("");

        expect(response).to.be.equal(allProducts);
      });
    });

    describe("Caso seja passado um termo na busca", () => {
      before(() => sinon.stub(connection, "execute").resolves([oneProduct]));

      after(() => connection.execute.restore());

      it("Verifica se é retornado os produtos que contém o termo buscado", async () => {
        const response = await productsModel.search("Escudo");

        expect(response).to.be.equal(oneProduct);
      });
    });
  });
});
