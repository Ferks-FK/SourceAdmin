import React, { useEffect, useState, useId, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Options, ModalProps } from "./types";
import ReactDOM from "react-dom";
import classNames from "classnames";
import styles from "./style.module.css";

type PortalProps = {
  children: React.ReactNode
}

const ClientSidePortal = ({ children }: PortalProps): React.ReactPortal | null => {
  const [isClientSide, setIsClientSide] = useState<boolean>(false);

  useEffect(() => {
    setIsClientSide(true)
  }, []);

  return isClientSide ? ReactDOM.createPortal(children, document.body) : null;
}

const defaultModalAnimation = {
  initial: { opacity: 0, scale: 0.9, y: 50 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.15,
    type: "spring",
    damping: 20,
    stiffness: 300
  }
};

const defaultModalBackdropAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.15, ease: "easeInOut" }
};

function Modal({
  isVisible,
  heading,
  onClickCloseBtn,
  onClickBackdrop = () => null,
  onPressEscKey = () => null,
  children,
  className,
  animation = defaultModalAnimation,
  backdropAnimation = defaultModalBackdropAnimation,
  position = Options.Position.Center
}: ModalProps) {
  const headingId = useId();
  const modalMainClassName = classNames(
    styles.modal,
    {
      ['m-auto']: position == Options.Position.Center,
      ['mx-auto mt-10']: position == Options.Position.Top
    },
    className
  );

  const handleWindowKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onPressEscKey();
    }
  }, [onPressEscKey]);

  useEffect(() => {
    window.addEventListener("keydown", handleWindowKeyDown);
    return () => window.removeEventListener("keydown", handleWindowKeyDown);
  }, [handleWindowKeyDown]);

  return (
    <ClientSidePortal>
      <AnimatePresence>
        {isVisible &&
          <>
            <motion.div
              key={'modal'}
              role={'dialog'}
              aria-modal={true}
              aria-labelledby={headingId}
              {...animation}
              className={modalMainClassName}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.closeModalBtn} onClick={onClickCloseBtn}>
                <FontAwesomeIcon icon={faXmark} color="gray"/>
              </div>

              {heading && (
                <div className={styles.modalHeader}>
                  <h2 id={headingId} className={styles.modalHeading}>
                    {heading}
                  </h2>
                </div>
              )}

              <div className={styles.modalContent}>
                {children}
              </div>
            </motion.div>

            <motion.div
              key={'modal-backdrop'}
              {...backdropAnimation}
              onClick={(e) => {
                e.stopPropagation()
                onClickBackdrop()
              }}
              className={styles.modalBackdrop}
            />
          </>
        }
      </AnimatePresence>
    </ClientSidePortal>
  )
}

export default Modal
