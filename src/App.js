import { useRef, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Swal from 'sweetalert2';

import { PizzaInputContext } from "./context/PizzaInputContext";
import { NetworkContext } from "./context/NetworkContext";

import { venueSchema, pizzaNameSchema } from "./validations/schemas";

import ImagePlaceholder from "./components/ImagePlaceholder";
import Modal from "./components/Modal";
import FindPlace from "./pages/FindPlace";

import './App.css';
// const inputstyles = "overflow-ellipsis overflow-hidden focus:outline-none py-2 px-8 border-b inputfield"

const render = (status) => {
    if (status === Status.LOADING) return <p>loading...</p>
    if (status === Status.FAILURE) return <p>Error :(</p>
    return null
}


function App() {
    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);
    const [isPlaceholder, setIsPlaceholder] = useState(true);

    // MARK: -- Modal
    const [open, setOpen] = useState(false);

    const { input, add } = useContext(PizzaInputContext);
    const { upload, postVenue } = useContext(NetworkContext);

    const history = useHistory();

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
                Swal.fire("Bummer",
                    "The app wont really work without your location :(",
                    "question"
                )
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
                                {input.location.name === "" 
                                ?
                                   <></>
                                :
                                   <span className="absolute right-8 bg-red-500 text-white rounded p-2">{input.location.name}</span>
                                }
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
                        <button 
                        id="trash" 
                        className="hidden hover:bg-blue-400 h-12 w-12 rounded absolute top-0 right-0"
                        onClick={e => removeImage(e)}
                        ></button>
                    </div>
                        <button 
                        id="continue"
                        className="hidden upload px-24 md:px-4 my-2 py-2 rounded-lg border-2 bg-red-600 border-red-700 md:self-end md:mr-8"
                        onClick={e => {

                            pizzaNameSchema.isValid({
                                name: input.name
                            }).then(valid => {
                                if (!valid) {
                                    Swal.fire("Name is missing!",
                                        "You need to fill out the Name field before we can move forward",
                                        "error"
                                    )
                                } else {
                                    venueSchema.isValid({

                                        name: input.location.name,
                                        latitude: input.location.lat,
                                        longitude: input.location.lon,
                                        address: input.location.address

                                    }).then(valid => {
                                        if (valid) {
                                            postVenue(input.location)
                                            history.push("/category")
                                    } else {
                                        Swal.fire("Location is missing!",
                                            "You need to pick a place where you took this photo",
                                            "error"
                                        )
                                    }
                                })
                                }
                            }).catch(err => console.error(err))
                        }}
                        >
                            continue
                        </button>
                </div>
            </div>
        </Wrapper>
    );
}

export default App;