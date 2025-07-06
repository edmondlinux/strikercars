
import { Helmet } from "react-helmet-async";

const SEOHead = ({ 
	title, 
	description, 
	keywords, 
	image, 
	url, 
	type = "website",
	price,
	availability,
	brand = "Strikers No Title Cars"
}) => {
	const baseUrl = window.location.origin;
	const fullUrl = url ? `${baseUrl}${url}` : window.location.href;
	const fullImageUrl = image ? (image.startsWith('http') ? image : `${baseUrl}${image}`) : `${baseUrl}/vite.svg`;
	
	const structuredData = {
		"@context": "https://schema.org",
		"@type": type === "product" ? "Product" : "WebPage",
		"name": title,
		"description": description,
		"image": fullImageUrl,
		"url": fullUrl,
		...(type === "product" && {
			"brand": {
				"@type": "Brand",
				"name": brand
			},
			"offers": {
				"@type": "Offer",
				"price": price,
				"priceCurrency": "USD",
				"availability": availability || "https://schema.org/InStock",
				"seller": {
					"@type": "Organization",
					"name": brand
				}
			}
		})
	};

	return (
		<Helmet>
			{/* Basic Meta Tags */}
			<title>{title}</title>
			<meta name="description" content={description} />
			{keywords && <meta name="keywords" content={keywords} />}
			<meta name="robots" content="index, follow" />
			<link rel="canonical" href={fullUrl} />

			{/* Open Graph Tags */}
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={fullImageUrl} />
			<meta property="og:url" content={fullUrl} />
			<meta property="og:type" content={type} />
			<meta property="og:site_name" content={brand} />

			{/* Twitter Card Tags */}
			<meta name="twitter:card" content="summary_large_image" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={fullImageUrl} />

			{/* Product-specific meta tags */}
			{type === "product" && price && (
				<>
					<meta property="product:price:amount" content={price} />
					<meta property="product:price:currency" content="USD" />
					<meta property="product:availability" content={availability || "in stock"} />
				</>
			)}

			{/* Structured Data */}
			<script type="application/ld+json">
				{JSON.stringify(structuredData)}
			</script>
		</Helmet>
	);
};

export default SEOHead;
