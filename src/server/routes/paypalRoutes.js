const paypal = require("paypal-rest-sdk");
const MerchItemModel = require("../models/merchItem");
const paymentService = require("../services/paymentService");

const PP_ENV = process.env.PP_ENV;
const PP_CLIENT_ID = process.env.PP_CLIENT_ID;
const PP_SECRET = process.env.PP_SECRET;

paypal.configure({
  mode: PP_ENV,
  client_id: PP_CLIENT_ID,
  client_secret: PP_SECRET
});

exports.pay = async (req, res) => {
  const { item_id, success_redirect_url, cancel_redirect_url } = req.body;
  if (!item_id || !success_redirect_url || !cancel_redirect_url) {
    return res.status(400).send("Item id, redirect urls required");
  }

  // Get the Merch Item
  let merchItem;
  try {
    merchItem = await MerchItemModel.findById(item_id);
  } catch (err) {
    console.error("Failed to get merch item", err);
    return res.status(500).send("Failed to get item");
  }

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal"
    },
    redirect_urls: {
      return_url: success_redirect_url,
      cancel_url: cancel_redirect_url
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: merchItem.name,
              sku: merchItem.sku,
              price: merchItem.price,
              currency: "USD",
              quantity: 1
            }
          ]
        },
        amount: {
          currency: "USD",
          total: merchItem.price
        },
        description: merchItem.description
      }
    ]
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      console.error("Failed to create paypal payment", error);
      return res.status(500).send("Failed to create payment");
    }

    let redirectLink = payment.links.find(link => link.rel === "approval_url");
    if (!redirectLink) {
      return res.status(500).send("Failed to get redirect");
    }

    res.status(200).send({ redirect_url: redirectLink.href });
  });
};

exports.execute = async (req, res) => {
  const { item_id, payer_id, payment_id } = req.body;
  const userId = req.payload.id;

  // Get the Merch Item
  let merchItem;
  try {
    merchItem = await MerchItemModel.findById(item_id);
  } catch (err) {
    console.error("Failed to get merch item", err);
    return res.status(500).send("Failed to get item");
  }

  const execute_payment_json = {
    payer_id,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: merchItem.price
        }
      }
    ]
  };

  paypal.payment.execute(
    payment_id,
    execute_payment_json,
    async (error, payment) => {
      if (error) {
        console.error("Failed to execute paypal payment", error);
        return res.status(500).send("Failed to execute payment");
      }

      await paymentService.addPurchaseHistoryItem({
        userId,
        itemId: merchItem.id,
        name: merchItem.name,
        description: merchItem.description,
        transactionId: payment.id
      });

      res.status(204).send();
    }
  );
};

exports.createMerchItem = async (req, res) => {
  const { name, description, price, sku } = req.body;
  if (!name || !description || !price || !sku) {
    return res.status(400).send("Invalid request body");
  }

  let merchItemModel;
  try {
    merchItemModel = new MerchItemModel({ name, description, price, sku });
    await merchItemModel.validate();
  } catch (err) {
    return res.status(400).send("Invalid merch item format");
  }

  try {
    const created = await merchItemModel.save();
    !!created
      ? res.status(202).send(created)
      : res.status(500).send("Failed to create merch item");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to create merch item");
  }
};
