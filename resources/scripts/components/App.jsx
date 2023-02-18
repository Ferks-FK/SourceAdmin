import { Layout } from "@/components/layout/Layout";
import { useUserStore } from "@/stores/user";
import { BrowserRouter } from 'react-router-dom'
import "@/assets/app.css";

function App() {
  const [ userData, setUserData ] = useUserStore((state) => [state.data, state.setUserData])
  const { SourceAdminUser } = window

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
    <>
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
    </>
  );
};

export { App };
