import React, { useState } from 'react';

const faqItems = [
  { q: 'How long does shipping take?', a: 'Metro areas: 2-4 days. Provincial: 4-8 days.' },
  { q: 'Can I return items?', a: 'Yes, within 7 days if unworn and with tags attached.' },
  { q: 'Do you restock sold out items?', a: 'Selected bestsellers are restocked weekly.' }
];

function FAQPage() {
  const [open, setOpen] = useState(0);

  return (
    <main className="container section-space">
      <h1>FAQ</h1>
      <div className="faq-list">
        {faqItems.map((item, index) => (
          <article key={item.q} className="faq-item">
            <button className="faq-q" onClick={() => setOpen(index === open ? -1 : index)}>
              {item.q}
            </button>
            {open === index && <p className="faq-a">{item.a}</p>}
          </article>
        ))}
      </div>
    </main>
  );
}

export default FAQPage;
