import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { Layout } from "@/components/layout/Layout";
import './i18n';
import './assets/app.css'

createInertiaApp({
  resolve: name => {
    const pages = import.meta.glob('./components/pages/**/*.jsx')
    return pages[`./components/pages/${name}.jsx`]()
  },
  setup({ App, props }) {
    createRoot(document.getElementById('app')).render(
      <Layout>
        <App {...props} />
      </Layout>
    )
  },
  progress: {
    delay: 25
  }
})
