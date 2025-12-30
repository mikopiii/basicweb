import { z } from 'zod';
import { insertProfileSchema, insertSkillSchema, insertProjectSchema, profile, skills, projects } from './schema';

export const api = {
  profile: {
    get: {
      method: 'GET' as const,
      path: '/api/profile',
      responses: {
        200: z.custom<typeof profile.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
    update: {
      method: 'POST' as const,
      path: '/api/profile',
      input: insertProfileSchema,
      responses: {
        200: z.custom<typeof profile.$inferSelect>(),
      },
    },
  },
  skills: {
    list: {
      method: 'GET' as const,
      path: '/api/skills',
      responses: {
        200: z.array(z.custom<typeof skills.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/skills',
      input: insertSkillSchema,
      responses: {
        201: z.custom<typeof skills.$inferSelect>(),
      },
    },
  },
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects',
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/projects',
      input: insertProjectSchema,
      responses: {
        201: z.custom<typeof projects.$inferSelect>(),
      },
    },
  },
};
