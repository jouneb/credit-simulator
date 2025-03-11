import { useState, useEffect } from "react";
import Cookies from "js-cookie";

interface CreditRequest {
  _id: string;
  userId: string;
  name: string;
  status: string;
  requestedAmount: number;
  termMonths: number;
  monthlyIncome: number;
  requestDate: string;
}

const getUserId = () => {
  let userId = Cookies.get("userId");

  if (!userId) {
    userId = Math.random().toString(36).substr(2, 9); 
    Cookies.set("userId", userId, { expires: 365 }); 
  }

  return userId;
};

const PreviousRequests = () => {
  const [previousRequests, setPreviousRequests] = useState<CreditRequest[]>([]);

  useEffect(() => {
    const userId = getUserId(); 

    const fetchPreviousRequests = async () => {
      try {
        const response = await fetch(`http://localhost:3001/credits/user/${userId}`);
        const data = await response.json();
        setPreviousRequests(data);
      } catch (error) {
        console.error("Error fetching previous requests:", error);
      }
    };

    fetchPreviousRequests();
  }, []);

  return (
    <>
      <style jsx>{`
        .requests-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
          max-width: 800px;
          margin: 0 auto;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .title {
          font-size: 2em;
          margin-bottom: 20px;
          color: #333;
          font-weight: 600;
        }

        .requests-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          width: 100%;
        }

        .request-card {
          background-color: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-left: 4px solid #4caf50;
          font-size: 1rem;
          color: #555;
        }

        .request-card p strong {
          color: #333;
        }

        .no-requests {
          font-size: 1.2em;
          color: #777;
          font-style: italic;
        }
      `}</style>

      <div className="requests-container">
        <h2 className="title">Previous Credit Applications</h2>
        {previousRequests.length === 0 ? (
          <p className="no-requests">No previous requests found.</p>
        ) : (
          <div className="requests-list">
            {previousRequests.map((request) => (
              <div key={request._id} className="request-card">
                <p><strong>Name:</strong> {request.name}</p>
                <p><strong>Status:</strong> {request.status}</p>
                <p><strong>Amount:</strong> {request.requestedAmount}€</p>
                <p><strong>Term:</strong> {request.termMonths} months</p>
                <p><strong>Income:</strong> {request.monthlyIncome}€/month</p>
                <p><strong>Date:</strong> {new Date(request.requestDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PreviousRequests;
