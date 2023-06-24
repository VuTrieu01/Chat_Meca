import React from "react";

export default function LoadingPage({ openLoading }) {
     return (
          <>
               <div className={`fixed ${openLoading} z-40 w-screen h-screen inset-0 bg-gray-200`}></div>
               <div className={`fixed ${openLoading} z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
                         <div className="relative w-[90px] h-[90px] animate-spin rounded-full bg-gradient-to-r from-[#0097B2] to-[#7ED957]">
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-200 rounded-full border-2"></div>
                         </div>
               </div>
          </>
     );
}
