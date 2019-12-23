import App from 'next/app';
import fetch from 'node-fetch'
import Head from 'next/head';
import { AppProvider } from '@shopify/polaris';
import { Provider } from '@shopify/app-bridge-react';
import '@shopify/polaris/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import Cookies from 'js-cookie';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
    fetchOptions: {
      credentials: 'include'
    },
    link:{
      fetch:fetch,
    },
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'ignore',
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all',
      },
    }
  });
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const config = { apiKey: API_KEY, shopOrigin: Cookies.get("shopOrigin"), forceRedirect: true };
    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet="utf-8" />
          {/* <script src="https://kit.fontawesome.com/6180befa95.js" crossorigin="anonymous"></script> */}
        </Head>
        <Provider config={config}>
          <AppProvider i18n={translations}>
            <ApolloProvider client={client}>
                <Component {...pageProps}  apolloClient={client}/>
            </ApolloProvider>
          </AppProvider>
        </Provider>
      </React.Fragment>
    );
  }
}

export default MyApp;