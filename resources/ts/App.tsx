import './i18n';
import './assets/app.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { Layout } from "@/components/layout/Layout";
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { UserData } from "@/stores/user";
import { GeneralSettingsProps } from "@/api/getSettings";

interface UserAuth {
  el: HTMLElement
  App: React.ComponentType<any>
  props: {
    initialPage: {
      props: {
        layout: LayoutType
        locale: string
        generalSettings: GeneralSettingsProps
        auth: {
          user: UserData
        }
      }
    }
  }
}

export type LayoutType = 'admin' | 'app'

createInertiaApp({
  resolve: (name) => resolvePageComponent(`./components/pages/${name}.tsx`, import.meta.glob('./components/pages/**/*.tsx')),
  setup({ el, App, props }: UserAuth) {
    const userAuth = props.initialPage.props.auth.user
    const layout = props.initialPage.props.layout
    const locale = props.initialPage.props.locale
    const generalSettings = props.initialPage.props.generalSettings

    createRoot(el).render(
      <Layout userAuth={userAuth} layout={layout} locale={locale} generalSettings={generalSettings}>
        <App {...props} />
      </Layout>
    )
  },
  progress: {
    delay: 25
  }
})
