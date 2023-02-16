/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

// import { isLogin } from 'auth';

import React, { lazy } from 'react';
// import { Redirect } from 'react-router-dom';

const LoginPage = lazy(() => import('../containers/LoginPage'));

const WelcomePage = lazy(() => import('../containers/WelcomePage'));
// const DashboardPageProvider = lazy(() => import('../containers/DashboardsPage'));
const SettingPage = lazy(() => import('containers/SettingPage'));
const HelpCenterPage = lazy(() => import('containers/HelpCenterPage'));
const EditProductProvider = lazy(() => import('containers/EmailPage/edit'));
const EditCompanyProvider = lazy(() => import('containers/CompanyPage/edit'));
const EditFContactGroupProvider = lazy(() => import('containers/ContactGroupPage/edit'));
const DigitalAssetsPage = lazy(() => import('containers/DigitalAssetsPage'));
const EditContactProvider = lazy(() => import('containers/ContactPage/edit'));

const ProfilePage = lazy(() => import('../containers/ProfilePage'));
const EmailPage = lazy(() => import('../containers/EmailPage'));
const CategoriesPage = lazy(() => import('../containers/CompanyPage'));
const ContactPage = lazy(() => import('../containers/ContactPage'));
const ContactGroupPage = lazy(() => import('../containers/ContactGroupPage'));

const authRoutes = [
  {
    path: '/login',
    exact: true,
    main: () => <LoginPage />,
  },
];

const mainRoutes = [
  {
    path: ['/'],
    exact: true,
    main: () => <EmailPage />,
  },
  {
    path: ['/email', '/email/all'],
    exact: true,
    main: () => <EmailPage />,
  },
  {
    path: ['/company', '/company'],
    exact: true,
    main: () => <CategoriesPage />,
  },
  {
    path: ['/setting', '/setting/configuration'],
    exact: true,
    main: () => <SettingPage />,
  },
  {
    path: '/help-center',
    exact: true,
    main: () => <HelpCenterPage />,
  },
  {
    path: '/email/edit/:id',
    exact: true,
    main: ({ match }) => <EditProductProvider match={match} />,
  },
  {
    path: '/email/add',
    exact: true,
    main: () => <EditProductProvider />,
  },
  {
    path: '/company/edit/:id',
    exact: true,
    main: ({ match }) => <EditCompanyProvider match={match} />,
  },
  {
    path: '/company/add',
    exact: true,
    main: () => <EditCompanyProvider />,
  },
  {
    path: '/contact-groups',
    exact: true,
    main: () => <ContactGroupPage />,
  },
  {
    path: '/contact-groups/edit/:id',
    exact: true,
    main: ({ match }) => <EditFContactGroupProvider match={match} />,
  },
  {
    path: '/contact-groups/add',
    exact: true,
    main: () => <EditFContactGroupProvider />,
  },
  {
    path: '/dam',
    exact: true,
    main: () => <DigitalAssetsPage />,
  },
  {
    path: '/contacts',
    exact: true,
    main: () => <ContactPage />,
  },
  {
    path: '/contacts/edit/:id',
    exact: true,
    main: ({ match }) => <EditContactProvider match={match} />,
  },
  {
    path: '/contacts/add',
    exact: true,
    main: () => <EditContactProvider />,
  },
];

const settingRoutes = [
  {
    path: '/profile',
    exact: false,
    main: ({ match, location }) => <ProfilePage match={match} location={location} />,
  },
  {
    path: '/welcome',
    exact: true,
    main: () => <WelcomePage />,
  },
];

export { authRoutes, mainRoutes, settingRoutes };
