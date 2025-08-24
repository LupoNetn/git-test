export function renderAbout() {
  const content = document.getElementById("content");

  const about = document.createElement("div");
  about.classList.add("about");

  about.innerHTML = `
     <section class="about-hero">
      <h1>About <span>D'e Lore</span></h1>
      <p>At D'e Lore, we believe dining should be more than just a meal — it should be an experience.</p>
    </section>

    <section class="about-story">
      <h2>Our Story</h2>
      <p>Founded in 2010, D'e Lore started as a small family kitchen and has grown into one of the city's top fine-dining restaurants. Our chefs blend tradition with innovation to craft dishes that delight every palate.</p>
    </section>

    <section class="about-values">
      <h2>Our Values</h2>
      <ul>
        <li>🍴 Fresh, locally-sourced ingredients</li>
        <li>🤝 Warm hospitality & exceptional service</li>
        <li>🌍 Sustainability & eco-friendly practices</li>
      </ul>
    </section>
    `;

  content.appendChild(about);
}
