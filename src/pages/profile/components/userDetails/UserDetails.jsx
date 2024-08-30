import React, { useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { GoOrganization } from "react-icons/go";
import { CiLocationOn, CiEdit } from "react-icons/ci";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import "./style.css";

const ProfileCard = ({ isLoginCompleted, setIsLoginCompleted }) => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const maxNumber = 69;
  const token = localStorage.getItem('token');
  const onChange = async (imageList, addUpdateIndex) => {
    const formData = new FormData();
    formData.append("image", imageList[0].file); // Append the image file

<<<<<<< HEAD
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/userDetails/uploadImage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in headers for authorization
      },
      body: formData, // Send the FormData object
    });

    if (response.ok) {
      // If the image is uploaded successfully, update the state
      setImages(imageList);
    } else {
      console.error("Failed to upload image");
=======
  // Handle image upload and send it to the backend
  const onChange = async (imageList) => {
    setImages(imageList);

    if (imageList.length > 0) {
      const formData = new FormData();
      formData.append("userId", name?.id); // Ensure user ID is available
      formData.append("image", imageList[0].file);

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_SERVER_URL}/userDetails/uploadImage`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to upload image");
        }

        const result = await response.json();
        console.log("Image uploaded successfully", result);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
>>>>>>> aec692b2e83ed4f368dce7ef30ac315728d91127
    }
  };

  const handleNameChange = (event) => {
    setName((prevName) => ({
      ...prevName,
      name: event.target.value,
    }));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (token && user) {
      setIsLoginCompleted(true);
      setName(user);
    }
  }, [setIsLoginCompleted]);

  return (
    <div className="profile-card">
      <div className="profile-image-container">
        <div className="profile-image">
          {images.length > 0 ? (
            <img src={images[0]["data_url"]} alt="Profile" />
          ) : (
            <div className="image-placeholder">Select an image</div>
          )}
        </div>
        <ImageUploading
          multiple={false}
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            isDragging,
            dragProps,
          }) => (
            <div className="upload__image-wrapper">
              <button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
                className="profile-page-user-details-button"
              >
                Upload Image
              </button>
              &nbsp;
              <button
                onClick={onImageRemoveAll}
                className="profile-page-user-details-button"
              >
                Remove image
              </button>
            </div>
          )}
        </ImageUploading>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CiEdit
            style={{ fontSize: "2rem", marginRight: "1rem", cursor: "pointer" }}
            onClick={toggleEditing}
          />
          {isEditing ? (
            <input
              type="text"
              value={name ? name.name : ""}
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
              onBlur={toggleEditing}
              className="name-input"
              autoFocus
            />
          ) : (
            <h2>{name ? name.name : "Guest"}</h2>
          )}
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-info-item">
          <GoOrganization className="profile-info-icon" />
          Vishnu Institute of Technology
        </div>
        <div className="profile-info-item">
          <CiLocationOn className="profile-info-icon" />
          Bhimavaram, Andhra Pradesh, India
        </div>
        <div className="profile-info-item">
          <FaGithub className="profile-info-icon" />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
        </div>
        <div className="profile-info-item">
          <FaLinkedin className="profile-info-icon" />
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
