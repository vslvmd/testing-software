const httpMocks = require("node-mocks-http");

const { getById } = require("./merchants");

const mockFindOneMerchant = jest.fn();
jest.mock("../../storage", () => {
 return {
   models: {
     merchant: {
       findOne: () => mockFindOneMerchant()
     },
   },
 };
});

// Test 1
test("getById returns an existing merchant", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/api/merchants/1",
      params: {
        id: 42,
      },
    });
    const response = httpMocks.createResponse();
   
    mockFindOneMerchant.mockResolvedValue({
      id: "1",
      name: "Warteg Kharisma Bahari",
    });
   
    await getById(request, response);
   
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
      id: "1",
      name: "Warteg Kharisma Bahari",
    });
   });

// Test 2
   test("getById returns 404 when a merchant id does not exists", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/api/merchants/2",
      params: {
        id: 2,
      },
    });
    const response = httpMocks.createResponse();
   
    mockFindOneMerchant.mockResolvedValue(null);
   
    await getById(request, response);
   
    expect(response.statusCode).toEqual(404);
    expect(response._getData()).toEqual("404 - Not found");
   });

// Test 3

test("getById returns an existing merchant", async () => {
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/api/merchants/2",
      params: {
        id: 25,
      },
    });
    const response = httpMocks.createResponse();
   
    mockFindOneMerchant.mockResolvedValue({
      id: "3",
      name: "Toko Busana",
    });
   
    await getById(request, response);
   
    expect(response.statusCode).toEqual(200);
    expect(response._getJSONData()).toEqual({
      id: "3",
      name: "Toko Busana",
    });
   });

// Test 4

test("getById returns an existing merchant", async () => {
  const request = httpMocks.createRequest({
    method: "GET",
    url: "/api/merchants/2",
    params: {
      id: 40,
    },
  });
  const response = httpMocks.createResponse();
 
  mockFindOneMerchant.mockResolvedValue({
    id: "5",
    name: "Biku Shop",
    address: "Jakarta"
  });
 
  await getById(request, response);
 
  expect(response.statusCode).toEqual(200);
  expect(response._getJSONData()).toEqual({
    id: "5",
    name: "Biku Shop",
    address: "Jakarta"
  });
 });


   
