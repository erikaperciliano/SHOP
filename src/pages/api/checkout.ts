import { stripe } from "@/lib/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { items } = req.body;

            if (!items || !Array.isArray(items)) {
                throw new Error('Invalid items array');
            }

            // Transform items to the format Stripe expects
            const lineItems = items.map(item => {
                if (!item.priceId || !item.quantity) {
                    throw new Error(`Missing priceId or quantity for item: ${JSON.stringify(item)}`);
                }
                return {
                    price: item.priceId,
                    quantity: item.quantity,
                };
            });

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: lineItems,
                mode: 'payment',
                success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/cancel`,
            });

            res.status(200).json({ checkoutUrl: session.url });
        } catch (err) {
            console.error('Error creating Stripe session:', err); 
            res.status(500).json({ statusCode: 500, message: err.message });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}