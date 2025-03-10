import React from "react";

interface Offer {
  id: number;
  bankName: string;
  approvedAmount: number;
  periodMonths: number;
  interestRate: number;
  monthlyCost: number;
  offerUrl: string;
}

interface OfferListProps {
  offers: Offer[];
}

const OfferList: React.FC<OfferListProps> = ({ offers }) => {
  return (
    <div className="mt-6 w-full max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Simulated Offers
      </h2>

      {offers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200 transition transform hover:scale-105"
            >
              <h3 className="text-xl font-bold text-blue-600">{offer.bankName}</h3>
              <p className="text-gray-700 text-lg font-semibold mt-2">
                {offer.approvedAmount} €
              </p>
              <p className="text-gray-500">
                <strong>Term:</strong> {offer.periodMonths} months
              </p>
              <p className="text-gray-500">
                <strong>Interest Rate:</strong>{" "}
                <span className="text-red-500">{offer.interestRate}%</span>
              </p>
              <p className="text-gray-500">
                <strong>Monthly Cost:</strong> {offer.monthlyCost} €
              </p>

              <a
                href={offer.offerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Offer
              </a>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No offers available yet.</p>
      )}
    </div>
  );
};

export default OfferList;
