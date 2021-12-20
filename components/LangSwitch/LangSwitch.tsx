import { useRouter } from 'next/router';
import { ReactElement } from 'react';

import styles from '../MainNavigation/mainNavigation.module.css';

const MainNavigation = (): ReactElement => {
  const router = useRouter();

  return (
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
  );
};

export default MainNavigation;
