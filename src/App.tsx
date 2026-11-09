import PayPalSandboxButton from "./PayPalSandboxButton";
import { FormEvent, ReactNode, useState } from "react"
   import { analyzeAccountNotice } from "./services/ai"
type IconName = "arrow" | "bell" | "check" | "chevron" | "clipboard" | "close" | "dashboard" | "document" | "heart" | "info" | "lock" | "menu" | "message" | "refresh" | "search" | "send" | "shield" | "sparkles" | "time" | "upload" | "user" | "warning"

function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, ReactNode> = {
    arrow: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chevron: <path d="m9 18 6-6-6-6" />,
    clipboard: (
      <>
        <rect x="5" y="4" width="14" height="17" rx="2" />
        <path d="M9 4V2h6v2M9 10h6M9 14h6M9 18h4" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    dashboard: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    document: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M8 13h8M8 17h6" />
      </>
    ),
    heart: (
      <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6z" />
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8h.01" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    message: (
      <>
        <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
        <path d="M8 10h8M8 14h5" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 7h-5V2" />
        <path d="M20 7a9 9 0 1 0 1 8" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    send: (
      <>
        <path d="m22 2-7 20-4-9-9-4zM22 2 11 13" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    sparkles: (
      <>
        <path d="m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3zM5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8zM19 14l.6 1.4L21 16l-1.4.6L19 18l-.6-1.4L17 16l1.4-.6z" />
      </>
    ),
    time: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    upload: (
      <>
        <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21a8 8 0 0 1 16 0" />
      </>
    ),
    warning: (
      <>
        <path d="M10.3 3.7 2.5 18a2 2 0 0 0 1.8 3h15.4a2 2 0 0 0 1.8-3L13.7 3.7a2 2 0 0 0-3.4 0z" />
        <path d="M12 9v4M12 17h.01" />
      </>
    ),
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  )
}

function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <div className={`logo ${inverse ? "inverse" : ""}`}>
      <span className="logo-symbol">
        <Icon name="shield" size={19} />
      </span>
      <span>
        Resolution<span className="logo-light"> Copilot</span>
      </span>
    </div>
  )
}

function Button({
  children,
  variant = "primary",
  onClick,
  className = "",
  disabled = false,
}: {
  children: ReactNode
  variant?: "primary" | "secondary" | "quiet"
  onClick?: () => void
  className?: string
  disabled?: boolean
}) {
  return (
    <button
      className={`button button-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

type ResolutionTask = {
  title: string
  detail: string
  done: boolean
  priority: string
  time: string
}

type TimelineStep = {
  window: string
  title: string
  detail: string
}

type NoticeAnalysis = {
  notice: string
  issueType: string
  issueTitle: string
  severity: "Low" | "Medium" | "High"
  analysisConfidence: number
  resolutionConfidence: number
  explanation: string
  impact: string
  reason: string
  reassurance: string
  moneyStatus: string
  accessStatus: string
  durationStatus: string
  accountHealth: string
  tasks: ResolutionTask[]
  requiredDocuments: string[]
  documentGuidance: string
  estimatedResolution: string
  timeline: TimelineStep[]
  supportSummary: string
  supportQuestions: string[]
}

function analyzeNotice(rawNotice: string): NoticeAnalysis {
  const notice = rawNotice.trim()
  const text = notice.toLowerCase()
  const includesAny = (...terms: string[]) =>
    terms.some((term) => text.includes(term))

  const finalTask: ResolutionTask = {
    title: "Submit and monitor the review",
    detail: "Save your confirmation and watch for platform updates",
    done: false,
    priority: "Final step",
    time: "2 min",
  }

  if (
    includesAny(
      "permanently limited",
      "permanently restricted",
      "account closed",
      "account terminated",
      "no longer use",
    )
  ) {
    return {
      notice,
      issueType: "Account closure or permanent limitation",
      issueTitle: "Permanent account limitation",
      severity: "High",
      analysisConfidence: 94,
      resolutionConfidence: 42,
      explanation:
        "This notice says normal account access may not return automatically. Unlike a routine temporary check, it needs a direct response or review request.",
      impact:
        "Sending, receiving, or withdrawing may be paused. Your balance is still connected to your account, but the notice may set a waiting period before withdrawal.",
      reason:
        "This can happen when account activity needs a closer review or earlier information could not be confirmed. Automated notices do not always give the full reason.",
      reassurance:
        "Your balance does not automatically disappear, but access and release timing may be restricted. Confirm the withdrawal or release process with support.",
      moneyStatus: "Balance may be held pending release terms",
      accessStatus: "Most or all account features may be disabled",
      durationStatus: "Potentially permanent — appeal may be available",
      accountHealth: "Action required",
      tasks: [
        {
          title: "Read the complete limitation notice",
          detail:
            "Identify any appeal deadline and stated balance-release date",
          done: false,
          priority: "High priority",
          time: "3 min",
        },
        {
          title: "Prepare an account activity summary",
          detail: "Collect recent transactions and the purpose of your account",
          done: false,
          priority: "Required",
          time: "10 min",
        },
        {
          title: "Submit a formal appeal",
          detail: "Ask for the specific policy basis and a manual review",
          done: false,
          priority: "Required",
          time: "10 min",
        },
        finalTask,
      ],
      requiredDocuments: [
        "Government ID",
        "Recent transaction records",
        "Business or service evidence",
      ],
      documentGuidance:
        "Share only what is requested. Use clear records that explain recent account activity and where the money came from.",
      estimatedResolution: "5–14 business days for an appeal response",
      timeline: [
        {
          window: "NOW",
          title: "Preserve the notice and account records",
          detail:
            "Save the full message, dates, case number, and transaction history.",
        },
        {
          window: "WITHIN 1 BUSINESS DAY",
          title: "Submit a focused appeal",
          detail:
            "Request the exact reason, appeal route, and balance-release terms.",
        },
        {
          window: "5–14 BUSINESS DAYS",
          title: "Manual review response",
          detail: "Appeal timing varies and restoration is not guaranteed.",
        },
      ],
      supportSummary:
        "My account has been described as permanently limited or closed. I need clarification on the exact basis for the decision, whether a formal appeal is available, and when and how any remaining balance can be withdrawn.",
      supportQuestions: [
        "What specific policy or account activity led to this limitation?",
        "Is a manual appeal available, and what evidence should I include?",
        "When will my remaining balance become eligible for withdrawal?",
        "Are there any deadlines or additional actions I need to complete?",
      ],
    }
  }

  if (includesAny("chargeback", "dispute", "buyer claim", "case opened")) {
    return {
      notice,
      issueType: "Transaction dispute",
      issueTitle: "Open payment dispute",
      severity: "Medium",
      analysisConfidence: 93,
      resolutionConfidence: 72,
      explanation:
        "A buyer or cardholder has challenged a payment. The platform may temporarily deduct or reserve the disputed amount while it reviews evidence from both sides.",
      impact:
        "The disputed amount may be unavailable, but unrelated funds and account features usually remain accessible unless the notice says otherwise.",
      reason:
        "Disputes can be opened when a customer does not recognize a charge, reports an item or service issue, or asks their bank to reverse a payment.",
      reassurance:
        "This notice concerns a specific transaction rather than your entire balance. The outcome depends on the evidence and dispute rules.",
      moneyStatus: "Disputed funds are temporarily reserved",
      accessStatus: "Usually limited to the disputed amount",
      durationStatus: "Temporary while the case is reviewed",
      accountHealth: "Review needed",
      tasks: [
        {
          title: "Review the disputed transaction",
          detail: "Confirm the amount, customer, date, and response deadline",
          done: false,
          priority: "High priority",
          time: "3 min",
        },
        {
          title: "Gather transaction evidence",
          detail:
            "Collect delivery, communication, invoice, or service records",
          done: false,
          priority: "Required",
          time: "10 min",
        },
        {
          title: "Submit a concise case response",
          detail: "Match each piece of evidence to the customer’s claim",
          done: false,
          priority: "Required",
          time: "10 min",
        },
        finalTask,
      ],
      requiredDocuments: [
        "Invoice or receipt",
        "Delivery or service proof",
        "Customer communication",
      ],
      documentGuidance:
        "Use dated records that directly connect the customer, payment, and delivered product or service.",
      estimatedResolution: "7–30 days, depending on the dispute channel",
      timeline: [
        {
          window: "NOW",
          title: "Check the response deadline",
          detail:
            "Missing the deadline can cause the case to close automatically.",
        },
        {
          window: "WITHIN 1–3 DAYS",
          title: "Submit supporting evidence",
          detail:
            "Provide relevant, readable, and transaction-specific records.",
        },
        {
          window: "7–30 DAYS",
          title: "Case decision",
          detail:
            "Bank-managed chargebacks may take longer than platform disputes.",
        },
      ],
      supportSummary:
        "A payment on my account is under dispute. I am reviewing the transaction and preparing records that show what was purchased, how it was delivered, and my communication with the customer.",
      supportQuestions: [
        "What is the exact deadline for my response?",
        "Which evidence types carry the most weight for this dispute reason?",
        "Is the restriction limited to the disputed amount?",
        "When should I expect a decision after submitting evidence?",
      ],
    }
  }

  if (
    includesAny("hold", "reserve", "pending payment", "payment unavailable")
  ) {
    return {
      notice,
      issueType: "Payment hold or reserve",
      issueTitle: "Temporary payment hold",
      severity: "Low",
      analysisConfidence: 91,
      resolutionConfidence: 88,
      explanation:
        "The platform has set aside a payment or part of your balance for a temporary review period. This is usually a transaction-level hold rather than a full account block.",
      impact:
        "The held amount cannot be withdrawn yet. Other available funds and account features may continue to work unless the notice lists additional restrictions.",
      reason:
        "Holds often happen with a new selling pattern, a larger-than-usual payment, delivery questions, or a newer account.",
      reassurance:
        "The held payment is still associated with your account. It is normally released after delivery is confirmed or the review period ends.",
      moneyStatus: "Held funds remain associated with your account",
      accessStatus: "The held amount is unavailable; other access may continue",
      durationStatus: "Temporary transaction review",
      accountHealth: "Good",
      tasks: [
        {
          title: "Open the held transaction",
          detail: "Check the release date and any action requested",
          done: false,
          priority: "High priority",
          time: "2 min",
        },
        {
          title: "Add delivery or service details",
          detail:
            "Provide tracking or confirmation that the order was fulfilled",
          done: false,
          priority: "Required",
          time: "5 min",
        },
        {
          title: "Confirm the buyer has no issue",
          detail: "Keep customer communication available if support asks",
          done: false,
          priority: "Check",
          time: "3 min",
        },
        finalTask,
      ],
      requiredDocuments: [
        "Tracking or delivery proof",
        "Invoice or order record",
        "Customer communication",
      ],
      documentGuidance:
        "Provide records tied to the held transaction, especially delivery tracking or proof that the service was completed.",
      estimatedResolution: "1–7 business days",
      timeline: [
        {
          window: "NOW",
          title: "Add transaction details",
          detail:
            "Submit tracking or service-completion information if requested.",
        },
        {
          window: "1–3 BUSINESS DAYS",
          title: "Automated or manual review",
          detail: "The platform checks the payment and delivery details.",
        },
        {
          window: "1–7 BUSINESS DAYS",
          title: "Funds typically released",
          detail: "Some holds follow the date shown in the original notice.",
        },
      ],
      supportSummary:
        "A payment is currently on hold or reserved. I have reviewed the transaction and can provide fulfillment records. I would like confirmation of the release criteria and expected availability date.",
      supportQuestions: [
        "What exact condition must be met for this payment to be released?",
        "Will tracking or service-completion evidence speed up the review?",
        "Does this hold affect any funds beyond the listed transaction?",
        "What is the current expected release date?",
      ],
    }
  }

  const isBusinessReview = includesAny(
    "business information",
    "tax information",
    "beneficial owner",
    "company details",
  )
  const isSecurityReview = includesAny(
    "suspicious",
    "unusual activity",
    "new device",
    "secure your account",
    "unauthorized",
  )

  if (isBusinessReview || isSecurityReview) {
    const security = isSecurityReview
    return {
      notice,
      issueType: security
        ? "Account security review"
        : "Business information review",
      issueTitle: security
        ? "Temporary security restriction"
        : "Business verification restriction",
      severity: security ? "Medium" : "Low",
      analysisConfidence: 90,
      resolutionConfidence: security ? 78 : 84,
      explanation: security
        ? "The platform detected activity it wants to verify before allowing normal account use. Some features are paused to prevent unauthorized access."
        : "The platform needs updated business or tax details before it can continue providing full account access.",
      impact: security
        ? "Sending or withdrawing may be paused while recent activity and account ownership are confirmed."
        : "Payments or withdrawals may be restricted until the requested company details are accepted.",
      reason: security
        ? "A new device, location, login pattern, or unusual transaction may have triggered an automated security review."
        : "Payment platforms periodically ask businesses to refresh company, ownership, and tax details.",
      reassurance: security
        ? "The restriction is designed to protect the account. Funds usually remain in place while ownership is confirmed."
        : "This is generally an information request, not a loss of funds or a permanent closure.",
      moneyStatus: security
        ? "Balance remains in the protected account"
        : "Funds remain associated with your account",
      accessStatus: security
        ? "Sensitive actions may be temporarily paused"
        : "Some payment features may be restricted",
      durationStatus: "Temporary pending successful review",
      accountHealth: security ? "Protected" : "Good",
      tasks: security
        ? [
            {
              title: "Secure your account",
              detail: "Change your password and review active sessions",
              done: false,
              priority: "High priority",
              time: "5 min",
            },
            {
              title: "Review recent activity",
              detail: "Flag any login or payment you do not recognize",
              done: false,
              priority: "Required",
              time: "5 min",
            },
            {
              title: "Confirm account ownership",
              detail: "Complete the security prompt using a trusted device",
              done: false,
              priority: "Required",
              time: "5 min",
            },
            finalTask,
          ]
        : [
            {
              title: "Review the requested business fields",
              detail:
                "Note every company, owner, or tax item marked incomplete",
              done: false,
              priority: "High priority",
              time: "3 min",
            },
            {
              title: "Upload current business evidence",
              detail: "Use documents that match the account name and address",
              done: false,
              priority: "Required",
              time: "8 min",
            },
            {
              title: "Confirm owner and tax details",
              detail: "Check names, dates, and registration numbers carefully",
              done: false,
              priority: "Required",
              time: "5 min",
            },
            finalTask,
          ],
      requiredDocuments: security
        ? ["Government ID", "Recent account activity", "Trusted device access"]
        : ["Business registration", "Tax document", "Owner or director ID"],
      documentGuidance: security
        ? "Use a valid photo ID and confirm recent activity only through the platform’s official security flow."
        : "Use current documents showing the registered business name, registration number, address, and business owners.",
      estimatedResolution: security ? "1–5 business days" : "2–7 business days",
      timeline: [
        {
          window: "NOW",
          title: security
            ? "Secure and review the account"
            : "Gather current business records",
          detail: security
            ? "Use a trusted device and flag unrecognized activity."
            : "Make sure all names and registration details match.",
        },
        {
          window: "WITHIN 1 DAY",
          title: "Submit the requested information",
          detail:
            "Clear, complete details reduce the chance of another request.",
        },
        {
          window: security ? "1–5 BUSINESS DAYS" : "2–7 BUSINESS DAYS",
          title: "Platform review",
          detail:
            "Access is typically restored after the information is accepted.",
        },
      ],
      supportSummary: security
        ? "My account has a temporary security restriction after activity was flagged for review. I am securing the account, checking recent activity, and completing the ownership confirmation requested."
        : "My account is restricted while updated business information is reviewed. I am preparing current registration, tax, and ownership details that match the account.",
      supportQuestions: security
        ? [
            "Which activity triggered this security review?",
            "Are there any transactions I should specifically confirm or report?",
            "Which account features remain available during the review?",
            "How long should access restoration take after verification?",
          ]
        : [
            "Which business information is currently missing or outdated?",
            "Which documents are accepted for each requested field?",
            "Do all beneficial owners need to complete verification?",
            "What is the expected review time after submission?",
          ],
    }
  }

  const requestedDocuments = [
    includesAny("photo id", "government id", "passport", "driver's license")
      ? "Government-issued ID"
      : null,
    includesAny(
      "proof of address",
      "utility bill",
      "bank statement",
      "address document",
    )
      ? "Proof of address"
      : null,
    includesAny("bank account", "bank details", "bank verification")
      ? "Bank account confirmation"
      : null,
    includesAny("tax id", "tax document", "tax information")
      ? "Tax information"
      : null,
    includesAny("invoice", "receipt") ? "Invoice or receipt" : null,
  ].filter((document): document is string => Boolean(document))
  const restrictions = [
    includesAny("can't withdraw", "cannot withdraw", "withdrawal disabled")
      ? "withdrawals"
      : null,
    includesAny("can't send", "cannot send", "sending disabled")
      ? "sending payments"
      : null,
    includesAny("can't receive", "cannot receive", "receiving disabled")
      ? "receiving payments"
      : null,
    includesAny("can't log in", "cannot log in", "login blocked")
      ? "signing in"
      : null,
    includesAny("card disabled", "card suspended") ? "card use" : null,
  ].filter((restriction): restriction is string => Boolean(restriction))
  const identityRelated = includesAny(
    "identity",
    "verify your identity",
    "confirm your identity",
    "photo id",
    "passport",
  )
  const withdrawalRelated = includesAny(
    "withdraw",
    "bank account",
    "payout",
    "transfer",
  )
  const issueType = identityRelated
    ? "Identity verification review"
    : withdrawalRelated
      ? "Withdrawal or payout restriction"
      : includesAny("document", "information", "details", "confirm", "verify")
        ? "Information request"
        : "Account access review"
  const temporary = includesAny(
    "temporary",
    "temporarily",
    "until",
    "while we review",
    "pending",
  )
  const statedTime = notice.match(
    /\b\d+\s*(?:–|-|to)?\s*\d*\s*(?:business\s*)?(?:hours?|days?|weeks?)\b/i,
  )?.[0]
  const estimatedResolution = statedTime
    ? `About ${statedTime}, based on the notice`
    : temporary
      ? "1–5 business days after the requested action"
      : "Timing not stated — ask support for an estimate"
  const documentList =
    requestedDocuments.length > 0
      ? requestedDocuments
      : ["No specific document named in the notice"]
  const firstAction =
    requestedDocuments.length > 0
      ? `Prepare ${requestedDocuments[0]}`
      : "Review the notice for its exact request"
  const accessStatus =
    restrictions.length > 0
      ? `${restrictions.join(", ")} ${
          restrictions.length === 1 ? "is" : "are"
        } restricted`
      : "The notice does not name a specific blocked feature"
  const moneyStatus = includesAny(
    "funds held",
    "balance held",
    "money held",
    "funds unavailable",
  )
    ? "Funds appear to be held, not removed from the account"
    : "No wording suggests that funds have left the account"
  const signalCount =
    requestedDocuments.length +
    restrictions.length +
    Number(identityRelated) +
    Number(withdrawalRelated) +
    Number(temporary) +
    Number(Boolean(statedTime))
  const analysisConfidence = Math.min(94, 68 + signalCount * 4)
  const resolutionConfidence = temporary
    ? requestedDocuments.length > 0
      ? 84
      : 76
    : 64
  const noticeExcerpt =
    notice.length > 180 ? `${notice.slice(0, 177)}...` : notice

  return {
    notice,
    issueType,
    issueTitle: temporary ? `Temporary ${issueType}` : issueType,
    severity: restrictions.length > 1 ? "Medium" : "Low",
    analysisConfidence,
    resolutionConfidence,
    explanation: `This notice is about ${issueType.toLowerCase()}. ${
      temporary
        ? "Its wording points to a review that should end after the requested step is completed."
        : "It does not clearly say how long the review will last."
    }`,
    impact:
      restrictions.length > 0
        ? `The notice specifically affects ${restrictions.join(" and ")}. It does not say that every account feature is unavailable.`
        : "The notice does not clearly identify which account features are affected, so that is worth confirming.",
    reason: identityRelated
      ? "The account information or identity details need to be confirmed before normal access can continue."
      : withdrawalRelated
        ? "The platform needs to review payout or bank information before allowing money to move."
        : "The notice asks for an account review or more information, but it does not give a more specific reason.",
    reassurance: `${moneyStatus}. ${
      temporary
        ? "The wording suggests a temporary review."
        : "The notice does not say that the balance is gone."
    }`,
    moneyStatus,
    accessStatus,
    durationStatus: temporary
      ? "Likely temporary based on the notice wording"
      : "Not stated as permanent or temporary",
    accountHealth:
      restrictions.length > 1 ? "Needs attention" : "Review needed",
    tasks: [
      {
        title: firstAction,
        detail:
          requestedDocuments.length > 0
            ? `Use the exact item named in the notice: ${requestedDocuments.join(", ")}`
            : "Identify the requested action, deadline, and affected feature",
        done: false,
        priority: "High priority",
        time: "3 min",
      },
      {
        title: "Confirm the affected account features",
        detail: accessStatus,
        done: false,
        priority: "Check",
        time: "2 min",
      },
      {
        title: "Complete the requested account step",
        detail: "Use only the official account page linked from the platform",
        done: false,
        priority: "Required",
        time: "5 min",
      },
      finalTask,
    ],
    requiredDocuments: documentList,
    documentGuidance:
      requestedDocuments.length > 0
        ? `The notice appears to request ${requestedDocuments.join(" and ")}. Use a clear, current copy that matches your account details.`
        : "No document is clearly requested in this notice. Check the official account page before uploading anything.",
    estimatedResolution,
    timeline: [
      {
        window: "NOW",
        title: firstAction,
        detail: "Follow only the request shown in your official account.",
      },
      {
        window: temporary ? "AFTER SUBMISSION" : "NEXT",
        title: "Account review",
        detail: "Watch for a confirmation or another specific request.",
      },
      {
        window: statedTime?.toUpperCase() ?? "TIMING NOT STATED",
        title: "Status update",
        detail: statedTime
          ? "The notice provides this review window."
          : "Ask support for a clear review estimate if no timing appears.",
      },
    ],
    supportSummary: `I received this account notice: “${noticeExcerpt}” I understand it as a ${issueType.toLowerCase()} affecting ${
      restrictions.length > 0 ? restrictions.join(" and ") : "account access"
    }, and I would like to confirm the exact action and review timing.`,
    supportQuestions: [
      `Can you confirm that this is a ${issueType.toLowerCase()}?`,
      restrictions.length > 0
        ? `Are any features restricted beyond ${restrictions.join(" and ")}?`
        : "Which account features are currently restricted?",
      requestedDocuments.length > 0
        ? `Is ${requestedDocuments.join(" or ")} all that I need to provide?`
        : "Do I need to provide a document or complete another action?",
      statedTime
        ? `Should I expect the review to finish within ${statedTime}?`
        : "What is the expected resolution time after I complete the request?",
    ],
  }
}
function mapAiToAnalysis(
  notice: string,
  ai: Awaited<ReturnType<typeof analyzeAccountNotice>>,
  base: NoticeAnalysis,
): NoticeAnalysis {
  const level = (ai.concernLevel ?? "").toLowerCase()
  const severity: NoticeAnalysis["severity"] = level.includes("high")
    ? "High"
    : level.includes("medium") || level.includes("moderate")
      ? "Medium"
      : "Low"

  const tasks: ResolutionTask[] = (ai.tasks ?? []).slice(0, 5).map((t, i) => ({
    title: t.title,
    detail: t.detail,
    done: false,
    priority: i === 0 ? "High priority" : "Required",
    time: t.timeframe,
  }))

  return {
    ...base,
    notice,
    severity,
    explanation: ai.summary || base.explanation,
    reassurance: ai.moneySafety || base.reassurance,
    moneyStatus: ai.moneySafety || base.moneyStatus,
    accessStatus: ai.accessStatus || base.accessStatus,
    tasks: tasks.length >= 2 ? tasks : base.tasks,
  }
}

function Landing({ start }: { start: () => void }) {
  return (
    <div className="landing">
      <header className="marketing-nav wrap">
        <Logo />
        <nav>
          <a href="#how">How it works</a>
          <a href="#clarity">What you’ll learn</a>
          <a href="#security">Security</a>
        </nav>
        <div className="nav-buttons">
          <Button variant="quiet" onClick={start}>
            Sign in
          </Button>
          <Button onClick={start}>
            Explain my situation <Icon name="arrow" size={15} />
          </Button>
        </div>
      </header>

      <main>
        <section className="hero wrap">
          <div className="hero-content">
            <div className="pill">
              <span className="live-dot" /> Calm, clear help for payment account
              issues
            </div>
            <h1>
              Is your money safe?
              <br />
              <span>Get a clear answer.</span>
            </h1>
            <p>
              Resolution Copilot turns financial uncertainty into calm,
              personalized guidance—starting with what matters most: your money.
            </p>
            <div className="hero-buttons">
              <Button onClick={start}>
                Understand my account issue <Icon name="arrow" />
              </Button>
              <a href="#how">
                <span className="play">
                  <Icon name="chevron" size={14} />
                </span>{" "}
                See how it works
              </a>
            </div>
            <div className="trust-note">
              <Icon name="shield" size={15} /> Your information stays private
              and secure <span>•</span> No platform login required
            </div>
          </div>
          <div className="hero-product">
            <div className="calm-glow" />
            <div className="alert-card floating">
              <div className="platform-mark">P</div>
              <div>
                <small>ACCOUNT NOTIFICATION</small>
                <strong>Your account has been temporarily limited</strong>
                <p>
                  Some account features are unavailable while we review your
                  information.
                </p>
              </div>
              <span className="status-badge amber">
                <i /> Action needed
              </span>
            </div>
            <div className="connector">
              <span>
                <Icon name="sparkles" size={14} /> AI analysis
              </span>
            </div>
            <div className="answer-card floating">
              <div className="answer-head">
                <span className="copilot-icon">
                  <Icon name="sparkles" />
                </span>
                <div>
                  <small>RESOLUTION COPILOT</small>
                  <strong>Here’s what this really means</strong>
                </div>
              </div>
              <div className="reassurance">
                <Icon name="shield" />
                <p>
                  <strong>Your money is safe.</strong>
                  <br />
                  This is a temporary review, not a permanent block.
                </p>
              </div>
              <div className="mini-facts">
                <span>
                  <small>STATUS</small>
                  <strong>Temporary</strong>
                </span>
                <span>
                  <small>EST. TIME</small>
                  <strong>2–3 days</strong>
                </span>
              </div>
              <div className="mini-progress">
                <span>
                  <strong>Resolution progress</strong>
                  <b>2 of 3 steps</b>
                </span>
                <i>
                  <b />
                </i>
              </div>
            </div>
          </div>
        </section>

        <section className="proof">
          <div className="wrap proof-inner">
            <p>Built to bring clarity across the payment platforms you use</p>
            <div>
              <span>PayPal</span>
              <span>Stripe</span>
              <span>Wise</span>
              <span>Payoneer</span>
              <span>Square</span>
            </div>
          </div>
        </section>

        <section className="clarity wrap" id="clarity">
          <div className="section-label">FROM CONFUSION TO CLARITY</div>
          <div className="section-heading">
            <h2>
              Know exactly what’s happening.
              <br />
              And what to do next.
            </h2>
            <p>
              No jargon, no worst-case guessing. Just calm guidance built around
              your exact situation.
            </p>
          </div>
          <div className="benefit-grid">
            {[
              {
                icon: "shield",
                title: "Know your money is safe",
                text: "See whether funds are accessible, held temporarily, or require action before release.",
                tone: "green",
              },
              {
                icon: "message",
                title: "Plain-language explanation",
                text: "Understand what the notice means for you, without technical or legal language.",
                tone: "blue",
              },
              {
                icon: "clipboard",
                title: "A clear action plan",
                text: "Get a prioritized checklist based on your account, documents, and issue type.",
                tone: "violet",
              },
              {
                icon: "time",
                title: "Realistic expectations",
                text: "Understand if an issue is temporary and how long resolution may reasonably take.",
                tone: "orange",
              },
            ].map((item) => (
              <article className="benefit-card" key={item.title}>
                <span className={`benefit-icon ${item.tone}`}>
                  <Icon name={item.icon as IconName} />
                </span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span className="included-label">
                  <Icon name="check" size={14} /> Included in your AI
                  explanation
                </span>
              </article>
            ))}
          </div>
        </section>

        <section className="process" id="how">
          <div className="wrap">
            <div className="section-label">A CALMER WAY FORWARD</div>
            <h2>Three steps to clarity.</h2>
            <div className="steps">
              {[
                [
                  "01",
                  "Share the message",
                  "Paste the account notice or describe what you see. No login details needed.",
                  "document",
                ],
                [
                  "02",
                  "Check your money safety",
                  "See whether funds are safe, what access is limited, and how concerned to be.",
                  "sparkles",
                ],
                [
                  "03",
                  "Follow your resolution plan",
                  "Work through prioritized steps and prepare a stronger support request.",
                  "check",
                ],
              ].map((step) => (
                <article key={step[0]}>
                  <div className="step-number">{step[0]}</div>
                  <span className="step-icon">
                    <Icon name={step[3] as IconName} />
                  </span>
                  <h3>{step[1]}</h3>
                  <p>{step[2]}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="security wrap" id="security">
          <div className="security-icon">
            <Icon name="lock" size={28} />
          </div>
          <div>
            <span>PRIVACY BY DESIGN</span>
            <h2>Your account stays yours.</h2>
            <p>
              Resolution Copilot never asks for passwords or payment platform
              credentials. Share only the alert text you want explained.
            </p>
          </div>
          <div className="security-points">
            <span>
              <Icon name="check" /> Encrypted in transit
            </span>
            <span>
              <Icon name="check" /> No credential access
            </span>
            <span>
              <Icon name="check" /> You control your data
            </span>
          </div>
        </section>

        <section className="final-cta wrap">
          <span className="copilot-icon light">
            <Icon name="sparkles" />
          </span>
          <h2>Clarity starts with one message.</h2>
          <p>Turn uncertainty into a clear, confident next step.</p>
          <Button onClick={start}>
            Explain my situation <Icon name="arrow" />
          </Button>
        </section>
      </main>
      <footer className="wrap">
        <Logo />
        <p>Independent guidance for payment account issues.</p>
        <div>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Help</a>
        </div>
      </footer>
    </div>
  )
}

const nav = [
  { id: "issue", label: "Account issue", icon: "warning" as IconName },
  { id: "explanation", label: "Money safety", icon: "shield" as IconName },
  { id: "dashboard", label: "Resolution plan", icon: "clipboard" as IconName },
  { id: "support", label: "Support summary", icon: "message" as IconName },
]

function Sidebar({
  page,
  navigate,
  open,
  close,
  exit,
  openChat,
  analysis,
}: {
  page: string
  navigate: (p: string) => void
  open: boolean
  close: () => void
  exit: () => void
  openChat: () => void
  analysis: NoticeAnalysis | null
}) {
  const hasAnalysis = Boolean(analysis)
  return (
    <>
      {open && (
        <button
          className="nav-scrim"
          aria-label="Close navigation"
          onClick={close}
        />
      )}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        <button className="logo-button" onClick={exit}>
          <Logo />
        </button>
        <div className="case-card">
          <span className="platform-mark">P</span>
          <div>
            <small>ACTIVE CASE</small>
            <strong>{analysis?.issueTitle ?? "Payment account review"}</strong>
            <span>
              <i /> In progress
            </span>
          </div>
          <Icon name="chevron" size={15} />
        </div>
        <nav className="side-nav">
          <span>YOUR RESOLUTION</span>
          {nav.map((item, index) => (
            <button
              key={item.id}
              className={page === item.id ? "active" : ""}
              disabled={index > 0 && !hasAnalysis}
              onClick={() => {
                navigate(item.id)
                close()
              }}
            >
              <span className="nav-icon">
                <Icon name={item.icon} />
              </span>
              <span>
                {item.label}
                <small>
                  {index === 0
                    ? hasAnalysis
                      ? "Notice analyzed"
                      : "Add your notice"
                    : index === 1
                      ? analysis
                        ? `${analysis.resolutionConfidence}% confidence`
                        : "Complete account issue"
                      : index === 2
                        ? analysis
                          ? `${analysis.tasks.length} personalized steps`
                          : "Complete account issue"
                        : analysis
                          ? analysis.issueType
                          : "Complete account issue"}
                </small>
              </span>
              {hasAnalysis && index < 2 && (
                <i className="nav-check">
                  <Icon name="check" size={11} />
                </i>
              )}
            </button>
          ))}
        </nav>
        <div className="sidebar-help">
          <span>
            <Icon name="heart" size={16} />
          </span>
          <strong>Need a little reassurance?</strong>
          <p>Ask the Copilot anything about your account situation.</p>
          <button
            disabled={!hasAnalysis}
            onClick={() => {
              close()
              openChat()
            }}
          >
            {hasAnalysis ? "Talk to Copilot" : "Analyze a notice first"}
          </button>
        </div>
        <div className="profile">
          <span>AM</span>
          <div>
            <strong>Alex Morgan</strong>
            <small>alex@email.com</small>
          </div>
          <button>
            <Icon name="chevron" size={14} />
          </button>
        </div>
      </aside>
    </>
  )
}

function AppHeader({
  title,
  subtitle,
  menu,
}: {
  title: string
  subtitle: string
  menu: () => void
}) {
  return (
    <header className="app-header">
      <button className="menu-button" onClick={menu}>
        <Icon name="menu" />
      </button>
      <div>
        <small>{subtitle}</small>
        <h1>{title}</h1>
      </div>
      <div className="header-actions">
        <button disabled aria-label="Search unavailable">
          <Icon name="search" />
        </button>
        <button
          className="notice"
          disabled
          aria-label="Notifications unavailable"
        >
          <Icon name="bell" />
        </button>
        <span aria-hidden="true">AM</span>
      </div>
    </header>
  )
}

function IssueScreen({
  next,
  menu,
  notice,
}: {
  next: (notice: string) => void
  menu: () => void
  notice: string
}) {
  const [text, setText] = useState(notice)
  return (
    <>
      <AppHeader title="Account issue" subtitle="YOUR RESOLUTION" menu={menu} />
      <div className="app-content issue-page">
        <div className="page-heading">
          <div>
            <span className="page-kicker">STEP 1 OF 4</span>
            <h2>Let’s check what this means for your money.</h2>
            <p>
              Paste the exact message you received. We’ll start by assessing
              your funds, access, and appropriate level of concern.
            </p>
          </div>
          <span className="privacy-chip">
            <Icon name="lock" size={13} /> Private & secure
          </span>
        </div>
        <div className="issue-layout">
          <section className="panel issue-form">
            <label>
              PAYMENT PLATFORM
              <div className="fake-select">
                <span className="platform-mark">P</span>
                <strong>PayPal</strong>
                <Icon name="chevron" size={15} />
              </div>
            </label>
            <label>
              ACCOUNT MESSAGE OR ALERT
              <textarea
                rows={8}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste the exact account notice here..."
              />
              <small>{text.length} characters</small>
            </label>
            <div className="upload-box">
              <span>
                <Icon name="upload" />
              </span>
              <div>
                <strong>Or upload a screenshot</strong>
                <p>PNG, JPG, or PDF up to 10MB</p>
              </div>
              <Button
                variant="secondary"
                disabled
                className="h-10! rounded-[12px]! border-[#c5ddd6]! bg-[#f0f8f5]! px-4! text-[13px]! font-medium! text-[#176f5b]! shadow-none! transition-all! duration-200! hover:border-[#9fc8bc]! hover:bg-[#e3f2ed]! hover:text-[#0f604f]! hover:shadow-[0_4px_12px_rgba(19,123,102,0.12)]! focus-visible:outline-none! focus-visible:ring-2! focus-visible:ring-[#168068]! focus-visible:ring-offset-2! active:translate-y-px!"
              >
                <Icon name="upload" size={16} />
                Screenshot upload (coming soon)
              </Button>
            </div>
            <div className="form-actions">
              <span>
                <Icon name="shield" size={15} /> Don’t include passwords, card
                numbers, or login details.
              </span>
              <Button
                disabled={!text.trim()}
                onClick={() => text.trim() && next(text)}
              >
                <Icon name="sparkles" /> Explain my situation
              </Button>
            </div>
          </section>
          <aside className="panel expectation-card">
            <span className="copilot-icon">
              <Icon name="sparkles" />
            </span>
            <h3>What you’ll get</h3>
            <p>A calm money-safety assessment in about 30 seconds.</p>
            {[
              ["Money safety", "Whether your funds are likely safe"],
              ["Access status", "Restricted access or actual risk"],
              ["Concern level", "How much attention this needs"],
              ["First action", "The one thing to do next"],
            ].map((row, i) => (
              <div className="expectation-row" key={row[0]}>
                <span>{i + 1}</span>
                <div>
                  <strong>{row[0]}</strong>
                  <small>{row[1]}</small>
                </div>
              </div>
            ))}
            <div className="calm-note">
              <Icon name="heart" size={16} />
              <p>
                Most account limitations are temporary and resolved after
                verification.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

function ExplanationScreen({
  next,
  menu,
  analysis,
}: {
  next: () => void
  menu: () => void
  analysis: NoticeAnalysis
}) {
  const safetyHeadline =
    analysis.severity === "High"
      ? "Your money has not disappeared, but access needs attention."
      : analysis.severity === "Medium"
        ? "Your money is likely safe, with some access temporarily limited."
        : "Your money is likely safe."
  const concernGuidance =
    analysis.severity === "High"
      ? "Stay calm, but act today"
      : analysis.severity === "Medium"
        ? "Pay attention and follow the next steps"
        : "Low concern — a routine action is usually enough"
  const concernLabel =
    analysis.severity === "High"
      ? "Prompt attention recommended"
      : analysis.severity === "Medium"
        ? "Some attention needed"
        : "Low concern"
  const confidenceLabel =
    analysis.resolutionConfidence >= 85
      ? "Strong path to resolution"
      : analysis.resolutionConfidence >= 65
        ? "Good path with timely action"
        : "Support guidance recommended"

  return (
    <>
      <AppHeader
        title="Money safety assessment"
        subtitle="YOUR ANSWER"
        menu={menu}
      />
      <div className="app-content explanation-page">
        <section className="money-safety-hero">
          <div className="safety-verdict">
            <span className="safety-shield">
              <Icon name="shield" size={28} />
            </span>
            <div>
              <span>MONEY SAFETY ASSESSMENT</span>
              <h1>{safetyHeadline}</h1>
              <p>{analysis.reassurance}</p>
            </div>
          </div>
          <div
            className={`concern-chip concern-${analysis.severity.toLowerCase()}`}
          >
            <i />
            {concernLabel}
          </div>
        </section>

        <div className="explanation-sections">
          <section className="panel safety-assessment-card">
            <div className="explanation-section-head">
              <span className="section-number">01</span>
              <div>
                <span className="section-label">MONEY SAFETY ASSESSMENT</span>
                <h2>The five things you need to know first</h2>
              </div>
              <span className="soft-icon green-bg">
                <Icon name="shield" />
              </span>
            </div>
            <div className="safety-answers">
              <div className="safety-answer featured">
                <span>
                  <Icon name="shield" size={18} />
                </span>
                <div>
                  <small>ARE MY FUNDS LIKELY SAFE?</small>
                  <strong>{analysis.moneyStatus}</strong>
                  <p>{analysis.reassurance}</p>
                </div>
              </div>
              {[
                [
                  "TEMPORARY OR PERMANENT?",
                  analysis.durationStatus,
                  "time" as IconName,
                ],
                [
                  "ACCESS RESTRICTED OR FUNDS AT RISK?",
                  analysis.accessStatus,
                  "lock" as IconName,
                ],
                [
                  "HOW CONCERNED SHOULD I BE?",
                  concernGuidance,
                  "heart" as IconName,
                ],
                [
                  "WHAT SHOULD I DO FIRST?",
                  analysis.tasks[0].title,
                  "arrow" as IconName,
                ],
              ].map((item) => (
                <div className="safety-answer" key={item[0]}>
                  <span>
                    <Icon name={item[2] as IconName} size={17} />
                  </span>
                  <div>
                    <small>{item[0]}</small>
                    <strong>{item[1]}</strong>
                  </div>
                </div>
              ))}
            </div>
            <div className="control-note">
              <Icon name="heart" size={16} />
              <p>
                <strong>You have a clear next step.</strong> You do not need to
                solve everything at once. Start with{" "}
                {analysis.tasks[0].title.toLowerCase()}.
              </p>
            </div>
          </section>

          <section className="panel explanation-section plain-explanation">
            <div className="explanation-section-head">
              <span className="section-number">02</span>
              <div>
                <span className="section-label">
                  PLAIN-LANGUAGE EXPLANATION
                </span>
                <h2>{analysis.issueType}</h2>
              </div>
              <span className="soft-icon">
                <Icon name="message" />
              </span>
            </div>
            <div className="explanation-copy-grid">
              <div>
                <h3>What’s happening?</h3>
                <p>{analysis.explanation}</p>
                <p>
                  <strong>How this affects you: </strong>
                  {analysis.impact}
                </p>
              </div>
              <div className="why-explanation">
                <h3>Why might this happen?</h3>
                <p>{analysis.reason}</p>
                <span>
                  <Icon name="info" size={15} /> Based on the wording in your
                  notice
                </span>
              </div>
            </div>
            <div className="original-message">
              <span>ORIGINAL MESSAGE</span>
              <p>“{analysis.notice}”</p>
              <button>
                View full message <Icon name="chevron" size={13} />
              </button>
            </div>
          </section>

          <section className="panel confidence-section">
            <div
              className="confidence-ring"
              style={
                {
                  "--confidence": `${analysis.resolutionConfidence * 3.6}deg`,
                } as React.CSSProperties
              }
            >
              <div>
                <strong>{analysis.resolutionConfidence}</strong>
                <small>%</small>
              </div>
            </div>
            <div className="confidence-copy">
              <span className="section-label">03 · RESOLUTION CONFIDENCE</span>
              <h2>{confidenceLabel}</h2>
              <p>
                This score reflects the issue type, likely review path, and
                whether there is a clear action you can take. Completing the
                checklist can improve your readiness.
              </p>
              <div>
                <span>
                  <Icon name="check" size={14} /> Clear first action
                </span>
                <span>
                  <Icon name="time" size={14} /> {analysis.estimatedResolution}
                </span>
                <span>
                  <Icon name="sparkles" size={14} />{" "}
                  {analysis.analysisConfidence}% notice match
                </span>
              </div>
            </div>
          </section>

          <section className="panel explanation-section action-plan-preview">
            <div className="explanation-section-head">
              <span className="section-number">04</span>
              <div>
                <span className="section-label">REQUIRED ACTIONS</span>
                <h2>Your calm, focused next steps</h2>
              </div>
              <span className="soft-icon violet-bg">
                <Icon name="clipboard" />
              </span>
            </div>
            <div className="action-preview-grid">
              <div className="priority-steps">
                <span className="subsection-label">PRIORITIZED NEXT STEPS</span>
                {analysis.tasks.slice(0, 3).map((step, index) => (
                  <div className="preview-step" key={step.title}>
                    <span>{index + 1}</span>
                    <div>
                      <strong>{step.title}</strong>
                      <small>{step.detail}</small>
                    </div>
                    <b>{step.priority.toUpperCase()}</b>
                  </div>
                ))}
              </div>
              <aside className="requirements-box">
                <span className="subsection-label">REQUIRED INFORMATION</span>
                <h3>{analysis.requiredDocuments[0]}</h3>
                <p>{analysis.documentGuidance}</p>
                <span className="subsection-label">LIKELY DOCUMENTS</span>
                <div>
                  {analysis.requiredDocuments.map((document) => (
                    <span key={document}>
                      <Icon name="check" size={13} /> {document}
                    </span>
                  ))}
                </div>
              </aside>
            </div>
          </section>

          <section className="panel explanation-section expectations-section">
            <div className="explanation-section-head">
              <div>
                <span className="section-label">WHAT TO EXPECT</span>
                <h2>A realistic path from here</h2>
              </div>
              <span className="soft-icon amber-bg">
                <Icon name="time" />
              </span>
            </div>
            <div className="expectation-timeline">
              {analysis.timeline.map((step, index) => (
                <div className="timeline-group" key={step.title}>
                  {index > 0 && <div className="timeline-line" />}
                  <div
                    className={`timeline-item ${index === 0 ? "complete" : ""}`}
                  >
                    <span>
                      {index === 0 ? <Icon name="check" size={14} /> : index}
                    </span>
                    <div>
                      <small>{step.window}</small>
                      <strong>{step.title}</strong>
                      <p>{step.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="expectation-note">
              <Icon name="info" size={16} />
              <p>
                <strong>This is an estimate, not a guarantee.</strong> The
                platform’s final timing depends on its review queue and whether
                it requests more information.
              </p>
            </div>
          </section>
        </div>
        <div className="next-bar">
          <div>
            <span>05 · RESOLUTION CHECKLIST</span>
            <strong>
              Take it one step at a time. We’ll keep your plan organized.
            </strong>
          </div>
          <Button onClick={next}>
            Open my checklist <Icon name="arrow" />
          </Button>
        </div>
      </div>
    </>
  )
}

function Dashboard({
  support,
  menu,
  analysis,
}: {
  support: () => void
  menu: () => void
  analysis: NoticeAnalysis
}) {
  const [tasks, setTasks] = useState(analysis.tasks)
  const done = tasks.filter((t) => t.done).length
  const toggle = (index: number) =>
    setTasks((all) =>
      all.map((task, i) =>
        i === index ? { ...task, done: !task.done } : task,
      ),
    )
  const progress = Math.round((done / tasks.length) * 100)
  const confidence = Math.min(
    98,
    Math.round(analysis.resolutionConfidence + progress * 0.12),
  )
  const topTask = tasks.find((task) => !task.done) ?? tasks[tasks.length - 1]
  return (
    <>
      <AppHeader
        title="Resolution plan"
        subtitle="YOUR DASHBOARD"
        menu={menu}
      />
      <div className="app-content">
        <div className="page-heading dashboard-heading">
          <div>
            <span className="page-kicker">GOOD MORNING, ALEX</span>
            <h2>{analysis.issueTitle}</h2>
            <p>
              Complete {tasks.length - done} remaining{" "}
              {tasks.length - done === 1 ? "step" : "steps"} for the strongest
              resolution path.
            </p>
          </div>
          <Button variant="secondary">
            <Icon name="refresh" size={15} /> Refresh status
          </Button>
        </div>
        <div className="health-grid">
          <section className="panel resolution-score">
            <div
              className="score-ring"
              style={
                {
                  "--progress": `${confidence * 3.6}deg`,
                } as React.CSSProperties
              }
            >
              <div>
                <strong>{confidence}</strong>
                <small>%</small>
              </div>
            </div>
            <div>
              <span>RESOLUTION CONFIDENCE</span>
              <h3>
                {confidence >= 85
                  ? "You’re almost there"
                  : confidence >= 65
                    ? "A clear path forward"
                    : "Support review recommended"}
              </h3>
              <p>
                Based on this {analysis.severity.toLowerCase()}-severity issue
                and your completed steps.
              </p>
            </div>
            <span
              className={`status-badge ${
                confidence >= 65 ? "success" : "amber"
              }`}
            >
              <i />{" "}
              {confidence >= 85
                ? "High"
                : confidence >= 65
                  ? "Moderate"
                  : "Cautious"}{" "}
              confidence
            </span>
          </section>
          <section className="panel health-summary">
            <div className="metric">
              <span className="soft-icon green-bg">
                <Icon name="shield" />
              </span>
              <span>
                <small>ACCOUNT HEALTH</small>
                <strong>{analysis.accountHealth}</strong>
              </span>
            </div>
            <div className="metric">
              <span className="soft-icon amber-bg">
                <Icon name="document" />
              </span>
              <span>
                <small>MISSING ITEMS</small>
                <strong>{tasks.length - done} requirements</strong>
              </span>
            </div>
            <div className="metric">
              <span className="soft-icon blue-bg">
                <Icon name="time" />
              </span>
              <span>
                <small>EST. RESOLUTION</small>
                <strong>{analysis.estimatedResolution}</strong>
              </span>
            </div>
          </section>
        </div>
        <div className="dashboard-layout">
          <section className="panel checklist">
            <div className="panel-title">
              <div>
                <span className="section-label">YOUR NEXT STEPS</span>
                <h3>Resolution checklist</h3>
                <p>Complete these actions in order for the fastest result.</p>
              </div>
              <span className="progress-text">
                {done} OF {tasks.length} COMPLETE
              </span>
            </div>
            <div className="check-progress">
              <i style={{ width: `${progress}%` }} />
            </div>
            <div className="task-list">
              {tasks.map((task, index) => (
                <button
                  className={`task ${task.done ? "done" : ""}`}
                  key={task.title}
                  onClick={() => toggle(index)}
                >
                  <span className="task-check">
                    {task.done && <Icon name="check" size={15} />}
                  </span>
                  <span>
                    <strong>{task.title}</strong>
                    <small>{task.detail}</small>
                  </span>
                  <span
                    className={`task-priority ${
                      task.done ? "complete" : index === done ? "high" : ""
                    }`}
                  >
                    {task.priority}
                  </span>
                  <small>
                    <Icon name="time" size={12} /> {task.time}
                  </small>
                  <Icon name="chevron" size={15} />
                </button>
              ))}
            </div>
            <div className="checklist-foot">
              <span>
                <Icon name="info" size={15} /> Complete high-priority items
                first to avoid delays.
              </span>
              <Button
                onClick={() =>
                  toggle(done < tasks.length ? done : tasks.length - 1)
                }
              >
                Continue resolution <Icon name="arrow" />
              </Button>
            </div>
          </section>
          <aside>
            <section className="panel priority-card">
              <div className="priority-head">
                <span className="soft-icon amber-bg">
                  <Icon name="warning" />
                </span>
                <span>
                  <small>TOP PRIORITY</small>
                  <strong>{topTask.title}</strong>
                </span>
              </div>
              <p>
                {topTask.detail}. {analysis.documentGuidance}
              </p>
              <div className="accepted">
                <span>RELEVANT DOCUMENTS</span>
                {analysis.requiredDocuments.map((document) => (
                  <small key={document}>
                    <Icon name="check" /> {document}
                  </small>
                ))}
              </div>
              <Button className="full-width">
                <Icon name="upload" /> Upload document
              </Button>
            </section>
            <section className="panel help-card">
              <span className="copilot-icon">
                <Icon name="sparkles" />
              </span>
              <div>
                <strong>Unsure about a step?</strong>
                <p>Ask Copilot before you submit.</p>
              </div>
              <button>
                Ask a question <Icon name="arrow" size={14} />
              </button>
            </section>
          </aside>
        </div>
        <section className="support-prompt">
          <span className="soft-icon blue-bg">
            <Icon name="message" />
          </span>
          <div>
            <span>06 · SUPPORT SUMMARY</span>
            <strong>We’ve prepared a clear summary of your situation.</strong>
            <p>Send the right context and questions the first time.</p>
          </div>
          <Button variant="secondary" onClick={support}>
            Review support summary <Icon name="arrow" size={15} />
          </Button>
        </section>
      </div>
    </>
  )
}

function SupportSummary({
  menu,
  analysis,
}: {
  menu: () => void
  analysis: NoticeAnalysis
}) {
  const [copied, setCopied] = useState(false)
  const [sent, setSent] = useState(false)
  const preparedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date())
  const summaryText = `${analysis.issueTitle}

Issue summary:
${analysis.supportSummary}

Original notice:
${analysis.notice}

Recommended next steps:
${analysis.tasks.map((task, index) => `${index + 1}. ${task.title} — ${task.detail}`).join("\n")}

Likely documents:
${analysis.requiredDocuments.map((document) => `- ${document}`).join("\n")}

Questions for support:
${analysis.supportQuestions.map((question, index) => `${index + 1}. ${question}`).join("\n")}

Estimated resolution: ${analysis.estimatedResolution}`
  return (
    <>
      <AppHeader
        title="Support summary"
        subtitle="READY TO REVIEW"
        menu={menu}
      />
      <div className="app-content support-page">
        <div className="page-heading">
          <div>
            <span className="page-kicker">PREPARED FOR YOU</span>
            <h2>Contact support with confidence.</h2>
            <p>
              We’ve organized the important details so you can get a useful
              answer faster.
            </p>
          </div>
          <span className="ready-chip">
            <Icon name="check" size={14} /> Ready to send
          </span>
        </div>
        <div className="support-layout">
          <section className="support-document">
            <div className="document-head">
              <div>
                <Logo />
              </div>
              <span>
                <small>SUPPORT CASE SUMMARY</small>
                <strong>{analysis.issueTitle}</strong>
                <p>Prepared {preparedDate}</p>
              </span>
            </div>
            <div className="summary-section">
              <span className="summary-number">01</span>
              <div>
                <small>ISSUE SUMMARY</small>
                <h3>{analysis.issueType}</h3>
                <p>{analysis.supportSummary}</p>
              </div>
            </div>
            <div className="summary-section">
              <span className="summary-number">02</span>
              <div>
                <small>RESOLUTION PLAN</small>
                <h3>{analysis.tasks.length} recommended actions</h3>
                <div className="verification-grid">
                  {analysis.tasks.map((task, index) => (
                    <span key={task.title}>
                      <Icon name={index === 0 ? "warning" : "time"} />{" "}
                      {task.title} <b>{index === 0 ? "Priority" : "Pending"}</b>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="summary-section">
              <span className="summary-number">03</span>
              <div>
                <small>MISSING INFORMATION</small>
                <h3>{analysis.requiredDocuments.join(", ")}</h3>
                <p>{analysis.documentGuidance}</p>
              </div>
            </div>
            <div className="summary-section questions-section">
              <span className="summary-number">04</span>
              <div>
                <small>RECOMMENDED QUESTIONS</small>
                <h3>Questions for the support team</h3>
                <ol>
                  {analysis.supportQuestions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ol>
              </div>
            </div>
            <div className="document-signoff">
              <p>
                Thank you for reviewing my account. I’m ready to provide any
                other information needed.
              </p>
              <span>— Alex Morgan</span>
            </div>
          </section>
          <aside className="support-actions">
            <section className="panel">
              <span className="copilot-icon">
                <Icon name="send" />
              </span>
              <h3>Your summary is ready</h3>
              <p>
                Copy it into your platform’s support chat or download a version
                for your records.
              </p>
              <Button
                onClick={() => {
                  setCopied(true)
                  navigator.clipboard?.writeText(summaryText)
                }}
                className="full-width"
              >
                <Icon name={copied ? "check" : "clipboard"} />{" "}
                {copied ? "Copied to clipboard" : "Copy summary"}
              </Button>
              <Button variant="secondary" className="full-width">
                <Icon name="document" /> Download PDF
              </Button>
            </section>
            <section className="panel send-card">
              <span>EMAIL PREVIEW</span>
              <label>
                TO
                <input defaultValue="support@payments.com" />
              </label>
              <label>
                SUBJECT
                <input
                  defaultValue={`${analysis.issueTitle} — Account review`}
                />
              </label>
              <Button className="full-width" onClick={() => setSent(true)}>
                <Icon name={sent ? "check" : "send"} />{" "}
                {sent ? "Summary sent" : "Open in email"}
              </Button>
            </section>
            <div className="support-tip">
              <Icon name="shield" />
              <p>
                <strong>A good support request is specific.</strong> Include
                dates, completed actions, and direct questions. Never share your
                password.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

type ChatMessage = {
  role: "user" | "assistant"
  text: string
}

function answerCopilotQuestion(question: string, analysis: NoticeAnalysis) {
  const normalized = question.toLowerCase()

  if (
    normalized.includes("money") ||
    normalized.includes("safe") ||
    normalized.includes("fund")
  ) {
    return `${analysis.reassurance} ${analysis.accessStatus}. Your best first step is to ${analysis.tasks[0].title.toLowerCase()}.`
  }

  if (
    normalized.includes("long") ||
    normalized.includes("time") ||
    normalized.includes("when")
  ) {
    return `The current estimate is ${analysis.estimatedResolution}. That is a guide rather than a promise, but completing "${analysis.tasks[0].title}" promptly can help prevent avoidable delays.`
  }

  if (
    normalized.includes("upload") ||
    normalized.includes("document") ||
    normalized.includes("provide")
  ) {
    if (analysis.requiredDocuments[0].startsWith("No specific")) {
      return analysis.documentGuidance
    }
    const otherDocuments = analysis.requiredDocuments.slice(1)
    return `Start with ${analysis.requiredDocuments[0]}.${
      otherDocuments.length
        ? ` Other likely items are ${otherDocuments.join(" and ")}.`
        : ""
    } ${analysis.documentGuidance}`
  }

  if (
    normalized.includes("after") ||
    normalized.includes("verification") ||
    normalized.includes("next")
  ) {
    const finalStep = analysis.timeline[analysis.timeline.length - 1]
    return `After you submit the requested information, the platform reviews it and sends an update. The likely next milestone is "${finalStep.title}" in about ${finalStep.window.toLowerCase()}. You can keep working through your checklist while you wait.`
  }

  return `${analysis.reassurance} You do not need to solve everything at once. Start with "${analysis.tasks[0].title}," and I can help you understand each step.`
}

function CopilotChat({
  analysis,
  page,
  open,
  close,
  toggle,
}: {
  analysis: NoticeAnalysis
  page: string
  open: boolean
  close: () => void
  toggle: () => void
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const pageLabel: Record<string, string> = {
    issue: "Account issue",
    explanation: "Money safety assessment",
    dashboard: "Resolution checklist",
    support: "Support summary",
  }
  const suggestions = [
    "Is my money safe?",
    "How long will this take?",
    "What should I upload next?",
    "What happens after verification?",
  ]
  const sendMessage = (question: string) => {
    const cleanQuestion = question.trim()
    if (!cleanQuestion) return
    setMessages((current) => [
      ...current,
      { role: "user", text: cleanQuestion },
      {
        role: "assistant",
        text: answerCopilotQuestion(cleanQuestion, analysis),
      },
    ])
    setInput("")
  }
  const submit = (e: FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }
  return (
    <>
      <button
        className={`chat-trigger ${open ? "panel-open" : ""}`}
        onClick={toggle}
        aria-expanded={open}
        aria-controls="copilot-panel"
      >
        <Icon name={open ? "close" : "sparkles"} />
        <span>{open ? "Close" : "Ask Copilot"}</span>
      </button>
      <aside
        id="copilot-panel"
        className={`chat-panel ${open ? "visible" : ""}`}
        aria-label="Resolution Copilot chat"
        aria-hidden={!open}
      >
        <header>
          <span className="copilot-icon">
            <Icon name="sparkles" />
          </span>
          <div>
            <strong>Resolution Copilot</strong>
            <small>
              <i /> Here with you · {pageLabel[page]}
            </small>
          </div>
          <button onClick={close} aria-label="Close Copilot">
            <Icon name="close" />
          </button>
        </header>
        <div className="chat-body">
          <div className="chat-context">
            <span>
              <Icon name="shield" size={15} />
            </span>
            <div>
              <small>YOUR CURRENT SITUATION</small>
              <strong>{analysis.issueTitle}</strong>
              <p>{analysis.moneyStatus}</p>
            </div>
          </div>
          <div className="ai-message">
            <span className="copilot-icon">
              <Icon name="sparkles" size={14} />
            </span>
            <p>
              Hi Alex. I’m here with you. Ask me anything about your money,
              timing, documents, or next steps.
            </p>
          </div>
          {messages.map((message, index) =>
            message.role === "user" ? (
              <div className="user-message" key={`${message.text}-${index}`}>
                {message.text}
              </div>
            ) : (
              <div className="ai-message" key={`${message.text}-${index}`}>
                <span className="copilot-icon">
                  <Icon name="sparkles" size={14} />
                </span>
                <p>{message.text}</p>
              </div>
            ),
          )}
          <span className="try-label">
            {messages.length
              ? "YOU MAY ALSO WANT TO ASK"
              : "SUGGESTED QUESTIONS"}
          </span>
          <div className="suggestion-list">
            {suggestions.map((question) => (
              <button
                className="suggestion"
                onClick={() => sendMessage(question)}
                key={question}
              >
                {question}
                <Icon name="chevron" size={13} />
              </button>
            ))}
          </div>
        </div>
        <form onSubmit={submit}>
          <div>
            <input
              aria-label="Ask Copilot a question"
              placeholder="Ask about your situation..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <small>Your workflow stays right where you left it.</small>
          </div>
          <button aria-label="Send question">
            <Icon name="send" />
          </button>
        </form>
      </aside>
    </>
  )
}

function Product({ exit }: { exit: () => void }) {
  const [page, setPage] = useState("issue")
  const [menu, setMenu] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [analysis, setAnalysis] = useState<NoticeAnalysis | null>(null)
  const submitNotice = async (notice: string) => {
  const base = analyzeNotice(notice)
  try {
    const ai = await analyzeAccountNotice({
      platform: "PayPal",
      noticeText: notice,
    })
    setAnalysis(mapAiToAnalysis(notice, ai, base))
  } catch {
    setAnalysis(base)
  }
  setPage("explanation")
}
  const content =
    page === "issue" || !analysis ? (
      <IssueScreen
        next={submitNotice}
        menu={() => setMenu(true)}
        notice={analysis?.notice ?? ""}
      />
    ) : page === "explanation" ? (
      <ExplanationScreen
        next={() => setPage("dashboard")}
        menu={() => setMenu(true)}
        analysis={analysis}
      />
    ) : page === "dashboard" ? (
      <Dashboard
        support={() => setPage("support")}
        menu={() => setMenu(true)}
        analysis={analysis}
      />
    ) : (
      <SupportSummary menu={() => setMenu(true)} analysis={analysis} />
    )
  return (
    <div className="product-app">
      <Sidebar
        page={page}
        navigate={setPage}
        open={menu}
        close={() => setMenu(false)}
        exit={exit}
        openChat={() => analysis && setChatOpen(true)}
        analysis={analysis}
      />
      <main className="app-main">{content}</main>
      {analysis && (
        <CopilotChat
          analysis={analysis}
          page={page}
          open={chatOpen}
          close={() => setChatOpen(false)}
          toggle={() => setChatOpen((current) => !current)}
        />
      )}
    </div>
  )
}

export default function App() {
  const [started, setStarted] = useState(false)
  return (
    <>
      {started ? (
        <Product exit={() => setStarted(false)} />
      ) : (
        <Landing start={() => setStarted(true)} />
      )}
      <PayPalSandboxButton />
    </>
  )
}
  )
}
<PayPalSandboxButton amount="5.00" />