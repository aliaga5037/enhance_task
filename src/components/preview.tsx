import { useCallback, useEffect } from "react";

import closeIcon from "../assets/icons/close.svg";
import downloadIcon from "../assets/icons/download.svg";
import "../styles/preview.css";

interface PreviewProps {
  file: File;
  onClose: () => void;
  downloadUrl?: string;
}

const Preview = ({ file, onClose, downloadUrl }: PreviewProps) => {
  const handleCloseOnEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleCloseOnEscape, true);
    return () => {
      window.removeEventListener("keydown", handleCloseOnEscape, true);
    };
  }, [handleCloseOnEscape]);

  return (
    <div className="preview">
      <div className="preview__toolbar">
        <a
          className="preview__download"
          href={downloadUrl ? downloadUrl : URL.createObjectURL(file)}
          download={file.name}
        >
          <img src={downloadIcon} alt="download" />
        </a>
        <button className="preview__close" onClick={onClose}>
          <img className="preview__close-icon" src={closeIcon} alt="close" />
        </button>
      </div>
      <img
        className="preview__image"
        src={URL.createObjectURL(file)}
        alt={file.name}
      />
    </div>
  );
};
export default Preview;
