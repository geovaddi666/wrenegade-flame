import FlameSigil from './FlameSigil';

const PERFORMANCES = [
  {
    title: 'Solo Freestyle Fire Sets',
    description:
      'Improvised, trance-led performances that respond to the music in the moment. A conjuring of magic.',
  },
  {
    title: 'Two-Man Fire Show',
    description:
      'Two performers, twice the energy. Martial arts and fire spinning weave together, dancing with real combat.',
  },
  {
    title: 'Festivals & Gatherings',
    description:
      'High-energy fire artistry for festivals, soundsystem events and outdoor celebrations.',
  },
  {
    title: 'Private & Ceremonial',
    description:
      'Intimate fire rituals and performances for weddings, ceremonies and private events.',
  },
];

const BEYOND = [
  {
    title: 'Spoken Word',
    description:
      'Poetry with a social edge. It’s written to spark creative rebellion and to name what’s stirring beneath these times, and to leave people with hope and passion. Nothing symbolises that like a flaming sword.',
  },
];

function Card({ title, description }) {
  return (
    <div className="service-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Services() {
  return (
    <>
      <section id="services" className="services">
        <div className="container">
          <h2 className="section-title">Performances</h2>
          <div className="services-grid">
            {PERFORMANCES.map((s) => (
              <Card key={s.title} {...s} />
            ))}
          </div>

          <div className="beyond">
            <h3 className="beyond-title">Beyond the Flame</h3>
            <p className="beyond-intro">
              I am not just a fire dancer; among other passions, I am also a poet.
              To my pleasure, allow me to share them as one.
            </p>
            <div className="services-grid services-grid-single">
              {BEYOND.map((s) => (
                <Card key={s.title} {...s} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="flame-versatility" aria-labelledby="versatility-title">
        <FlameSigil />
        <h2 id="versatility-title" className="versatility-title">
          <span>Any Music.</span> <span>Any Mood.</span>
        </h2>
        <p>
          I have my own style, but I can dance to anything. Want a rock and roll fire
          show? Great. Elegant and sensual? Great. A full-power pagan fire ritual? Great.
        </p>
        <p className="versatility-video">
          Making a music video? I&rsquo;ll shape the fire to your track and your vision.
        </p>
        <p className="versatility-statement">
          I am an artist first and a performer second. My movement is my magic, and it
          is my greatest joy to share that.
        </p>
      </section>
    </>
  );
}
