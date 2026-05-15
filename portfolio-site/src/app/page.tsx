"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import AOS from "aos";
import { X, ChevronLeft, ChevronRight, Menu } from "lucide-react";
import Swal from "sweetalert2";

const projects = [
  {
    title: "ComSignal",
    desc: "AI Sign Language Platform",
    images: [
      { src: "/images/projects/comsignal-1.jpg", title: "Landing Page" },
      { src: "/images/projects/comsignal-2.jpg", title: "Admin Dashboard" },
      { src: "/images/projects/comsignal-3.jpg", title: "AI Model" },
      { src: "/images/projects/comsignal-4.jpg", title: "Dictionary" }
    ]
  },
  {
    title: "Stockey",
    desc: "Boutique Web App",
    images: [
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/Screenshot%202026-03-03%20222239.png", title: "Landing Page" },
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/Screenshot%202026-03-03%20222323.png", title: "Login" },
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/Screenshot%202026-03-03%20222342.png", title: "Women" },
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/Screenshot%202026-03-03%20222352.png", title: "Accessories" }
    ]
  },
  {
    title: "SmartBank",
    desc: "Banking System v2.0",
    images: [
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/Screenshot%202026-03-03%20221727.png", title: "Login" },
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/Screenshot%202026-03-03%20221816.png", title: "Accounts" },
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/Screenshot%202026-03-03%20221845.png", title: "Admin" },
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/Screenshot%202026-03-03%20221911.png", title: "Branch Manager" }
    ]
  },
  {
    title: "Bank Desktop App",
    desc: "Java & Oracle DB",
    images: [
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/homepage.jpeg", title: "Dashboard" },
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/login.jpeg", title: "Login" },
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/account.jpeg", title: "Account" },
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/depoist.jpeg", title: "Deposit" },
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/withdraw.jpeg", title: "Withdraw" },
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/thanks.jpeg", title: "Thanks" }
    ]
  },
  {
    title: "BankApp Mobile",
    desc: "Mobile Banking App",
    images: [
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/Homepage.png", title: "Home" },
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/services.png", title: "Services Grid" },
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/Login.png", title: "Login" },
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/transaction-report.png", title: "Transaction Report" },
      { src: "https://raw.githubusercontent.com/maro-eltma333/maro-eltma333/main/transfer.png", title: "Transfer" }
    ]
  }
];

const ProjectCard = ({ project, index, onClick }: { project: any, index: number, onClick: (project: any) => void }) => {
  return (
    <div className="portfolio-item group flex flex-col relative h-[350px] sm:h-[400px] overflow-hidden rounded-xl shadow-md border border-gray-200 cursor-pointer hover:shadow-xl transition-all duration-300 bg-white" onClick={() => onClick(project)} data-aos="zoom-in-up" data-aos-delay={(index % 4) * 100}>
      <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg group-hover:bg-black/80 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        {project.images.length}
      </div>
      <div className="relative flex-grow overflow-hidden">
        <img 
          src={project.images[0].src} 
          alt={`${project.title} cover`} 
          className="absolute top-0 left-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 z-0" 
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="z-10 bg-white border-t border-gray-100 p-4 pb-5 text-center flex-shrink-0">
        <h4 className="text-[#2c3e50] text-[16px] font-bold uppercase tracking-wide mb-1.5">{project.title}</h4>
        <div className="text-[#5c6873] text-[14px] font-medium">{project.desc}</div>
      </div>
    </div>
  );
};

export default function Home() {
  const [lightboxData, setLightboxData] = useState<{images: {src: string, title: string}[], title: string} | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("email", formData.email);
    formDataObj.append("message", formData.message);

    try {
      const { sendEmailAction } = await import("./actions");
      const result = await sendEmailAction(formDataObj);
      
      if (result.error) {
        setFormStatus("idle");
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to send message. Please try again.",
          confirmButtonColor: "#343a40",
        });
        console.error(result.error);
      } else {
        setFormStatus("idle");
        setFormData({ name: "", email: "", message: "" });
        Swal.fire({
          icon: "success",
          title: "Message Sent!",
          text: "Thank you for reaching out. I'll get back to you soon!",
          confirmButtonColor: "#eab308", // matching tailwind yellow-500
        });
      }
    } catch (err) {
      setFormStatus("idle");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
        confirmButtonColor: "#343a40",
      });
    }
  };

  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
    });
  }, []);

  const openLightbox = (project: any) => {
    setLightboxData({ images: project.images, title: project.title });
    setLightboxIndex(0);
  };

  const closeLightbox = () => {
    setLightboxData(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxData) return;
    setLightboxIndex((prev) => (prev + 1) % lightboxData.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxData) return;
    setLightboxIndex((prev) => (prev - 1 + lightboxData.images.length) % lightboxData.images.length);
  };

  return (
    <div id="top">
      {/* Header Nav - Matched to Screenshot */}
      <header className="bg-[#f8f9fa] sticky top-0 z-50">
        <nav className="max-w-[1320px] mx-auto px-4 py-4 flex flex-wrap justify-between items-center">
          <Link href="#" className="text-[22px] font-bold text-[#1a1a1a] decoration-0 whitespace-nowrap tracking-wide">
            My Website
          </Link>
          
          <button 
            className="md:hidden flex items-center justify-center p-2 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-800 hover:bg-gray-50 hover:shadow-md transition-all duration-200 active:scale-90"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X size={26} strokeWidth={2.5} /> : <Menu size={26} strokeWidth={2.5} />}
          </button>

          <div className={`w-full md:w-auto md:flex transition-all duration-300 origin-top ${isMobileMenuOpen ? 'block opacity-100 scale-y-100' : 'hidden opacity-0 scale-y-0 md:opacity-100 md:scale-y-100'} mt-4 md:mt-0`}>
            <ul className="flex flex-col md:flex-row md:space-x-8 bg-white md:bg-transparent rounded-2xl md:rounded-none shadow-lg md:shadow-none p-3 md:p-0 border border-gray-100 md:border-none space-y-1 md:space-y-0">
              <li><Link href="#about" onClick={toggleMenu} className="block py-3 px-4 md:py-0 md:px-0 text-[16px] md:text-[18px] text-[#2c3e50] hover:bg-gray-50 md:hover:bg-transparent hover:text-black rounded-xl transition-all font-bold">About</Link></li>
              <li><Link href="#services" onClick={toggleMenu} className="block py-3 px-4 md:py-0 md:px-0 text-[16px] md:text-[18px] text-[#2c3e50] hover:bg-gray-50 md:hover:bg-transparent hover:text-black rounded-xl transition-all font-bold">Services</Link></li>
              <li><Link href="#skills" onClick={toggleMenu} className="block py-3 px-4 md:py-0 md:px-0 text-[16px] md:text-[18px] text-[#2c3e50] hover:bg-gray-50 md:hover:bg-transparent hover:text-black rounded-xl transition-all font-bold">Skills</Link></li>
              <li><Link href="#portfolio" onClick={toggleMenu} className="block py-3 px-4 md:py-0 md:px-0 text-[16px] md:text-[18px] text-[#2c3e50] hover:bg-gray-50 md:hover:bg-transparent hover:text-black rounded-xl transition-all font-bold">Portfolio</Link></li>
              <li><Link href="#experience" onClick={toggleMenu} className="block py-3 px-4 md:py-0 md:px-0 text-[16px] md:text-[18px] text-[#2c3e50] hover:bg-gray-50 md:hover:bg-transparent hover:text-black rounded-xl transition-all font-bold">Experience</Link></li>
              <li><Link href="#contact" onClick={toggleMenu} className="block py-3 px-4 md:py-0 md:px-0 text-[16px] md:text-[18px] text-[#2c3e50] hover:bg-gray-50 md:hover:bg-transparent hover:text-black rounded-xl transition-all font-bold">Contact</Link></li>
            </ul>
          </div>
        </nav>
      </header>

      <div className="page-content overflow-x-hidden">
        
        {/* Hero Section */}
        <header>
          <div className="bg-light pt-8 md:pt-12 pb-4">
            <div className="max-w-[1320px] mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left">
                <div className="w-full md:w-1/2 p-2 mb-6 md:mb-0">
                  <img className="w-full max-w-[280px] sm:max-w-md mx-auto" src="/images/illustrations/hello3.svg" alt="hello"/>
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0 px-2 sm:px-4">
                  <p className="text-xs sm:text-sm font-bold tracking-widest uppercase mb-1 text-gray-500">Hello!</p>
                  <h1 className="intro-title marker mb-4 md:mb-6" data-aos="fade-up" data-aos-delay="50">I’m Ammar Ahmed</h1>
                  <p className="text-lg sm:text-xl font-light text-gray-700 mt-4 md:mt-6 mb-6" data-aos="fade-up" data-aos-delay="100">
                    Full-Stack Developer | Cybersecurity Student
                  </p>
                  <div className="flex justify-center md:justify-start space-x-4 mb-6" data-aos="fade-up" data-aos-delay="200">
                    <a href="https://www.linkedin.com/in/ammarhagagy/" target="_blank" className="text-gray-600 hover:text-[#F6E05E] transition-colors text-xl">
                      <i className="fab fa-linkedin"></i>
                    </a>
                    <a href="https://github.com/maro-eltma333" target="_blank" className="text-gray-600 hover:text-gray-900 transition-colors text-xl">
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                  <div data-aos="fade-up" data-aos-delay="200">
                    <a className="btn btn-primary shadow-sm mt-1 hover-effect" href="#contact">
                      Get In Touch <i className="fas fa-arrow-right ml-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="wave-bg"></div>
        </header>

        {/* About Section */}
        <div className="pt-10 px-4" id="about">
          <div className="max-w-[1320px] mx-auto">
            <div className="flex flex-col-reverse md:flex-row gap-8">
              <div className="w-full md:w-7/12">
                <h2 className="text-2xl font-bold mb-4">Hello! I’m Ammar Ahmed.</h2>
                <p className="text-gray-600 mb-6">
                  Motivated and versatile software developer with expertise in full-stack web development, databases, cloud deployment, and cybersecurity. Experienced building secure, responsive, and production-ready applications using React, Next.js, Node.js, Python, and Java. Hands-on with AI/ML integration, automated testing (Selenium), version control (Git/GitHub), and containerized deployment (Docker, VPS, OCI).
                </p>
                <div className="grid grid-cols-12 gap-y-3 gap-x-4">
                  <div className="col-span-12 sm:col-span-3 text-gray-500 font-bold">Age:</div>
                  <div className="col-span-12 sm:col-span-9 font-bold text-gray-800">19</div>
                  
                  <div className="col-span-12 sm:col-span-3 text-gray-500 font-bold">Email:</div>
                  <div className="col-span-12 sm:col-span-9 font-bold text-gray-800">mindsetcoding0@gmail.com</div>
                  
                  <div className="col-span-12 sm:col-span-3 text-gray-500 font-bold">GitHub:</div>
                  <div className="col-span-12 sm:col-span-9 font-bold text-gray-800">maro-eltma333</div>
                  
                  <div className="col-span-12 sm:col-span-3 text-gray-500 font-bold">Phone:</div>
                  <div className="col-span-12 sm:col-span-9 font-bold text-gray-800">(+20) 105 5200 927</div>
                  
                  <div className="col-span-12 sm:col-span-3 text-gray-500 font-bold">Address:</div>
                  <div className="col-span-12 sm:col-span-9 font-bold text-gray-800">Cairo, Egypt</div>
                  
                  <div className="col-span-12 sm:col-span-3 text-gray-500 font-bold">Status:</div>
                  <div className="col-span-12 sm:col-span-9 font-bold text-gray-800">Available</div>
                </div>
              </div>
              <div className="w-full md:w-5/12 flex justify-center items-start" data-aos="fade-left" data-aos-delay="100">
                <img className="rounded-[30px] shadow-lg max-w-full h-auto w-[300px]" src="/images/Maro.webp" alt="Ammar Ahmed" />
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="pt-20 px-4" id="services">
          <div className="max-w-[1320px] mx-auto text-center mb-12">
            <h2 className="marker marker-center text-3xl font-bold">My Services</h2>
          </div>
          <p className="max-w-2xl mx-auto text-center text-gray-600 mb-10">
             I offer full-stack web and mobile development services, tailored to build secure, robust, and scalable solutions for any business.
          </p>
          <div className="max-w-[1320px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center" data-aos="fade-up" data-aos-delay="100">
              <img className="mx-auto mb-4" src="/images/services/web-design.svg" width="96" height="96" alt="web design"/>
              <div className="text-lg font-bold text-gray-800">Full-Stack Dev</div>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="200">
              <img className="mx-auto mb-4" src="/images/services/graphic-design.svg" width="96" height="96" alt="Cybersecurity"/>
              <div className="text-lg font-bold text-gray-800">Cybersecurity</div>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="300">
              <img className="mx-auto mb-4" src="/images/services/ui-ux.svg" width="96" height="96" alt="ui-ux"/>
              <div className="text-lg font-bold text-gray-800">UI/UX</div>
            </div>
            <div className="text-center" data-aos="fade-up" data-aos-delay="400">
              <img className="mx-auto mb-4" src="/images/services/app-development.svg" width="96" height="96" alt="app development"/>
              <div className="text-lg font-bold text-gray-800">App Development</div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="pt-20 px-4" id="skills">
          <div className="max-w-[1320px] mx-auto text-center mb-12">
            <h2 className="marker marker-center text-3xl font-bold">My Skills</h2>
          </div>
          <p className="max-w-2xl mx-auto text-center text-gray-600 mb-10">
             I specialize in a multitude of skills required for modern Web Application Development, Database Management, and Security.
          </p>
          <div className="max-w-[1320px] mx-auto bg-[#f8f9fa] p-8 rounded shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold text-gray-700 mb-1"><span>React / Next.js</span><span>95%</span></div>
                <div className="w-full bg-[#e9ecef] h-3 rounded-full mb-4 overflow-hidden"><div className="bg-[#F6E05E] h-3 rounded-full" style={{width: '95%'}} data-aos="zoom-in-right" data-aos-delay="100"></div></div>
                
                <div className="flex justify-between text-sm font-bold text-gray-700 mb-1"><span>Java</span><span>85%</span></div>
                <div className="w-full bg-[#e9ecef] h-3 rounded-full mb-4 overflow-hidden"><div className="bg-[#F6E05E] h-3 rounded-full" style={{width: '85%'}} data-aos="zoom-in-right" data-aos-delay="200"></div></div>
                
                <div className="flex justify-between text-sm font-bold text-gray-700 mb-1"><span>HTML / CSS</span><span>90%</span></div>
                <div className="w-full bg-[#e9ecef] h-3 rounded-full mb-4 overflow-hidden"><div className="bg-[#F6E05E] h-3 rounded-full" style={{width: '90%'}} data-aos="zoom-in-right" data-aos-delay="300"></div></div>

                <div className="flex justify-between text-sm font-bold text-gray-700 mb-1"><span>Node.js / Python</span><span>80%</span></div>
                <div className="w-full bg-[#e9ecef] h-3 rounded-full mb-4 overflow-hidden"><div className="bg-[#F6E05E] h-3 rounded-full" style={{width: '80%'}} data-aos="zoom-in-right" data-aos-delay="400"></div></div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold text-gray-700 mb-1"><span>SQL / PostgreSQL / Oracle</span><span>90%</span></div>
                <div className="w-full bg-[#e9ecef] h-3 rounded-full mb-4 overflow-hidden"><div className="bg-[#F6E05E] h-3 rounded-full" style={{width: '90%'}} data-aos="zoom-in-right" data-aos-delay="100"></div></div>
                
                <div className="flex justify-between text-sm font-bold text-gray-700 mb-1"><span>Docker / Cloud (OCI/VPS)</span><span>75%</span></div>
                <div className="w-full bg-[#e9ecef] h-3 rounded-full mb-4 overflow-hidden"><div className="bg-[#F6E05E] h-3 rounded-full" style={{width: '75%'}} data-aos="zoom-in-right" data-aos-delay="200"></div></div>
                
                <div className="flex justify-between text-sm font-bold text-gray-700 mb-1"><span>Cybersecurity Tools</span><span>70%</span></div>
                <div className="w-full bg-[#e9ecef] h-3 rounded-full mb-4 overflow-hidden"><div className="bg-[#F6E05E] h-3 rounded-full" style={{width: '70%'}} data-aos="zoom-in-right" data-aos-delay="300"></div></div>

                <div className="flex justify-between text-sm font-bold text-gray-700 mb-1"><span>Git / GitHub</span><span>85%</span></div>
                <div className="w-full bg-[#e9ecef] h-3 rounded-full mb-4 overflow-hidden"><div className="bg-[#F6E05E] h-3 rounded-full" style={{width: '85%'}} data-aos="zoom-in-right" data-aos-delay="400"></div></div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Section */}
        <div className="pt-20 px-4" id="portfolio">
          <div className="max-w-[1320px] mx-auto text-center mb-12">
            <h2 className="marker marker-center text-3xl font-bold">Portfolio</h2>
          </div>
          
          <div className="max-w-[1320px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
             {projects.map((project, index) => (
               <ProjectCard key={index} project={project} index={index} onClick={openLightbox} />
             ))}
          </div>
        </div>

        {/* Experience Section */}
        <div className="pt-20 px-4" id="experience">
          <div className="max-w-[1320px] mx-auto text-center mb-12">
            <h2 className="marker marker-center text-3xl font-bold">Experience & Education</h2>
          </div>
          <div className="max-w-[1320px] mx-auto grid md:grid-cols-2 gap-6">
            
            <div className="card shadow-sm" data-aos="fade-right" data-aos-delay="100">
              <div className="card-header p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Freelance Full-Stack Developer</h3>
                  <div className="text-gray-500 text-sm">Sep 2024 - Present</div>
                </div>
                <img src="/images/services/full-stack.svg" width="48" height="48" alt="full stack"/>
              </div>
              <div className="p-4 text-gray-600 text-sm space-y-2">
                <p><strong>Tryscentic eCommerce:</strong> Built platform with multi-variant products, advanced checkout, admin dashboard, Next.js, and Supabase RLS.</p>
                <p><strong>ComSignal:</strong> AI platform featuring 3 custom PyTorch models, Text-to-Sign engine, and role-based access.</p>
                <p><strong>SmartBank:</strong> Multi-branch banking system with secure role-based access, automated loans, and React/Node backend.</p>
              </div>
            </div>

            <div className="card shadow-sm" data-aos="fade-left" data-aos-delay="300">
              <div className="card-header p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Cybersecurity Degree</h3>
                  <div className="text-gray-500 text-sm">MITU | Sep 2025 - Present</div>
                </div>
                <img src="/images/services/ui-ux.svg" width="48" height="48" alt="education"/>
              </div>
              <div className="p-4 text-gray-600 text-sm space-y-2">
                <p>Currently pursuing a degree focused on network security, ethical hacking, and information protection.</p>
                <p>Engaged in practical projects involving penetration testing, encryption techniques, and cybersecurity tools such as Wireshark, Kali Linux, and Metasploit.</p>
              </div>
            </div>

            <div className="card shadow-sm" data-aos="fade-right" data-aos-delay="200">
              <div className="card-header p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">BTEC Level 3 IT Diploma</h3>
                  <div className="text-gray-500 text-sm">Elsewedy Academy | Sep 2022 - Jun 2025</div>
                </div>
                <img src="/images/services/app-development.svg" width="48" height="48" alt="education"/>
              </div>
              <div className="p-4 text-gray-600 text-sm space-y-2">
                <p>Completed Oracle Academy curriculum covering Java, SQL, PL/SQL, and Oracle APEX.</p>
                <p>Modules included IT systems, web development, databases, cybersecurity, mobile app development, and cloud computing.</p>
              </div>
            </div>

            <div className="card shadow-sm" data-aos="fade-left" data-aos-delay="400">
              <div className="card-header p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">Certificates & Awards</h3>
                  <div className="text-gray-500 text-sm">2022 - 2025</div>
                </div>
                <img src="/images/services/graphic-design.svg" width="48" height="48" alt="certs"/>
              </div>
              <div className="p-4 text-gray-600 text-sm space-y-2">
                <p>• Intro to Critical Infrastructure Protection – OPSWAT (2025)</p>
                <p>• Cybersecurity & Networking Basics – Cisco (2025)</p>
                <p>• Java & Database Foundations – Oracle (2022-2024)</p>
              </div>
            </div>

          </div>
        </div>

        {/* Contact Section */}
        <div className="pt-20 pb-20 px-4" id="contact">
          <div className="max-w-[1320px] mx-auto text-center mb-12">
            <h2 className="marker marker-center text-3xl font-bold">Contact Me</h2>
          </div>
          <div className="max-w-[1320px] mx-auto grid md:grid-cols-2 gap-12">
            {/* Form perfectly matching screenshot */}
            <div className="bg-[#f2f4f8] p-5 sm:p-8 rounded-lg" data-aos="zoom-in" data-aos-delay="100">
              <form onSubmit={handleContactSubmit}>
                <div className="mb-4 text-left">
                  <label className="block text-[#343a40] font-bold text-sm mb-2">Name</label>
                  <input 
                    className="w-full px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-yellow-400" 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="mb-4 text-left relative">
                  <label className="block text-[#343a40] font-bold text-sm mb-2">Email</label>
                  <input 
                    className="w-full px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-yellow-400" 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="mb-6 text-left">
                  <label className="block text-[#343a40] font-bold text-sm mb-2">Message</label>
                  <textarea 
                    className="w-full px-4 py-2 border border-gray-200 rounded-md bg-white text-gray-800 resize-none focus:outline-none focus:ring-1 focus:ring-yellow-400" 
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <div className="text-left flex items-center gap-4">
                   <button 
                     className={`btn btn-primary ${formStatus === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`} 
                     type="submit"
                     disabled={formStatus === 'loading'}
                   >
                     {formStatus === 'loading' ? 'Sending...' : 'Send'}
                   </button>
                </div>
              </form>
            </div>
            {/* Contact text matching screenshot layout */}
            <div className="pt-4 text-left" data-aos="fade-left" data-aos-delay="300">
              <div className="text-lg font-bold text-[#343a40] mb-4">Let’s talk how I can help you!</div>
              <p className="text-[#6c757d] mb-4 text-sm leading-relaxed">If you like my work and want to avail my services then drop me a message using the contact form.</p>
              <p className="text-[#6c757d] mb-6 text-sm leading-relaxed">Or get in touch using my email or my contact number.</p>
              <p className="text-[#6c757d] mb-8 text-sm">See you!</p>
              
              <div className="grid grid-cols-[100px_1fr] gap-y-4 text-sm">
                <div className="text-[#6c757d]">Email:</div>
                <div className="font-bold text-[#343a40]">mindsetcoding0@gmail.com</div>
                
                <div className="text-[#6c757d]">GitHub:</div>
                <div className="font-bold text-[#343a40]">maro-eltma333</div>
                
                <div className="text-[#6c757d]">Phone:</div>
                <div className="font-bold text-[#343a40]">(+20) 105 52009 27</div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Modern Lightbox Overlay */}
      <div 
        className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm transition-all duration-300 ${lightboxData ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
        onClick={closeLightbox}
      >
         {lightboxData && lightboxData.images.length > 0 && (
           <div className="relative w-full h-full max-w-[1600px] flex flex-col items-center justify-center p-0 md:p-8" onClick={(e) => e.stopPropagation()}>
             
             {/* Close Button */}
             <button 
               className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 text-white hover:text-gray-300 bg-black/50 border border-white/20 backdrop-blur-md rounded-full transition-all"
               onClick={closeLightbox}
               aria-label="Close lightbox"
             >
               <X className="w-6 h-6 md:w-8 md:h-8" />
             </button>

             {/* Navigation Arrows */}
             {lightboxData.images.length > 1 && (
               <>
                 <button 
                   className="absolute left-2 md:left-6 z-50 p-2 text-white hover:text-gray-300 bg-black/50 border border-white/20 backdrop-blur-md rounded-full transition-all hover:scale-110"
                   onClick={prevImage}
                 >
                   <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
                 </button>
                 <button 
                   className="absolute right-2 md:right-6 z-50 p-2 text-white hover:text-gray-300 bg-black/50 border border-white/20 backdrop-blur-md rounded-full transition-all hover:scale-110"
                   onClick={nextImage}
                 >
                   <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
                 </button>
               </>
             )}

             {/* Image Wrapper (Prevents overlap with arrows) */}
             <div className="w-full h-full flex items-center justify-center px-16 md:px-24 pb-24 md:pb-0">
               <img 
                 src={lightboxData.images[lightboxIndex].src} 
                 alt={`${lightboxData.title} Gallery Item`} 
                 className="max-w-full max-h-[65vh] md:max-h-[85vh] object-contain rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.5)] select-none" 
                 referrerPolicy="no-referrer"
               />
             </div>

             {/* Responsive Caption */}
             <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 w-[85%] md:w-auto px-4 py-3 md:px-6 md:py-3 bg-black/80 backdrop-blur-md border border-white/10 text-white rounded-2xl text-xs md:text-sm font-medium tracking-wide shadow-xl flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 text-center">
               <span className="text-yellow-400 font-bold text-sm md:text-base">{lightboxData.title}</span>
               <span className="text-white/50 hidden md:inline-block">|</span>
               <span className="text-white/90">{lightboxData.images[lightboxIndex].title}</span>
               <span className="opacity-75 bg-white/20 px-2 py-0.5 rounded ml-0 md:ml-1 mt-1 md:mt-0 text-[10px] md:text-xs font-bold">{lightboxIndex + 1} / {lightboxData.images.length}</span>
             </div>

           </div>
         )}
      </div>

    </div>
  );
}
