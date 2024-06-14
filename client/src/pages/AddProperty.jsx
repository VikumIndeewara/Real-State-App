import React, { useState, useRef, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase/firebase.js";
import { IoMdCloseCircle } from "react-icons/io";

const AddProperty = () => {

  const [formData, setFormData] = useState({});
  const fileRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loading,setLoading]=useState(false);
  const [uploadError,setUploadError]=useState(false);
  const [uploadPerc,setUploadPerc]=useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    
  };
  const handleUploadImages=async()=>{
    console.log(images);
    const imagesLinks = [];
    for(let i=0;i<images.length;i++){
      imagesLinks.push(uploadImages(images[i]));
    }
    
    try {
      console.log(imagesLinks);
      const results = await Promise.all(imagesLinks);
      setFormData({
        ...formData,
        images:results,
      });
      console.log("is",formData.images)
    } catch (error) {
      console.error("Error uploading images: ", error);
    }
  }

  const uploadImages=async(image)=>{
    return new Promise((resolve,reject)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Uploading ${progress}!`);
          setUploadPerc(Math.round(progress));
      },
      (error) => {
          console.log(error);
          reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          resolve (downloadURL))
      }
    )
  })
  }
  const handleRemoveImage=(index)=>{
    console.log('removing!');
    setFormData({
      ...formData,
      images: formData.images.filter((_,i)=> i != index)
    }
    )
    console.log(formData.images)
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(formData);
  }
  useEffect(() => {
    if (uploadPerc>0) {
      const timer = setTimeout(() => {
        setUploadPerc(null);
      }, 5000);

      return () => clearTimeout(timer);
    }

  }, [uploadPerc]);

  return (
    <div>
      <h1 className="mx-auto mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
        Add A Property
      </h1>
      <form>
        <div className="flex min-h-full flex-col justify-center items-center mx-auto px-6 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-5xl sm:mx-auto">
            <div className="flex flex-wrap gap-10 w-full">
              <div className="flex-1">
                <div className="w-full mb-10">
                  <label
                    htmlFor="propertyname"
                    className="block w-full text-sm font-medium leading-6 text-gray-900"
                  >
                    Property Name:
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        id="propertyname"
                        required
                        onChange={handleChange}
                        className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Add your property name"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full mb-10">
                  <label
                    htmlFor="propertyname"
                    className="block w-full text-sm font-medium leading-6 text-gray-900"
                  >
                    Contact Number:
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        id="contactnumber"
                        required
                        onChange={handleChange}
                        className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Add your contact number"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full mb-10">
                  <label
                    htmlFor="propertyname"
                    className="block w-full text-sm font-medium leading-6 text-gray-900"
                  >
                    Address:
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                      <input
                        type="text"
                        id="address"
                        required
                        onChange={handleChange}
                        className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        placeholder="Address"
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full mb-10">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Add Description:
                  </label>
                  <div className="mt-2">
                    <textarea
                      type="text"
                      placeholder="Description"
                      id="description"
                      rows="3"
                      onChange={handleChange}
                      className="block p-5 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about your property.
                  </p>
                </div>
                <div className="flex flex-wrap gap-8">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="bedrooms"
                      min="1"
                      max="10"
                      required
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg"
                    />
                    <p className="block text-sm font-medium leading-6 text-gray-900">
                      Beds
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="bathrooms"
                      min="1"
                      max="10"
                      required
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg"
                    />
                    <p className="block text-sm font-medium leading-6 text-gray-900">
                      Baths
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      id="floors"
                      min="1"
                      max="10"
                      required
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg"
                    />
                    <p className="block text-sm font-medium leading-6 text-gray-900">
                      Floors
                    </p>
                  </div>
                  <div>
                    <p className="block text-sm font-medium leading-6 text-gray-900">
                      Price($/M):
                    </p>
                    <input
                      type="number"
                      id="price"
                      min="0"
                      max="10000000"
                      required
                      onChange={handleChange}
                      className="p-3 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
                <button 
                  onClick={handleSubmit}
                  className="w-full mt-10 rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500">
                  Create Listing
                </button>
              </div>
              <div className="flex-1">
                <div className="w-full">
                  <div className="mt-5 flex justify-center items-center rounded-lg border border-dashed border-gray-900/25">
                    <button
                      onClick={handleUploadImages}
                      type="button"
                      className="flex items-center rounded-md bg-white px-2.5 py-1.5 my-2 gap-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      <svg
                        className="h-6 w-6 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Upload Photos
                    </button>
                  </div>
                </div>
                {uploadPerc>0 && <p className="text-green-600 text-center mt-2">Uploading {uploadPerc}% !</p>}
                <div  onClick={() => fileRef.current.click()} className="w-full mb-2">
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="images"
                            type="file"
                            className="sr-only"
                            accept="image/*"
                            multiple
                            ref={fileRef}
                            onChange={(e) => {
                              setImages(e.target.files);
                            }}
                          />
                        </label>
                        
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      {images.length>0 ? (<p className="text-s my-1 leading-5 text-gray-600"> {images.length}photos selected</p>): ''}
                      <p className="text-xs leading-5 text-gray-600">
                        6 images up to 10MB
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 ">
                {formData.images &&  formData.images.map((url, index) => (
                  <div key={index}>
                    <button onClick={()=>handleRemoveImage(index)} className="text-red-600"><IoMdCloseCircle/></button>
                    <img key={index} src={url} alt={`Uploaded image ${index}`} className="h-[250px] object-cover"/>
                    
                  </div>
                ))}
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </form>
      
    </div>
  );
};

export default AddProperty;
