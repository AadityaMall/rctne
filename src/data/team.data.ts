import type { TeamMember, TeamTierGroup } from "@/types/content.types"

// ─── Core Team (Leadership) ─────────────────────────────────────
const coreMembers: TeamMember[] = [
  {
    id: "core-1",
    name: "Khushi Mahajan",
    role: "President",
    image: "/images/team/Core team/President_Khushi_Mahajan.jpg",
    tier: "core",
    initials: "KM",
  },
  {
    id: "core-2",
    name: "Aarya Deshmukh",
    role: "Vice President",
    image: "/images/team/Core team/Vice_President_Aarya_Deshmukh.PNG",
    tier: "core",
    initials: "AD",
  },
  {
    id: "core-3",
    name: "Shlok Nandedkar",
    role: "Vice President",
    image: "/images/team/Core team/Vice_President_Shlok_Nandedkar.PNG",
    tier: "core",
    initials: "SN",
  },
  {
    id: "core-4",
    name: "Anoushkka Nair",
    role: "Club Secretary",
    image: "/images/team/Core team/Club_Secretary_Anoushkka_Nair.PNG",
    tier: "core",
    initials: "AN",
  },
  {
    id: "core-5",
    name: "Srushti Patil",
    role: "Joint Secretary",
    image: "/images/team/Core team/Joint_Secretary_Srushti_Patil.PNG",
    tier: "core",
    initials: "SP",
  },
  {
    id: "core-6",
    name: "Shantanu Saraf",
    role: "Finance Chair",
    image: "/images/team/Core team/Finance_Chair_Shantanu_Saraf.PNG",
    tier: "core",
    initials: "SS",
  },
  {
    id: "core-7",
    name: "Shruti Bhavigadda",
    role: "Sergeant at Arms",
    image: "/images/team/Core team/Sergeant_At_Arms_Shruti_Bhavigadda.PNG",
    tier: "core",
    initials: "SB",
  },
  {
    id: "core-8",
    name: "Shreya Deshpande",
    role: "TRS Chair",
    image: "/images/team/Core team/TRS_Chair_Shreya_Deshpande.PNG",
    tier: "core",
    initials: "SD",
  },
  {
    id: "core-9",
    name: "Viraj Pongurlekar",
    role: "Immediate Past President",
    image: "/images/team/Core team/Immediate_Past_President_Viraj_Pongurlekar.PNG",
    tier: "core",
    initials: "VP",
  },
  {
    id: "core-10",
    name: "Apoorvaa Sivarraj",
    role: "Club Mentor",
    image: "/images/team/Core team/Club_Mentor_Apoorvaa_Sivarraj.PNG",
    tier: "core",
    initials: "AS",
  },
]

// ─── Board of Directors ─────────────────────────────────────────
const boardMembers: TeamMember[] = [
  // Career Development
  {
    id: "bod-1",
    name: "Sankalp Nagar",
    role: "Director — Career Development",
    image: "/images/team/BOD_Photos/Career_Development_Sankalp_Nagar.jpg",
    tier: "board",
    initials: "SN",
  },
  // Club Service
  {
    id: "bod-2",
    name: "Apurva Junnarkar",
    role: "Director — Club Service",
    image: "/images/team/BOD_Photos/Club_Service_Apurva_Junnarkar.jpg",
    tier: "board",
    initials: "AJ",
  },
  {
    id: "bod-3",
    name: "Tisha Sharma",
    role: "Director — Club Service",
    image: "/images/team/BOD_Photos/Club_Service_Tisha_Sharma.jpeg",
    tier: "board",
    initials: "TS",
  },
  // Community Service
  {
    id: "bod-4",
    name: "Apeksha Mungi",
    role: "Director — Community Service",
    image: "/images/team/BOD_Photos/Community_Service_Apeksha_Mungi.jpg",
    tier: "board",
    initials: "AM",
  },
  {
    id: "bod-5",
    name: "Atharv Sawant",
    role: "Director — Community Service",
    image: "/images/team/BOD_Photos/Community_Service_Atharv_Sawant.PNG",
    tier: "board",
    initials: "AS",
  },
  {
    id: "bod-6",
    name: "Yukta More",
    role: "Director — Community Service",
    image: "/images/team/BOD_Photos/Community_Service_Yukta_More.jpg",
    tier: "board",
    initials: "YM",
  },
  // Digital Communications
  {
    id: "bod-8",
    name: "Neeraj Patil",
    role: "Director — Digital Communications",
    image: "/images/team/BOD_Photos/Digital_Communications_Neeraj_Patil.jpeg",
    tier: "board",
    initials: "NP",
  },
  {
    id: "bod-9",
    name: "Nupur Shah",
    role: "Director — Digital Communications",
    image: "/images/team/BOD_Photos/Digital_Communications_Nupur_Shah.jpeg",
    tier: "board",
    initials: "NS",
  },
  // Editorial
  {
    id: "bod-10",
    name: "Gargie Kode",
    role: "Director — Editorial",
    image: "/images/team/BOD_Photos/Editorial_Gargie_Kode.jpeg",
    tier: "board",
    initials: "GK",
  },
  {
    id: "bod-11",
    name: "Vibhav Kode",
    role: "Director — Editorial",
    image: "/images/team/BOD_Photos/Editorial_Vibhav_Kode.jpeg",
    tier: "board",
    initials: "VK",
  },
  // International Services
  {
    id: "bod-12",
    name: "Saanvi Jain",
    role: "Director — International Services",
    image: "/images/team/BOD_Photos/International_Services_Saanvi_Jain.jpg",
    tier: "board",
    initials: "SJ",
  },
  {
    id: "bod-13",
    name: "Sana Malhotra",
    role: "Director — International Services",
    image: "/images/team/BOD_Photos/International_Services_Sana_Malhotra.PNG",
    tier: "board",
    initials: "SM",
  },
  // PIS
  {
    id: "bod-14",
    name: "Sujal Jadhav",
    role: "Director — PIS",
    image: "/images/team/BOD_Photos/PIS_Sujal_Jadhav.PNG",
    tier: "board",
    initials: "SJ",
  },
  {
    id: "bod-15",
    name: "Sujal Mahajan",
    role: "Director — PIS",
    image: "/images/team/BOD_Photos/PIS_Sujal_Mahajan.jpg",
    tier: "board",
    initials: "SM",
  },
  // PR & Marketing
  {
    id: "bod-16",
    name: "Tanay Shinde",
    role: "Director — PR & Marketing",
    image: "/images/team/BOD_Photos/PR_Marketing_Tanay_Shinde.JPG",
    tier: "board",
    initials: "TS",
  },
  // Social Media
  {
    id: "bod-7",
    name: "Kashish Chhadva",
    role: "Director — Social Media",
    image: "/images/team/BOD_Photos/Social_Media_Kashish_Chhadva.jpg",
    tier: "board",
    initials: "KC",
  },
  // Sports
  {
    id: "bod-17",
    name: "Nikita Menghani",
    role: "Director — Sports",
    image: "/images/team/BOD_Photos/Sports_Nikita_Menghani.jpg",
    tier: "board",
    initials: "NM",
  },
  {
    id: "bod-18",
    name: "Om Kanojiya",
    role: "Director — Sports",
    image: "/images/team/BOD_Photos/Sports_Om_Kanojiya.webp",
    tier: "board",
    initials: "OK",
  },
  // TRS — HEIC file cannot be served directly; using initials fallback
  {
    id: "bod-19",
    name: "Prutha Desai",
    role: "Director — TRS",
    image: "/images/team/BOD_Photos/TRS_Prutha_Desai.jpg",
    tier: "board",
    initials: "PD",
  },
]

export const teamTiers: TeamTierGroup[] = [
  {
    number: "01",
    tier: "core",
    title: "Core Team",
    subtitle: "The leadership driving every initiative at RCTNE.",
    members: coreMembers,
  },
  {
    number: "02",
    tier: "board",
    title: "Board of Directors",
    subtitle: "Driving strategy and direction across all service avenues.",
    members: boardMembers,
  }
]
