import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import styles from './mainNavigation.module.css';
import getRoutes from './routes';

const MainNavigation = (): ReactElement => {
  const router = useRouter();
  const routes = getRoutes();

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {routes.map((route) => {
          const linkStyle =
            router.pathname === route.url ? [styles.navLink, styles.activeLink] : [styles.navLink];

          return (
            <li key={route.url}>
              <Link href={route.url}>
                <a className={linkStyle.join(' ')}>{route.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MainNavigation;
