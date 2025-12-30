import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@shared/schema";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const techs = project.technologies?.split(",") || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="bg-card border border-border/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/5 hover:border-border transition-all duration-300 flex flex-col h-full"
    >
      <div className="p-8 flex flex-col h-full">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-3 font-display">{project.title}</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {project.description}
          </p>
        </div>

        <div className="mt-auto space-y-6">
          <div className="flex flex-wrap gap-2">
            {techs.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-secondary text-secondary-foreground"
              >
                {tech.trim()}
              </span>
            ))}
          </div>

          <div className="pt-6 border-t border-border/50 flex items-center justify-between">
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                View Project <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <span className="text-sm text-muted-foreground italic">Coming soon</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
