// --- 1. MOCK DATA (JSON) ---
// REPLACE placeholders with your real image URLs
const products = [
    {
        id: 1,
        brand: "Louis Vuitton",
        name: "Neverfull MM Tote",
        price: "₦1,200,000",
        rawPrice: 1200000,
        condition: "Like New",
        category: "Bags",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800", // Placeholder
        desc: "A timeless icon. This Neverfull MM is in pristine condition with minimal signs of wear. Comes with original dustbag."
    },
    {
        id: 2,
        brand: "Chanel",
        name: "Classic Flap Bag",
        price: "₦4,500,000",
        rawPrice: 4500000,
        condition: "Pre-owned (Good)",
        category: "Bags",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800",
        desc: "Vintage Chanel flap bag. Features the classic gold hardware. Leather is soft and well-maintained."
    },
    {
        id: 3,
        brand: "Cartier",
        name: "Love Bracelet Gold",
        price: "₦3,800,000",
        rawPrice: 3800000,
        condition: "New",
        category: "Jewelry",
        image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
        desc: "18k Gold. Size 17. Authenticity certificate included. Never worn."
    },
    {
        id: 4,
        brand: "Telfar",
        name: "Shopping Bag Medium",
        price: "₦250,000",
        rawPrice: 250000,
        condition: "Like New",
        category: "Bags",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800",
        desc: "The iconic everyday bag. Vegan leather. Clean interior and exterior."
    }
];