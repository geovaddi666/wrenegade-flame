import Navbar from '@/components/Navbar';

const description =
  'Freestyle fire dancer and spoken word artist in the UK. Solo and two-man fire shows for festivals, ceremonies, private events and music videos.';

export const metadata = {
  title: 'Wrenegade Flame | Fire Performer for Events & Music Videos',
  description,
  keywords: [
    'fire performer',
    'fire dancer',
    'fire spinning',
    'fire show',
    'fire performer for music videos',
    'fire spinning music video',
    'two-man fire show',
    'spoken word artist',
  ],
  alternates: { canonical: '/flame' },
  openGraph: {
    title: 'Wrenegade Flame | Fire Performer',
    description,
    url: '/flame',
    type: 'website',
    images: [{ url: '/gallery/PXL_20250704_215213959_exported_77369.jpg' }],
  },
};

export default function FlameLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
