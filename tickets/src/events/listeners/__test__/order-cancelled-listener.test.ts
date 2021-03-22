import { Message } from "node-nats-streaming";
import { OrderStatus } from "../../../../../common/src/events/types/order-status";
import { OrderCancelledEvent, Subjects } from "@sebavicentea_org/common";
import { Ticket } from "../../../models/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";
import mongoose from "mongoose";

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId= mongoose.Types.ObjectId().toHexString();

  const ticket = Ticket.build({
    title: "concert",
    price: 20,
    userId: "123",
  });
  await ticket.save();
  ticket.set({orderId});
  await ticket.save();

  const data: OrderCancelledEvent["data"] = {
    id: orderId,
    version: 0,
    ticket: {
      id: ticket.id
    },
  };

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it("updates the ticket, publishes an event and acks the message", async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).not.toBeDefined();
  expect(msg.ack).toHaveBeenCalled();
  expect((natsWrapper.client.publish as jest.Mock).mock.calls[0][0]).toEqual(Subjects.TicketUpdated);
});
