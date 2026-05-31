const SERVICES = [
  {
    title: 'Freestyle Fire Sets',
    description:
      'Improvised, trance-led performances that respond to the music and the moment.',
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
  {
    title: 'Fire Organising',
    description:
      'Curating and coordinating fire spinning circles and performances for your event.',
  },
];

export default function Services() {
  return (
    <section id="services" className="services">
      <div className="container">
        <h2 className="section-title">Performances</h2>
        <div className="services-grid">
          {SERVICES.map((service) => (
            <div className="service-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
