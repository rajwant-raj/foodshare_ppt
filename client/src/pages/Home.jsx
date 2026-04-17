export default function Home() {
  return (
    <div className="container">
      <div className="hero">
        <h1>Reduce Food Waste, Feed Lives</h1>
        <p>Connect donors with NGOs instantly</p>
        <button onClick={()=>window.location.href="/donate"}>
          Donate Now
        </button>
      </div>
    </div>
  );
}