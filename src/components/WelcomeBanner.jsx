import { useState } from 'react';

// Simple interactive banner to verify React rendering inside Astro.
export default function WelcomeBanner({ name = 'Astro' }) {
  const [count, setCount] = useState(0);

  return (
    <div className="content-wrapper">
      <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="py-4 mb-6">Page 1</h4>
        <p>
          Sample page.<br />For more layout options use

          <a
            href="https://demos.pixinvent.com/materialize-html-admin-template/documentation/layouts.html"
            target="_blank"
            className="fw-medium"
          >Layout docs</a
          >.
        </p>
      </div>

      <footer className="content-footer footer bg-footer-theme">
        <div className="container-xxl">
          <div
            className="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
            <div className="mb-2 mb-md-0">
              &#169;
              <script type='inline'>
                document.write(new Date().getFullYear());
              </script>
              , made with ❤️ by
              <a href="https://pixinvent.com" target="_blank" className="footer-link fw-medium">Pixinvent</a>
            </div>
            <div className="d-none d-lg-inline-block">
              <a href="https://themeforest.net/user/pixinvent/portfolio" target="_blank" className="footer-link me-4"
              >More Themes</a
              >
              <a
                href="https://demos.pixinvent.com/materialize-html-admin-template/documentation/"
                target="_blank"
                className="footer-link me-4"
              >Documentation</a
              >
            </div>
          </div>
        </div>
      </footer>
      <div className="content-backdrop fade"></div>
    </div>
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
