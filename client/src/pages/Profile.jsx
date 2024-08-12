import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import app from "../firebase/firebase.js";
import { FaRegEdit } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserFailure,
  signOutUserSuccess,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import ListingCard from "../Components/ListingCard.jsx";
import { IoIosAddCircle } from "react-icons/io";
import ListingEditPopup from "../Components/ListingEditPopup.jsx";

axios.defaults.withCredentials = true;

const Profile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    username: currentUser.data.username,
    email: currentUser.data.email,
    avatar: currentUser.data.avatar,
  });
  const [uploadPercentage, setUploadPercentage] = useState(null);
  const [uploadError, setUploadError] = useState(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [updateName, setUpdateName] = useState(false);
  const [updateEmail, setUpdateEmail] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [updateUserSuccessMessage, setUpdateUserSuccessMessage] =
    useState(false);
  const [listings, setListings] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    console.log(formData);
  };

  const changeName = () => {
    setUpdateName((updateName) => !updateName);
  };

  const changeEmail = () => {
    setUpdateEmail((updateEmail) => !updateEmail);
  };

  const changePassword = () => {
    setUpdatePassword((updatePassword) => !updatePassword);
  };

  const cancelUpdateName = () => {
    changeName();
    setFormData({
      ...formData,
      username: currentUser.data.username,
    });
  };

  const cancelUpdateEmail = () => {
    changeEmail();
    setFormData({
      ...formData,
      email: currentUser.data.email,
    });
  };

  const cancelUpdatePassword = () => {
    changePassword();
    setFormData({
      ...formData,
      password: "",
    });
  };

  const handleUploadImage = useCallback((image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName); //created unique name and referenced it to the store of firebase
    const uploadTask = uploadBytesResumable(storageRef, image); //uploading image to the created store path of the firebase

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.round(progress));
        setMessageVisible(true);
      },
      (error) => {
        setUploadError(error);
        setMessageVisible(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData((formData) => ({ ...formData, avatar: downloadURL }))
        );
      }
    );
  }, []);

  useEffect(() => {
    if (image) {
      handleUploadImage(image);
    }
  }, [image, handleUploadImage]);

  useEffect(() => {
    if (messageVisible) {
      const timer = setTimeout(() => {
        setMessageVisible(false);
        setUploadError(false);
      }, 5000); // Hides the message after 5 seconds

      return () => clearTimeout(timer); // Cleanup the timer
    }
    if (updateUserSuccessMessage) {
      const timer = setTimeout(() => {
        setUpdateUserSuccessMessage(false);
      }, 5000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [messageVisible, updateUserSuccessMessage]);

  useEffect(() => {
    const link = `https://real-state-app-server.onrender.com/user/userListings/${currentUser.data._id}`;
    axios
      .get(link)
      .then((res) => {
        setListings(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentUser.data._id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    const link = `https://real-state-app-server.onrender.com/user/update/${currentUser.data._id}`;
    axios
      .put(link, formData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Include credentials (cookies) in the request
      })
      .then((res) => {
        console.log(res);
        dispatch(updateUserSuccess(res));
        setUpdateUserSuccessMessage(true);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
        dispatch(updateUserFailure(err.message));
      });
  };

  const handleDeleteUser = (e) => {
    e.preventDefault();
    dispatch(deleteUserStart());
    const link = `https://real-state-app-server.onrender.com/user/deleteUser/${currentUser.data._id}`;
    axios
      .delete(link)
      .then((res) => {
        console.log(res);
        dispatch(deleteUserSuccess(res));
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        dispatch(deleteUserFailure(err.message));
      });
  };

  const signOutUser = (e) => {
    e.preventDefault();

    dispatch(signOutUserStart());
    const link = `https://real-state-app-server.onrender.com/auth/sign-out`;
    axios
      .get(link)
      .then((res) => {
        console.log(res);
        dispatch(signOutUserSuccess());
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        dispatch(signOutUserFailure(err));
      });
  };

  const handleDeleteListing = (index) => {
    const listingId = listings[index]._id;
    const link = `https://real-state-app-server.onrender.com/listing/delete-listing/${listingId}`;
    axios
      .delete(link)
      .then((res) => {
        console.log(res);
        const updatedListings = listings.filter((_, i) => i != index);
        setListings(updatedListings);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mx-auto mt-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            Profile
          </h1>
          <div className="flex flex-col items-center my-3">
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <img
              onClick={() => fileRef.current.click()}
              className="mx-auto my-2 w-[200px] h-[200px] object-cover"
              src={formData.avatar || currentUser.data.avatar}
              alt="profile"
            />
            {messageVisible && (
              <p className="text-sm text-center my-2">
                {uploadError ? (
                  <span className="text-red-700">
                    Error Image Upload (image must be less than 2mb)
                  </span>
                ) : uploadPercentage > 0 && uploadPercentage < 100 ? (
                  <span className="text-slate-700">
                    Uploading {uploadPercentage}%!
                  </span>
                ) : uploadPercentage === 100 ? (
                  <span className="text-green-700">
                    Image uploaded Successfully!
                  </span>
                ) : null}
              </p>
            )}

            <button
              onClick={() => fileRef.current.click()}
              className="rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            >
              Upload Image
            </button>
          </div>
          <div className="my-5">
            {updateName ? (
              <div className="flex">
                <input
                  id="username"
                  name="username"
                  placeholder="Enter Username"
                  type="text"
                  required
                  onChange={handleChange}
                  className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={changeName}
                  className="p-5 rounded-md border-0 py-2  shadow-sm ring-1 ring-inset ring-green-600 hover:ring-gray-600 hover:ring-3"
                >
                  <TiTick />
                </button>
                <button
                  onClick={cancelUpdateName}
                  className="p-5 rounded-md border-0 py-2  shadow-sm ring-1 ring-inset ring-red-600 hover:ring-gray-600 hover:ring-3"
                >
                  <IoClose />
                </button>
              </div>
            ) : (
              <div className="flex">
                <div className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                  Name : {formData.username || currentUser.data.username}
                </div>
                <button
                  onClick={changeName}
                  className="p-5 rounded-md border-0 py-2  shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-600 hover:ring-3"
                >
                  <FaRegEdit />
                </button>
              </div>
            )}
            {updateEmail ? (
              <div className="flex">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  required
                  onChange={handleChange}
                  className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={changeEmail}
                  className="p-5 rounded-md border-0 py-2  shadow-sm ring-1 ring-inset ring-red-600 hover:ring-gray-600 hover:ring-3"
                >
                  <TiTick />
                </button>
                <button
                  onClick={cancelUpdateEmail}
                  className="p-5 rounded-md border-0 py-2  shadow-sm ring-1 ring-inset ring-red-600 hover:ring-gray-600 hover:ring-3"
                >
                  <IoClose />
                </button>
              </div>
            ) : (
              <div className="flex">
                <div className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                  Email : {formData.email || currentUser.data.email}
                </div>
                <button
                  onClick={changeEmail}
                  className="p-5 rounded-md border-0 py-2  shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-600 hover:ring-3"
                >
                  <FaRegEdit />
                </button>
              </div>
            )}
            {updatePassword ? (
              <div className="flex">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  required
                  onChange={handleChange}
                  className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <button
                  onClick={changePassword}
                  className="p-5 rounded-md border-0 py-2  shadow-sm ring-1 ring-inset ring-red-600 hover:ring-gray-600 hover:ring-3"
                >
                  <TiTick />
                </button>
                <button
                  onClick={cancelUpdatePassword}
                  className="p-5 rounded-md border-0 py-2  shadow-sm ring-1 ring-inset ring-red-600 hover:ring-gray-600 hover:ring-3"
                >
                  <IoClose />
                </button>
              </div>
            ) : (
              <div className="flex">
                <div className="block p-5 w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
                  Password : {formData.password || "********"}
                </div>
                <button
                  onClick={changePassword}
                  className="p-5 rounded-md border-0 py-2  shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-600 hover:ring-3"
                >
                  <FaRegEdit />
                </button>
              </div>
            )}

            <div className="my-3">
              <button
                disabled={loading}
                onClick={handleSubmit}
                className="w-full my-3 rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
              >
                {loading ? "Loading...." : "Update Info"}
              </button>
              <div className=" flex justify-between text-sm text-red-600 font-medium">
                <button
                  onClick={handleDeleteUser}
                  className="hover:text-red-400"
                >
                  Delete Account
                </button>
                <button onClick={signOutUser} className="hover:text-red-400">
                  Sign Out
                </button>
              </div>
              <div>
                <p className="text-red-700 text-center mt-5">
                  {error ? error : ""}
                </p>
                <p className="text-green-700 text-center mt-5">
                  {updateUserSuccessMessage ? "User Updated!" : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="my-2">
            <span className="px-10">
              You have {listings.length} listings available!
            </span>
            <hr className="my-3" />
            <div className="flex flex-row flex-wrap gap-4 justify-center px-5 w-full h-full">
    
                {listings &&
                  listings.map((listing, index) => (
                    <div key={index} className="p-1">
                      <ListingCard listing={listing} />
                      <div className="grid grid-cols-2 gap-4 my-2 mx-2">
                        <ListingEditPopup
                          listing={listing}
                          className="w-full"
                        />
                        <button
                          onClick={() => handleDeleteListing(index)}
                          className="border-0 ring-2 ring-red-400 rounded-md py-1 hover:ring-1 hover:shadow-lg font-medium bg-red-50 text-center"
                        >
                          DELETE
                        </button>
                      </div>
                    </div>
                  ))}

                <div
                  className="flex flex-col justify-center items-center w-[320px] h-[450px] border-gray-200 rounded-lg shadow bg-slate-100 cursor-pointer hover:shadow-xl"
                  onClick={() => navigate("/add-property")}
                >
                  <IoIosAddCircle className="size-8 text-slate-800 " />
                  <span className="font-semibold text-slate-800 text-lg">
                    Add New Listing
                  </span>
                </div>
           
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
