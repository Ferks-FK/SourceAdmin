import Header from "@/components/layout/Header";
import { SideBar } from "@/components/layout/SideBar";
import "@/assets/app.css";
import { useEffect } from "react";

interface ExtendedWindow extends Window {
  SourceAdminUser?: {
    name: string,
    email: string,
    created_at: string,
    updated_at: string
  }
}

function App() {
  const { SourceAdminUser } = window as ExtendedWindow;

  useEffect(() => {
    console.log(SourceAdminUser)
  }, [])
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
