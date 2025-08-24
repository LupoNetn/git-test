export function renderContact() {
  const content = document.getElementById("content");

  const contact = document.createElement("div");
  contact.classList.add("contact");

  contact.innerHTML = `
    <section class="contact-hero">
      <h1>Contact <span>D'e Lore</span></h1>
      <p>We’d love to hear from you! Whether for reservations, events, or feedback, reach out anytime.</p>
    </section>

    <section class="contact-details">
      <div class="contact-card">
        <h2>📍 Visit Us</h2>
        <p>123 Flavor Street, Food City</p>
      </div>
      <div class="contact-card">
        <h2>📞 Call Us</h2>
        <p>+234 800 123 4567</p>
      </div>
      <div class="contact-card">
        <h2>✉️ Email Us</h2>
        <p>info@delore.com</p>
      </div>
    </section>

    <section class="contact-form">
      <h2>Send a Message</h2>
      <form>
        <input type="text" placeholder="Your Name" required>
        <input type="email" placeholder="Your Email" required>
        <textarea placeholder="Your Message" rows="5" required></textarea>
        <button type="submit" class="cta">Submit</button>
      </form>
    </section>`;

  content.appendChild(contact);
}
