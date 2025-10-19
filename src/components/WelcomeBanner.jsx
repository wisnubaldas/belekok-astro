import { useState } from 'react';

// Simple interactive banner to verify React rendering inside Astro.
export default function WelcomeBanner({ name = 'Astro' }) {
  const [count, setCount] = useState(0);

  return (
    <section style={styles.wrapper}>
      <h1 style={styles.heading}>Halo, {name}!</h1>
      <p style={styles.text}>
        Ini komponen React yang berjalan di proyek Astro SSR. Tekan tombol di bawah untuk mencoba interaksi klien.
      </p>
      <button type="button" style={styles.button} onClick={() => setCount((value) => value + 1)}>
        Klik saya ({count})
      </button>
    </section>
  );
}

const styles = {
  wrapper: {
    margin: '0 auto',
    maxWidth: '32rem',
    padding: '3rem 1.5rem',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
  },
  text: {
    marginBottom: '1.5rem',
    lineHeight: 1.6,
  },
  button: {
    backgroundColor: '#6b5cff',
    border: 'none',
    borderRadius: '0.5rem',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 600,
    padding: '0.75rem 1.5rem',
  },
};
