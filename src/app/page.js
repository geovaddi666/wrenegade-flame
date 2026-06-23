import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "var(--dark-bg)",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            fontFamily: "var(--heading-font)",
            color: "var(--ember)",
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Back tomorrow.
        </h1>
      </div>
      <Footer />
    </main>
  );
}
