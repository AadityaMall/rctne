import type { ContactFormPayload, ContactFormResponse } from "@/types/contact.types"

export const contactService = {
  submit: async (payload: ContactFormPayload): Promise<ContactFormResponse> => {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })

    const data: ContactFormResponse = await res.json()

    if (!res.ok) {
      throw new Error(data.message ?? "Something went wrong.")
    }

    return data
  },
}
