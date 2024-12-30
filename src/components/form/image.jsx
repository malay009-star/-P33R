import React from "react";

export function ImageInput({
  image,
  setImage,
  placeholder = "https://cdn-icons-png.freepik.com/512/3607/3607444.png",
  wd = "w-[100px]",
  ht = "h-[100px]",
  error,
  accept = "image/*",
}) {
  const inputRef = React.useRef();

  return (
    <div className="flex flex-col items-center justify-center mb-5">
      <img
        src={
          typeof image === "object" ? URL.createObjectURL(image) : placeholder
        }
        alt="image"
        className={
          "h-[100px] object-contain border rounded-full " + wd + " " + ht
        }
        onClick={() => {
          inputRef.current.click();
        }}
        type={"button"}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <input
        className="hidden"
        ref={inputRef}
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
        type="file"
        accept={accept}
      />
    </div>
  );
}
