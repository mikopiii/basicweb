import { motion } from "framer-motion";
import type { Skill } from "@shared/schema";

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative"
    >
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-foreground">{skill.name}</span>
        <span className="text-sm font-medium text-muted-foreground">{skill.proficiency}%</span>
      </div>
      <div className="w-full bg-secondary rounded-full h-2.5 overflow-hidden">
        <motion.div
          className="bg-primary h-2.5 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 + index * 0.05, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
