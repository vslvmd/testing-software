const httpMocks = require("node-mocks-http");

const { getById } = require("./products");

const mockFindOneProduct = jest.fn();
jest.mock("../../storage", () => {
 return {
   models: {
     product: {
       findOne: () => mockFindOneProduct()
     },
   },
 };
});


// Test 5

test("getById returns an existing product", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/api/merchants/:merchantId/products/1",
      params: {
        id: 10,
        merchant_id: 3,
      },
    });
    const response = httpMocks.createResponse();
   
    mockFindOneProduct.mockResolvedValue({
      "name": "ayam goreng",
      "price": "2000",
      "merchant_id": 34,
    });
   
    await getById(request, response);
   
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
        "name": "ayam goreng",
        "price": "2000",
        "merchant_id": 34,
    });
   });

//    Test 6

test("getById returns 404 when a product does not exists", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/api/merchants/2/products/2",
      params: {
        id: 2,
      },
    });
    const response = httpMocks.createResponse();
   
    mockFindOneProduct.mockResolvedValue(null);
   
    await getById(request, response);
   
    expect(response.statusCode).toEqual(404);
    expect(response._getData()).toEqual("404 - Not found");
   });
