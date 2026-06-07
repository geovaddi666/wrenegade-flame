import EmporiumNav from '@/components/emporium/EmporiumNav';
import EmporiumFooter from '@/components/emporium/EmporiumFooter';

export const metadata = {
  title: 'Emporium Alchymia | Wrenegade Flame',
  description:
    'A small collection of hand-made artefacts — fire staves and tooled leather — from the Emporium Alchymia.',
};

export default function EmporiumLayout({ children }) {
  return (
    <div className="emporium-root">
      <EmporiumNav />
      {children}
      <EmporiumFooter />
    </div>
  );
}
