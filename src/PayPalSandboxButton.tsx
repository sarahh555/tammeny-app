import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    paypal?: any;
  }
}

const CLIENT_ID = import.meta.env.VITE_PAYPAL_CLIENT_ID as string | undefined;

let sdkPromise: Promise<void> | null = null;

function loadPayPalSdk(currency: string): Promise<void> {
  if (window.paypal) return Promise.resolve();
  if (sdkPromise) return sdkPromise;
  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=${currency}`;
    script.onload = () => resolve();
    script.onerror = () => {
      sdkPromise = null;
      reject(new Error("Failed to load PayPal SDK"));
    };
    document.body.appendChild(script);
  });
  return sdkPromise;
}

type Props = {
  amount?: string;
  currency?: string;
  description?: string;
  onSuccess?: (details: any) => void;
};

export default function PayPalSandboxButton({
  amount = "5.00",
  currency = "USD",
  description = "Test payment",
  onSuccess,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!CLIENT_ID) {
      setStatus("error");
      setMessage("VITE_PAYPAL_CLIENT_ID is missing. Add it on Vercel and redeploy.");
      return;
    }

    let cancelled = false;

    loadPayPalSdk(currency)
      .then(() => {
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = "";
        window.paypal
          .Buttons({
            createOrder: (_data: any, actions: any) =>
              actions.order.create({
                purchase_units: [
                  { description, amount: { currency_code: currency, value: amount } },
                ],
              }),
            onApprove: async (_data: any, actions: any) => {
              const details = await actions.order.capture();
              setStatus("success");
              setMessage(`Payment completed. Order ID: ${details.id}`);
              onSuccess?.(details);
            },
            onError: (err: unknown) => {
              console.error(err);
              setStatus("error");
              setMessage("Something went wrong with the payment.");
            },
          })
          .render(containerRef.current);
        setStatus("ready");
      })
      .catch(() => {
        if (cancelled) return;
        setStatus("error");
        setMessage("Could not load PayPal. Check the Client ID and your connection.");
      });

    return () => {
      cancelled = true;
    };
  }, [amount, currency, description]);

  return (
    <div style={{ maxWidth: 360 }}>
      {status === "loading" && <p>Loading PayPal…</p>}
      <div ref={containerRef} />
      {message && <p>{message}</p>}
    </div>
  );
}