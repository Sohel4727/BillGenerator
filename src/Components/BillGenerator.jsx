// InvoiceGenerator.js
import React, { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PdfGenerator from "./PdfGenerator";

const BillGenerator = () => {
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const handleAddItem = () => {
    if (description && amount) {
      const newItem = { description, amount: Number(amount) };
      setItems([...items, newItem]);
      setDescription("");
      setAmount("");
      // Update total
      setTotal((prevTotal) => prevTotal + Number(amount));
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    const deletedAmount = items[index].amount;
    setItems(updatedItems);
    setTotal((prevTotal) => prevTotal - deletedAmount);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Input Fields */}

      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Heading"
          className="input w-1/2 mb-2 border border-gray-300 rounded p-2"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <input
          type="date"
          className="input w-1/3 mb-2 border border-gray-300 rounded p-2"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          placeholder=" "
        />
      </div>
      <div className="flex justify-between">
        <input
          type="number"
          placeholder="Amount"
          className="input w-1/4 mb-4 border border-gray-300 rounded p-2"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="input w-1/2 mb-4 border border-gray-300 rounded p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Add Item Button */}
      <button
        className="bg-indigo-600 text-white py-2 px-4 rounded mb-4 hover:bg-indigo-700 transition"
        onClick={handleAddItem}
      >
        Add Item
      </button>

      {/* Show Items List */}
      <div className="mb-4">
        {items.length > 0 ? (
          items.map((item, index) => (
            <>
              <div
                key={index}
                className="flex justify-between items-center p-3 mb-2 bg-gray-100 border border-gray-300 rounded shadow-md transition hover:shadow-lg"
              >
                <div className="flex w-full ">
                  <span className="text-gray-600 block mr-4">
                    ₹{item.amount}
                  </span>
                  <span className="text-gray-800 font-bold">
                    {item.description}
                  </span>
                </div>
                <button
                  className="text-red-600 font-bold ml-4 hover:text-red-800 transition"
                  onClick={() => handleDeleteItem(index)}
                >
                  &#10006;
                </button>
              </div>
            </>
          ))
        ) : (
          <div className="text-gray-500">No items added yet.</div>
        )}
        {items.length > 0 ? (
          <div className="flex justify-between">
            <h3>Total: ₹{total}</h3>
            <input
              type="text"
              placeholder="Purpose"
              className="input w-1/2 mb-4 border border-gray-300 rounded p-2"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
        ) : null}
      </div>

      {/* Show PDF Preview and Download */}
      {total > 0 && (
        <div className="mt-4">
          <PDFDownloadLink
            document={
              <PdfGenerator
                customerName={customerName}
                date={date}
                items={items}
                total={total}
                purpose={purpose}
              />
            }
            fileName={`Invoice_${customerName}.pdf`}
            className="bg-green-600 text-white py-2 px-4 no-underline rounded hover:bg-green-700 transition"
          >
            {({ loading }) =>
              loading ? "Generating PDF..." : "Download Invoice"
            }
          </PDFDownloadLink>
        </div>
      )}
    </div>
  );
};

export default BillGenerator;
