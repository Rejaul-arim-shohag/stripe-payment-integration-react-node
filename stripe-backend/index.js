const express = require('express');
const app = express();
const cors = require('cors');

app.post(
    '/edutechs-stripe-webhook',
    express.raw({ type: 'application/json' }),
    require('./controllers/stripeController').stripe_webhook
);

app.use(express.json());
app.use(cors());


const stripeRoute = require('./routes/stripeRoute.js');
stripeRoute(app)

app.listen(3001, () => {
    console.log('Server is listening on port 3001');
});