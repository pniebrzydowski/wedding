import { i18n } from '@lingui/core';
import { defineMessage } from '@lingui/macro';

interface Route {
  url: string,
  title: string
}

const getRoutes = (): Route[] => {
  return [
    {
      url: '/',
      title: i18n._(defineMessage({
        id: 'pageTitle:home',
        message: 'Home'
      }))
    },
    /*
      {
      url: '/about',
      title: i18n._(defineMessage({
        id: 'pageTitle:about',
        message: 'About Us'
      }))
    },
    */
    {
      url: '/location',
      title: i18n._(defineMessage({
        id: 'pageTitle:location',
        message: 'Location'
      }))
    },
    {
      url: '/faq',
      title: i18n._(defineMessage({
        id: 'pageTitle:faq',
        message: 'FAQ'
      }))
    },
    {
      url: '/accommodation',
      title: i18n._(defineMessage({
        id: 'pageTitle:accommodation',
        message: 'Accommodation'
      }))
    },
    {
      url: '/reply',
      title: i18n._(defineMessage({
        id: 'pageTitle:reply',
        message: 'Reply'
      }))
    },
  ];
};

export default getRoutes;
