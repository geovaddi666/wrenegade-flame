import Link from 'next/link';
import styles from './flow.module.css';

export const metadata = {
  title: 'Wrenegade Flow | Flow Arts Teaching',
  description:
    'Learn flow arts with Wrenegade: staff spinning, movement and fire. Lessons and bookable sessions coming soon.',
};

export const viewport = {
  themeColor: '#0a0813',
};

export default function FlowPage() {
  return (
    <main className={styles.page}>
      <div className={styles.inner}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.glyph}
          src="/portal/flow.webp"
          alt="Flow: a water and fire yin-yang"
          width={760}
          height={760}
        />
        <p className={styles.eyebrow}>Wrenegade Flow</p>
        <h1 className={styles.title}>This threshold is still being built</h1>
        <p className={styles.body}>
          Lessons, bookable sessions and free tutorials are on their way. If you&rsquo;d
          like to learn with me before then, write to{' '}
          <a href="mailto:flame@wrenegade.co.uk">flame@wrenegade.co.uk</a>.
        </p>
        <Link href="/" className={styles.back}>
          &larr; Return to the portal
        </Link>
      </div>
    </main>
  );
}
