import './i18n';
import './assets/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { Layout } from "@/components/layout/Layout";
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { UserData } from "@/stores/user";

interface UserAuth {
  el: HTMLElement
  App: React.ComponentType<any>
  props: {
    initialPage: {
      props: {
        layout: LayoutType
        locale: string
        appSettings: AppSettings
        auth: {
          user: UserData
        }
      }
    }
  }
}

export type AppSettings = {
  site_name: string,
  time_zone: string | null
}

export type LayoutType = 'admin' | 'app'

createInertiaApp({
  resolve: (name) => resolvePageComponent(`./components/pages/${name}.tsx`, import.meta.glob('./components/pages/**/*.tsx')),
  setup({ el, App, props }: UserAuth) {
    const userAuth = props.initialPage.props.auth.user
    const layout = props.initialPage.props.layout
    const locale = props.initialPage.props.locale
    const appSettings = props.initialPage.props.appSettings

    createRoot(el).render(
      <Layout userAuth={userAuth} layout={layout} locale={locale} appSettings={appSettings}>
        <App {...props} />
      </Layout>
    )
  },
  progress: {
    delay: 25
  }
})
