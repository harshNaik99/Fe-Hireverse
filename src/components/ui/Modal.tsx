// src/components/ui/Modal.tsx
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: string; // optional custom width
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  width = "max-w-md",
}) => {
  // Escape key handler
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Prevent scroll when modal open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose} // close on outside click
    >
      <div
        className={`bg-white rounded-xl p-6 shadow-lg w-full ${width} animate-modalFade`}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Title */}
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            {title}
          </h2>
        )}

        {/* Body */}
        {children}

        {/* Close button (optional) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
