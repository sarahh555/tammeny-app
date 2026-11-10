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
    script.src = `https://www.paypal.com/sdk/js?client-id=${CLIENT_ID}&currency=${currency}&intent=capture`;
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
            createOrder: (_data: any, actions: any) => {
              setMessage("");
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  { description, amount: { currency_code: currency, value: amount } },
                ],
              });
            },
            onApprove: async (data: any, actions: any) => {
              try {
                const details = await actions.order.capture();
                setStatus("success");
                setMessage(`Payment completed. Order ID: ${details.id}`);
                onSuccess?.(details);
              } catch (err) {
                console.error("PayPal capture error:", JSON.stringify(err, Object.getOwnPropertyNames(err as object)));
                setStatus("error");
                setMessage(
                  console.error("PayPal capture error:", JSON.stringify(err, Object.getOwnPropertyNames(err as object)));
                );
              }
            },
            onCancel: () => {
              setMessage("Payment cancelled.");
            },
            onError: (err: unknown) => {
              console.error("PayPal error:", err, (err as any)?.message);
              setStatus("error");
              setMessage(
                `Something went wrong with the payment. ${(err as any)?.message ?? ""}`
              );
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