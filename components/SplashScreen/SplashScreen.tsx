import { ReactElement } from 'react';
import { getRouteUrl, RouteName } from '../MainNavigation/routes';

import styles from './splashScreen.module.css';

const SplashScreen = (): ReactElement => {
  const infoUrl = getRouteUrl(RouteName.Home);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Patrick & Christina</h1>
      <nav>
        <ul className={styles.languageList}>
          <li>
            <a href={`/de${infoUrl}`} className={styles.languageLink}>
              <img src="/images/eagle-aut-gold.png" className={styles.imgEagle} />
              Weiter
            </a>
          </li>
          <li>
            <a href={infoUrl} className={styles.languageLink}>
              <img src="/images/eagle-us-gold.png" className={styles.imgEagle} />
              Continue
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <h2 className={styles.subTitle}>August 28, 2021</h2>
        <h2 className={styles.subTitle}>Grein, Austria</h2>
      </div>
    </div>
  );
};

export default SplashScreen;
