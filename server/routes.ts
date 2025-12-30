import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.profile.get.path, async (req, res) => {
    const profile = await storage.getProfile();
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.json(profile);
  });

  app.post(api.profile.update.path, async (req, res) => {
    const input = api.profile.update.input.parse(req.body);
    const profile = await storage.updateProfile(input);
    res.json(profile);
  });

  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.post(api.skills.create.path, async (req, res) => {
    const input = api.skills.create.input.parse(req.body);
    const skill = await storage.createSkill(input);
    res.status(201).json(skill);
  });

  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post(api.projects.create.path, async (req, res) => {
    const input = api.projects.create.input.parse(req.body);
    const project = await storage.createProject(input);
    res.status(201).json(project);
  });

  // Seed data if empty
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProfile = await storage.getProfile();
  if (!existingProfile) {
    await storage.updateProfile({
      name: "Jane Doe",
      title: "Full Stack Developer",
      bio: "Passionate about building scalable web applications and intuitive user experiences. I love working with React, Node.js, and modern web technologies.",
      email: "jane@example.com",
      githubUrl: "https://github.com",
      linkedinUrl: "https://linkedin.com"
    });

    await storage.createSkill({ name: "JavaScript", proficiency: 95, category: "Frontend" });
    await storage.createSkill({ name: "React", proficiency: 90, category: "Frontend" });
    await storage.createSkill({ name: "Node.js", proficiency: 85, category: "Backend" });
    await storage.createSkill({ name: "PostgreSQL", proficiency: 80, category: "Backend" });
    
    await storage.createProject({
      title: "E-Commerce Dashboard",
      description: "A comprehensive dashboard for managing online stores, including inventory tracking and sales analytics.",
      technologies: "React, TypeScript, Recharts",
      link: "#"
    });
    
    await storage.createProject({
      title: "Task Management App",
      description: "Collaborative task manager with real-time updates and team features.",
      technologies: "Node.js, Socket.io, Express",
      link: "#"
    });
  }
}
