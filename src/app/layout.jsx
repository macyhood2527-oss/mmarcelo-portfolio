import '../styles/tokens.css';
import '../styles/globals.css';

import Header from '../components/layout/Header.jsx';
import Footer from '../components/layout/Footer.jsx';
import RouteTransition from '../components/layout/RouteTransition.jsx';

export const metadata = {
  title: 'Melissa Marcelo | Developer Portfolio',
  description: 'Backend-focused developer portfolio featuring practical systems, projects, experience, and sandbox experiments.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>
          <RouteTransition>{children}</RouteTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
