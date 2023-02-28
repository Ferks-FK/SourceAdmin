import { useEffect } from "react";
import { SourceAdminReg } from "@/components/elements/SourceAdminReg";

function PageContentBlock({ title, className, children }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <>
      <div className="flex flex-col justify-between h-full">
        <div className={`${className ?? ''}`}>
          {children}
        </div>
        <SourceAdminReg/>
      </div>
    </>
  );
}

export { PageContentBlock }
