import type { CheckoutInput, UpdateCustomerInput, CreateAccountInput } from '#gql';

export function useCheckout() {
  const orderInput = useState<any>('orderInput', () => {
    return {
      customerNote: '',
      paymentMethod: '',
      shipToDifferentAddress: false,
      metaData: [{ key: 'order_via', value: 'WooNuxt' }],
    };
  });

  const isProcessingOrder = useState<boolean>('isProcessingOrder', () => false);

  // if Country or State are changed, calculate the shipping rates again
  async function updateShippingLocation() {
    const { customer, viewer } = useAuth();
    const { isUpdatingCart, refreshCart } = useCart();

    isUpdatingCart.value = true;

    try {
      const { updateCustomer } = await GqlUpdateCustomer({
        input: {
          id: viewer?.value?.id,
          shipping: orderInput.value.shipToDifferentAddress ? customer.value.shipping : customer.value.billing,
          billing: customer.value.billing,
        } as UpdateCustomerInput,
      });

      if (updateCustomer) refreshCart();
    } catch (error) {
      console.error(error);
    }
  }

  function openPayPalWindow(redirectUrl: string): Promise<boolean> {
    return new Promise((resolve) => {
      const width = 750;
      const height = 750;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2 + 80;
      const payPalWindow = window.open(redirectUrl, '', `width=${width},height=${height},top=${top},left=${left}`);
      const timer = setInterval(() => {
        if (payPalWindow?.closed) {
          clearInterval(timer);
          resolve(true);
        }
      }, 500);
    });
  }

  
const processCheckout = async (isPaid = false): Promise<any> => {
  const { customer, loginUser } = useAuth();
  const router = useRouter();
  const { replaceQueryParam } = useHelpers();
  const { cart, emptyCart, refreshCart } = useCart();

  isProcessingOrder.value = true;

  const { username, password, shipToDifferentAddress } = orderInput.value;
  const billing = customer.value?.billing;
  const shipping = shipToDifferentAddress
    ? customer.value?.shipping
    : billing;
  const shippingMethod = cart.value?.chosenShippingMethods;

  try {
    let checkoutPayload: CheckoutInput = {
      billing,
      shipping,
      shippingMethod,
      metaData: orderInput.value.metaData,
      paymentMethod: orderInput.value.paymentMethod.id,
      customerNote: orderInput.value.customerNote,
      shipToDifferentAddress,
      transactionId: orderInput.value.transactionId,
      isPaid,
    };

    const { checkout } = await GqlCheckout(checkoutPayload);

    const orderId = checkout?.order?.databaseId;
    const orderKey = checkout?.order?.orderKey;
    const orderInputPaymentId = orderInput.value.paymentMethod.id;
    const isPayPal =
      orderInputPaymentId === "paypal" ||
      orderInputPaymentId === "ppcp-gateway";

    // PayPal redirect
    if ((await checkout?.redirect) && isPayPal) {
      const frontEndUrl = window.location.origin;
      let redirectUrl = checkout?.redirect ?? "";
      const payPalReturnUrl = `${frontEndUrl}/checkout/order-received/${orderId}/?key=${orderKey}&from_paypal=true`;
      const payPalCancelUrl = `${frontEndUrl}/checkout/?cancel_order=true&from_paypal=true`;

      redirectUrl = replaceQueryParam("return", payPalReturnUrl, redirectUrl);
      redirectUrl = replaceQueryParam(
        "cancel_return",
        payPalCancelUrl,
        redirectUrl
      );
      redirectUrl = replaceQueryParam("bn", "WooNuxt_Cart", redirectUrl);

      // Store order info before redirecting
      localStorage.setItem("pendingOrderId", orderId.toString());
      localStorage.setItem("pendingOrderKey", orderKey);

      // Direct redirect instead of popup
      window.location.href = redirectUrl;
      return checkout;
    } else {
      router.push(`/checkout/order-received/${orderId}/?key=${orderKey}`);
    }

    if ((await checkout?.result) !== "success") {
      alert("There was an error processing your order. Please try again.");
      window.location.reload();
      return checkout;
    } else {
      await emptyCart();
      await refreshCart();
    }
  } catch (error: any) {
    const errorMessage = error?.gqlErrors?.[0].message;

    if (
      errorMessage?.includes(
        "An account is already registered with your email address"
      )
    ) {
      alert("An account is already registered with your email address");
      return null;
    }

    alert(errorMessage);
    return null;
  } finally {
    isProcessingOrder.value = false;
  }
};

  return {
    orderInput,
    isProcessingOrder,
    processCheckout,
    updateShippingLocation,
  };
}
