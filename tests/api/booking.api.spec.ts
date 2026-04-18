import { test, expect } from "@playwright/test";

const BASE_URL = "https://restful-booker.herokuapp.com";

test.describe("Restful Booker API Testing", () => {
  let bookingId: number;
  let token: string;

  // =====================================================
  // 🔁 SERIAL EXECUTION - Tests run sequentially
  // =====================================================
  test.describe.configure({ mode: "serial" });

  // =====================================================
  // 🔐 Generate Auth Token (Runs before all tests)
  // =====================================================
  test.beforeAll(async ({ browser }) => {
    const context = await browser.newContext();
    const request = context.request;

    const authResponse = await request.post(BASE_URL + "/auth", {
      data: {
        username: "admin",
        password: "password123",
      },
    });

    expect(authResponse.status()).toBe(200);

    const authBody = await authResponse.json();
    token = authBody.token;

    console.log("Generated Token:", token);
    await context.close();
  });

  // =====================================================
  // ✅ POST - Create Booking
  // =====================================================
  test("POST - Create Booking", async ({ request }) => {
    const response = await request.post(BASE_URL + "/booking", {
      data: {
        firstname: "Ketan",
        lastname: "Chavan",
        totalprice: 500,
        depositpaid: true,
        bookingdates: {
          checkin: "2026-04-20",
          checkout: "2026-04-25",
        },
        additionalneeds: "Breakfast",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    bookingId = body.bookingid;

    console.log("Created Booking ID:", bookingId);
    console.log(body);
  });

  // =====================================================
  // ✅ GET - Fetch Booking
  // =====================================================
  test("GET - Fetch Booking", async ({ request }) => {
    const response = await request.get(BASE_URL + "/booking/" + bookingId);

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);
    expect(body.firstname).toBeTruthy();
  });

  // =====================================================
  // ✅ PUT - Full Update Booking
  // =====================================================
  test("PUT - Update Booking", async ({ request }) => {
    const response = await request.put(BASE_URL + "/booking/" + bookingId, {
      headers: {
        Cookie: `token=${token}`,
      },

      data: {
        firstname: "Updated",
        lastname: "User",
        totalprice: 999,
        depositpaid: false,
        bookingdates: {
          checkin: "2026-05-01",
          checkout: "2026-05-05",
        },
        additionalneeds: "Lunch",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);
    expect(body.firstname).toBe("Updated");
  });

  // =====================================================
  // ✅ PATCH - Partial Update
  // =====================================================
  test("PATCH - Update First Name", async ({ request }) => {
    const response = await request.patch(BASE_URL + "/booking/" + bookingId, {
      headers: {
        Cookie: `token=${token}`,
      },

      data: {
        firstname: "PatchedName",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    console.log(body);
    expect(body.firstname).toBe("PatchedName");
  });

  // =====================================================
  // ❌ DELETE - Delete Booking
  // =====================================================
  test("DELETE - Remove Booking", async ({ request }) => {
    const response = await request.delete(BASE_URL + "/booking/" + bookingId, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    expect(response.status()).toBe(201);

    console.log("Booking Deleted Successfully");
  });
});
