import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useUserStore } from "@/stores/user";
import { Routes, Route, useLocation } from 'react-router-dom';
import { DashboardContainer } from "@/components/dashboard/DashboardContainer";
import { ServersContainer } from "@/components/servers/ServersContainer";
import { MutesContainer } from "@/components/mutes/MutesContainer";
import { BansContainer } from "@/components/bans/BansContainer";
import { AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import AuthenticationRoutes from "@/routers/AuthenticationRoutes";
import http from "@/api/http";
import "@/assets/app.css";

function App() {
  const [ userData, setUserData ] = useUserStore((state) => [state.data, state.setUserData])
  const { SourceAdminUser } = window
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const locale = localStorage.getItem('i18nextLng');

    if (locale == null) {
      http.get(`/api/locale/${i18n.language}`).then(response => {
        console.log(`Language set to ${response.data.locale}.`)
      })
      .catch(error => {
        console.error(error)
      })

      localStorage.setItem('i18nextLng', i18n.language)
    }

    if (i18n.language != locale && locale != null) {
      localStorage.setItem('i18nextLng', i18n.language)
    }
  }, [])

  if (SourceAdminUser && !userData) {
    setUserData({
      id: SourceAdminUser.id,
      name: SourceAdminUser.name,
      email: SourceAdminUser.email,
      emailVerifiedAt: SourceAdminUser.email_verified_at ? new Date(SourceAdminUser.email_verified_at) : null,
      createdAt: new Date(SourceAdminUser.created_at),
      updatedAt: new Date(SourceAdminUser.updated_at)
    })
  }

  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<DashboardContainer/>}/>
          <Route path="/servers" element={<ServersContainer/>}/>
          <Route path="/bans" element={<BansContainer/>}/>
          <Route path="/mutes" element={<MutesContainer/>}/>
          <Route path="/auth/*" element={<AuthenticationRoutes/>}/>
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

export { App };
