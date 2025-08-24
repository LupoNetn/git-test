

export function renderHome() {
    const content = document.getElementById('content');

content.innerHTML = 
`   <section class="hero">
      <h1>Welcome to <span>D'e Lore</span> Restaurant</h1>
      <p>Experience the finest dining with us! Indulge in a blend of flavors, ambiance, and unforgettable service.</p>
      <button class="cta">Book a Table</button>
    </section>

    <section class="features">
      <div class="feature-card">
        <h2>🍽️ Gourmet Menu</h2>
        <p>A wide variety of dishes prepared by world-class chefs.</p>
      </div>
      <div class="feature-card">
        <h2>🥂 Cozy Atmosphere</h2>
        <p>Enjoy dining in a relaxing and elegant environment.</p>
      </div>
      <div class="feature-card">
        <h2>⭐ Exceptional Service</h2>
        <p>Our team ensures your dining experience is memorable.</p>
      </div>
    </section>
`
}