import type { TeamMember, TeamTierGroup } from "@/types/content.types"

const districtMembers: TeamMember[] = [
  { id: "d1", name: "Riya Kapoor", role: "District Representative", image: "", tier: "district", initials: "RK" },
  { id: "d2", name: "Aarav Desai", role: "Track Representative", image: "", tier: "district", initials: "AD" },
]

const pressMembers: TeamMember[] = [
  { id: "p1", name: "Sneha Patel", role: "PR Head", image: "", tier: "press", initials: "SP" },
  { id: "p2", name: "Karan Mehta", role: "Media Lead", image: "", tier: "press", initials: "KM" },
  { id: "p3", name: "Ananya Joshi", role: "Content Strategist", image: "", tier: "press", initials: "AJ" },
]

const coreMembers: TeamMember[] = [
  { id: "c1", name: "Alice Johnson", role: "President", image: "", tier: "core", initials: "AJ" },
  { id: "c2", name: "Bob Williams", role: "Vice President", image: "", tier: "core", initials: "BW" },
  { id: "c3", name: "Meera Nair", role: "Secretary", image: "", tier: "core", initials: "MN" },
  { id: "c4", name: "Rohan Gupta", role: "Treasurer", image: "", tier: "core", initials: "RG" },
  { id: "c5", name: "Priya Sharma", role: "Joint Secretary", image: "", tier: "core", initials: "PS" },
  { id: "c6", name: "Vikram Singh", role: "Sergeant-at-Arms", image: "", tier: "core", initials: "VS" },
]

const boardMembers: TeamMember[] = [
  { id: "b1", name: "Diana Prince", role: "Director of Community Service", image: "", tier: "board", initials: "DP" },
  { id: "b2", name: "Ethan Kumar", role: "Director of Professional Dev.", image: "", tier: "board", initials: "EK" },
  { id: "b3", name: "Fatima Khan", role: "Director of International Service", image: "", tier: "board", initials: "FK" },
  { id: "b4", name: "Gaurav Thakur", role: "Director of Club Service", image: "", tier: "board", initials: "GT" },
  { id: "b5", name: "Hema Iyer", role: "Director of Youth Service", image: "", tier: "board", initials: "HI" },
  { id: "b6", name: "Ishaan Rao", role: "Director of Sports & Recreation", image: "", tier: "board", initials: "IR" },
]

const generalMembers: TeamMember[] = [
  { id: "g1", name: "Aman Verma", role: "Member", image: "", tier: "general", initials: "AV" },
  { id: "g2", name: "Bhavna Tiwari", role: "Member", image: "", tier: "general", initials: "BT" },
  { id: "g3", name: "Chirag Jain", role: "Member", image: "", tier: "general", initials: "CJ" },
  { id: "g4", name: "Devika Rao", role: "Member", image: "", tier: "general", initials: "DR" },
  { id: "g5", name: "Eshan Malhotra", role: "Member", image: "", tier: "general", initials: "EM" },
  { id: "g6", name: "Falak Shaikh", role: "Member", image: "", tier: "general", initials: "FS" },
  { id: "g7", name: "Govind Pillai", role: "Member", image: "", tier: "general", initials: "GP" },
  { id: "g8", name: "Harini Shetty", role: "Member", image: "", tier: "general", initials: "HS" },
  { id: "g9", name: "Ishan Kulkarni", role: "Member", image: "", tier: "general", initials: "IK" },
  { id: "g10", name: "Jasmine Wadia", role: "Member", image: "", tier: "general", initials: "JW" },
  { id: "g11", name: "Kiran Bhat", role: "Member", image: "", tier: "general", initials: "KB" },
  { id: "g12", name: "Lavanya Reddy", role: "Member", image: "", tier: "general", initials: "LR" },
]

export const teamTiers: TeamTierGroup[] = [
  {
    number: "01",
    tier: "district",
    title: "District Representatives",
    subtitle: "Connecting RCTNE to the wider Rotaract world.",
    members: districtMembers,
  },
  {
    number: "02",
    tier: "press",
    title: "Press & PR",
    subtitle: "Telling our story to the world.",
    members: pressMembers,
  },
  {
    number: "03",
    tier: "core",
    title: "Core Team",
    subtitle: "The engine room of every initiative.",
    members: coreMembers,
  },
  {
    number: "04",
    tier: "board",
    title: "Board of Directors",
    subtitle: "Driving strategy and direction across all service avenues.",
    members: boardMembers,
  },
  {
    number: "05",
    tier: "general",
    title: "General Body",
    subtitle: "The heart of RCTNE — every member counts.",
    members: generalMembers,
  },
]
