import Link from 'next/link';
import { useRouter } from 'next/router';

import styles from './mainNavigation.module.css';
import routes from './routes';


const MainNavigation = () => {
  const router = useRouter();
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {routes.map((route) => {
          const linkStyle =
            router.pathname === route.url ? styles.activeLink : styles.navLink;

          return (
            <li key={route.url}>
              <Link href={route.url}>
                <a className={linkStyle}>{route.title}</a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default MainNavigation;
