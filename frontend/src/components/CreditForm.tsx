import React, { useState, ChangeEvent, FormEvent } from "react";
import { submitCreditRequest, getCreditOffers } from "../services/api";

interface CreditFormProps {
  onOffersReceived: (offers: any[]) => void;
}

const CreditForm: React.FC<CreditFormProps> = ({ onOffersReceived }) => {
  const initialState = {
    name: "",
    email: "",
    requestedAmount: "",
    termMonths: "",
    monthlyIncome: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const dataToSubmit = {
      ...formData,
      requestedAmount: Number(formData.requestedAmount),
      termMonths: Number(formData.termMonths),
      monthlyIncome: Number(formData.monthlyIncome),
    };

    if (isNaN(dataToSubmit.requestedAmount) || isNaN(dataToSubmit.termMonths) || isNaN(dataToSubmit.monthlyIncome)) {
      setError("Please fill in all fields correctly.");
      setLoading(false);
      return;
    }

    try {
      await submitCreditRequest(dataToSubmit);
      const fetchedOffers = await getCreditOffers();
      onOffersReceived(fetchedOffers);

      // Reset form after submission
      setFormData(initialState);
    } catch (err) {
      setError("Error submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Apply for Credit</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Requested Amount (€):</label>
            <input
              type="number"
              name="requestedAmount"
              value={formData.requestedAmount}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Term (months):</label>
            <input
              type="number"
              name="termMonths"
              value={formData.termMonths}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium">Monthly Income (€):</label>
            <input
              type="number"
              name="monthlyIncome"
              value={formData.monthlyIncome}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreditForm;
