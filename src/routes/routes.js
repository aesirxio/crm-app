/*
 * @copyright   Copyright (C) 2022 AesirX. All rights reserved.
 * @license     GNU General Public License version 3, see LICENSE.
 */

import React, { lazy } from 'react';
import { LoginPage, ProfilePage, DigitalAssetsPage } from 'aesirx-uikit';

const SettingPage = lazy(() => import('containers/SettingPage'));
const HelpCenterPage = lazy(() => import('containers/HelpCenterPage'));
const EditProductProvider = lazy(() => import('containers/EmailPage/edit'));
const EditOpportunityProvider = lazy(() => import('containers/OpportunityPage/edit'));
const EditCompanyProvider = lazy(() => import('containers/CompanyPage/edit'));
const EditFContactGroupProvider = lazy(() => import('containers/ContactGroupPage/edit'));

const EditContactProvider = lazy(() => import('containers/ContactPage/edit'));

const EmailPage = lazy(() => import('../containers/EmailPage'));
const OpportunitiesPage = lazy(() => import('../containers/OpportunityPage'));
const CompaniesPage = lazy(() => import('../containers/CompanyPage'));
const ContactPage = lazy(() => import('../containers/ContactPage'));
const ContactGroupPage = lazy(() => import('../containers/ContactGroupPage'));

const authRoutes = [
  {
    path: '/login',
    exact: true,
    main: () => <LoginPage text="CRM" />,
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
    path: ['/opportunity', '/opportunity'],
    exact: true,
    main: () => <OpportunitiesPage />,
  },
  {
    path: ['/company', '/company'],
    exact: true,
    main: () => <CompaniesPage />,
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
    path: '/opportunity/edit/:id',
    exact: true,
    main: ({ match }) => <EditOpportunityProvider match={match} />,
  },
  {
    path: '/opportunity/add',
    exact: true,
    main: () => <EditOpportunityProvider />,
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
];

export { authRoutes, mainRoutes, settingRoutes };
