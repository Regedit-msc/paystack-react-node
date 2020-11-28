const cors = require("cors");
const express = require("express");
const paystack = require("paystack")(`${process.env.STRIPE_SECRET}`);
const { v4: uuidv4 } = require("uuid");
const port = 4000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.send(" Welcome to Regedit's paystack backend :D");
});

app.post("/yaypayment", cors(), (req, res) => {
  console.log(req.body);
  const { email, metadata, amount } = req.body;
  const idempotencyKey = uuidv4();

  return paystack.customer
    .create({
      email: email,
      first_name: req.body.metadata.name,
      phone: req.body.metadata.phone,
    })
    .then((customer) => {
      paystack.transaction
        .charge(
          {
            email: customer.email,
            amount: amount,
            currency: "NGN",
            name: customer.first_name,
          },
          { idempotencyKey }
        )
        .catch((err) => {
          console.log(err);
        });
    });
});

app.listen(port, () => {
  console.log("Listening on port:", port);
});
