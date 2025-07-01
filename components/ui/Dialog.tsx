
import React from 'react';
import ReactDOM from 'react-dom';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Dialog = ({ isOpen, onClose, children, title }: DialogProps) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative z-50 w-full max-w-lg mx-4 my-8 bg-card text-card-foreground rounded-lg border shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col space-y-1.5 p-6 border-b">
            <h3 className="font-semibold text-lg tracking-tight">{title}</h3>
        </div>
        <div className="p-6">
            {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Dialog;
