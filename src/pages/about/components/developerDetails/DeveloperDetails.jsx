import React from "react";
import "./style.css";
import { FaCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import GVK from "./GVK.jpg";
import Venkat from "./Me.jpg";
import Surya from "./Surya.jpg";
import Mahesh from "./Mahesh.jpg";
import Nav from '../../../../components/nav/Nav'
export default function DeveloperDetails() {
  return (
    <>
      <Nav />
      <div className="dd-main-container"><div className="developer-details">
        <div className="developer-heading-container">
          <div className="developer-heading-ellipse developer-heading-ellipse1"></div>
          <div className="developer-heading-ellipse developer-heading-ellipse2"></div>
          <div className="developer-heading-ellipse developer-heading-ellipse3"></div>
          <div className="developer-heading-rectangle">
            <div className="developer-heading-text">DEVELOPERS</div>
          </div>
        </div>
        <div className="developer-details-component">
          <div className="developer-details-outer-container">
            <div className="developer-details-inner-container">
              <h1 className="developer-details-name">G Venkata Kousik</h1>
              <h2 className="developer-details-role">
                Full Stack Developer
                <FaCircle className="developer-details-role-circle" />
                UI/UX Designer
              </h2>
              <div className="developer-details-skills-container">
                <div className="developer-details-skills">Vue</div>
                <div className="developer-details-skills">NextJS</div>
                <div className="developer-details-skills">ReactJS</div>
                <div className="developer-details-skills">C</div>
                <div className="developer-details-skills">C++</div>
                <div className="developer-details-skills">Java</div>
                <div className="developer-details-skills">Python</div>
                <div className="developer-details-skills">Figma</div>
                <div className="developer-details-skills">Flutter</div>
              </div>
              <div className="developer-details-contact-container">
                <div className="developer-details-location">
                  <FaLocationDot className="developer-details-location-icon" />
                  Bhimavaram, India
                </div>
                <div className="developer-details-mail">
                  <IoMdMail className="developer-details-mail-icon" />
                  venkatakousikcse01@gmail.com
                </div>
              </div>
              <div className="developer-details-social-media-container">
                <a
                  href="https://www.linkedin.com/in/gantavenkatakousik/"
                  className="developer-details-link"
                  target="_blank"
                >
                  <FaLinkedin className="developer-details-icon" />
                  <div className="hover-text">GVK🎯</div>
                </a>
                <div className="separator"></div>
                <a
                  href="https://www.instagram.com/ganta_venkata_kousik/"
                  className="developer-details-link"
                  target="_blank"
                >
                  <RiInstagramFill className="developer-details-icon" />
                  <div className="hover-text">ganta_venkata_kousik</div>
                </a>
                <div className="separator"></div>
                <a
                  href="https://www.facebook.com/koushik.ganta.10"
                  className="developer-details-link"
                  target="_blank"
                >
                  <FaFacebookSquare className="developer-details-icon" />
                  <div className="hover-text">GantaVenkataKousik</div>
                </a>
                <div className="separator"></div>
                <a
                  href="https://github.com/GantaVenkataKousik"
                  className="developer-details-link"
                  target="_blank"
                >
                  <FaGithub className="developer-details-icon" />
                  <div className="hover-text">GVK</div>
                </a>
              </div>
            </div>
          </div>
          <div className="developer-details-image-container">
            <img className="developer-details-image" src={GVK} alt="GVK" />
          </div>
        </div>
        <div className="developer-details-component">
          <div className="developer-details-image-container">
            <img className="developer-details-image" src={Venkat} alt="Venkat" />
          </div>
          <div className="developer-details-outer-container">
            <div className="developer-details-inner-container">
              <h1 className="developer-details-name">M G S L Venkat</h1>
              <h2 className="developer-details-role">
                Full Stack Developer
                <FaCircle className="developer-details-role-circle" />
                UI/UX Designer
              </h2>
              <div className="developer-details-skills-container">
                <div className="developer-details-skills">ReactJS</div>
                <div className="developer-details-skills">ExpressJS</div>
                <div className="developer-details-skills">MongoDB</div>
                <div className="developer-details-skills">C</div>
                <div className="developer-details-skills">JavaScript</div>
                <div className="developer-details-skills">Java</div>
                <div className="developer-details-skills">Python</div>
                <div className="developer-details-skills">Figma</div>
              </div>
              <div className="developer-details-contact-container">
                <div className="developer-details-location">
                  <FaLocationDot className="developer-details-location-icon" />
                  Bhimavaram, India
                </div>
                <div className="developer-details-mail">
                  <IoMdMail className="developer-details-mail-icon" />
                  venkatmiriyala19@gmail.com
                </div>
              </div>
              <div className="developer-details-social-media-container">
                <a
                  href="https://www.linkedin.com/in/ganesh-satya-lakshmi-venkat-miriyala-520832281/"
                  className="developer-details-link"
                  target="_blank"
                >
                  <FaLinkedin className="developer-details-icon" />
                  <div className="hover-text">
                    Miriyala Ganesh Satya Lakshmi Venkat
                  </div>
                </a>
                <div className="separator"></div>
                <a
                  href="https://www.instagram.com/_venkat._.here_/"
                  className="developer-details-link"
                  target="_blank"
                >
                  <RiInstagramFill className="developer-details-icon" />
                  <div className="hover-text">_venkat._.here_</div>
                </a>
                <div className="separator"></div>
                <a
                  href="https://www.facebook.com/profile.php?id=61560867595574"
                  className="developer-details-link"
                  target="_blank"
                >
                  <FaFacebookSquare className="developer-details-icon" />
                  <div className="hover-text">Venkat Miriyala</div>
                </a>
                <div className="separator"></div>
                <a
                  href="https://github.com/venkatmiriyala19"
                  className="developer-details-link"
                  target="_blank"
                >
                  <FaGithub className="developer-details-icon" />
                  <div className="hover-text">venkatmiriyala19</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="developer-details-component">
          <div className="developer-details-outer-container">
            <div className="developer-details-inner-container">
              <h1 className="developer-details-name">A R S S Surya</h1>
              <h2 className="developer-details-role">
                Full Stack Developer
                <FaCircle className="developer-details-role-circle" />
                UI/UX Designer
              </h2>
              <div className="developer-details-skills-container">
                <div className="developer-details-skills">ExpressJS</div>
                <div className="developer-details-skills">NodeJS</div>
                <div className="developer-details-skills">ReactJS</div>
                <div className="developer-details-skills">C</div>
                <div className="developer-details-skills">JavaScript</div>
                <div className="developer-details-skills">Java</div>
                <div className="developer-details-skills">Python</div>
                <div className="developer-details-skills">Figma</div>
              </div>
              <div className="developer-details-contact-container">
                <div className="developer-details-location">
                  <FaLocationDot className="developer-details-location-icon" />
                  Bhimavaram, India
                </div>
                <div className="developer-details-mail">
                  <IoMdMail className="developer-details-mail-icon" />
                  surya.abothula@gmail.com
                </div>
              </div>
              <div className="developer-details-social-media-container">
                <a
                  href="https://www.linkedin.com/in/ram-sai-sri-surya-abothula-898314280/"
                  className="developer-details-link"
                  target="_blank"
                >
                  <FaLinkedin className="developer-details-icon" />
                  <div className="hover-text">Ram Sai Sri Surya Abothula</div>
                </a>
                <div className="separator"></div>
                <a
                  href="https://www.instagram.com/surya_0804/"
                  className="developer-details-link"
                  target="_blank"
                >
                  <RiInstagramFill className="developer-details-icon" />
                  <div className="hover-text">surya_0804</div>
                </a>
                <div className="separator"></div>
                <a
                  href="https://www.facebook.com/ramsaisrisurya?mibextid=ZbWKwL"
                  className="developer-details-link"
                  target="_blank"
                >
                  <FaFacebookSquare className="developer-details-icon" />
                  <div className="hover-text">ramsaisrisurya</div>
                </a>
                <div className="separator"></div>
                <a
                  href="https://github.com/Surya-0804"
                  className="developer-details-link"
                  target="_blank"
                >
                  <FaGithub className="developer-details-icon" />
                  <div className="hover-text">Surya-0804</div>
                </a>
              </div>
            </div>
          </div>
          <div className="developer-details-image-container">
            <img className="developer-details-image" src={Surya} alt="Surya" />
          </div>
        </div>
        <div className="developer-details-component">
          <div className="developer-details-image-container">
            <img className="developer-details-image" src={Mahesh} alt="Mahesh" />
          </div>
          <div className="developer-details-outer-container">
            <div className="developer-details-inner-container">
              <h1 className="developer-details-name">A Mahesh Babu</h1>
              <h2 className="developer-details-role">
                Full Stack Developer
                <FaCircle className="developer-details-role-circle" />
                UI/UX Designer
              </h2>
              <div className="developer-details-skills-container">
                <div className="developer-details-skills">ReactJS</div>
                <div className="developer-details-skills">Flask</div>
                <div className="developer-details-skills">PostgreSQL</div>
                <div className="developer-details-skills">C</div>
                <div className="developer-details-skills">Dart</div>
                <div className="developer-details-skills">Java</div>
                <div className="developer-details-skills">Python</div>
                <div className="developer-details-skills">Figma</div>
              </div>
              <div className="developer-details-contact-container">
                <div className="developer-details-location">
                  <FaLocationDot className="developer-details-location-icon" />
                  Bhimavaram, India
                </div>
                <div className="developer-details-mail">
                  <IoMdMail className="developer-details-mail-icon" />
                  maheshaddagatla1234@gmail.com
                </div>
              </div>
              <div className="developer-details-social-media-container">
                <a
                  href="https://www.linkedin.com/in/mahesh-addagatla-680b76211/"
                  className="developer-details-link"
                  target="_blank"
                >
                  <FaLinkedin className="developer-details-icon" />
                  <div className="hover-text">Mahesh Addagatla</div>
                </a>
                <div className="separator"></div>
                <a
                  href="https://www.instagram.com/mahi_addagatla/"
                  className="developer-details-link"
                  target="_blank"
                >
                  <RiInstagramFill className="developer-details-icon" />
                  <div className="hover-text">mahi_addagatla</div>
                </a>
                <div className="separator"></div>
                <a
                  href="https://www.facebook.com/profile.php?id=100030064321108&mibextid=rS40aB7S9Ucbxw6v"
                  className="developer-details-link"
                  target="_blank"
                >
                  <FaFacebookSquare className="developer-details-icon" />
                  <div className="hover-text">Mahesh Addagatla</div>
                </a>
                <div className="separator"></div>
                <a
                  href="https://github.com/Mahesh-addagatla"
                  className="developer-details-link"
                  target="_blank"
                >
                  <FaGithub className="developer-details-icon" />
                  <div className="hover-text">Mahesh-addagatla</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div></div>
    </>


  );
}
