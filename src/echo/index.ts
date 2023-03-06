// @ts-nocheck
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import { ApolloLink, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { createLighthouseSubscriptionLink } from './subscription-link'

export default async (nuxtApp) => {
  window.Pusher = Pusher

  const echo = await new Echo({
    broadcaster: 'pusher',
    key: 'soketi',
    wsHost: '127.0.0.1',
    wsPort: 6001,
    cluster: 'mt1',
    forceTLS: false,
    encrypted: true,
    authEndpoint: 'http://127.0.0.1:9001/graphql/subscriptions/auth',
    auth: {
      headers: {
        Authorization: nuxtApp.$auth.strategy.token.get()
      }
    },
  })

  echo.connector.pusher.connection.bind('connected', function () {
    echo.options.auth.headers['X-Socket-ID'] = echo.socketId()
  })

  return new ApolloClient({
    link: ApolloLink.from([
      createLighthouseSubscriptionLink(echo),
      createHttpLink({
        uri: 'http://127.0.0.1:9001/graphql',
      })
    ]),
    cache: new InMemoryCache(),
  })
}