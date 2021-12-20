import { ReactElement } from 'react';
import { getRouteUrl, RouteName } from '../../MainNavigation/routes';

import styles from './splashScreen.module.css';

const SplashScreen = (): ReactElement => {
  const infoUrl = getRouteUrl(RouteName.PartyUS);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Christina & Patrick</h1>
      <nav>
        <ul className={styles.languageList}>
          <li>
            <a href={infoUrl} className={styles.languageLink}>
              <img src="/images/eagle-us-gold.png" className={styles.imgEagle} />
              Continue
            </a>
          </li>
          <li>
            <a href={`/de${infoUrl}`} className={styles.languageLink}>
              <img src="/images/eagle-aut-gold.png" className={styles.imgEagle} />
              Weiter
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <h2 className={styles.subTitle}>June 25, 2022</h2>
        <h2 className={styles.subTitle}>Sterling Heights, MI</h2>
      </div>
    </div>
  );
};

export default SplashScreen;
