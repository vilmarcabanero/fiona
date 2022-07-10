/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from '../styles/global-styles';

// import { HomePage } from './pages/DummyPage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { PostPage } from './pages/PostPage';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Fiona"
        defaultTitle="Fiona"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="A Fiona application" />
      </Helmet>

      <Switch>
        <Route exact path={process.env.PUBLIC_URL + '/'} component={PostPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
