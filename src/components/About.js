import Image from 'next/image';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Welcome to Wrenegade Flame &mdash; a solo freestyle fire artist working
              through channelled states of flow and trance. My art is movement meditation
              with fire: passionate, elegant, and ferocious.
            </p>
            <p>
              Every performance is improvised and alive &mdash; a dialogue between body,
              flame, and the moment. No two shows are ever the same.
            </p>
          </div>
          {/* Frame matches this photo's near-square shape so both flames stay in view */}
          <div className="about-image flame-frame" style={{ aspectRatio: '816 / 878' }}>
            <div className="flame-frame-photo">
            <Image
              src="/gallery/PXL_20260919_212102814.jpg"
              alt="Wrenegade spinning a fire staff in leathers, with painted sigils across his chest"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
