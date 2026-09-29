import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.warn('[Razorpay Webhook] RAZORPAY_WEBHOOK_SECRET is not configured on server.');
    return res.status(500).json({ error: 'Webhook secret is not configured.' });
  }

  const signature = req.headers['x-razorpay-signature'];
  if (!signature) {
    console.warn('[Razorpay Webhook] Missing x-razorpay-signature header in request.');
    return res.status(400).json({ error: 'Missing x-razorpay-signature header.' });
  }

  try {
    const rawBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(rawBody)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    const isValid =
      expectedBuffer.length === signatureBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, signatureBuffer);

    if (!isValid) {
      console.error('[Razorpay Webhook] Signature verification failed.');
      return res.status(400).json({ error: 'Invalid webhook signature.' });
    }

    const event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const eventName = event.event;
    const entity = event.payload?.payment?.entity || event.payload?.order?.entity || {};

    console.log(`[Razorpay Webhook] Valid event received: ${eventName}`, {
      paymentId: entity.id,
      orderId: entity.order_id,
      amount: entity.amount,
      status: entity.status
    });

    // Handle supported events idempotently
    switch (eventName) {
      case 'payment.captured':
      case 'order.paid':
        console.log(`[Razorpay Webhook] Payment captured / Order paid: ${entity.id}`);
        break;

      case 'payment.failed':
        console.warn(`[Razorpay Webhook] Payment failed: ${entity.id}`, {
          errorCode: entity.error_code,
          errorDesc: entity.error_description
        });
        break;

      default:
        console.log(`[Razorpay Webhook] Unhandled event type: ${eventName}`);
        break;
    }

    return res.status(200).json({ status: 'ok', event: eventName });
  } catch (error) {
    console.error('[Razorpay Webhook Error]:', error);
    return res.status(500).json({ error: error.message || 'Internal webhook error.' });
  }
}
