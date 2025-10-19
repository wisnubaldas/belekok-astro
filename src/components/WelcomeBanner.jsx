import { useState } from 'react';

// Simple interactive banner to verify React rendering inside Astro.
export default function WelcomeBanner({ name = 'Astro' }) {
  const [count, setCount] = useState(0);

  return (
 <>
 <h1>dasdasdas</h1>
 </>
  );
}

// const styles = {
//   wrapper: {
//     margin: '0 auto',
//     maxWidth: '32rem',
//     padding: '3rem 1.5rem',
//     textAlign: 'center',
//   },
//   heading: {
//     fontSize: '2.5rem',
//     marginBottom: '1rem',
//   },
//   text: {
//     marginBottom: '1.5rem',
//     lineHeight: 1.6,
//   },
//   button: {
//     backgroundColor: '#6b5cff',
//     border: 'none',
//     borderRadius: '0.5rem',
//     color: '#fff',
//     cursor: 'pointer',
//     fontSize: '1rem',
//     fontWeight: 600,
//     padding: '0.75rem 1.5rem',
//   },
// };
