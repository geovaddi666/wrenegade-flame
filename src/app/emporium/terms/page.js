export const metadata = {
  title: 'Terms & Conditions | Emporium Alchymia',
  description:
    'The terms and conditions for purchases made through Emporium Alchymia.',
};

export default function EmporiumTermsPage() {
  return (
    <main className="emporium-page emporium-about-page">
      <article className="emporium-about">
        <p className="emporium-eyebrow">Terms &amp; Conditions</p>
        <p className="emporium-about-subtitle">Last updated: June 2026</p>

        <hr className="product-detail-divider" />

        <section className="emporium-about-section">
          <h2 className="emporium-about-heading">The nature of the goods</h2>
          <p className="emporium-about-body">
            All items sold through Emporium Alchymia are handmade, one-of-a-kind artifacts. Each piece is unique and exactly as described and photographed. Due to the handmade nature of the work, minor natural variations in leather texture, colour, and stitching are to be expected and are part of what makes each piece distinctive.
          </p>
        </section>

        <hr className="product-detail-divider" />

        <section className="emporium-about-section">
          <h2 className="emporium-about-heading">Pricing and payment</h2>
          <p className="emporium-about-body">
            All prices are shown in GBP and include VAT where applicable. Payment is processed securely through Stripe. We accept all major credit and debit cards.
          </p>
        </section>

        <hr className="product-detail-divider" />

        <section className="emporium-about-section">
          <h2 className="emporium-about-heading">Shipping</h2>
          <p className="emporium-about-body">
            Orders are dispatched within 3–5 working days of purchase. All items are insured during postage. You will receive a confirmation email when your order has been dispatched. We currently ship to the UK, USA, Canada, Australia, Germany, France, Netherlands, and Ireland.
          </p>
        </section>

        <hr className="product-detail-divider" />

        <section className="emporium-about-section">
          <h2 className="emporium-about-heading">Returns and refunds</h2>
          <p className="emporium-about-body">
            We offer a 14-day return policy from the date of delivery. To be eligible for a return, the item must be unused and in the same condition as received.
          </p>
          <p className="emporium-about-body">
            To initiate a return, contact flame@wrenegade.co.uk within 14 days of delivery. Return postage costs are the responsibility of the buyer unless the item arrives damaged or not as described.
          </p>
          <p className="emporium-about-body">
            Refunds will be processed within 14 days of receiving the returned item.
          </p>
          <p className="emporium-about-body">
            Damaged items: All items are insured during postage. If your item arrives damaged, please photograph the damage and packaging immediately and contact us within 48 hours of delivery. We will arrange a full refund or replacement at no cost to you.
          </p>
          <p className="emporium-about-body">
            Custom and made-to-order items are non-refundable unless they arrive damaged or materially different from what was agreed.
          </p>
        </section>

        <hr className="product-detail-divider" />

        <section className="emporium-about-section">
          <h2 className="emporium-about-heading">Intellectual property</h2>
          <p className="emporium-about-body">
            All designs, sigils, and creative work produced by Emporium Alchymia remain the intellectual property of Reuben Haines. Reproduction without permission is not permitted.
          </p>
        </section>

        <hr className="product-detail-divider" />

        <section className="emporium-about-section">
          <h2 className="emporium-about-heading">Limitation of liability</h2>
          <p className="emporium-about-body">
            Our liability is limited to the value of the goods purchased. We are not liable for any indirect or consequential loss arising from your use of the products.
          </p>
        </section>

        <hr className="product-detail-divider" />

        <section className="emporium-about-section">
          <h2 className="emporium-about-heading">Governing law</h2>
          <p className="emporium-about-body">
            These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>
        </section>

        <hr className="product-detail-divider" />

        <section className="emporium-about-section">
          <h2 className="emporium-about-heading">Contact</h2>
          <p className="emporium-about-body">
            For any questions regarding these terms, contact flame@wrenegade.co.uk
          </p>
        </section>
      </article>
    </main>
  );
}
