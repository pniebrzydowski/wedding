
import { ReactElement, useEffect } from 'react';

import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

import { firebase, FirebaseContext } from '../firebase';
import '../styles/global.css';
import { useRouter } from 'next/router';

dayjs.extend(localizedFormat);

const changeLocale = async (localeCode: string) => {
  const { messages } = await import(
    `../locales/${localeCode}/messages.js`
  );
  const plurals = await import('make-plural/plurals');

  i18n.loadLocaleData(localeCode, { plurals: plurals[localeCode] });
  i18n.load(localeCode, messages);
  i18n.activate(localeCode);
};

const changeDatesLocale = async (localeCode: string) => {
  await import(`dayjs/locale/${localeCode}.js`);
  dayjs.locale(localeCode);
};

function App({ Component, pageProps }: any): ReactElement {
  const { locale } = useRouter();
  useEffect(() => {
    changeLocale(locale);
    changeDatesLocale(locale);
  }, [locale]);

  return (
    <I18nProvider i18n={i18n}>
      <FirebaseContext.Provider value={firebase}>
        <Component {...pageProps} />
      </FirebaseContext.Provider>
    </I18nProvider>
  );
}
export default App;
