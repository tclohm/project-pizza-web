import React from "react"

export default function ImagePlaceholder() {
	return (
		<div id="placeholder" className="text-gray-400 flex flex-col items-center md:text-lg text-xs">
          <div className="flex justify-center items-center font-bold text-gray-500">
            <div className="w-20">
              <img alt="pizza"
              src="pizza.png"
              />
            </div>
            <p>Click to drop an image of your pizza</p>
          </div>
          <p className="my-2">1600x1200 or higher recommended. Max 10MB each</p>
          <ul className="flex lg:flex-row flex-col justify-between list-disc">
            <li className="lg:mx-8">High resolution images (png, jpg)</li>
            <li className="lg:mx-8">Only upload media you own the rights to</li>
          </ul>
        </div>
	);
};