import classNames from "classnames";
import { useRef, useState } from "react";
import Webcam from "react-webcam";
import { HiCamera, HiArrowPath, HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";

export default function Camera() {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isFrontCamera, setIsFrontCamera] = useState<boolean>(true);

  const capturePhoto = async () => {
    if (webcamRef.current === null) return;
    const imageSrc = webcamRef.current.getScreenshot();
    setImageUrl(imageSrc);
  };

  const recapturePhoto = () => {
    setImageUrl(null);
  };

  return (
    <div className="h-screen w-full">
      <div className="relative h-full">
        {/* Navbar */}
        <div className="absolute top-0 inset-x-0 w-full bg-slate-50 p-3 z-10">
          <div className="flex justify-between items-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-2 rounded cursor-pointer"
              onClick={() => navigate("/")}
            >
              <HiArrowLeft className="w-4 h-4 text-white" />
            </button>
            <span className="text-sm">
              {window.innerWidth}x{window.innerHeight}
            </span>
            <span className="text-sm">
              {isFrontCamera ? "Front Camera" : "Back Camera"}
            </span>
          </div>
        </div>

        {/* Video Camera */}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{
            // width: window.innerWidth,
            // height: window.innerHeight,
            aspectRatio: 9 / 16,
            facingMode: isFrontCamera ? "user" : "environment",
          }}
          disablePictureInPicture
          mirrored={isFrontCamera}
          className={classNames(
            "absolute top-0 left-0 w-full h-full object-cover",
            {
              block: !imageUrl,
              hidden: imageUrl,
            }
          )}
        />

        <img
          src={imageUrl ?? ""}
          alt=""
          className={classNames(
            "absolute top-0 left-0 w-full object-cover h-full",
            { block: imageUrl, hidden: !imageUrl }
          )}
        />

        {/* Camera Actions */}
        <div className="absolute bottom-10 inset-x-0 flex justify-between items-center px-12">
          {/* Recapture */}
          {imageUrl ? (
            <div
              className="flex justify-center items-center bg-slate-900 bg-opacity-35 hover:bg-opacity-50 w-12 h-12 rounded-full hover:cursor-pointer"
              onClick={recapturePhoto}
            >
              <HiCamera className="w-6 h-6 text-slate-50" />
            </div>
          ) : (
            <div className="w-12 h-12"></div>
          )}

          {/* Shutter Button */}
          <div
            className="flex items-center justify-center hover:opacity-80 hover:cursor-pointer"
            onClick={capturePhoto}
          >
            <div className="absolute inline-flex w-[72px] h-[72px] bg-transparent border-4 border-slate-50 rounded-full"></div>
            <div className="relative inline-flex w-14 h-14 bg-slate-50 rounded-full"></div>
          </div>
          {/* Camera Flip Button */}
          <div
            className="flex justify-center items-center bg-slate-900 bg-opacity-35 hover:bg-opacity-50 w-12 h-12 rounded-full hover:cursor-pointer"
            onClick={() => setIsFrontCamera((prev) => !prev)}
          >
            <HiArrowPath className="w-6 h-6 text-slate-50" />
          </div>
        </div>
      </div>
    </div>
  );
}
