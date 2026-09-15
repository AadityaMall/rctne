import { siteConfig } from "@/data/site-config.data"

export function OrganizationJsonLd() {
  const { organization, siteUrl, metadata } = siteConfig

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: organization.legalName,
    alternateName: siteConfig.siteName,
    url: siteUrl,
    logo: `${siteUrl}${organization.logo}`,
    description: metadata.description,
    foundingDate: organization.foundingYear,
    address: {
      "@type": "PostalAddress",
      addressLocality: organization.addressLocality,
      addressRegion: organization.addressRegion,
      addressCountry: organization.addressCountry,
    },
    sameAs: organization.sameAs,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
