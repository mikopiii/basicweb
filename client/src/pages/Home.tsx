import { useProfile, useSkills, useProjects } from "@/hooks/use-portfolio";
import { Navigation } from "@/components/Navigation";
import { SkillCard } from "@/components/SkillCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Loader2, Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: profile, isLoading: loadingProfile } = useProfile();
  const { data: skills, isLoading: loadingSkills } = useSkills();
  const { data: projects, isLoading: loadingProjects } = useProjects();

  const isLoading = loadingProfile || loadingSkills || loadingProjects;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-10 h-10 animate-spin text-primary/30" />
      </div>
    );
  }

  // Fallback data if DB is empty to make it look good immediately
  const displayProfile = profile || {
    name: "Alex Designer",
    title: "Full Stack Developer & UI Designer",
    bio: "I craft digital experiences that blend aesthetic beauty with technical precision. Specializing in modern React applications and scalable backend architectures.",
    email: "hello@example.com",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com",
  };

  const skillsByCategory = skills?.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>) || {};

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/10">
      <Navigation />

      {/* Hero Section */}
      <section id="about" className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-lg font-semibold text-primary/60 mb-4 tracking-wide uppercase">
              Hello, I'm {displayProfile.name}
            </h2>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display text-primary leading-tight mb-8">
              {displayProfile.title}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              {displayProfile.bio}
            </p>

            <div className="flex gap-4">
              <a
                href="#contact"
                className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 hover:shadow-lg transition-all duration-300"
              >
                Get in Touch
              </a>
              <a
                href="#projects"
                className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full font-semibold hover:bg-secondary/80 transition-all duration-300"
              >
                View Work
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-muted-foreground/50 animate-bounce"
        >
          <span className="text-sm font-medium">Scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold font-display mb-4">Technical Expertise</h2>
            <div className="w-20 h-1 bg-primary rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {Object.entries(skillsByCategory).length > 0 ? (
              Object.entries(skillsByCategory).map(([category, categorySkills]) => (
                <div key={category} className="space-y-6">
                  <h3 className="text-xl font-semibold text-primary">{category}</h3>
                  <div className="space-y-6">
                    {categorySkills.map((skill, index) => (
                      <SkillCard key={skill.id} skill={skill} index={index} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              // Empty state / Placeholder
              <div className="col-span-full text-center py-12 text-muted-foreground">
                <p>Skills data loading or empty...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold font-display mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-primary rounded-full" />
          </motion.div>

          {projects && projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="bg-secondary/50 rounded-2xl p-12 text-center">
              <p className="text-muted-foreground text-lg">Projects coming soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-6">Let's Work Together</h2>
            <p className="text-primary-foreground/80 text-lg mb-12 leading-relaxed">
              I'm always interested in hearing about new projects and opportunities.
              Whether you have a question or just want to say hi, feel free to drop me a message.
            </p>

            <a
              href={`mailto:${displayProfile.email}`}
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <Mail className="w-5 h-5" />
              {displayProfile.email}
            </a>

            <div className="mt-16 flex justify-center gap-8">
              {displayProfile.githubUrl && (
                <a
                  href={displayProfile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-all text-primary-foreground"
                >
                  <Github className="w-6 h-6" />
                </a>
              )}
              {displayProfile.linkedinUrl && (
                <a
                  href={displayProfile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-primary-foreground/10 rounded-full hover:bg-primary-foreground/20 transition-all text-primary-foreground"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
            </div>
            
            <footer className="mt-20 pt-8 border-t border-primary-foreground/10 text-primary-foreground/40 text-sm">
              <p>© {new Date().getFullYear()} {displayProfile.name}. All rights reserved.</p>
            </footer>
          </div>
        </div>
      </section>
    </div>
  );
}
