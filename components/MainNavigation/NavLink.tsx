import { ReactElement, useState } from 'react';

import { useRouter } from 'next/router';
import { Route } from './routes';

import styles from './mainNavigation.module.css';
import Link from 'next/link';

interface Props {
  route: Route;
  setMobileMenuOpen: (isOpen: boolean) => void;
}

const NavLink = ({ route, setMobileMenuOpen }: Props): ReactElement => {
  const router = useRouter();
  const isCurrent = router.pathname.includes(route.url);
  const [subMenuOpen, setSubMenuOpen] = useState(isCurrent);

  const linkStyles = [styles.navLink];
  if (isCurrent) {
    linkStyles.push(styles.activeLink);
  }
  if (subMenuOpen) {
    linkStyles.push(styles.subMenuOpen);
  }
  if (route.subRoutes) {
    linkStyles.push(styles.hasSubLinks);
  }
  const className = linkStyles.join(' ');

  return (
    <li key={route.url}>
      {route.subRoutes && (
        <a className={className} onClick={() => setSubMenuOpen(!subMenuOpen)}>
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

      {route.subRoutes && subMenuOpen && route.subRoutes.map(subRoute => {
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
};

export default NavLink;