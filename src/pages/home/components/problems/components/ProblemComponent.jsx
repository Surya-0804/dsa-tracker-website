import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import GFG from "./styles/GFG.svg";
import { IoNewspaperOutline, IoNewspaper } from "react-icons/io5";
import { MdAddCircleOutline, MdAddCircle } from "react-icons/md";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import AddNotes from '../../../../../components/addnotes/AddNotes';
import loud_btn from '../../sounds/hover_quest.wav';
import loud_bt2 from '../../sounds/loud_btn_clk.wav';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProblemComponent({
    problemName,
    difficultyLevel,
    URL,
    problemId
}) {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id;
    const token = localStorage.getItem('token');

    const sound = new Audio(loud_btn);
    const sound2 = new Audio(loud_bt2);

    const navigate = useNavigate();
    const successToast = () => {
        toast.success('Successfull!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const errorToast = () => {
        toast.error('failed!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    const navigateToSolution = () => {
        navigate("/solution");
    };

    const [showText, setShowText] = useState(false);
    const [hoveredSolution, setHoveredSolution] = useState(false);
    const [hoveredAdd, setHoveredAdd] = useState(false);
    const [hoveredStar, setHoveredStar] = useState(false);
    const [hoveredBookMark, setHoveredBookMark] = useState(false);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState("Unsolved");
    const [selectedDifficulties, setSelectedDifficulties] = useState([]);
    const [isAddNotesVisible, setIsAddNotesVisible] = useState(false);

    const handleMouseEnterSolution = () => {
        setHoveredSolution(true);
        setShowText(true);
    };

    const handleMouseLeaveSolution = () => {
        setHoveredSolution(false);
        setShowText(false);
    };

    const handleMouseEnterAdd = () => {
        setHoveredAdd(true);
        setShowText(true);
    };

    const handleMouseLeaveAdd = () => {
        setHoveredAdd(false);
        setShowText(false);
    };

    const handleMouseEnterStar = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/problemProgress/favourites`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId,
                    problemId
                }),
            });

            if (!response.ok) {
                errorToast()
            }
            else {
                setHoveredStar(true);
                successToast();
            }
        }
        catch (err) {
            errorToast()
        }

    };

    const handleMouseLeaveStar = () => {
        setHoveredStar(false);
        setShowText(false);
    };


    const errorMsg = () => {
        throw new Error("Failed to bookmark the problem");
    }

    const handleMouseEnterBookMark = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/problemProgress/bookmark`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId,
                    problemId
                }),
            });

            if (!response.ok) {
                errorToast();
            }
            else {
                setHoveredBookMark(true);
                successToast();
            }

        }
        catch (err) {
            errorToast()
        }

    };

    const handleMouseLeaveBookMark = () => {
        setHoveredBookMark(false);
        setShowText(false);
    };

    const toggleDropdown = () => {
        sound.play();
        setIsDropdownVisible((prevState) => !prevState);
    };

    const handleStatusChange = async (status) => {
        sound2.play();
        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/problemProgress/problemStatus`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    userId,
                    problemId,
                    status
                }),
            });
            if (!response.ok) {
                errorToast();
            }
            else {
                successToast();
                setSelectedStatus(status);
                setIsDropdownVisible(false);
            }
        }
        catch (err) {
            errorToast();
        }
    };


    const statusColors = {
        Solved: "#50c878",
        Revision: "rgb(221, 221, 57)",
        Unsolved: "rgb(243, 55, 55)",
    };

    let backgroundColor;

    if (difficultyLevel === 'Easy') {
        backgroundColor = '#a1e5cd';
    } else if (difficultyLevel === 'Medium') {
        backgroundColor = '#FBEDA6';
    } else if (difficultyLevel === 'Hard') {
        backgroundColor = '#F3A8A8';
    }

    const mainDivStyle = {
        backgroundColor: backgroundColor,
    };
    const handleAddNotesClick = () => {
        setIsAddNotesVisible(true); // Show the AddNotes component
    };

    const handleAddNotesClose = () => {
        setIsAddNotesVisible(false); // Hide the AddNotes component
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            const dropdownMenu = document.querySelector(
                ".problem-component-status-dropdown-menu"
            );
            if (dropdownMenu && !dropdownMenu.contains(event.target)) {
                setIsDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className={`problem-rectangle ${isAddNotesVisible ? 'blur' : ''}`} style={mainDivStyle}>
                <div>
                    <h1 className="problem-rectangle-heading">
                        {problemName}
                    </h1>
                    <div className="problem-difficulty-indicator">
                        {difficultyLevel}
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }} className="problemBottom">
                    <div className="problem-rectangle-solve-problem-container">
                        <a href={URL} target="_blank" rel="noopener noreferrer">
                            <img
                                className="GFG-logo-problem-solve-rectangle"
                                style={{ cursor: "pointer" }}
                                src={GFG}
                                alt="GFG"
                            ></img>
                        </a>
                    </div>
                    <div className="problem-component-icon-outer-container">
                        <div
                            className="problem-component-icon-container"
                            onMouseEnter={handleMouseEnterSolution}
                            onMouseLeave={handleMouseLeaveSolution}
                            onClick={navigateToSolution}
                            style={{
                                transition: "transform 0.3s ease-in-out",
                                transform: hoveredSolution ? "scale(1.1)" : "scale(1)",
                                display: "inline-block",
                                marginLeft: "1rem",
                                marginTop: "0.3rem",
                            }}
                        >
                            {hoveredSolution ? (
                                <IoNewspaper
                                    className="problem-component-IoNewspaper"
                                    title={showText ? "Solution" : ""}
                                />
                            ) : (
                                <IoNewspaperOutline
                                    className="problem-component-IoNewspaperOutline"
                                />
                            )}
                        </div>
                        <div
                            className="problem-component-icon-container"
                            onMouseEnter={handleMouseEnterAdd}
                            onMouseLeave={handleMouseLeaveAdd}
                            onClick={handleAddNotesClick}
                            style={{
                                transition: "transform 0.3s ease-in-out",
                                transform: hoveredAdd ? "scale(1.1)" : "scale(1)",
                                display: "inline-block",
                                marginLeft: "1rem",
                                marginTop: "0.3rem",
                            }}
                        >
                            {hoveredAdd ? (
                                <MdAddCircle
                                    className="problem-component-MdAddCircle"
                                    title={showText ? "Add Notes" : ""}
                                />
                            ) : (
                                <MdAddCircleOutline
                                    className="problem-component-MdAddCircle"
                                />
                            )}
                        </div>
                        <div
                            className="problem-component-icon-container"
                            onClick={handleMouseEnterStar}
                            style={{
                                transition: "transform 0.3s ease-in-out",
                                transform: hoveredStar ? "scale(1.1)" : "scale(1)",
                                display: "inline-block",
                                marginLeft: "1rem",
                                marginTop: "0.3rem",
                            }}
                        >
                            {hoveredStar ? (
                                <FaStar
                                    className="problem-component-FaStar"
                                    title={showText ? "Add to Favourites" : ""}
                                />
                            ) : (
                                <FaRegStar
                                    className="problem-component-FaStar"
                                />
                            )}
                        </div>
                        <div
                            className="problem-component-icon-container"
                            onClick={handleMouseEnterBookMark}
                            style={{
                                transition: "transform 0.3s ease-in-out",
                                transform: hoveredBookMark ? "scale(1.1)" : "scale(1)",
                                display: "inline-block",
                                marginLeft: "1rem",
                                marginTop: "0.3rem",
                            }}
                        >
                            {hoveredBookMark ? (
                                <IoBookmark
                                    className="problem-component-IoBookmark"
                                    title={showText ? "Bookmark" : ""}
                                />
                            ) : (
                                <IoBookmarkOutline
                                    className="problem-component-IoBookmark"
                                />
                            )}
                        </div>
                    </div>
                    <div
                        className="problem-completion-indicator"
                        style={{ color: "black" }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <span style={{ color: statusColors[selectedStatus] }}>
                                {selectedStatus}
                            </span>
                            {!isDropdownVisible ? (
                                <IoIosArrowUp className="problem-component-IoIosArrowUp"
                                    onClick={toggleDropdown} />

                            ) : (
                                <IoIosArrowDown className="problem-component-IoIosArrowDown"
                                    onClick={toggleDropdown} />

                            )}

                        </div>
                        {isDropdownVisible && (
                            <div className="problem-component-status-dropdown-menu">
                                <div
                                    className="problem-component-status-dropdown-menu-option-1"
                                    onClick={() => handleStatusChange("Solved")}
                                >
                                    Solved
                                </div>
                                <div
                                    className="problem-component-status-dropdown-menu-option-2"
                                    onClick={() => handleStatusChange("Revision")}
                                >
                                    Revision
                                </div>
                                <div
                                    className="problem-component-status-dropdown-menu-option-3"
                                    onClick={() => handleStatusChange("Unsolved")}
                                >
                                    Unsolved
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div
                className="problem-component-icon-container"
                onMouseEnter={handleMouseEnterAdd}
                onMouseLeave={handleMouseLeaveAdd}
                onClick={handleAddNotesClick}
                style={{
                    transition: "transform 0.3s ease-in-out",
                    transform: hoveredAdd ? "scale(1.1)" : "scale(1)",
                    display: "inline-block",
                    marginLeft: "1rem",
                    marginTop: "0.3rem",
                }}
            >
                {hoveredAdd ? (
                    <MdAddCircle
                        className="problem-component-MdAddCircle problem-component-4icon"
                        title={showText ? "Add Notes" : ""}
                    />
                ) : (
                    <MdAddCircleOutline className="problem-component-MdAddCircle problem-component-4icon" />
                )}
            </div>
            <div
                className="problem-component-icon-container"
                onMouseEnter={handleMouseEnterStar}
                onMouseLeave={handleMouseLeaveStar}
                style={{
                    transition: "transform 0.3s ease-in-out",
                    transform: hoveredStar ? "scale(1.1)" : "scale(1)",
                    display: "inline-block",
                    marginLeft: "1rem",
                    marginTop: "0.3rem",
                }}
            >
                {hoveredStar ? (
                    <FaStar
                        className="problem-component-FaStar problem-component-4icon"
                        title={showText ? "Add to Favourites" : ""}
                    />
                ) : (
                    <FaRegStar className="problem-component-FaStar problem-component-4icon" />
                )}
            </div>
            <div
                className="problem-component-icon-container"
                onMouseEnter={handleMouseEnterBookMark}
                onMouseLeave={handleMouseLeaveBookMark}
                style={{
                    transition: "transform 0.3s ease-in-out",
                    transform: hoveredBookMark ? "scale(1.1)" : "scale(1)",
                    display: "inline-block",
                    marginLeft: "1rem",
                    marginTop: "0.3rem",
                }}
            >
                {hoveredBookMark ? (
                    <IoBookmark
                        className="problem-component-IoBookmark problem-component-4icon"
                        title={showText ? "Bookmark" : ""}
                    />
                ) : (
                    <IoBookmarkOutline className="problem-component-IoBookmark problem-component-4icon" />
                )}
            </div>
            <div
                className="problem-completion-indicator"
                style={{ color: "black" }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <span style={{ color: statusColors[selectedStatus] }}>
                        {selectedStatus}
                    </span>
                    {!isDropdownVisible ? (
                        <IoIosArrowDown
                            className="problem-component-IoIosArrowUp"
                            onClick={toggleDropdown}
                        />
                    ) : (
                        <IoIosArrowUp
                            className="problem-component-IoIosArrowDown"
                            onClick={toggleDropdown}
                        />
                    )}
                </div>
                {isDropdownVisible && (
                    <div className="problem-component-status-dropdown-menu">
                        <div
                            className="problem-component-status-dropdown-menu-option-1"
                            onClick={() => handleStatusChange("Solved")}
                        >
                            Solved
                        </div>
                        <div
                            className="problem-component-status-dropdown-menu-option-2"
                            onClick={() => handleStatusChange("Revision")}
                        >
                            Revision
                        </div>
                        <div
                            className="problem-component-status-dropdown-menu-option-3"
                            onClick={() => handleStatusChange("Unsolved")}
                        >
                            Unsolved
                        </div>
                    </div>
                )}
            </div>

            {
                isAddNotesVisible && (
                    <div className="addnotes-modal">
                        <AddNotes onClose={handleAddNotesClose} />
                    </div>
                )
            }
        </>
    );
}
