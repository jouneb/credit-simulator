'use client';

import { useState } from 'react';
import CreditForm from '../components/CreditForm';
import OfferList from '../components/OfferList';

interface Offer {
  id: number;
  bankName: string;
  approvedAmount: number;
  periodMonths: number;
  interestRate: number;
  monthlyCost: number;
  offerUrl: string;
}

export default function Page() {
  const [offers, setOffers] = useState<Offer[]>([]);

  const handleOffersReceived = (newOffers: Offer[]) => {
    setOffers(newOffers);
  };

  return (
    <div>
      <h1>Credit Application</h1>
      <CreditForm onOffersReceived={handleOffersReceived} />
      <OfferList offers={offers} />
    </div>
  );
}
