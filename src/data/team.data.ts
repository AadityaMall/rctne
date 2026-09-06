import type { TeamMember, TeamTierGroup } from "@/types/content.types"

// ─── Core Team (Leadership) ─────────────────────────────────────
const coreMembers: TeamMember[] = [
  {
    id: "core-1",
    name: "Khushi Mahajan",
    role: "President",
    tagline: "Leading the club through a year of service, community, and meaningful beginnings.",
    image: "/images/team/Core team/President_Khushi_Mahajan.png",
    tier: "core",
    initials: "KM",
  },
  {
    id: "core-2",
    name: "Aarya Deshmukh",
    role: "Vice President",
    tagline: "Bridging ideas and action to keep the team moving forward.",
    image: "/images/team/Core team/Vice_President_Aarya_Deshmukh.png",
    tier: "core",
    initials: "AD",
  },
  {
    id: "core-3",
    name: "Shlok Nandedkar",
    role: "Vice President",
    tagline: "Turning ambitious goals into real, on-ground results.",
    image: "/images/team/Core team/Vice_President_Shlok_Nandedkar.png",
    tier: "core",
    initials: "SN",
  },
  {
    id: "core-4",
    name: "Anoushkka Nair",
    role: "Club Secretary",
    tagline: "The operational backbone — ensuring every initiative runs seamlessly.",
    image: "/images/team/Core team/Club_Secretary_Anoushkka_Nair.png",
    tier: "core",
    initials: "AN",
  },
  {
    id: "core-5",
    name: "Srushti Patil",
    role: "Joint Secretary",
    tagline: "Keeping communication and coordination at the heart of what we do.",
    image: "/images/team/Core team/Joint_Secretary_Srushti_Patil.png",
    tier: "core",
    initials: "SP",
  },
  {
    id: "core-6",
    name: "Shantanu Saraf",
    role: "Finance Chair",
    tagline: "Ensuring every rupee goes towards the work that matters most.",
    image: "/images/team/Core team/Finance_Chair_Shantanu_Saraf.png",
    tier: "core",
    initials: "SS",
  },
  {
    id: "core-7",
    name: "Shruti Bhavigadda",
    role: "Sergeant at Arms",
    image: "/images/team/Core team/Sergeant_At_Arms_Shruti_Bhavigadda.png",
    tier: "core",
    initials: "SB",
  },
  {
    id: "core-8",
    name: "Shreya Deshpande",
    role: "TRS Chair",
    image: "/images/team/Core team/TRS_Chair_Shreya_Deshpande.png",
    tier: "core",
    initials: "SD",
  },
  {
    id: "core-9",
    name: "Viraj Pongurlekar",
    role: "Immediate Past President",
    image: "/images/team/Core team/Immediate_Past_President_Viraj_Pongurlekar.png",
    tier: "core",
    initials: "VP",
  },
  {
    id: "core-10",
    name: "Apoorvaa Sivarraj",
    role: "Club Mentor",
    image: "/images/team/Core team/Club_Mentor_Apoorvaa_Sivarraj.png",
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
    image: "/images/team/BOD_Photos/Career_Development_Sankalp_Nagar.png",
    tier: "board",
    initials: "SN",
  },
  // Club Service
  {
    id: "bod-2",
    name: "Apurva Junnarkar",
    role: "Director — Club Service",
    image: "/images/team/BOD_Photos/Club_Service_Apurva_Junnarkar.png",
    tier: "board",
    initials: "AJ",
  },
  {
    id: "bod-3",
    name: "Tisha Sharma",
    role: "Director — Club Service",
    image: "/images/team/BOD_Photos/Club_Service_Tisha_Sharma.png",
    tier: "board",
    initials: "TS",
  },
  // Community Service
  {
    id: "bod-4",
    name: "Apeksha Mungi",
    role: "Director — Community Service",
    image: "/images/team/BOD_Photos/Community_Service_Apeksha_Mungi.png",
    tier: "board",
    initials: "AM",
  },
  {
    id: "bod-5",
    name: "Atharv Sawant",
    role: "Director — Community Service",
    image: "/images/team/BOD_Photos/Community_Service_Atharv_Sawant.png",
    tier: "board",
    initials: "AS",
  },
  {
    id: "bod-6",
    name: "Yukta More",
    role: "Director — Community Service",
    image: "/images/team/BOD_Photos/Community_Service_Yukta_More.png",
    tier: "board",
    initials: "YM",
  },
  // Digital Communications
  {
    id: "bod-8",
    name: "Neeraj Patil",
    role: "Director — Digital Communications",
    image: "/images/team/BOD_Photos/Digital_Communications_Neeraj_Patil.png",
    tier: "board",
    initials: "NP",
  },
  {
    id: "bod-9",
    name: "Nupur Shah",
    role: "Director — Digital Communications",
    image: "/images/team/BOD_Photos/Digital_Communications_Nupur_Shah.png",
    tier: "board",
    initials: "NS",
  },
  // Editorial
  {
    id: "bod-10",
    name: "Gargie Kode",
    role: "Director — Editorial",
    image: "/images/team/BOD_Photos/Editorial_Gargie_Kode.png",
    tier: "board",
    initials: "GK",
  },
  {
    id: "bod-11",
    name: "Vibhav Kode",
    role: "Director — Editorial",
    image: "/images/team/BOD_Photos/Editorial_Vibhav_Kode.png",
    tier: "board",
    initials: "VK",
  },
  // International Services
  {
    id: "bod-12",
    name: "Saanvi Jain",
    role: "Director — International Services",
    image: "/images/team/BOD_Photos/International_Services_Saanvi_Jain.png",
    tier: "board",
    initials: "SJ",
  },
  {
    id: "bod-13",
    name: "Sana Malhotra",
    role: "Director — International Services",
    image: "/images/team/BOD_Photos/International_Services_Sana_Malhotra.png",
    tier: "board",
    initials: "SM",
  },
  // PIS
  {
    id: "bod-14",
    name: "Sujal Jadhav",
    role: "Director — PIS",
    image: "/images/team/BOD_Photos/PIS_Sujal_Jadhav.png",
    tier: "board",
    initials: "SJ",
  },
  {
    id: "bod-15",
    name: "Sujal Mahajan",
    role: "Director — PIS",
    image: "/images/team/BOD_Photos/PIS_Sujal_Mahajan.png",
    tier: "board",
    initials: "SM",
  },
  // PR & Marketing
  {
    id: "bod-16",
    name: "Tanay Shinde",
    role: "Director — PR & Marketing",
    image: "/images/team/BOD_Photos/PR_Marketing_Tanay_Shinde.png",
    tier: "board",
    initials: "TS",
  },
  // Social Media
  {
    id: "bod-7",
    name: "Kashish Chhadva",
    role: "Director — Social Media",
    image: "/images/team/BOD_Photos/Social_Media_Kashish_Chhadva.png",
    tier: "board",
    initials: "KC",
  },
  // Sports
  {
    id: "bod-17",
    name: "Nikita Menghani",
    role: "Director — Sports",
    image: "/images/team/BOD_Photos/Sports_Nikita_Menghani.png",
    tier: "board",
    initials: "NM",
  },
  {
    id: "bod-18",
    name: "Om Kanojiya",
    role: "Director — Sports",
    image: "/images/team/BOD_Photos/Sports_Om_Kanojiya.png",
    tier: "board",
    initials: "OK",
  },
  // TRS — HEIC file cannot be served directly; using initials fallback
  {
    id: "bod-19",
    name: "Prutha Desai",
    role: "Director — TRS",
    image: "/images/team/BOD_Photos/TRS_Prutha_Desai.png",
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
