export const MOCK_DATA = {
  navLinks: [
    { label: "Home", href: "/#home" },
    { label: "About Us", href: "/#about" },
    { label: "Projects", href: "/#projects" },
    { label: "Our Team", href: "/team" },
    { label: "Calendar", href: "/#calendar" },
    { label: "Contact Us", href: "/#contact" },
  ],
  home: {
    headline: "Young leaders.\nReal impact.",
    subtext: "Welcome to the Rotaract Club of Thane North End. We are a community of young leaders dedicated to positive change in our local community and beyond.",
    cta: "See our work"
  },
  partners: [
    { name: "Rotary International", logo: "RI" },
    { name: "Rotaract District 3142", logo: "RID 3142" },
    { name: "Thane Municipal Corporation", logo: "TMC" },
    { name: "NGO Partner A", logo: "NGO A" },
    { name: "NGO Partner B", logo: "NGO B" },
    { name: "Sponsor A", logo: "Sponsor A" },
  ],
  about: {
    number: "01",
    title: "About Us",
    body: "We believe in the power of youth to create lasting change. Through hands-on service projects, professional development, and community engagement, we build leaders who make a difference."
  },
  projects: {
    number: "02",
    title: "Selected Projects",
    items: [
      { id: "1", title: "Project Udaan", year: "2024", category: "Community Service", image: "/placeholder-project-1.jpg", detail: "Empowering underprivileged youth through education." },
      { id: "2", title: "Green Canopy", year: "2023", category: "Environment", image: "/placeholder-project-2.jpg", detail: "Planted 500+ saplings across Thane." },
      { id: "3", title: "SkillUp Workshops", year: "2024", category: "Professional Development", image: "/placeholder-project-3.jpg", detail: "Career readiness for 200+ college students." },
      { id: "4", title: "Health Check Camp", year: "2023", category: "Medical", image: "/placeholder-project-4.jpg", detail: "Free medical checkups for senior citizens." },
    ]
  },
  testimonials: [
    { quote: "The dedication and energy of RCTNE members have truly transformed our local community initiatives.", name: "Jane Doe", role: "Partner NGO Director" },
    { quote: "Joining RCTNE gave me the platform to develop leadership skills while actually making a difference.", name: "John Smith", role: "Club Member" },
  ],
  team: {
    number: "03",
    title: "Our Team",
    items: [
      { id: "1", name: "Alice Johnson", role: "President", image: "/placeholder-team-1.jpg" },
      { id: "2", name: "Bob Williams", role: "Vice President", image: "/placeholder-team-2.jpg" },
      { id: "3", name: "Charlie Brown", role: "Secretary", image: "/placeholder-team-3.jpg" },
      { id: "4", name: "Diana Prince", role: "Treasurer", image: "/placeholder-team-4.jpg" },
    ]
  },
  calendar: {
    number: "04",
    title: "Calendar",
    events: [
      { id: "1", name: "Beach Cleanup Drive", date: "Oct 15, 2024", location: "Kelva Beach" },
      { id: "2", name: "Youth Leadership Summit", date: "Nov 2, 2024", location: "Thane Town Hall" },
      { id: "3", name: "Fundraising Gala", date: "Dec 10, 2024", location: "Grand Hotel" },
    ]
  },
  moreAbout: {
    number: "05",
    title: "Our Impact",
    body: "Since our founding, we've been dedicated to leaving a mark on our community. Here's what we've accomplished so far.",
    stats: [
      { value: "150+", label: "Active Members" },
      { value: "300+", label: "Projects Completed" },
      { value: "10k+", label: "Hours Served" },
    ]
  },
  closing: {
    statement: "Service above self."
  },
  contact: {
    email: "hello@rctne.org",
    socials: [
      { platform: "Instagram", url: "#" },
      { platform: "LinkedIn", url: "#" },
      { platform: "Twitter", url: "#" },
    ]
  }
};
