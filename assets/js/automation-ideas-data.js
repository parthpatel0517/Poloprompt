/* PoloPrompt — static automation idea dataset, extracted from the tool's closure so it can be
   shared with the seed script for the backend database. Original data, no external source content. */
function automationIdea(name, steps, prompt) {
  return { name: name, steps: steps, prompt: prompt };
}

var AUTOMATION_IDEAS = {
  "Real Estate|Customer Support": [
    automationIdea("Instant WhatsApp FAQ Responder",
      "New WhatsApp message (Twilio) → ChatGPT API drafts answer from listing FAQs (Airtable) → reply sent automatically",
      "Build a Twilio WhatsApp webhook that sends incoming buyer questions to the ChatGPT API along with an Airtable base of listing FAQs, then auto-replies with a grounded answer, escalating to a human via Slack if confidence is low."),
    automationIdea("Missed Call Text-Back",
      "Missed call logged (Twilio) → auto SMS sent → contact + timestamp logged (Google Sheets) → follow-up task created",
      "Configure Twilio to detect a missed call to the office line, immediately send an SMS apologizing and offering a booking link, and log the caller's number and time to a Google Sheet for agent follow-up."),
    automationIdea("Showing Scheduling Assistant",
      "Buyer books a showing (Calendly) → Zapier creates event → confirmation + reminder sent → agent notified (Slack)",
      "Connect Calendly to Zapier so every new property showing booking creates a calendar event, sends the buyer an automated SMS/email reminder 2 hours before, and posts a heads-up to the listing agent's Slack channel.")
  ],
  "Real Estate|Lead Generation": [
    automationIdea("Facebook Lead Ads to CRM Sync",
      "New Facebook Lead Ad submission → Zapier → lead created in HubSpot → agent assigned + notified",
      "Set up a Zapier automation that pushes every new Facebook Lead Ads submission into HubSpot as a new contact, auto-assigns it to the next available agent round-robin, and sends a Slack alert with the lead's details."),
    automationIdea("Landing Page to Instant SMS Follow-up",
      "Typeform property inquiry submitted → Make.com scenario runs → Twilio sends personalized SMS within 60 seconds",
      "Build a Make.com scenario triggered by a Typeform property-inquiry submission that sends an instant personalized SMS via Twilio referencing the specific property, since real estate leads convert far better when contacted within minutes."),
    automationIdea("Open House Sign-In to Nurture Sequence",
      "Google Forms sign-in at open house → Airtable record created → Mailchimp adds contact to drip sequence",
      "Create an automation where each Google Forms open-house sign-in adds the visitor to an Airtable database and enrolls them in a Mailchimp nurture sequence tailored to the property type they viewed.")
  ],
  "Real Estate|Inventory Sync": [
    automationIdea("Cross-Portal Listing Sync",
      "New/updated listing in Airtable → Make.com pushes to portal feed formats → Zapier confirms publish status",
      "Build a Make.com scenario that watches an Airtable 'Listings' base for new or updated records and reformats/pushes each one to the data feeds used by third-party property portals, logging publish confirmations back to Airtable."),
    automationIdea("New Listing Auto-Log and Social Trigger",
      "New row in Google Sheets listing tracker → Zapier fires → Buffer schedules announcement post",
      "Set up a Zapier automation triggered by a new row in a Google Sheets listing tracker that automatically drafts and schedules a 'Just Listed' announcement post in Buffer."),
    automationIdea("Price Change Alert System",
      "Price field updated in Airtable → Make.com detects change → Slack alert sent to agent team",
      "Configure a Make.com watch on an Airtable listings base that detects any price-field change and immediately posts an alert with old/new price to a dedicated Slack channel for the agent team.")
  ],
  "Real Estate|Social Media": [
    automationIdea("New Listing Auto-Post",
      "New listing added to Airtable → Make.com formats caption + photos → Buffer publishes to Instagram/Facebook",
      "Build a Make.com automation that watches an Airtable listings base and, for each new entry, formats a caption from the listing details and schedules an Instagram and Facebook post via Buffer."),
    automationIdea("Open House Reminder Posts",
      "Upcoming open house row in Google Sheets → Zapier schedules countdown posts → Buffer publishes on a timer",
      "Create a Zapier automation that reads upcoming open house dates from a Google Sheet and schedules a series of countdown reminder posts in Buffer leading up to the event."),
    automationIdea("Testimonial to Social Proof Post",
      "Client submits testimonial (Typeform) → Make.com formats quote graphic → Buffer schedules post",
      "Set up a Make.com scenario where a new Typeform testimonial submission triggers a formatted quote card and schedules it as a social proof post via Buffer.")
  ],

  "E-commerce|Customer Support": [
    automationIdea("Order Status Chatbot",
      "Customer messages order number (Twilio/WhatsApp) → Shopify order lookup → ChatGPT API drafts status reply",
      "Build a webhook that takes an incoming WhatsApp message via Twilio, looks up the order status in Shopify by order number, and uses the ChatGPT API to draft a friendly, accurate status update reply automatically."),
    automationIdea("Abandoned Cart Recovery Flow",
      "Cart abandoned (Shopify) → Zapier waits 1 hour → Mailchimp sends recovery email with discount",
      "Configure a Zapier automation triggered by a Shopify abandoned-cart event that waits one hour, then sends a Mailchimp email with the abandoned items and a time-limited discount code."),
    automationIdea("Return/Refund Request Router",
      "Customer submits return request (Typeform) → Zapier categorizes reason → routed to Slack channel by type",
      "Build a Zapier automation that takes Typeform return-request submissions, categorizes them by reason (defective, wrong size, changed mind), and routes each to the correct Slack channel for the support team to action.")
  ],
  "E-commerce|Lead Generation": [
    automationIdea("Quiz Funnel to Segmented Email List",
      "Customer completes product quiz (Typeform) → Zapier tags result → Mailchimp adds to matching segment",
      "Create a Zapier automation that reads product-quiz answers from Typeform, tags the customer by result type, and adds them to the matching Mailchimp segment for personalized follow-up emails."),
    automationIdea("Instagram DM to Lead Capture",
      "Comment/DM keyword trigger (Manychat) → contact captured → Airtable record created → Zapier syncs to CRM",
      "Set up a Manychat automation that captures Instagram DM leads on a keyword trigger, then use Zapier to sync each new contact into an Airtable lead database and your CRM."),
    automationIdea("Exit-Intent Popup to CRM",
      "Exit-intent discount claimed (Shopify) → Klaviyo tags lead → HubSpot deal created for high-intent visitor",
      "Build an automation where a Shopify exit-intent discount claim tags the customer in Klaviyo and creates a corresponding deal record in HubSpot for retargeting.")
  ],
  "E-commerce|Inventory Sync": [
    automationIdea("Multi-Channel Stock Sync",
      "Stock level changes (Shopify) → Make.com scenario runs → Google Sheets master inventory updated",
      "Build a Make.com scenario that listens for Shopify inventory changes and updates a master Google Sheets inventory tracker in real time so stock levels stay consistent across every sales channel."),
    automationIdea("Low Stock Alert and Reorder Trigger",
      "Stock falls below threshold (Shopify) → Slack alert sent → QuickBooks purchase order draft created",
      "Set up an automation that monitors Shopify stock levels, sends a Slack alert when any SKU falls below its reorder threshold, and drafts a purchase order in QuickBooks for the supplier."),
    automationIdea("Supplier Order Automation",
      "Low-stock item flagged (Airtable) → Zapier triggers → QuickBooks purchase order created + supplier emailed",
      "Create a Zapier automation that, when an item is flagged low-stock in Airtable, automatically generates a QuickBooks purchase order and emails the supplier with the reorder quantity.")
  ],
  "E-commerce|Social Media": [
    automationIdea("New Product Auto-Post",
      "New product published (Shopify) → Zapier formats listing → Buffer schedules posts across platforms",
      "Build a Zapier automation that triggers on every new Shopify product publish, formats the title/price/photo into a caption, and schedules posts across Instagram, Facebook, and Pinterest via Buffer."),
    automationIdea("UGC Collection to Repost Pipeline",
      "Customer tags brand (Instagram) → Make.com captures post → Airtable logs for approval → Buffer reposts",
      "Set up a Make.com scenario that captures Instagram posts where customers tag your brand, logs them in Airtable for quick approval, and schedules approved posts for repost via Buffer with credit to the original poster."),
    automationIdea("Flash Sale Countdown Posts",
      "Sale start/end dates entered (Google Sheets) → Zapier schedules series → Buffer publishes countdown posts",
      "Create a Zapier automation that reads flash-sale start and end times from a Google Sheet and auto-schedules a countdown series of posts in Buffer building urgency toward the sale.")
  ],

  "Digital Agency|Customer Support": [
    automationIdea("Client Ticket Triage",
      "Client submits issue (Typeform) → Zapier categorizes by urgency/type → routed to correct Slack channel",
      "Build a Zapier automation that reads Typeform client support submissions, classifies them by urgency and issue type, and routes each into the correct team Slack channel with an SLA reminder."),
    automationIdea("Onboarding FAQ WhatsApp Bot",
      "New client asks a question (Twilio/WhatsApp) → ChatGPT API answers from onboarding docs (Airtable)",
      "Create a WhatsApp bot via Twilio that answers new-client onboarding questions using the ChatGPT API grounded in an Airtable knowledge base of your agency's onboarding documentation."),
    automationIdea("Automated Project Status Updates",
      "Task status changes (Airtable) → Make.com detects update → Slack + client email summary sent",
      "Set up a Make.com scenario that watches an Airtable project tracker for status changes and automatically posts a summary to the internal Slack channel and, weekly, emails a status digest to the client.")
  ],
  "Digital Agency|Lead Generation": [
    automationIdea("Website Form to CRM + Alert",
      "Contact form submitted (Typeform) → HubSpot deal created → Slack alert to sales team",
      "Build a Zapier automation that pushes every Typeform website inquiry into HubSpot as a new deal and immediately alerts the sales team in Slack with the lead's details and source."),
    automationIdea("Cold Outreach Reply Tracker",
      "Prospect replies to cold email (Gmail) → Zapier detects positive keyword → Airtable record updated + task created",
      "Create a Zapier automation that scans Gmail replies to cold outreach campaigns for positive-intent keywords and, when found, updates the prospect's Airtable record and creates a follow-up task automatically."),
    automationIdea("Referral Tracking System",
      "Referral submitted (Google Forms) → Airtable logs referrer + referred → Mailchimp sends thank-you sequence",
      "Set up an automation where a Google Forms referral submission logs both parties in Airtable and triggers a Mailchimp thank-you sequence with a referral reward for the referrer.")
  ],
  "Digital Agency|Inventory Sync": [
    automationIdea("Software License Tracker",
      "License added/expiring (Airtable) → Make.com checks renewal dates → Slack renewal alert sent",
      "Build a Make.com scenario that scans an Airtable base of client and internal software licenses daily and posts a Slack alert 30 days before any license or subscription is due to renew or expire."),
    automationIdea("Contractor Capacity Sync",
      "Contractor availability updated (Google Sheets) → Zapier checks capacity → Calendly booking slots adjusted",
      "Create a Zapier automation that syncs contractor availability from a Google Sheet into Calendly booking slots so project managers only see truly open capacity when scheduling new work."),
    automationIdea("Client Deliverable Asset Inventory",
      "New deliverable uploaded (Google Drive) → Zapier logs to Airtable → client notified of new asset",
      "Set up a Zapier automation that logs every new file uploaded to a client's Google Drive folder into an Airtable deliverables tracker and sends the client an automatic notification email.")
  ],
  "Digital Agency|Social Media": [
    automationIdea("Client Content Calendar Automation",
      "Content approved (Airtable) → Zapier triggers → Buffer schedules at optimal time per platform",
      "Build a Zapier automation that watches an Airtable content calendar for posts marked 'Approved' and automatically schedules them in Buffer at the optimal time for each platform."),
    automationIdea("Approval Workflow to Auto-Post",
      "Draft submitted (Google Sheets) → Slack approval request sent → approved row triggers Buffer post",
      "Create a Make.com scenario where a new draft row in Google Sheets sends a Slack approval request to the client contact, and an 'Approved' response automatically schedules the post in Buffer."),
    automationIdea("Automated Monthly Reporting",
      "Month end reached (scheduled trigger) → Make.com pulls metrics (Airtable) → Google Sheets report generated",
      "Set up a scheduled Make.com scenario that runs on the last day of each month, pulls campaign metrics logged in Airtable, and compiles them into a formatted Google Sheets report ready to send to clients.")
  ],

  "Local Services|Customer Support": [
    automationIdea("Appointment Reminder & Reschedule Bot",
      "Appointment booked (Calendly) → Twilio sends SMS reminder → reply 'R' triggers reschedule link via Zapier",
      "Build a Zapier automation that sends an SMS reminder via Twilio 24 hours before a Calendly appointment, and if the customer replies to reschedule, automatically sends a fresh booking link."),
    automationIdea("Hours & FAQ WhatsApp Bot",
      "Customer messages business (Twilio/WhatsApp) → ChatGPT API answers from FAQ sheet (Airtable)",
      "Create a WhatsApp bot using Twilio that answers common customer questions (hours, pricing, service area) using the ChatGPT API grounded in an Airtable FAQ sheet, escalating anything unclear to a human."),
    automationIdea("Automated Review Request Follow-up",
      "Job marked complete (Google Sheets) → Zapier waits 24 hours → Mailchimp sends review request email/SMS",
      "Set up a Zapier automation that, once a job is marked complete in a Google Sheet, waits 24 hours and then sends a review-request email or SMS via Mailchimp linking to your Google Business Profile.")
  ],
  "Local Services|Lead Generation": [
    automationIdea("Missed Call Text-Back",
      "Missed call detected (Twilio) → automatic SMS sent → lead logged (Google Sheets)",
      "Configure Twilio to detect missed calls to the business line and automatically send a text back offering to schedule a callback, logging the lead's number and time to a Google Sheet."),
    automationIdea("Google Business Profile Message to CRM",
      "New GBP message received → Zapier triggers → HubSpot contact created → Slack alert to owner",
      "Build a Zapier automation that captures new Google Business Profile messages, creates a HubSpot contact automatically, and alerts the business owner in Slack so no inquiry sits unanswered."),
    automationIdea("Referral Program Tracker",
      "Referral submitted (Typeform) → Airtable logs referral → Mailchimp sends reward code to referrer",
      "Create an automation where a Typeform referral submission logs the referrer and new customer in Airtable and triggers a Mailchimp email delivering a reward/discount code to the referrer.")
  ],
  "Local Services|Inventory Sync": [
    automationIdea("Supply/Parts Stock Tracker",
      "Stock level updated (Google Sheets) → Make.com checks threshold → Slack low-stock alert sent",
      "Build a Make.com scenario that monitors a Google Sheets supply tracker and posts a Slack alert whenever a commonly used part or supply drops below its reorder threshold."),
    automationIdea("Equipment Checkout Tracker",
      "Technician checks out equipment (Airtable form) → Zapier logs assignment → Slack reminder if overdue",
      "Set up a Zapier automation that logs equipment checkouts from an Airtable form and sends a Slack reminder to the technician if the item isn't checked back in within the expected window."),
    automationIdea("Supplier Reorder Automation",
      "Item flagged low (Airtable) → Zapier triggers → QuickBooks purchase order created automatically",
      "Create a Zapier automation that, when a supply item is flagged low in Airtable, automatically generates and sends a QuickBooks purchase order to the usual supplier.")
  ],
  "Local Services|Social Media": [
    automationIdea("Before/After Job Photo Auto-Post",
      "Photos uploaded (Google Drive) → Zapier formats post → Buffer publishes to Instagram/Facebook",
      "Build a Zapier automation that watches a Google Drive folder for new before/after job photos and automatically formats and schedules a post via Buffer."),
    automationIdea("Review to Social Proof Post",
      "5-star review logged (Google Sheets) → Zapier formats quote graphic → Buffer schedules post",
      "Set up a Zapier automation that turns a newly logged 5-star review in Google Sheets into a formatted testimonial graphic scheduled for posting via Buffer."),
    automationIdea("Seasonal Promo Scheduler",
      "Promo dates entered (Airtable) → Zapier schedules series → Buffer publishes leading up to season",
      "Create a Zapier automation that reads seasonal promotion dates from Airtable and auto-schedules a run of reminder posts via Buffer in the weeks leading up to the promotion.")
  ],

  "Accounting|Customer Support": [
    automationIdea("Client Document Request Bot",
      "Document needed (Typeform checklist) → Zapier sends reminder → Slack tracks outstanding items",
      "Build a Zapier automation that sends clients a Typeform document checklist, tracks which items are outstanding, and posts a Slack summary to the bookkeeping team of what's still missing before a filing deadline."),
    automationIdea("Invoice Status Inquiry Bot",
      "Client texts invoice number (Twilio) → QuickBooks lookup → automated status reply sent",
      "Create a Twilio-based SMS bot that looks up an invoice number in QuickBooks and automatically replies with its current payment status, reducing routine 'has this been paid' inquiries."),
    automationIdea("Tax Deadline Reminder System",
      "Deadline approaching (Airtable schedule) → Mailchimp sends staged reminders → Zapier logs client response",
      "Set up a Zapier automation that reads upcoming tax deadlines from an Airtable schedule and triggers a staged Mailchimp reminder sequence (30/14/3 days out) to each affected client.")
  ],
  "Accounting|Lead Generation": [
    automationIdea("Consultation Booking Funnel",
      "Prospect books consult (Calendly) → HubSpot deal created → Zapier sends prep questionnaire",
      "Build a Zapier automation that creates a HubSpot deal the moment a prospect books a consultation via Calendly, and automatically emails them a pre-consultation questionnaire."),
    automationIdea("Lead Magnet to Nurture Sequence",
      "Tax checklist downloaded (Typeform) → Airtable logs lead → Mailchimp enrolls in nurture sequence",
      "Create an automation where downloading a tax-prep checklist via Typeform logs the lead in Airtable and enrolls them in a Mailchimp email sequence introducing your services."),
    automationIdea("Referral Partner Tracking",
      "Referral logged (Google Sheets) → Airtable syncs partner record → Slack notifies partnerships lead",
      "Set up a Zapier automation that syncs new referral-partner submissions from Google Sheets into Airtable and notifies the partnerships lead in Slack so follow-up happens quickly.")
  ],
  "Accounting|Inventory Sync": [
    automationIdea("Client Document Inventory Tracker",
      "File uploaded (Google Drive) → Zapier logs to Airtable → missing-document alert if checklist incomplete",
      "Build a Zapier automation that logs every client document uploaded to Google Drive into an Airtable checklist tracker and flags any still-missing items automatically."),
    automationIdea("Software Subscription Inventory",
      "License/subscription added (Airtable) → Make.com checks renewal → Slack alert before billing date",
      "Create a Make.com scenario that tracks all firm software subscriptions and licenses in Airtable and posts a Slack alert ahead of each renewal or billing date to avoid surprise charges."),
    automationIdea("Client Financial Data Sync",
      "Transaction recorded (QuickBooks) → Make.com syncs → Google Sheets master ledger updated",
      "Set up a Make.com scenario that syncs new QuickBooks transactions into a master Google Sheets ledger in real time for firm-wide reporting and reconciliation.")
  ],
  "Accounting|Social Media": [
    automationIdea("Tax Deadline Reminder Posts",
      "Deadline dates loaded (Airtable) → Zapier schedules series → Buffer publishes countdown posts",
      "Build a Zapier automation that reads key tax filing deadlines from Airtable and schedules a countdown series of educational reminder posts via Buffer."),
    automationIdea("Client Testimonial to Post",
      "Testimonial submitted (Typeform) → Make.com formats quote card → Buffer schedules post",
      "Create a Make.com scenario that turns a new Typeform client testimonial into a formatted quote graphic and schedules it for posting via Buffer."),
    automationIdea("Educational Content Scheduler",
      "Topics planned (Google Sheets) → Zapier queues drafts → Buffer publishes on a fixed weekly cadence",
      "Set up a Zapier automation that reads a content topic list from Google Sheets and schedules a consistent weekly cadence of educational posts via Buffer.")
  ],

  "Healthcare|Customer Support": [
    automationIdea("Appointment Reminder & No-Show Reducer",
      "Appointment booked (Calendly) → Twilio sends SMS reminder 24h + 2h prior → no-show marked if unconfirmed",
      "Build a Zapier automation that sends a Twilio SMS appointment reminder 24 hours and again 2 hours before each Calendly booking, requiring a reply to confirm, and flags likely no-shows in Google Sheets for staff follow-up."),
    automationIdea("Patient FAQ WhatsApp Bot",
      "Patient messages clinic (Twilio/WhatsApp) → ChatGPT API answers from approved FAQ list (Airtable) → escalates clinical questions to staff",
      "Create a WhatsApp bot via Twilio that answers common non-clinical questions (hours, insurance accepted, prep instructions) from an Airtable FAQ base using the ChatGPT API, automatically escalating anything that sounds clinical to a staff member via Slack."),
    automationIdea("Post-Visit Follow-Up Automation",
      "Visit marked complete (practice software/Google Sheets) → Zapier waits 24 hours → satisfaction survey + care instructions sent",
      "Set up a Zapier automation that, once a visit is logged as complete, waits 24 hours and sends the patient a satisfaction survey and a recap of care instructions via email or SMS.")
  ],
  "Healthcare|Lead Generation": [
    automationIdea("New Patient Inquiry to Intake Sync",
      "Website inquiry form submitted (Typeform) → Zapier creates lead → intake coordinator notified (Slack) + reminder scheduled",
      "Build a Zapier automation that routes new patient inquiries from a Typeform into a lead tracker, notifies the intake coordinator in Slack, and schedules a follow-up reminder if the inquiry goes unanswered within 24 hours."),
    automationIdea("Referral Source Tracking",
      "Referral submitted (Google Forms) → Airtable logs referring provider → thank-you note triggered",
      "Create an automation where a Google Forms referral submission logs the referring provider and patient in Airtable and automatically sends a thank-you acknowledgment to the referring office."),
    automationIdea("Webinar/Screening Sign-Up Nurture",
      "Sign-up for free screening/webinar (Typeform) → Mailchimp enrolls in reminder + info sequence",
      "Set up a Zapier automation that enrolls anyone signing up for a free screening or educational webinar into a Mailchimp sequence with reminders and pre-visit information.")
  ],
  "Healthcare|Inventory Sync": [
    automationIdea("Medical Supply Reorder Alert",
      "Supply level updated (Google Sheets) → Make.com checks threshold → Slack alert + purchase order drafted",
      "Build a Make.com scenario that monitors a Google Sheets medical supply tracker and, when any item drops below its reorder threshold, alerts staff in Slack and drafts a purchase order."),
    automationIdea("Equipment Maintenance Scheduler",
      "Equipment log updated (Airtable) → Zapier checks due dates → maintenance reminder sent to staff",
      "Create a Zapier automation that tracks equipment maintenance/calibration due dates in Airtable and sends a reminder to the responsible staff member ahead of each due date."),
    automationIdea("Sample/Trial Stock Tracker",
      "Sample dispensed (Google Sheets log) → Make.com totals usage → low-stock alert sent to office manager",
      "Set up a Make.com scenario that totals dispensed samples or trial products from a logging sheet and alerts the office manager when stock runs low.")
  ],
  "Healthcare|Social Media": [
    automationIdea("Health Tip Content Scheduler",
      "Topics planned (Google Sheets) → Zapier queues drafts → Buffer publishes weekly educational posts",
      "Build a Zapier automation that reads a planned list of health-tip topics from Google Sheets and schedules a consistent cadence of educational posts via Buffer."),
    automationIdea("Patient Testimonial to Post",
      "Testimonial submitted (Typeform, with consent) → Make.com formats quote card → Buffer schedules post",
      "Create a Make.com scenario that turns a consented patient testimonial into a formatted quote graphic and schedules it for posting via Buffer, keeping identifying details out per privacy policy."),
    automationIdea("Seasonal Awareness Campaign Scheduler",
      "Awareness dates loaded (Airtable, e.g. flu season) → Zapier schedules series → Buffer publishes leading up to date",
      "Set up a Zapier automation that reads seasonal health-awareness dates from Airtable and auto-schedules a run of educational reminder posts via Buffer in the weeks leading up to each one.")
  ],

  "Restaurants|Customer Support": [
    automationIdea("Reservation Confirmation & Reminder Bot",
      "Reservation booked (OpenTable/Google Forms) → Twilio sends confirmation + reminder SMS → reply to modify",
      "Build a Zapier automation that sends a Twilio SMS confirmation immediately after a reservation is booked and a reminder 2 hours before, letting guests reply to request a change."),
    automationIdea("Menu/Hours FAQ WhatsApp Bot",
      "Customer messages restaurant (Twilio/WhatsApp) → ChatGPT API answers from menu/hours sheet (Airtable)",
      "Create a WhatsApp bot via Twilio that answers common questions about hours, menu items, and allergens using the ChatGPT API grounded in an Airtable menu and FAQ sheet."),
    automationIdea("Complaint Routing System",
      "Feedback form submitted (Typeform) → Zapier categorizes by severity → routed to manager (Slack) if urgent",
      "Set up a Zapier automation that routes customer feedback submissions by severity, immediately alerting the manager in Slack for anything flagged urgent or negative.")
  ],
  "Restaurants|Lead Generation": [
    automationIdea("Waitlist to Loyalty Signup",
      "Guest joins waitlist app → Zapier captures contact → Mailchimp adds to loyalty/offers list",
      "Build a Zapier automation that captures contact details from your waitlist app and adds new guests to a Mailchimp list for future offers and loyalty updates."),
    automationIdea("Private Event Inquiry Router",
      "Event inquiry submitted (Typeform) → HubSpot/Airtable lead created → events coordinator notified (Slack)",
      "Create a Zapier automation that routes private event and catering inquiries from a Typeform into a lead tracker and immediately notifies the events coordinator in Slack."),
    automationIdea("Gift Card Purchase to Follow-Up",
      "Gift card purchased (Shopify/Square) → Mailchimp sends usage tips + reminder before expiry",
      "Set up an automation that, when a gift card is purchased, enrolls the buyer or recipient in a Mailchimp sequence with redemption tips and a reminder before any expiration date.")
  ],
  "Restaurants|Inventory Sync": [
    automationIdea("Low Stock Ingredient Alert",
      "Stock level updated (Google Sheets) → Make.com checks threshold → Slack alert to kitchen manager",
      "Build a Make.com scenario that monitors a Google Sheets ingredient tracker and alerts the kitchen manager in Slack when any item drops below par level."),
    automationIdea("Supplier Reorder Automation",
      "Ingredient flagged low (Airtable) → Zapier triggers → purchase order emailed to supplier",
      "Create a Zapier automation that, when an ingredient is flagged low in Airtable, automatically drafts and emails a reorder to the usual supplier."),
    automationIdea("Multi-Location Stock Comparison",
      "Stock counts logged per location (Google Sheets) → Make.com compiles comparison → manager alerted to imbalance",
      "Set up a Make.com scenario that compiles nightly stock counts from multiple location sheets into one comparison view and flags significant imbalances to the operations manager.")
  ],
  "Restaurants|Social Media": [
    automationIdea("Daily Special Auto-Post",
      "Special entered (Google Sheets) → Zapier formats post → Buffer publishes each morning",
      "Build a Zapier automation that reads the day's special from a Google Sheet each morning and automatically formats and schedules a post via Buffer before opening."),
    automationIdea("UGC Photo Repost Pipeline",
      "Customer tags restaurant (Instagram) → Make.com captures post → Airtable logs for approval → Buffer reposts",
      "Create a Make.com scenario that captures Instagram posts tagging your restaurant, logs them in Airtable for quick approval, and schedules approved posts for repost via Buffer with credit."),
    automationIdea("Event Countdown Scheduler",
      "Event date entered (Airtable, e.g. live music night) → Zapier schedules series → Buffer publishes countdown posts",
      "Set up a Zapier automation that reads upcoming event dates from Airtable and auto-schedules a countdown series of posts via Buffer leading up to each event.")
  ]
};

var AUTOMATION_FALLBACKS = {
  "Real Estate": [
    automationIdea("Lead Auto-Response System", "New inquiry received → Zapier routes to agent → automated acknowledgment sent", "Build a Zapier automation that instantly acknowledges any new real estate inquiry and routes it to the right agent."),
    automationIdea("Listing Data Sync", "Listing updated (Airtable) → Make.com pushes changes → downstream channels updated", "Set up a Make.com scenario that keeps listing data in Airtable in sync with the channels you publish to."),
    automationIdea("Client Update Automation", "Milestone reached (Google Sheets) → Zapier triggers → client notified automatically", "Create a Zapier automation that notifies clients automatically at key milestones in the buying/selling process.")
  ],
  "E-commerce": [
    automationIdea("Order Notification Automation", "Order placed (Shopify) → Zapier triggers → team + customer notified", "Build a Zapier automation that notifies your fulfillment team and confirms the order with the customer immediately after checkout."),
    automationIdea("Inventory Alert System", "Stock threshold crossed (Shopify) → Slack alert sent", "Set up an automation that alerts your team in Slack whenever any product's stock crosses a defined threshold."),
    automationIdea("Marketing Content Scheduler", "Campaign planned (Google Sheets) → Buffer schedules posts", "Create a Zapier automation that turns a marketing content plan in Google Sheets into scheduled Buffer posts.")
  ],
  "Digital Agency": [
    automationIdea("Client Communication Hub", "Client message received → Zapier routes → Slack channel notified", "Build a Zapier automation that routes incoming client communications to the correct internal Slack channel."),
    automationIdea("Project Tracking Sync", "Task updated (Airtable) → Make.com syncs → client dashboard refreshed", "Set up a Make.com scenario that keeps a client-facing project dashboard in sync with your internal Airtable tracker."),
    automationIdea("Reporting Automation", "Reporting period ends → Make.com compiles metrics → Google Sheets report generated", "Create a scheduled Make.com scenario that compiles campaign metrics into a client-ready report automatically.")
  ],
  "Local Services": [
    automationIdea("Booking Confirmation Automation", "Appointment booked (Calendly) → Twilio sends confirmation SMS", "Build a Zapier automation that sends an instant SMS confirmation via Twilio whenever a new appointment is booked."),
    automationIdea("Supply Tracking Automation", "Stock updated (Google Sheets) → Slack alert on low stock", "Set up a Make.com scenario that alerts the team in Slack when key supplies run low."),
    automationIdea("Review Generation Automation", "Job completed → Mailchimp sends review request", "Create a Zapier automation that requests a review from customers automatically once a job is marked complete.")
  ],
  "Accounting": [
    automationIdea("Deadline Tracking Automation", "Deadline approaching (Airtable) → Mailchimp reminder sent", "Build a Zapier automation that sends staged reminders to clients ahead of key filing deadlines."),
    automationIdea("Document Collection Automation", "Document requested (Typeform) → Airtable tracks status", "Set up a Zapier automation that tracks which requested client documents have and haven't been received."),
    automationIdea("Client Onboarding Automation", "New client signed (HubSpot) → Zapier triggers onboarding checklist", "Create a Zapier automation that kicks off an onboarding checklist automatically whenever a new client is signed.")
  ],
  "Healthcare": [
    automationIdea("Appointment Reminder Automation", "Appointment booked (Calendly) → Twilio sends confirmation + reminder SMS", "Build a Zapier automation that sends an automatic SMS confirmation and reminder via Twilio whenever a new appointment is booked."),
    automationIdea("Patient Intake Automation", "New inquiry received → Zapier routes to intake coordinator → automated acknowledgment sent", "Set up a Zapier automation that instantly acknowledges any new patient inquiry and routes it to the intake coordinator."),
    automationIdea("Supply Tracking Automation", "Stock updated (Google Sheets) → Slack alert on low stock", "Create a Make.com scenario that alerts staff in Slack when key medical supplies run low.")
  ],
  "Restaurants": [
    automationIdea("Reservation Confirmation Automation", "Reservation booked → Twilio sends confirmation SMS", "Build a Zapier automation that sends an instant SMS confirmation via Twilio whenever a new reservation is booked."),
    automationIdea("Feedback Routing Automation", "Feedback submitted → Zapier routes to manager based on rating", "Set up a Zapier automation that routes customer feedback to the manager automatically, flagging anything negative for immediate attention."),
    automationIdea("Stock Alert Automation", "Stock updated (Google Sheets) → Slack alert on low stock", "Create a Make.com scenario that alerts kitchen staff in Slack when key ingredients run low.")
  ]
};
