import React from "react";

export default function TextFieldArea(props) {
     return (
          <div className={`${props.sx}`}>
               <div className="relative w-full min-w-[200px]">
                    <textarea onChange={props.onChange} value={props.value} name={props.name} type={props.type} className={`peer max-h-24 w-full rounded-[7px] border-x border-b px-3 py-2.5 text-sm font-normal transition-all placeholder-shown:border resize-none focus:border-2 focus:border-green-600 focus:border-t-transparent focus:outline-0 ${props.error}`} placeholder=" " disabled={props.disabled} />
                    <label
                         className={`before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[13px] text-slate-400 leading-tight transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t ${
                              props.error ? "before:border-l-red-500 before:border-t-red-500 after:border-t-red-500" : ""
                         } after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[13px] peer-focus:leading-tight peer-focus:text-green-600 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-green-600 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-green-600`}
                    >
                         {props.placeholder}
                    </label>
                    {props.children ? (
                         <div className="absolute inset-y-0 right-0 px-2 m-1 flex items-center justify-center text-lg text-slate-400 cursor-pointer rounded-full hover:text-green-600" onClick={props.onClick}>
                              {props.children}
                         </div>
                    ) : (
                         ""
                    )}
               </div>
          </div>
     );
}
