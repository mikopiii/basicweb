import { db } from "./db";
import {
  profile, skills, projects,
  type Profile, type InsertProfile,
  type Skill, type InsertSkill,
  type Project, type InsertProject
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProfile(): Promise<Profile | undefined>;
  updateProfile(profile: InsertProfile): Promise<Profile>;
  
  getSkills(): Promise<Skill[]>;
  createSkill(skill: InsertSkill): Promise<Skill>;
  
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
}

export class DatabaseStorage implements IStorage {
  async getProfile(): Promise<Profile | undefined> {
    const [data] = await db.select().from(profile).limit(1);
    return data;
  }

  async updateProfile(insertProfile: InsertProfile): Promise<Profile> {
    // Check if profile exists
    const [existing] = await db.select().from(profile).limit(1);
    
    if (existing) {
      const [updated] = await db.update(profile)
        .set(insertProfile)
        .where(eq(profile.id, existing.id))
        .returning();
      return updated;
    } else {
      const [created] = await db.insert(profile).values(insertProfile).returning();
      return created;
    }
  }

  async getSkills(): Promise<Skill[]> {
    return await db.select().from(skills);
  }

  async createSkill(insertSkill: InsertSkill): Promise<Skill> {
    const [skill] = await db.insert(skills).values(insertSkill).returning();
    return skill;
  }

  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }
}

export const storage = new DatabaseStorage();
