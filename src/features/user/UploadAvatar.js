import React, { useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import { IoCloseSharp } from "react-icons/io5";
import Button from "../../components/Button";
const UploadAvatar = ({ openUploadAvatar, closeUploadAvatar, coverPhoto, values, setValues, width, height }) => {
     const [src, setSrc] = useState(null);
     const file = useRef(null);
     const [scaleValue, setScaleValue] = useState(1);
     const [preview, setPreview] = useState(null);
     const closeUpload = () => {
          setSrc(null);
          file.current.value = "";
          setScaleValue(1);
          closeUploadAvatar("hidden");
     };
     const profileImageChange = () => {
          setSrc(file.current.files[0]);
     };
     const onScaleChange = (scaleValueEvent) => {
          const scaleValue = parseFloat(scaleValueEvent.target.value);
          setScaleValue(scaleValue);
     };
     const handleSubmit = () => {
          const url = preview.getImageScaledToCanvas().toDataURL();
          if(coverPhoto){
               setValues({ ...values, coverPhoto: url });
          }else{
               setValues({ ...values, avatar: url });
          }
          setSrc(null);
          file.current.value = "";
          setScaleValue(1);
          closeUploadAvatar("hidden");
     };
     return (
          <div>
               <div className={`fixed ${openUploadAvatar} z-40 w-screen h-screen inset-0 bg-gray-900 bg-opacity-60`}></div>
               <div className={`fixed ${openUploadAvatar} z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${width ? "w-full" : "w-3/5"} bg-white rounded-md px-8 py-6 drop-shadow-lg`}>
                    <div className="flex justify-end mb-2">
                         <div className="cursor-pointer hover:bg-gray-200 p-1 rounded-full" onClick={closeUpload}>
                              <IoCloseSharp />
                         </div>
                    </div>
                    <div className="flex flex-col items-center">
                         <AvatarEditor image={src} width={width ? width : 208} height={height ? height : 208} border={20} borderRadius={width ? 0 : 300} scale={scaleValue} ref={setPreview} />
                         {src && <input className="w-3/5" type="range" value={scaleValue} min="1" max="10" onChange={onScaleChange} />}
                    </div>
                    <div className="flex justify-end mt-2">
                         <div className="flex items-center">
                              <label htmlFor="file-upload" className="bg-gray-400 text-white hover:bg-gray-500 rounded-lg py-3 px-6 font-sans text-xs font-bold cursor-pointer">
                                   Chọn tệp
                              </label>
                              <input id="file-upload" className="hidden" type="file" accept="image/png, image/jpeg" ref={file} onChange={profileImageChange} />
                         </div>
                         {src && (
                              <Button sx="bg-green-500 hover:bg-green-600 ml-2" onClick={handleSubmit}>
                                   Xong
                              </Button>
                         )}
                    </div>
               </div>
          </div>
     );
};

export default UploadAvatar;
