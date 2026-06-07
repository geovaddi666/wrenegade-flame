export const metadata = {
  title: 'Privacy Policy | Emporium Alchymia',
  description:
    'How Emporium Alchymia collects, uses, and protects your personal data.',
};

export default function EmporiumPrivacyPage() {
  return (
    <main className="emporium-page emporium-about-page">
      <article className="emporium-about">
        <p className="emporium-eyebrow">Privacy Policy</p>
        <p className="emporium-about-subtitle">Last updated: June 2026</p>

        <hr className="product-detail-divider" />

        <section className="emporium-about-section">
          <h2 className="emporium-about-heading">What data we collect and why</h2>
          <p className="emporium-about-body">
            <strong>Order data</strong>
          </p>
          <p className="emporium-about-body">
            When you make a purchase, Stripe collects your name, email address, payment details, and shipping address. This is necessary to process and fulfil your order. Stripe acts as the data processor — we never see or store your full card details. You can read Stripe&apos;s privacy policy at stripe.com/privacy.
          </p>
          <p className="emporium-about-body">
            <strong>Contact form</strong>
          </p>
          <p className="emporium-about-body">
            If you contact us via the website, your name and email address are received directly into our email inbox. This data is used solely to respond to your enquiry and is not stored in any third-party system.
          </p>
          <p className="emporium-about-body">
            <strong>Analytics and advertising</strong>
          </p>
          <p className="emporium-about-body">
            We use analytics tools to understand how visitors use this website and to inform targeted advertising. This may involve the use of cookies to collect data about your browsing behaviour. You will be asked for your consent to this before any tracking cookies are set.
          </p>
        </section>

        <hr className="product-detail-divider" />

        <section className="emporium-about-section">
          <h2 className="emporium-about-heading">Your lawful basis for processing</h2>
          <p className="emporium-about-body">We process your data on the following bases:</p>
          <ul className="emporium-about-list">
            <li>Contract — order and shipping data is processed to fulfil your purchase</li>
            <li>Legitimate interests — contact form enquiries</li>
            <li>Consent — analytics and advertising cookies</li>
          </ul>
        </section>

        <hr className="product-detail-divider" />

        <section className="emporium-about-section">
          <h2 className="emporium-about-heading">How long we keep your data</h2>
          <p className="emporium-about-body">
            Order records are kept for seven years in line with HMRC requirements. Contact form enquiries are kept for as long as necessary to resolve your enquiry and then deleted. Analytics data is retained according to the settings of the analytics provider used.
          </p>
        </section>

        <hr className="product-detail-divider" />

        <section className="emporium-about-section">
          <h2 className="emporium-about-heading">Your rights</h2>
          <p className="emporium-about-body">Under UK GDPR you have the right to:</p>
          <ul className="emporium-about-list">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Object to processing based on legitimate interests</li>
            <li>Withdraw consent for analytics at any time</li>
          </ul>
          <p className="emporium-about-body">
            To exercise any of these rights, contact flame@wrenegade.co.uk. You also have the right to lodge a complaint with the Information Commissioner&apos;s Office at ico.org.uk.
          </p>
        </section>

        <hr className="product-detail-divider" />

        <section className="emporium-about-section">
          <h2 className="emporium-about-heading">Third parties</h2>
          <p className="emporium-about-body">We use the following third-party services:</p>
          <ul className="emporium-about-list">
            <li>Stripe — payment processing</li>
            <li>Analytics provider — website analytics and advertising insights</li>
          </ul>
          <p className="emporium-about-body">We do not sell your personal data to any third party.</p>
        </section>

        <hr className="product-detail-divider" />

        <section className="emporium-about-section">
          <h2 className="emporium-about-heading">Cookies</h2>
          <p className="emporium-about-body">
            We use essential cookies required for the site to function, and analytics cookies with your consent. You can withdraw consent at any time by clearing your browser cookies and declining when prompted again.
          </p>
        </section>

        <hr className="product-detail-divider" />

        <section className="emporium-about-section">
          <h2 className="emporium-about-heading">Changes to this policy</h2>
          <p className="emporium-about-body">
            We may update this policy from time to time. The current version will always be available at wrenegade.co.uk/emporium/privacy.
          </p>
        </section>
      </article>
    </main>
  );
}
