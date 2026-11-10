# Tammeny

**Tammeny** (Arabic for "reassure me") helps people who receive a worrying payment-account notice answer the first question on their mind: **"Is my money safe?"**

Live demo: **https://tammeny-app.vercel.app**

## The problem

When a payment platform limits an account or asks for verification, the notice is often vague and stressful. Users are left guessing whether their funds are safe, whether the issue is temporary, and what to do first.

## What Tammeny does

1. **Paste your notice.** Paste the account message you received (no passwords or card numbers).
2. **Money safety assessment.** Are funds likely safe, is it temporary, what access is limited, and how concerned should you be.
3. **Plain-language explanation** of what the notice means and why it may have happened.
4. **Resolution checklist** with prioritized next steps and realistic timing.
5. **Support summary** with ready-to-send questions for the platform's support team.
6. **Ask Tammeny**, a small chat for follow-up questions.

## How AI and PayPal are used

- **AI (Google Gemini):** the notice is sent to a serverless function (`api/analyze.ts`) which calls the Gemini API and returns a structured analysis (money safety, access status, concern level, first action, summary, tasks). The API key stays on the server as an environment variable.
- **Fallback:** if Gemini is busy or unavailable, the app falls back to a built-in rule-based analyzer (`analyzeNotice` in `src/App.tsx`) so the experience keeps working. The rule-based result is simpler than the Gemini one.
- **PayPal Sandbox:** the "Support Tammeny" card on the Support summary page lets users make a **$5 sandbox test payment**. Orders are created and captured on the server (`api/create-order.ts` and `api/capture-order.ts`) using the PayPal REST API, and approved in the browser with the PayPal JS SDK. No real money is involved.

## Tech stack

React 19, TypeScript, Vite, Tailwind CSS, Vercel serverless functions, Google Gemini API, PayPal Sandbox (REST API + JS SDK).

## Run it locally

```bash
git clone https://github.com/sarahh555/tammeny-app.git
cd tammeny-app
pnpm install
pnpm dev
```

Without the serverless functions, the app runs locally using the rule-based fallback. To run the AI and PayPal features, deploy to Vercel (or use `vercel dev`) and set these environment variables:

| Variable | Purpose |
| --- | --- |
| `GEMINI_API_KEY` | Gemini API key (server only) |
| `PAYPAL_CLIENT_ID` | PayPal sandbox client ID (server) |
| `PAYPAL_CLIENT_SECRET` | PayPal sandbox secret (server only) |
| `VITE_PAYPAL_CLIENT_ID` | PayPal sandbox client ID (browser SDK) |

## Known limitations

- Screenshot upload and PDF download are placeholders ("coming soon").
- Gemini can be slow or busy at times; the app then shows the rule-based fallback.
- Tammeny is guidance, not financial or legal advice, and is not affiliated with PayPal.

## License

MIT, see [LICENSE](LICENSE).