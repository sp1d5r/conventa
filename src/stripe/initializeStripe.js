import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const initializeStripe = async () => {
  if (!stripePromise) {
    stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLISH_KEY);
  }
  return stripePromise;
};

export default initializeStripe;
