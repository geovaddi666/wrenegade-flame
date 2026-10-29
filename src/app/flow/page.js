import Link from 'next/link';
import styles from './flow.module.css';

// Telegram invite link for the Flow circle.
// If it's ever emptied, the join button hides itself so there's never a dead link.
const TELEGRAM_URL = 'https://t.me/+ckaRCwviz-ExZGFk';

export const metadata = {
  title: 'Wrenegade Flow | Fire Spinning as Ritual',
  description:
    'Fire spinning as a ritual tool of transmutation. Art as magic, flow as connection with Self, trance as gnosis. Join the Wrenegade Flow circle on Telegram.',
};

export const viewport = {
  themeColor: '#f9f8f4',
};

export default function FlowPage() {
  return (
    <main className={styles.page}>
      <div className={styles.backdrop} aria-hidden="true" />

      <div className={styles.inner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.glyph}
          src="/portal/flow.webp"
          alt=""
          width={760}
          height={760}
        />
        <p className={styles.eyebrow}>Wrenegade Flow</p>
        <h1 className={styles.title}>
          Fire Spinning as a Ritual Tool of Transmutation
        </h1>

        <div className={styles.verse}>
          <p>
            In the expression of creativity,
            <br />
            Our highest potential is realized.
          </p>
          <p>
            Art,
            <br />
            As magic,
          </p>
          <p>
            Flow,
            <br />
            As uninterrupted connection with Self,
          </p>
          <p>
            Trance,
            <br />
            As the ancient method of Gnosis,
          </p>
          <p className={styles.fire}>Through Fire;</p>
          <p className={styles.transformation}>Transformation.</p>
        </div>

        <p className={styles.promise}>I am here to help you find your way.</p>

        <div className={styles.invite}>
          <p className={styles.body}>
            The conversation continues on Telegram: a free, open space to share
            practice, ask questions and explore these ideas together. It&rsquo;s time
            to stand.
          </p>
          {TELEGRAM_URL && (
            <a
              className={styles.join}
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Join the circle on Telegram
            </a>
          )}
        </div>

        <Link href="/" className={styles.back}>
          &larr; Return to the portal
        </Link>
      </div>
    </main>
  );
}
