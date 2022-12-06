import { useRef, useMemo } from "react";
import { BsImage } from "react-icons/bs";

interface I_ImageDropZone {
  imageObject: File | null;
  setImageObject: React.Dispatch<React.SetStateAction<File | null>>;
  sx?: React.CSSProperties | undefined;
}
const ImageDropZone = ({
  imageObject,
  setImageObject,
  sx,
}: I_ImageDropZone) => {
  const inputFile = useRef<HTMLInputElement>(null);
  const inputPreviewFile = useRef(null);

  const cachedUrl = useMemo(() => {
    if (imageObject) {
      return URL.createObjectURL(imageObject);
    }
  }, [imageObject]);

  const onClickAssetUpload = (type: string) => {
    if (type === "nft") {
      if (inputFile.current) {
        inputFile.current.click();
      }
    } else if (type === "preview") {
      if (inputPreviewFile.current) {
        // inputPreviewFile.current.click();
      }
    }
  };

  const onDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer && e.dataTransfer.files.length !== 0) {
      const files = e.dataTransfer.files;
      setImageObject(files[0]);
    }
  };

  const onChangeFile = ({ currentTarget: { files, name } }: any) => {
    if (files && files.length && name === "nftMedia") setImageObject(files[0]);
  };

  return (
    <div
      className="overflow-hidden relative cursor-pointer hover:opacity-70"
      aria-label="Select an image, video, auto or 3D model file"
      onClick={() => onClickAssetUpload("nft")}
      style={sx}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => onDropFile(e)}
    >
      <input
        id="media"
        name="nftMedia"
        accept="image/*,webgl/*,.glb,.gltf"
        type="file"
        autoComplete="off"
        tabIndex={-1}
        style={{ display: "none" }}
        ref={inputFile}
        onChange={onChangeFile}
      />
      {imageObject ? (
        <div className="w-48 h-48 relative rounded-lg overflow-hidden">
          <button
            type="button"
            className="opacity-0 hover:opacity-50 color-black rounded-none absolute w-full h-full z-[1]"
            onClick={(e) => {
              e.stopPropagation();
              // @ts-ignore
              inputFile.current.value = null;
              setImageObject(null);
            }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <img
            className="w-48 h-48 rouned-lg"
            src={cachedUrl}
            alt="template"
            onLoad={() => {
              if (cachedUrl) URL.revokeObjectURL(cachedUrl);
            }}
          />
        </div>
      ) : (
        <div className="border border-black text-3xl flex items-center justify-center p-8">
          <BsImage />
        </div>
      )}
    </div>
  );
};

export default ImageDropZone;
