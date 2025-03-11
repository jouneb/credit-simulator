interface CreditRequestData {
  name: string;
  email: string;
  requestedAmount: number;
  termMonths: number;
  monthlyIncome: number;
  userId: string;
}


export async function submitCreditRequest(data : CreditRequestData) {
    const response = await fetch('http://localhost:3001/credits', {  
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error('Error submitting credit request');
    }
  
    return response.json();
  }
  
  export async function getCreditOffers() {
    const response = await fetch('http://localhost:3001/credits/offers');
    if (!response.ok) {
      throw new Error('Error fetching credit offers');
    }
    return response.json();
  }
  