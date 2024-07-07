import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { GoOrganization } from "react-icons/go";
import { FaCode } from "react-icons/fa";
import { CiLocationOn, CiEdit } from "react-icons/ci";
import "./style.css";

const ProfileCard = () => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState("John Doe");
  const [isEditing, setIsEditing] = useState(false);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

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
              {/* {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <div className="image-item__btn-wrapper">
                    <button
                      onClick={() => onImageUpdate(index)}
                      className="profile-page-user-details-button"
                    >
                      Update
                    </button>
                  </div>
                </div>
              ))} */}
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
              value={name}
              onChange={handleNameChange}
              onKeyDown={handleKeyDown}
              onBlur={toggleEditing}
              className="name-input"
              autoFocus
            />
          ) : (
            <h2>{name}</h2>
          )}
        </div>
      </div>
      <div className="profile-info">
        <div className="profile-info-item">
          <GoOrganization className="profile-info-icon" />
          Vishnu Institute of Technology
        </div>
        <div className="profile-info-item">
          <FaCode className="profile-info-icon" />
          C++, Java, Python
        </div>
        <div className="profile-info-item">
          <CiLocationOn className="profile-info-icon" />
          Bhimavaram, Andhra Pradesh, India
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
