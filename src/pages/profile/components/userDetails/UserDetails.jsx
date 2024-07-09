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

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
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
            onImageUpdate,
            onImageRemove,
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
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            Github
          </a>
        </div>
        <div className="profile-info-item">
          <FaLinkedin className="profile-info-icon" />
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
