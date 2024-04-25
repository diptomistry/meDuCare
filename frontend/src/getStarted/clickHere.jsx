import React, { useRef, useEffect } from "react";


const Popup = ({ onClose, children }) => {
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
  return (
    <div className="popupOverlay">
      <div className="popup" ref={popupRef}>
        {/* Apply specific styling to highlight the close button */}
        <button className="closeButton" onClick={onClose}>
          <span className="closeIcon">&times;</span>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
