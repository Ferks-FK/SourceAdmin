import './i18n';
import './assets/app.css';
import './bootstrap.js';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { Layout } from "@/components/layout/Layout";
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

createInertiaApp({
  resolve: (name) => resolvePageComponent(`./components/pages/${name}.jsx`, import.meta.glob('./components/pages/**/*.jsx')),
  setup({ el, App, props }) {
    const userAuth = props.initialPage.props.auth.user
    const layout = props.initialPage.props.layout

    createRoot(el).render(
      <Layout userAuth={userAuth} layout={layout}>
        <App {...props} />
      </Layout>
    )
  },
  progress: {
    delay: 25
  }
})
