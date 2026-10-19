import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'Wrenegade Flame | Fire Performer',
  description:
    'Professional fire performance and entertainment for festivals, private events, and corporate gatherings',
};

export default function FlameLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
