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
  currency?: string;
  onSuccess?: (details: any) => void;
};

export default function PayPalSandboxButton({
  currency = "USD",
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
            createOrder: async () => {
              setMessage("");
              const res = await fetch("/api/create-order", { method: "POST" });
              const order = await res.json();
              if (!res.ok || !order?.id) {
                throw new Error(order?.error || order?.message || "Could not create order");
              }
              return order.id;
            },
            onApprove: async (data: any) => {
              try {
                const res = await fetch("/api/capture-order", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ orderID: data.orderID }),
                });
                const details = await res.json();
                if (!res.ok || details?.status !== "COMPLETED") {
                  const issue =
                    details?.details?.[0]?.issue || details?.error || details?.message || "capture failed";
                  throw new Error(issue);
                }
                setStatus("success");
                setMessage(`Payment completed. Order ID: ${details.id}`);
                onSuccess?.(details);
              } catch (err: any) {
                console.error("PayPal capture error:", err);
                setStatus("error");
                setMessage(
                  `Payment approved but capture failed (${err?.message ?? "unknown"}). Order ID: ${data?.orderID}`
                );
              }
            },
            onCancel: () => {
              setMessage("Payment cancelled.");
            },
            onError: (err: any) => {
              console.error("PayPal error:", err);
              setStatus("error");
              setMessage(`Something went wrong with the payment. ${err?.message ?? ""}`);
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
  }, [currency]);

  return (
    <div style={{ maxWidth: 360 }}>
      {status === "loading" && <p>Loading PayPal…</p>}
      <div ref={containerRef} />
      {message && <p>{message}</p>}
    </div>
  );
}