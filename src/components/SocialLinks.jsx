import { RiGithubLine, RiLinkedinLine, RiFileList3Line, RiMessageLine, RiMailUnreadLine } from "react-icons/ri";

export default function SocialLinks({ className = "", showAnimation = true }) {
  const socialLinks = [
    {
      href: "https://linkedin.com/in/ayeshanaveed",
      label: "LinkedIn Profile",
      icon: RiLinkedinLine
    },
    {
      href: "https://github.com/clockworkaiesh",
      label: "GitHub Profile", 
      icon: RiGithubLine
    },
    {
      href: "/AyeshaNaveed-Resume.pdf",
      label: "Download Resume",
      icon: RiFileList3Line
    },
    {
      href: "mailto:ayeshanaved23@gmail.com",
      label: "Email",
      icon: RiMailUnreadLine
    },
    {
      href: "https://wa.me/923081479194",
      label: "WhatsApp Chat",
      icon: RiMessageLine
    }
  ];

  return (
    <div 
      className={`flex justify-center items-center space-x-6 ${showAnimation ? 'animate-fade-up' : ''} ${className}`}
      style={showAnimation ? { animationDelay: '200ms' } : {}}
    >
      {socialLinks.map((link, index) => {
        const IconComponent = link.icon;
        return (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-12 h-12 rounded-full backdrop-blur-md bg-dark-light border-text-muted border transition-all ease-in hover:bg-dark-default"
            aria-label={link.label}
          >
            <IconComponent className="text-white text-xl group-hover:scale-110 transition-transform duration-300" />
          </a>
        );
      })}
    </div>
  );
}
