import { i18n } from '@lingui/core';
import { defineMessage } from '@lingui/macro';

interface Route {
  name: string,
  url: string,
  title: string
}

export enum RouteName {
  Home = 'home',
  Location = 'location',
  Faq = 'faq',
  Accommodation = 'accommodations',
  Reply = 'reply'
}


const getRoutes = (): Route[] => {
  return [
    {
      name: RouteName.Home,
      url: '/home',
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
      name: RouteName.Location,
      url: '/location',
      title: i18n._(defineMessage({
        id: 'pageTitle:location',
        message: 'Location'
      }))
    },
    {
      name: RouteName.Faq,
      url: '/faq',
      title: i18n._(defineMessage({
        id: 'pageTitle:faq',
        message: 'FAQ'
      }))
    },
    {
      name: RouteName.Accommodation,
      url: '/accommodations',
      title: i18n._(defineMessage({
        id: 'pageTitle:accommodation',
        message: 'Accommodations'
      }))
    },
    {
      name: RouteName.Reply,
      url: '/reply',
      title: i18n._(defineMessage({
        id: 'pageTitle:reply',
        message: 'Reply'
      }))
    },
  ];
};

export const getRouteUrl = (name: RouteName): string => {
  const routes = getRoutes();
  const idx = routes.findIndex(v => v.name === name);
  console.log(idx, name);
  return routes[idx].url;
};

export default getRoutes;
