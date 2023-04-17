import { createPortal } from 'react-dom';
import { useEffect, useMemo, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function ModalComponent({ visible, handleModal, dismissable, children, title, description }) {
  const isDismissable = useMemo(() => {
    return dismissable || true;
  }, [dismissable]);

  useEffect(() => {
    if (!isDismissable) return;

    const handlerKeydown = (e) => {
      if (visible) {
        if (e.key === "Escape" || e.key === "Esc" || e.keyCode === 27) {
          handleModal()
        }
      }
    }

    window.addEventListener('keydown', handlerKeydown)

    return () => {
      window.removeEventListener('keydown', handlerKeydown)
    }
  }, [isDismissable, handleModal])

  return (
    <div
      className={`fixed z-50 flex justify-center w-full h-full overflow-hidden inset-0 bg-[rgba(0,0,0,0.5)] p-4 min-h-full text-center modal fade-in-out ${visible ? 'modal-visible' : ''}`}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
      onMouseDown={(e) => {
        if (isDismissable) {
          e.stopPropagation()

          if (e.currentTarget === e.target) {
            handleModal()
          }
        }
      }}
    >
      <div
        className="w-full my-4 max-w-[95%] md:max-w-[75%] lg:max-w-[50%] relative bg-dark mx-auto rounded text-left"
      >
        {isDismissable && (
          <div
            className="absolute right-0 p-2 cursor-pointer opacity-50 hover:opacity-100 text-white"
            onClick={handleModal}
          >
            <FontAwesomeIcon icon={faXmark} />
          </div>
        )}
        <div className="flex flex-col">
          {title && (
            <div className="text-left text-xl text-white p-4">
              {title}
            </div>
          )}
          {description && (
            <div className="text-left text-base text-white px-4 pb-4 break-words">
              {description}
            </div>
          )}
          <div className="flex flex-col items-center p-3 rounded shadow-md overflow-y-scroll">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

function Modal({ children, ...props }) {
  const modal = useRef(document.getElementById('modal'));

  return createPortal(<ModalComponent {...props}>{children}</ModalComponent>, modal.current);
}

export { Modal }
