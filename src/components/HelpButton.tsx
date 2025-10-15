import { useState } from "react";
import HelpModal from "./HelpModal";

const HelpButton = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsHelpOpen(true)}
        className="fixed top-4 right-4 bg-[#8f7a66] text-white p-3 rounded-full shadow-lg hover:bg-[#9f8a76] transition-colors z-10 flex items-center justify-center"
        title="Help & Tips"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <circle cx="12" cy="17" r="1" />
        </svg>
      </button>

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </>
  );
};

export default HelpButton;
