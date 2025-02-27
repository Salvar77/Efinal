const { default: mongooseConnect } = require("@/lib/mongoose");
const stripe = require("stripe")(process.env.STRIPE_SK);
import { Order } from "@/models/Order";
import { buffer } from "micro";

const endpointSecret = process.env.WEBHOOK_SECRET;

const handler = async (req, res) => {
  await mongooseConnect();
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      await buffer(req),
      sig,
      endpointSecret
    );
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  res.status(200).send("ok");
};

export default handler;

export const config = {
  api: { bodyParser: false },
};
