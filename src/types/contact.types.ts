export interface ContactFormPayload {
  name: string
  email: string
  phone?: string
  message: string
}

export interface ContactFormResponse {
  success: boolean
  message: string
}
