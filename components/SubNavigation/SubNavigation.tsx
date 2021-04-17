import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { Route } from '../MainNavigation/routes';

import styles from './subNavigation.module.css';

interface Props {
  routes: Route[];
}

const SubNavigation = ({ routes }: Props): ReactElement => {
  const router = useRouter();

  return (
    <>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {routes.map((route) => {
            const isCurrent = router.pathname === route.url;
            const linkStyle =
              isCurrent ? [styles.navLink, styles.activeLink] : [styles.navLink];

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
    </>
  );
};

export default SubNavigation;
