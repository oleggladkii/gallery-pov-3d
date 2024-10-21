import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
  Sentry.init({
    dsn: '',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  })
})
