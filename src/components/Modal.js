import React from "react";

export default function Modal({ children, open, setOpen }) {
	return (
		<div>
			{open ?
			<div className="absolute w-full h-full z-40 shadowed-xl flex flex-col justify-center shadowed-xl">
				{children}
			</div>
			:
			null
			}
		</div>
	)
}