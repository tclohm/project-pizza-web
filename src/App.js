import { useRef, useState } from "react"
import './App.css';

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
    <div className="flex flex-col justify-center items-center"
    >
    <h1 id="pizzatime">Pizza Only</h1>
      {isPlaceholder ?
        <div className="mt-4"></div>
        :
      <input 
        className="h-12 w-full mt-4 px-8 focus:outline-none font-bold" 
        type="text" 
        name="name" 
        placeholder="What's the name of the pizza"
      />
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
        <div className="flex flex-col w-full p-2">
          <input 
            className="overflow-ellipsis overflow-hidden focus:outline-none py-2 px-8" 
            type="text" 
            name="category" 
            placeholder="What category does it fall under? (required)"/>
          <input 
            className="overflow-ellipsis overflow-hidden focus:outline-none py-2 px-8" 
            type="text" 
            name="description" 
            placeholder="Add a description if you would like to give more context (optional)"/>
        </div>
      }
      <div className="flex w-full md:flex-row flex-col md:justify-around justify-start">
      <div className="flex flex-col">
        <label className="text-xs font-black text-yellow-500">Taste</label>
        <label className="text-xs text-gray-800">Sweet</label>
        <input type="range" name="sweet" value="50"/>
        <label className="text-xs text-gray-800">Sour</label>
        <input type="range" name="sour" value="50"/>
        <label className="text-xs text-gray-800">Bitter</label>
        <input type="range" name="bitter" value="50"/>
        <label className="text-xs text-gray-800">Salty</label>
        <input type="range" name="salty" value="50"/>
        <label className="text-xs text-gray-800">Umami</label>
        <input type="range" name="umami" value="50"/>
      </div>
      <div className="flex flex-col">
        <label className="text-xs font-black text-yellow-500">Optional</label>
        <label className="text-xs text-gray-500">pungency</label>
        <input type="range" name="pungency" value="50"/>
        <label className="text-xs text-gray-500">fattiness</label>
        <input type="range" name="fattiness" value="50"/>
        </div>
      </div>
      <button className="upload px-48 my-4 py-2 rounded-lg">continue</button>
    </div>
  );
}

export default App;
