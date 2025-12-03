import { MetadataRoute } from "next";

export const dynamic = "force-static";
export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abufkaida-driving-school.netlify.app";
  const today = new Date().toISOString().split("T")[0];

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/quiz`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/quiz/private`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quiz/heavy`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/quiz/public`,
      lastModified: today,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/books/private`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/books/heavy`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/traffic-signs`,
      lastModified: today,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/documents`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Add all quiz form pages
  const quizForms: MetadataRoute.Sitemap = [];

  for (let i = 1; i <= 29; i++) {
    quizForms.push({
      url: `${baseUrl}/quiz/private/${i}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (let i = 1; i <= 29; i++) {
    quizForms.push({
      url: `${baseUrl}/quiz/heavy/${i}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (let i = 1; i <= 32; i++) {
    quizForms.push({
      url: `${baseUrl}/quiz/public/${i}`,
      lastModified: today,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  return [...staticRoutes, ...quizForms];
}
