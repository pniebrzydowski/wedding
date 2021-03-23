import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';

import styles from './mainNavigation.module.css';
import getRoutes from './routes';

const MainNavigation = (): ReactElement => {
  const router = useRouter();
  const routes = getRoutes();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navClasses = [styles.nav, mobileMenuOpen ? styles.visible : styles.hidden].join(' ');
  return (
    <>
      <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={styles.mobileMenuTrigger}>
      Menu
      </button>
      <nav className={navClasses}>
        <ul className={styles.navList}>
          {routes.map((route) => {
            const isCurrent = router.pathname === route.url;
            const linkStyle =
             isCurrent ? [styles.navLink, styles.activeLink] : [styles.navLink];

            return (
              <li key={route.url}>
                <Link href={route.url}>
                  <a className={linkStyle.join(' ')} onClick={() => {
                    if (isCurrent) {
                      setMobileMenuOpen(false);
                    }
                  }}>{route.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default MainNavigation;
