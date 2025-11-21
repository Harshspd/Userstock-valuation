require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// GET: All Holdings
app.get("/allHoldings", async (req, res) => {
  let allHoldings = await HoldingsModel.find({});
  res.json(allHoldings);
});

// GET: All Positions
app.get("/allPositions", async (req, res) => {
  let allPositions = await PositionsModel.find({});
  res.json(allPositions);
});

// GET: All Orders
app.get("/allOrders", async (req, res) => {
  let allOrders = await OrdersModel.find({});
  res.json(allOrders);
});

// POST: New Order (Buy or Sell) - AUTOMATICALLY UPDATES POSITIONS
app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    // SELL Logic
    if (mode === "SELL") {
      const holding = await HoldingsModel.findOne({ name });
      if (!holding || holding.qty < qty) {
        return res.status(400).send("You don't own enough shares to sell");
      }
      holding.qty -= qty;
      await holding.save();

      // Update Position
      let position = await PositionsModel.findOne({ name });
      if (position) {
        position.qty -= qty;
        // Optionally, update price, avg, etc.
        // If quantity is zero or less, remove the position
        if (position.qty <= 0) {
          await PositionsModel.deleteOne({ name });
        } else {
          await position.save();
        }
      }
    }

    // BUY Logic
    else if (mode === "BUY") {
      let holding = await HoldingsModel.findOne({ name });
      if (holding) {
        holding.qty += qty;
        await holding.save();
      } else {
        let newHolding = new HoldingsModel({
          name,
          qty,
          avg: price,
          price: price,
          net: "+0%",
          day: "+0%",
        });
        await newHolding.save();
      }

      // Update Position
      let position = await PositionsModel.findOne({ name });
      if (position) {
        // Update average price (Weighted Avg)
        const oldTotal = position.avg * position.qty;
        const newTotal = price * qty;
        position.avg = (oldTotal + newTotal) / (position.qty + qty);
        position.qty += qty;
        position.price = price; // Update to latest price
        await position.save();
      } else {
        let newPosition = new PositionsModel({
          name,
          qty,
          avg: price,
          price: price,
          product: "CNC", // or "MIS", etc.
          day: "+0%", // Default, or calculate as needed
        });
        await newPosition.save();
      }
    }

    // Record the Order
    const newOrder = new OrdersModel({ name, qty, price, mode });
    await newOrder.save();

    res.send("Order saved!");
  } catch (error) {
    res.status(500).send("Something went wrong: " + error.message);
  }
});

app.listen(PORT, () => {
  console.log("App started!");
  mongoose.connect(uri);
  console.log("DB started!");
});
