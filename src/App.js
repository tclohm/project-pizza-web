import { useRef, useState } from "react";
import ImagePlaceholder from "./components/ImagePlaceholder";
import PizzaCategoryButtons from "./components/PizzaCategoryButtons";
import './App.css';

const inputstyles = "overflow-ellipsis overflow-hidden focus:outline-none py-2 px-8 border-b"

function App() {
  const uploadedImage = useRef(null);
  const imageUploader = useRef(null);
  const [isPlaceholder, setIsPlaceholder] = useState(true)


  const toggle = () => {
    const placeholder = document.getElementById('placeholder')
    const trash = document.getElementById('trash')
    const inputArea = document.getElementById('inputPictureArea')
    placeholder.classList.toggle('hidden')
    trash.classList.toggle('hidden')
    inputArea.classList.toggle('bg-black')
    inputArea.classList.toggle('bg-opacity-50')
  }

  const remove = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggle()
    setIsPlaceholder(true)
    uploadedImage.current.src = ""
  }

  const handleImageUpload = e => {
    setIsPlaceholder(false)
    toggle()
    const [file] = e.target.files;
    if (file) {
      const reader = new FileReader();
      const { current } = uploadedImage;
      current.file = file;
      reader.onload = e => {
        current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="">
      <nav className="border-b border-gray-200 py-4 flex items-center justify-between mb-12 px-6"><h1 id="pizzatime">cheese. tomato. dough.</h1></nav>
      <div className="flex flex-col justify-center items-center"
      >
        {isPlaceholder ?
          <div className="mt-4"></div>
          :
        <div className="flex flex-col ml-8 w-full">
          <input 
            className="h-12 w-full mt-4 px-8 focus:outline-none font-bold" 
            type="text" 
            name="name" 
            placeholder="What's the name of the pizza"
          />
          <button 
            id="location"
            className="flex justify-start items-center h-12 mt-4 px-8 w-full focus:outline-none font-bold text-gray-400 text-xs hover:bg-gray-200"
            name="location" 
          > Add a location
          </button>
        </div>
        }
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={imageUploader}
          className="hidden"
        />
        <div
          id="inputPictureArea"
          className="flex justify-center items-center border-dashed border-4 h-96 w-3/4 cursor-pointer relative" 
          onClick={() => imageUploader.current.click()}
        >
          <ImagePlaceholder/>
          <img
            alt=""
            ref={uploadedImage}
            className="h-full"
          />
          <button 
            id="trash" 
            className="hidden hover:bg-purple-400 h-12 w-12 rounded absolute top-0 right-0"
            onClick={e => remove(e)}
            ></button>
        </div>
        {
          isPlaceholder ?
          <></>
          :
          <div className="flex flex-col w-full p-2 text-gray-600">
            <label className="py-2 px-8">What category does it fall under? (required)</label>
            <PizzaCategoryButtons/>
            <input 
              className={inputstyles} 
              type="text" 
              name="description" 
              placeholder="Add a description if you would like to give more context (optional)"/>
          </div>
        }
        <button className="upload px-48 my-4 py-2 rounded-lg">continue</button>
      </div>
    </div>
  );
}

export default App;
