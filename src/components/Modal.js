import React from "react";
import { useSpring, animated } from "react-spring";


export default function Modal({ children, open }) {

    const { opacity, transform } = useSpring({
        config: {
            duration: 250,
        },
        opacity: open ? 1 : 0,
        transform: open ? `translateX(0%)` : `translateX(-100%)`
    })


    return (
        <div>
			{open ?
			<animated.div style={{ opacity, transform }} className="absolute -top-10 h-full w-full md:w-1/2 z-40">
				{children}
			</animated.div>
			:
			null
			}
		</div>
    )
}