"use client";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [item, setItem] = useState({ name: "", price: "" });
  const [response, setResponse] = useState<any>(null);
  const [allItems, setAllItems] = useState<any[]>([]);

  // GET message
  const getMessage = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/");
      const data = await res.json();
      setMessage(data.message);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch message");
    }
  };

  // POST create item
  const createItem = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/items/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      const data = await res.json();
      setResponse(data);
      setItem({ name: "", price: "" });
    } catch (err) {
      console.error(err);
      setResponse({ error: "Failed to create item" });
    }
  };

  // GET all items
  const showAllItems = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/items/");
      const data = await res.json();
      setAllItems(data);
    } catch (err) {
      console.error(err);
      setAllItems([]);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Next.js + FastAPI 🚀</h1>

      <button onClick={getMessage}>Get Message</button>
      <p>{message}</p>

      <h2>Create Item</h2>
      <input
        type="text"
        placeholder="Item name"
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={item.price}
        onChange={(e) => setItem({ ...item, price: e.target.value })}
      />
      <button onClick={createItem}>Submit</button>

      {response && (
        <div>
          <h3>New item created:</h3>
          <pre>{response ? JSON.stringify(response, null, 2) : ""}</pre>
        </div>
      )}

      <h2>All Items</h2>
      <button onClick={showAllItems}>Show All Items</button>
      <ul>
        {allItems.map((itm) => (
          <li key={itm.id}>
            {itm.name} - ${itm.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
