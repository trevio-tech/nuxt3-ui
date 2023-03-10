// @ts-nocheck

import { useNuxtApp, useFetch } from 'nuxt/app'

export default async ({ query, variables = {} }, options = {}) => {
  const { $auth, $config } = useNuxtApp()

  const isFormData = query instanceof FormData

  const headers = {
    Accept: 'application/json',
    Authorization: $auth.strategy.token.get(),
  }

  let body = query

  if (! isFormData) {
    body = {
      query: query
        .trim()
        .replaceAll(/\s+/ig, ' '),
      variables
    }
  }

  const { data, refresh, pending } = await useFetch($config.public.GRAPHQL_URL_V2, {
    method: 'POST',
    headers,
    body,
    ...options
  })

  if (typeof data.value === 'object' && Object.hasOwn(data.value, 'errors')) {
    throw data.value?.errors[0]
  }

  return {
    ...data.value,
    refresh,
    pending
  }
}