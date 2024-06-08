import React, { useState,useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from '../firebase/firebase.js';

const Profile = () => {
  const { currentUser }=useSelector(state=>state.user);
  const fileRef = useRef(null);
  const [image,setImage]=useState(null);
  const [formData, setFormData] = useState({});
  console.log(image);

  const handleUploadImage=useCallback((image)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime()+image.name;
    const storageRef = ref(storage,fileName);//created unique name and referenced it to the store of firebase
    const uploadTask = uploadBytesResumable(storageRef,image);//uploading image to the created store path of the firebase
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log('Upload is ' + Math.round(progress) + '% done');
      },
      (error) => {
        console.log(error);
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref)
        .then(
          (downloadURL)=> setFormData((formData)=>({...formData, avatar:downloadURL}))
        )
      }
    )
  }, [ ]);
  useEffect(() => {
    console.log('ueffect runs');
    if (image) {
      handleUploadImage(image);
    }
  }, [image,handleUploadImage]);
  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mx-auto mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
          Profile
        </h1>
        <form>
          <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" ref={fileRef} hidden accept="image/*"/>
        </form>
        <img onClick={()=>fileRef.current.click()} className='mx-auto my-5 w-[200px] h-[200px]' src={formData.avatar || currentUser.data.avatar} alt='profile'/> 
        <div>name:{currentUser.data.username}</div>
        <div>Email:{currentUser.data.email}</div>
      </div>
    </div>
    </div>
  )
}

export default Profile