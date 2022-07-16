/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

// import { HomePage } from './pages/DummyPage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { PostPage } from './pages/PostPage';
import { ProfilePage } from './pages/ProfilePage';
import { ProfileNotFoundPage } from './pages/ProfilePage/ProfileNotFoundPage';
import { selectProfile } from './pages/ProfilePage/slice/selectors';
import { useSelector } from 'react-redux';
import { MessagesPage } from './pages/MessagesPage';

export function App() {
  const { i18n } = useTranslation();
  const { currentUser } = useSelector(selectProfile);
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Fiona"
        defaultTitle="Fiona"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A Fiona application" />
      </Helmet>

      <Routes>
        <Route path={process.env.PUBLIC_URL + '/'} element={<PostPage />} />
        <Route
          path={process.env.PUBLIC_URL + '/messages'}
          element={<MessagesPage />}
        />
        <Route
          path={process.env.PUBLIC_URL + '/:username'}
          element={!currentUser ? <ProfileNotFoundPage /> : <ProfilePage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
