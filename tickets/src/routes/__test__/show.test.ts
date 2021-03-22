import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";

it("should return a 404 if not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();

  await request(app).get(`/api/tickets/${id}`).send().expect(404);
});

it("returns the tickets if found", async () => {
  const title = "my ticket title";
  const price = 20;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({
      title,
      price,
    })
    .expect(201);

  const ticketId = response.body.id;

  const ticketResponse = await request(app)
    .get(`/api/tickets/${ticketId}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
