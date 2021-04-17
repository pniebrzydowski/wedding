import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import SubNavigation from '../SubNavigation';

import styles from './mainNavigation.module.css';
import NavLink from './NavLink';
import getRoutes from './routes';

const MainNavigation = (): ReactElement => {
  const router = useRouter();
  const routes = getRoutes();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentRoute = routes.find(route => router.pathname.includes(route.url));

  const navClasses = [styles.nav, mobileMenuOpen ? styles.visible : styles.hidden].join(' ');
  return (
    <>
      <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={styles.mobileMenuTrigger}>
        Menu
      </button>
      <nav className={navClasses}>
        <ul className={styles.navList}>
          {routes.map((route) => <NavLink key={route.url} route={route} setMobileMenuOpen={setMobileMenuOpen} />)}
          <li>
            {router.locale === 'en' ? (
              <a className={[styles.navLink, styles.langLink].join(' ')} href={`de${router.pathname}`}>
                DE
              </a>
            ) : (
              <a className={[styles.navLink, styles.langLink].join(' ')} href={`${router.pathname}`}>
                EN
              </a>
            )}
          </li>
        </ul>
      </nav>

      {currentRoute?.subRoutes && <SubNavigation routes={currentRoute.subRoutes} />}
    </>
  );
};

export default MainNavigation;
