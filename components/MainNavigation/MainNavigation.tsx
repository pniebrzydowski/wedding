import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import SubNavigation from '../SubNavigation';

import styles from './mainNavigation.module.css';
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
          {routes.map((route) => {
            const router = useRouter();
            const isCurrent = router.pathname.includes(route.url);
            const linkStyle = isCurrent ? [styles.navLink, styles.activeLink] : [styles.navLink];
            if (route.subRoutes) {
              linkStyle.push(styles.hasSubLinks);
            }
            const className = linkStyle.join(' ');

            return (
              <li key={route.url}>
                {route.subRoutes && (
                  <a className={className}>
                    {route.title}
                  </a>
                )}
                <Link href={route.url} key={route.url}>
                  <a className={className} onClick={() => {
                    if (isCurrent) {
                      setMobileMenuOpen(false);
                    }
                  }}>{route.title}</a>
                </Link>

                {route.subRoutes && route.subRoutes.map(subRoute => {
                  const isSubCurrent = router.pathname === subRoute.url;
                  const subLinkStyle = [styles.navLink, styles.subLink];
                  if (isSubCurrent) {
                    subLinkStyle.push(styles.activeLink);
                  }
                  return (
                    <Link href={subRoute.url} key={subRoute.url}>
                      <a className={subLinkStyle.join(' ')} onClick={() => {
                        if (isSubCurrent) {
                          setMobileMenuOpen(false);
                        }
                      }}>{subRoute.title}</a>
                    </Link>
                  );
                })}
              </li>
            );
          })}
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
