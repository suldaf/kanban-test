import React from "react";

function ProgressBar(props) {
  const classname =
    props.progressBar < 100 && props.progressBar >= 0
      ? `transition-all ease-out duration-1000 h-full relative bg-primary min-w-0 max-w-full`
      : `transition-all ease-out duration-1000 h-full relative bg-done w-[100%]`;
  return (
    <>
      <div className="h-3 relative w-[80%] md:w-[70%] rounded-full overflow-hidden ">
        <div className="w-full h-full bg-gray-200 absolute"></div>
        <div
          id="bar"
          className={classname}
          style={{ width: `${props.progressBar}%` }}
        ></div>
      </div>

      {props.progressBar < 100 ? (
        <p className="text-center font-thin text-gray-500 ">
          {props.progressBar}%
        </p>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_4_931)">
            <path
              d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
              fill="#43936C"
            />
            <path
              d="M5.6001 7.89085L7.2001 9.49086L10.2911 6.3999"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_4_931">
              <rect
                width="16"
                height="16"
                fill="white"
                transform="translate(0 16) rotate(-90)"
              />
            </clipPath>
          </defs>
        </svg>
      )}
    </>
  );
}

export default ProgressBar;
