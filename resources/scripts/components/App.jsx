import { Layout } from "@/components/layout/Layout";
import { useUserStore } from "@/stores/user";
import { Routes, Route, useLocation } from 'react-router-dom';
import { DashboardContainer } from "@/components/pages/dashboard/DashboardContainer";
import { ServersContainer } from "@/components/pages/servers/ServersContainer";
import { MutesContainer } from "@/components/pages/mutes/MutesContainer";
import { BansContainer } from "@/components/pages/bans/BansContainer";
import { AnimatePresence } from "framer-motion";
import AuthenticationRoutes from "@/routers/AuthenticationRoutes";
import "@/assets/app.css";

function App() {
  const [ userData, setUserData ] = useUserStore((state) => [state.data, state.setUserData])
  const { SourceAdminUser } = window
  const location = useLocation();

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
