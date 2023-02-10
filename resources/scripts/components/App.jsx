import { Header } from "@/components/layout/Header";
import { SideBar } from "@/components/layout/SideBar";
import { useUserStore } from "@/stores/user";
import "@/assets/app.css";

function App() {
  const { SourceAdminUser } = window
  const [ userData, setUserData ] = useUserStore((state) => [state.data, state.setUserData])

  if (SourceAdminUser && !userData) {
    setUserData({
      id: SourceAdminUser.id,
      name: SourceAdminUser.name,
      email: SourceAdminUser.email,
      emailVerifiedAt: new Date(SourceAdminUser.email_verified_at),
      createdAt: new Date(SourceAdminUser.created_at),
      updatedAt: new Date(SourceAdminUser.updated_at)
    })
  }

  return (
    <>
      <Header/>
      <div className="flex w-screen h-screen" style={{height: "calc(100vh - 3.6rem)"}}>
        <SideBar/>
      </div>
    </>
  );
};

export { App };
