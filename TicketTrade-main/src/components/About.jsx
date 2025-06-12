import 'bootstrap/dist/css/bootstrap.min.css';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import NihalImg from "../assets/Nihal.jpg";
import SaumyImg from "../assets/Saumy.jpg";

const AboutUs = () => {
  const developers = [
    {
      name: 'Nihal Yadav',
      role: 'Backend Developer',
      img: NihalImg,
      github: 'https://github.com/Nih-0',
      instagram: 'https://www.instagram.com/not__nihal_?igsh=MTc3aWl0ZXQwMmQ2aw==',
      linkedin: 'https://www.linkedin.com/in/nihal-yadav-',
      description: 'Experienced backend developer specializing in APIs, databases, and scalable systems.',
      qualification: 'Bachelor of Computer Applications',
    },
    {
      name: 'Saumy Mishra',
      role: 'Frontend Developer',
      img: SaumyImg,
      github: 'https://github.com/saumymishra',
      instagram: 'https://instagram.com/saumymishra',
      linkedin: 'https://linkedin.com/in/saumymishra',
      description: 'Dedicated frontend developer creating intuitive and modern interfaces using React and the latest web technologies.',
      qualification: 'Bachelor of Computer Applications',
    },
  ];

  return (
    <section className="py-4 about-us-section text-white" style={{ backgroundColor: "#f97316", minHeight: "100vh" }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Left Side - Content */}
          <div className="col-md-6 mb-4 mb-md-0">
            <h1 className="display-5 fw-bold mb-4">
              About TicketTrade<br />
            </h1>
            <p className="mb-3 text-white">
              Minimize last-minute panic and reduce ticket waste. Every year, thousands of tickets go unused while countless fans miss out on experiences. We're here to change that.
            </p>
            <p className="mb-3 text-white">
              Have an extra ticket you can't use? Looking for a last-minute entry to a sold-out event? TicketTrade is your go-to platform for hassle-free ticket buying and selling, designed to bring people together through the events they love.
            </p>
          </div>

          {/* Right Side - Developer Profiles */}
          <div className="col-md-6">
            <h1 className="display-6 fw-bold mb-4 text-center text-dark">Our Team</h1>

            <div className="row">
              {developers.map((dev, idx) => (
                <div key={idx} className="col-12 col-md-6 mb-4">
                  <div
                    className="bg-white rounded p-3 text-center shadow-sm h-100 d-flex flex-column align-items-center justify-content-center hover-card"
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="rounded-circle overflow-hidden mb-3 border border-warning shadow profile-pic" style={{ width: '100px', height: '100px' }}>
                      <img
                        src={dev.img}
                        alt={dev.name}
                        className="img-fluid w-100 h-100 object-fit-cover"
                      />
                    </div>
                    <h5 className="fw-semibold text-dark mb-1">{dev.name}</h5>
                    <p className="text-warning text-uppercase small mb-2 text-black">{dev.role}</p>

                    {/* Hidden by default, shown on hover */}
                    <div className="extra-info text-start mt-3 w-100">
                      <p><strong>Description:</strong> {dev.description}</p>
                      <p><strong>Qualification:</strong> {dev.qualification}</p>
                      <div className="d-flex gap-3 mt-2 justify-content-center">
                        <a href={dev.github} target="_blank" rel="noopener noreferrer" className="text-muted hover-text-warning">
                          <FaGithub size={22} />
                        </a>
                        <a href={dev.instagram} target="_blank" rel="noopener noreferrer" className="text-muted hover-text-warning">
                          <FaInstagram size={22} />
                        </a>
                        <a href={dev.linkedin} target="_blank" rel="noopener noreferrer" className="text-muted hover-text-warning">
                          <FaLinkedin size={22} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hover effect styles */}
      <style jsx>{`
        .hover-text-warning:hover {
          color: #fd7e14 !important;
        }

        .hover-card .extra-info {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, opacity 0.4s ease;
        }

        .hover-card:hover {
          transform: scale(1.05);
          transition: transform 0.3s ease;
        }

        .hover-card:hover .extra-info {
          max-height: 400px;
          opacity: 1;
        }

        .profile-pic {
          transition: transform 0.3s ease;
        }

        .hover-card:hover .profile-pic {
          transform: scale(1.2);
          z-index: 1;
        }
      `}</style>
    </section>
  );
};

export default AboutUs;
