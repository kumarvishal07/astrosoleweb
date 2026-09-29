import crypto from 'crypto';

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

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {};
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    console.error('[Razorpay Verify] Server configuration error: RAZORPAY_KEY_SECRET missing.');
    return res.status(500).json({ error: 'Razorpay secret key is not configured on the server.' });
  }

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: 'Missing required payment verification parameters (order_id, payment_id, signature).'
    });
  }

  try {
    const hmac = crypto.createHmac('sha256', keySecret);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');

    const expectedBuffer = Buffer.from(generated_signature, 'utf8');
    const signatureBuffer = Buffer.from(razorpay_signature, 'utf8');

    const isValid =
      expectedBuffer.length === signatureBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, signatureBuffer);

    if (isValid) {
      console.log(`[Razorpay Verify] Payment verified successfully: order_id=${razorpay_order_id}, payment_id=${razorpay_payment_id}`);
      return res.status(200).json({
        success: true,
        message: 'Payment verified successfully.',
        transactionId: razorpay_payment_id,
        orderId: razorpay_order_id,
        unlocked: true
      });
    } else {
      console.warn(`[Razorpay Verify] Invalid signature attempt for order_id=${razorpay_order_id}`);
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature. Verification failed.'
      });
    }
  } catch (error) {
    console.error('[Razorpay Verify Error]:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'An error occurred during payment verification.'
    });
  }
}
