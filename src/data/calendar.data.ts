import type { CalendarSection } from "@/types/content.types"

export const calendar: CalendarSection = {
  number: "03",
  title: "Events",
  events: [
    {
      id: "1",
      name: "Beach Cleanup Drive",
      date: "Sep 21, 2025",
      location: "Kelva Beach, Thane",
      type: "Environment",
      status: "upcoming",
    },
    {
      id: "2",
      name: "Youth Leadership Summit",
      date: "Oct 18, 2025",
      location: "Thane Town Hall",
      type: "Leadership",
      status: "upcoming",
    },
    {
      id: "3",
      name: "Fundraising Gala — Aagaz Edition",
      date: "Nov 29, 2025",
      location: "Grand Hotel, Thane",
      type: "Fundraiser",
      status: "upcoming",
    },
    {
      id: "4",
      name: "Blood Donation Camp",
      date: "Jan 18, 2025",
      location: "Thane Civil Hospital",
      type: "Medical Aid",
      status: "past",
    },
    {
      id: "5",
      name: "SkillUp Workshop",
      date: "Mar 2, 2025",
      location: "VJTI, Mumbai",
      type: "Leadership",
      status: "past",
    },
    {
      id: "6",
      name: "Plantation Drive",
      date: "Jun 5, 2025",
      location: "Yeoor Hills, Thane",
      type: "Environment",
      status: "past",
    },
  ],
}
