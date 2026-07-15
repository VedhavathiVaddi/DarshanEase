import { sleep } from '../utils/helpers';

// Mock payment gateway. Swap the body of `charge` for a real gateway SDK
// call (Razorpay/Stripe/etc.) — keep the same resolved/rejected shape.

export async function charge({ amount, cardNumber }) {
  await sleep(900);

  // Simulate a gateway decline for a reserved test card number so the
  // failure path in the UI is reachable during development.
  const cleaned = String(cardNumber || '').replace(/\s/g, '');
  if (cleaned.startsWith('0000')) {
    throw new Error('Payment declined by the bank. Try a different card.');
  }

  return {
    transactionId: `TXN${Date.now().toString(36).toUpperCase()}`,
    amount,
    status: 'SUCCESS',
    paidAt: new Date().toISOString(),
  };
}
