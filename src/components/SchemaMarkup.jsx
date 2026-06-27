import { Helmet } from 'react-helmet-async'

export default function SchemaMarkup() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "InteriorDesigner",
    "name": "Dwaraa Archilabs",
    "url": "https://dwaraa.in",
    "description": "Premium architecture, modular interiors, and turnkey construction studio in Hyderabad, Telangana.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sangareddy Bypass Rd, opp. Tara Degree College, Marepally, Ahmed Nagar",
      "addressLocality": "Sangareddy",
      "addressRegion": "Telangana",
      "postalCode": "502001",
      "addressCountry": "IN"
    },
    "areaServed": ["Hyderabad", "Sangareddy", "Telangana"],
    "serviceType": [
      "Architecture",
      "Interior Design",
      "Modular Furniture",
      "Turnkey Construction"
    ]
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  )
}
