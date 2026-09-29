import Razorpay from 'razorpay';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const keyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    console.error('[Razorpay Order Creation] Missing credentials. Ensure RAZORPAY_KEY_ID (or VITE_RAZORPAY_KEY_ID) and RAZORPAY_KEY_SECRET are set.');
    return res.status(500).json({
      error: 'Razorpay keys are not configured on server. Please configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.'
    });
  }

  try {
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret
    });

    const body = req.body || {};
    const customerName = (body.name || 'Seeker').slice(0, 50);
    const customerEmail = (body.email || '').slice(0, 100);
    const customerMobile = (body.mobile || '').slice(0, 20);

    // Fixed price for AstroSole Premium Reading: ₹11.00 (1100 paise)
    const amountInPaise = 1100;
    const currency = 'INR';
    const receiptId = `rcpt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const options = {
      amount: amountInPaise,
      currency: currency,
      receipt: receiptId,
      notes: {
        product: 'AstroSole Premium Astrological Report',
        customer_name: customerName,
        customer_email: customerEmail,
        customer_mobile: customerMobile
      }
    };

    const order = await razorpay.orders.create(options);
    
    return res.status(200).json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      keyId: keyId,
      status: order.status
    });
  } catch (error) {
    console.error('[Razorpay Order Creation Error]:', error);
    return res.status(500).json({
      error: error.message || 'Failed to create Razorpay order.'
    });
  }
}
