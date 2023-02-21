import { useEffect } from "react";

function PageContentBlock({ title, className, children }) {
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <>
      <div className={`${className ?? ''}`}>
        {children}
      </div>
      <div>
        <p className="text-center text-neutral-500 text-xs">
          <a
            rel={'noopener nofollow noreferrer'}
            href={'https://github.com/Ferks-FK/SourceAdmin'}
            target={'_blank'}
            className="no-underline text-neutral-500 hover:text-neutral-300"
          >
            SourceAdmin&reg;
          </a>
          &nbsp;&copy; 2022 - {new Date().getFullYear()}
        </p>
      </div>
    </>
  );
}

export { PageContentBlock }
