import React, { useEffect } from "react";

export default function Scrollbar(props) {
  useEffect(() => {
    if (props.messageEl) {
      props.messageEl.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);
  return (
    <div
      className={`${
        props.height ? props.height : "h-4/5"
      } overflow-x-hidden select-none scrollbar focus:scroll-smooth`}
      ref={props.messageEl}
    >
      <div className={`${props.sx}`}>{props.children}</div>
    </div>
  );
}
