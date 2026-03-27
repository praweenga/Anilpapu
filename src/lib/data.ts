export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    videoUrl: string;
    thumbnail: string;
    year: string;
    role: string;
    client: string;
    btsImages: string[];
}

export const projects: Project[] = [
    {
        id: "mee-nestham",
        title: "Mee Nestham",
        category: "Short Film",
        description: "Visual Storytelling, Refined - An emotional narrative that captures the essence of human connection through carefully crafted visuals and meaningful storytelling.",
        videoUrl: "/videos/projects/mee-nestham.mp4",
        thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070&auto=format&fit=crop",
        year: "2024",
        role: "Director / Editor",
        client: "Independent Production",
        btsImages: [
            "/images/portfolio/varnam-1.jpg",
            "/images/portfolio/varnam-2.jpg",
        ],
    },
    {
        id: "otsi-logo-story",
        title: "OTSI Logo Story",
        category: "Brand Identity",
        description: "Built with AI. Driven by Creativity - An AI-powered logo animation that transforms brand identity into a dynamic visual experience, showcasing the future of motion design.",
        videoUrl: "/videos/projects/otsi-logo-story.mp4",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        year: "2024",
        role: "Motion Designer",
        client: "OTSI Technologies",
        btsImages: [
            "/images/portfolio/margam.jpg",
            "/images/portfolio/chinna-mushirvada.jpg",
        ],
    },
    {
        id: "business-pitch",
        title: "Business Pitch",
        category: "Commercial",
        description: "Design that Speaks - A compelling corporate presentation that balances creativity with purpose, built to engage stakeholders and drive business objectives.",
        videoUrl: "/videos/projects/business-pitch.mp4",
        thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
        year: "2023",
        role: "Creative Director",
        client: "Corporate Client",
        btsImages: [
            "/images/portfolio/version-3.jpg",
            "/images/portfolio/social-media-post.jpg",
        ],
    },
    {
        id: "splink-demo",
        title: "Splink Product Demo",
        category: "Product Video",
        description: "Every project is an opportunity to create something remarkable - A product demonstration that transforms technical features into engaging visual storytelling.",
        videoUrl: "/videos/projects/splink-demo.mp4",
        thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
        year: "2023",
        role: "Video Editor",
        client: "Splink Technologies",
        btsImages: [
            "/images/banners/promotional-banner.jpg",
            "/images/portfolio/varnam-1.jpg",
        ],
    },
    {
        id: "government-event",
        title: "Government Event",
        category: "Event Coverage",
        description: "Designed to Engage - Professional event coverage that captures important moments and transforms them into impactful visual content for official communications.",
        videoUrl: "/videos/projects/government-event.mp4",
        thumbnail: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
        year: "2023",
        role: "Cinematographer",
        client: "Government Organization",
        btsImages: [
            "/images/portfolio/margam.jpg",
            "/images/portfolio/varnam-2.jpg",
        ],
    },
    {
        id: "smc-event-video",
        title: "SMC Event Video",
        category: "Event Coverage",
        description: "Visual Storytelling, Refined - Dynamic event coverage that brings together multiple moments into a cohesive narrative that celebrates community and achievement.",
        videoUrl: "/videos/projects/smc-event-video.mp4",
        thumbnail: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop",
        year: "2024",
        role: "Director / Editor",
        client: "SMC Organization",
        btsImages: [
            "/images/portfolio/chinna-mushirvada.jpg",
            "/images/portfolio/version-3.jpg",
        ],
    },
];
