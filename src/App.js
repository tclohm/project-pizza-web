import { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

import { PizzaInputContext } from "./context/PizzaInputContext";
import { NetworkContext } from "./context/NetworkContext";

import ImagePlaceholder from "./components/ImagePlaceholder";
import PizzaCategoryButtons from "./components/PizzaCategoryButtons";
import Modal from "./components/Modal";
import FindPlace from "./pages/FindPlace";

import './App.css';
const inputstyles = "overflow-ellipsis overflow-hidden focus:outline-none py-2 px-8 border-b inputfield"

const render = (status) => {
    if (status === Status.LOADING) return <p>loading...</p>
    if (status === Status.FAILURE) return <p>Error :(</p>
    return null
}


function App() {
    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);
    const [isPlaceholder, setIsPlaceholder] = useState(true);
    const [style, setStyle] = useState('');
    const [other, setOther] = useState('Other');

    // MARK: -- Modal
    const [open, setOpen] = useState(false);

    const { input, add } = useContext(PizzaInputContext);
    const { upload, postVenue } = useContext(NetworkContext);

    const showImg = () => {
        const placeholder = document.getElementById('placeholder')
        const trash = document.getElementById('trash')
        const inputArea = document.getElementById('inputPictureArea')
        const contBtn = document.getElementById('continue')

        if (!placeholder.classList.contains('hidden')) {
            placeholder.classList.add('hidden')
            trash.classList.remove('hidden')
            contBtn.classList.remove('hidden')
            inputArea.classList.add('bg-black')
            inputArea.classList.add('bg-opacity-50')
        }
    }

    const removeImage = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const placeholder = document.getElementById('placeholder')
        const trash = document.getElementById('trash')
        const inputArea = document.getElementById('inputPictureArea')
        const contBtn = document.getElementById('continue')

        placeholder.classList.remove('hidden')
        trash.classList.add('hidden')
        contBtn.classList.add('hidden')
        inputArea.classList.remove('bg-black')
        inputArea.classList.remove('bg-opacity-50')

        setIsPlaceholder(true)
        uploadedImage.current.src = ""
        setStyle("")
    }

    const handleImageUpload = e => {
        setIsPlaceholder(false)
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
            // send the file to our server, even if it will not be used
            upload(file)
            showImg()
        }
    };

    // MARK: -- Toggle
    const modalRef = useRef(null);
    const toggleModal = e => {
        const wrapper = document.getElementById('wrapper')
        const inputlist = document.getElementsByClassName('inputfield')
        if (open) {
            wrapper.classList.toggle('bg-gray-200')
            for (const el of inputlist) { el.classList.toggle('bg-gray-200') }
            document.body.style.backgroundColor = "white"
            setOpen(false)
        } else {
            // this ugly code changes the background to gray
            wrapper.classList.toggle('bg-gray-200')
            for (const el of inputlist) { el.classList.toggle('bg-gray-200') }
            document.body.style.backgroundColor = "rgba(191,194,198, 0.38)"
            setOpen(true)
        }
    }

    const closeModal = e => {
        if (modalRef.current === e.target) setOpen(false)
    }

    // MARK: -- Location Services
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);

    const getLocation = () => {
        if (navigator.geolocation) {

            function error(err) {
                console.error("To err is human", err)
            }

            navigator.geolocation.getCurrentPosition(getCoordinates, error)

        } else {
            alert("Geolocation is not supported in this browsers");
        }
    }

    const getCoordinates = position => {
        setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);

        toggleModal()
    }

    return (
        <Wrapper apiKey={process.env.REACT_APP_GG_KEY} render={render}>
            <div className="mt-12" ref={modalRef} onClick={e => closeModal(e)}>
                <div id="map"/>
                <div className="flex flex-col justify-center items-center">
                    {isPlaceholder ?
                        <div className="mt-4"></div>
                    :
                        <div className="flex flex-col w-full">
                            <input 
                            className="h-12 w-full px-8 focus:outline-none font-bold inputfield" 
                            type="text" 
                            name="name"
                            placeholder="What's the name of the pizza"
                            onChange={e => add({
                                name: e.target.value
                            })}
                            />
                            <button
                            id="location"
                            className="flex items-center h-12 mt-4 px-8 w-full focus:outline-none font-bold text-gray-400 text-xs hover:bg-gray-200"
                            onClick={() => getLocation()}
                            > 
                                Add a location
                                <span className="absolute right-8 bg-red-500 text-white rounded p-2">{input.location.name}</span>
                            </button>
                            <Modal open={open} toggle={setOpen}>
                                <FindPlace 
                                latitude={latitude} 
                                longitude={longitude} 
                                add={add}
                                modalRef={modalRef}
                                close={toggleModal}
                                />
                            </Modal>
                        </div>
                    }
                    <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    ref={imageUploader}
                    className="hidden"
                    />
                    {/* Image */}
                    <div
                    id="inputPictureArea"
                    className="flex justify-center items-center border-dashed border-4 h-96 w-3/4 cursor-pointer relative" 
                    onClick={() => imageUploader.current.click()}>
                        <ImagePlaceholder/>
                        <img
                        alt=""
                        ref={uploadedImage}
                        className="h-full"
                        />
                        {style === "" ? 
                            <></>
                        :
                            style === "Other" ?
                                <p className="absolute flex justify-center mt-40 bg-black text-white font-semibold py-2 bg-opacity-80" 
                                style={{ width: `${uploadedImage.current.width}px` }}
                                >
                                    {other}
                                </p>
                            :
                                <p className="absolute flex justify-center mt-40 bg-black text-white font-semibold py-2 bg-opacity-80" 
                                style={{ width: `${uploadedImage.current.width}px` }}
                                >
                                    {style}
                                </p>  
                        }
                        <button 
                        id="trash" 
                        className="hidden hover:bg-blue-400 h-12 w-12 rounded absolute top-0 right-0"
                        onClick={e => removeImage(e)}
                        ></button>
                    </div>
                    {isPlaceholder ?
                        <></>
                    :
                        <div className="flex flex-col w-full p-2 text-gray-600 text-sm">
                            <label className="py-2 px-8">What category does it fall under? (required)</label>
                            <PizzaCategoryButtons set={setStyle} selected={style} add={add} />
                            {style === "Other" ?
                                <input 
                                className={inputstyles} 
                                type="text" 
                                name="other"
                                value={other} 
                                onChange={e => { 
                                    setOther(e.target.value)
                                    add({ style: e.target.value })
                                }}
                                placeholder="What's this type of pizza"/>
                            :
                                <></>
                            }
                            <input 
                            className={inputstyles} 
                            type="text" 
                            name="description" 
                            placeholder="Any more detail you like to add about the pizza (optional)"
                            onChange={e => add({
                                description: e.target.value
                            })}
                            />
                        </div>
                    }
                        <Link 
                        id="continue"
                        className="hidden upload px-24 md:px-4 my-2 py-2 rounded-lg border-2 bg-red-600 border-red-700 md:self-end md:mr-8"
                        to="/taste"
                        onClick={e => postVenue(input.location)}
                        >
                            continue
                        </Link>
                </div>
            </div>
        </Wrapper>
    );
}

export default App;