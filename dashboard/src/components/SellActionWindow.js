import React, { useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const SellActionWindow = ({ uid }) => {
  const generalContext = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);
  const [error, setError] = useState(null);

  const handleSellClick = async () => {
    try {
      await axios.post("http://localhost:3002/newOrder", {
        name: uid,
        qty: stockQuantity,
        price: stockPrice,
        mode: "SELL"
      });
      // Close sell window only if API call was successful
      generalContext.closeSellWindow();
      setError(null);
    } catch (err) {
      setError(err.response?.data || "An error occurred during sell order");
    }
  };

  const handleCancelClick = () => {
    generalContext.closeSellWindow();
  };

  return (
    <div className="container" id="sell-window" draggable="true">
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(Number(e.target.value))}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              id="price"
              step="0.05"
              min="0"
              onChange={(e) => setStockPrice(Number(e.target.value))}
              value={stockPrice}
            />
          </fieldset>
        </div>
        <div>
          {/* Use buttons instead of Link to prevent navigation */}
          <button onClick={handleSellClick} className="btn btn-red">
            Sell
          </button>
          <button onClick={handleCancelClick} className="btn btn-grey">
            Cancel
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default SellActionWindow;
