export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {year} Wrenegade Flame. All rights reserved.</p>
        <div className="social-links">
          <a href="https://www.instagram.com/wrenegade_flame" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
