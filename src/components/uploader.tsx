import { useState, useId } from "react";
import Preview from "./preview";
import { UploadClient } from "@uploadcare/upload-client";

import closeIcon from "../assets/icons/close.svg";
import uploadIcon from "../assets/icons/upload.svg";
import "../styles/uploader.css";

interface UploaderProps {
  accept?: string;
}

const Uploader = ({ accept }: UploaderProps) => {
  const [file, setFile] = useState<any>({});
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [dimensions, setDimensions] = useState<any>({});
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const client = new UploadClient({ publicKey: "889d81cb76bd9d1b630b" });

  const id = useId();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length === 1) {
      const uploadedFile = e.target.files[0];
      if (accept && !accept.includes(uploadedFile.type)) {
        alert("File type not supported");
        return;
      }
      setLoading(true);
      getImageDimensions(uploadedFile).then((dimensions) => {
        setDimensions(dimensions);
      });
      client.uploadFile(uploadedFile).then((response: any) => {
        setFile(uploadedFile);
        setDownloadUrl(response.cdnUrl);
        setLoading(false);
      });
    }
  };

  const getImageDimensions = (file: File) => {
    return new Promise((resolve) => {
      const i = new Image();
      i.onload = () => {
        resolve({ width: i.width, height: i.height });
      };
      i.src = URL.createObjectURL(file);
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="uploader">
      {file.name && (
        <div className="uploader__details">
          <img
            src={closeIcon}
            onClick={() => setFile({})}
            role="button"
            tabIndex={0}
            aria-label="remove"
            alt="remove"
            className="uploader__remove"
          />
          <button
            className="uploader__button"
            onClick={() => setShowPreview(true)}
            tabIndex={0}
          >
            <img
              src={URL.createObjectURL(file)}
              alt="thumbnail"
              className="uploader__thumbnail"
            />
          </button>

          <div>
            <p>
              {file.name} | {file.type}
            </p>
            <p>
              {(file.size / 1024).toFixed(2)}kb | {dimensions.width}px /{" "}
              {dimensions.height}px |{" "}
              {(dimensions.width * dimensions.height) / 1000000}mp
            </p>
          </div>
        </div>
      )}

      {!file.name && (
        <>
          <label className="uploader__upload" htmlFor={id}>
            <img
              className="uploader__icon"
              src={uploadIcon}
              alt="upload"
              width="24"
              height="24"
            />
          </label>
          <input
            style={{ display: "none" }}
            id={id}
            onChange={onChange}
            type="file"
            accept={accept}
          />
        </>
      )}
      {showPreview && (
        <Preview
          file={file}
          downloadUrl={downloadUrl}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
};

export default Uploader;
