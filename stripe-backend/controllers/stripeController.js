
const sicretKey = "sk_test_51J5LEqClTNNITuwO3rr1xOH6NuHhTeG4P4AXPlu9sj8Q2wVPQLDfu1ElDztR0B8LgKMmXX2xBUhmFRncrqzC9tbo00uokeGHWx"

const stripe = require("stripe")(sicretKey);
exports.create_stripe_customer = async (req, res) => {
    try {
        const { name, email } = req.body;
        const customer = await stripe.customers.create({
            name, email,
        })
        res.json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.create_payment_intent = async (req, res) => {
    const { customerId, amount, currency, paymentType, postUid } = req.body;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
            customer: customerId,
            automatic_payment_methods: {
                enabled: true,
            },
            setup_future_usage: "off_session",
            metadata: {
                paymentType,
                postUid,
            },
        })
        res.json({ clientSecret: paymentIntent.client_secret });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.stripe_webhook = async (req, res) => {
    console.log('Webhook received!');
    const sig = req.headers["stripe-signature"];
    const endpointSecret = "whsec_rPyBjb5izXYrForM2F0jsjYP2NLWuk0T";
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.log(err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
        case "payment_intent.succeeded":
            //Firestore logic to update data 
            console.log("Firestore logic to update data");
            
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
};


