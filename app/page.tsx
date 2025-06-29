"use client"

import type React from "react"
import Image from 'next/image'

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  Code,
  Database,
  Cloud,
  Brain,
  Award,
  Users,
  Target,
  ChevronDown,
  Zap,
  Cpu,
  Globe,
  BookOpen,
  Trophy,
  Mountain,
  Dumbbell,
  BarChart3,
  Shield,
  Rocket,
  Send,
  Sparkles,
  Star,
} from "lucide-react"

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "experience", "projects", "certifications", "leadership", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: "" })

    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully. I'll get back to you soon!",
        })
        ;(e.target as HTMLFormElement).reset()
      } else {
        throw new Error("Failed to send message")
      }
    } catch (error) {
      setSubmitStatus({
        type: "error",
        message: "Sorry, there was an error sending your message. Please try again or contact me directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Floating Orbs */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-pink-200/40 to-rose-300/40 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-40 right-32 w-40 h-40 bg-gradient-to-r from-blue-200/40 to-cyan-300/40 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -80, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-32 left-1/3 w-36 h-36 bg-gradient-to-r from-purple-200/40 to-violet-300/40 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -120, 0],
            y: [0, 120, 0],
          }}
          transition={{
            duration: 22,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-r from-emerald-200/40 to-teal-300/40 rounded-full blur-xl"
        />

        {/* Floating Stars */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Star className="w-4 h-4 text-yellow-300/60" fill="currentColor" />
          </motion.div>
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%23e0e7ff%22%20fillOpacity%3D%220.1%22%3E%3Cpath%20d%3D%22M40%200H0v40h40V0zM39%201v38H1V1h38z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-purple-100/50 shadow-lg shadow-purple-100/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
            >
              ✨ Rishyendra
            </motion.div>
            <div className="hidden md:flex space-x-8">
              {["Home", "About", "Skills", "Experience", "Projects", "Certifications", "Leadership", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`text-sm font-medium transition-all duration-300 hover:text-purple-600 hover:scale-105 ${
                      activeSection === item.toLowerCase() ? "text-purple-600 scale-105" : "text-gray-600"
                    }`}
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-100/30 to-blue-100/30" />
        </motion.div>

        <div className="container mx-auto px-6 text-center z-10 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                 <Image
                  src="/Profile.jpg" // replace with your actual filename
                  alt="My portrait"
                  width={161}
                  height={161}
                  className="rounded-full object-cover mx-auto "
                  />


            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                Ramakuri
              </span>
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Rishyendra
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
              Aspiring Software Engineer | AI/ML Enthusiast | Tech Innovator
            </p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg text-purple-600 mb-12 italic max-w-2xl mx-auto font-medium"
            >
              {'"Code is poetry, AI is magic, and I\'m here to write the next chapter of digital transformation."'}
            </motion.div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 hover:from-pink-500 hover:via-purple-600 hover:to-blue-600 text-white border-0 shadow-xl shadow-purple-300/30 hover:shadow-purple-400/40 transition-all duration-300 hover:scale-105"
                onClick={() => scrollToSection("projects")}
              >
                <Rocket className="w-5 h-5 mr-2" />
                View My Work
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 bg-white/80 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-200/30 transition-all duration-300 hover:scale-105"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-r from-blue-50/50 to-purple-50/50 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/70 border-purple-100 backdrop-blur-lg shadow-2xl shadow-purple-200/20 hover:shadow-purple-300/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-gray-800 text-2xl">My Journey</CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600 space-y-4">
                  <p>
                    Currently in my final year of B.Tech ECE at VNR VJIET with a stellar 8.15 CPI, I'm passionate about
                    transforming ideas into intelligent solutions through code.
                  </p>
                  <p>
                    My journey started with curiosity about how things work and has evolved into hands-on expertise
                    across full-stack development, AI/ML, and emerging technologies.
                  </p>
                  <p>
                    As an aspiring software engineer, I believe in learning by building, leading through innovation, and
                    creating technology that solves real-world problems.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="bg-white/70 border-blue-100 backdrop-blur-lg shadow-2xl shadow-blue-200/20 hover:shadow-blue-300/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-blue-500" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-gray-600">
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold">B.Tech ECE - VNR VJIET (2026)</p>
                      <p className="text-blue-500">CPI: 8.15</p>
                    </div>
                    <div>
                      <p className="font-semibold">Intermediate - Alphores Junior College</p>
                      <p className="text-blue-500">97.3%</p>
                    </div>
                    <div>
                      <p className="font-semibold">SSC - Johnson Global High School</p>
                      <p className="text-blue-500">10.0 GPA</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 border-pink-100 backdrop-blur-lg shadow-2xl shadow-pink-200/20 hover:shadow-pink-300/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-gray-800 flex items-center gap-2">
                    <Target className="w-5 h-5 text-pink-500" />
                    Core Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      "Analytical Problem-Solving",
                      "Adaptive Learning",
                      "Team Leadership",
                      "Clear Communication",
                      "Time Management",
                      "Innovation",
                    ].map((strength) => (
                      <Badge
                        key={strength}
                        variant="secondary"
                        className="bg-gradient-to-r from-pink-100 to-purple-100 text-purple-700 border-purple-200 hover:scale-105 transition-transform duration-200"
                      >
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-r from-purple-50/50 to-pink-50/50 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Technical Arsenal</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mx-auto"></div>
          </motion.div>

          <Tabs defaultValue="languages" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/70 border-purple-100 backdrop-blur-lg shadow-lg">
              <TabsTrigger
                value="languages"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-100 data-[state=active]:to-purple-100 data-[state=active]:text-purple-700"
              >
                Languages
              </TabsTrigger>
              <TabsTrigger
                value="tools"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-100 data-[state=active]:to-purple-100 data-[state=active]:text-purple-700"
              >
                Tools & Tech
              </TabsTrigger>
              <TabsTrigger
                value="platforms"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-100 data-[state=active]:to-purple-100 data-[state=active]:text-purple-700"
              >
                Platforms
              </TabsTrigger>
              <TabsTrigger
                value="core"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-100 data-[state=active]:to-purple-100 data-[state=active]:text-purple-700"
              >
                Core Skills
              </TabsTrigger>
            </TabsList>

            <TabsContent value="languages" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: "Java", icon: Code, color: "from-orange-200 to-red-200", textColor: "text-orange-600" },
                  { name: "Python", icon: Brain, color: "from-blue-200 to-cyan-200", textColor: "text-blue-600" },
                  {
                    name: "JavaScript",
                    icon: Globe,
                    color: "from-yellow-200 to-orange-200",
                    textColor: "text-yellow-600",
                  },
                  { name: "C++", icon: Cpu, color: "from-purple-200 to-violet-200", textColor: "text-purple-600" },
                  { name: "C", icon: Zap, color: "from-green-200 to-emerald-200", textColor: "text-green-600" },
                ].map((skill) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="bg-white/70 border-purple-100 backdrop-blur-lg hover:bg-white/80 transition-all duration-300 shadow-xl hover:shadow-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-r ${skill.color} shadow-lg`}>
                            <skill.icon className={`w-6 h-6 ${skill.textColor}`} />
                          </div>
                          <h3 className="text-gray-800 font-semibold text-lg">{skill.name}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools" className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {["Docker", "TensorFlow", "PyTorch", "FastAPI", "React", "Node.js", "SQL", "NoSQL"].map(
                  (tool, index) => (
                    <motion.div
                      key={tool}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Card className="bg-white/70 border-purple-100 backdrop-blur-lg hover:bg-white/80 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-2xl">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                            <Database className="w-6 h-6 text-purple-600" />
                          </div>
                          <p className="text-gray-800 font-medium">{tool}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ),
                )}
              </div>
            </TabsContent>

            <TabsContent value="platforms" className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["GitHub", "VS Code", "VMware", "Postman"].map((platform, index) => (
                  <motion.div
                    key={platform}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="bg-white/70 border-blue-100 backdrop-blur-lg hover:bg-white/80 transition-all duration-300 shadow-xl hover:shadow-2xl">
                      <CardContent className="p-6 text-center">
                        <div className="w-14 h-14 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                          <Cloud className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-gray-800 font-semibold">{platform}</h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="core" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-white/70 border-blue-100 backdrop-blur-lg shadow-2xl shadow-blue-200/20 hover:shadow-blue-300/30 transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-500" />
                      Web Development
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600">
                    Full-stack development with modern frameworks and cloud deployment expertise.
                  </CardContent>
                </Card>
                <Card className="bg-white/70 border-purple-100 backdrop-blur-lg shadow-2xl shadow-purple-200/20 hover:shadow-purple-300/30 transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <CardTitle className="text-gray-800 flex items-center gap-2">
                      <Database className="w-5 h-5 text-purple-500" />
                      Database Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-gray-600">
                    Expertise in both SQL and NoSQL databases with performance optimization skills.
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gradient-to-r from-emerald-50/50 to-teal-50/50 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Professional Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/70 border-emerald-100 backdrop-blur-lg max-w-4xl mx-auto shadow-2xl shadow-emerald-200/20 hover:shadow-emerald-300/30 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-gray-800 text-2xl mb-2">Web Development Intern</CardTitle>
                    <CardDescription className="text-emerald-600 text-lg">Ourtown • May - Jul 2024</CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200">
                    3 Months
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center p-4 rounded-xl bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 shadow-lg">
                    <div className="text-3xl font-bold text-blue-600 mb-2">20%</div>
                    <p className="text-gray-700">Performance Improvement</p>
                    <p className="text-sm text-gray-500">100GB Database Optimization</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-r from-purple-100 to-violet-100 border border-purple-200 shadow-lg">
                    <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
                    <p className="text-gray-700">Bugs Resolved</p>
                    <p className="text-sm text-gray-500">30% Code Reliability Boost</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-200 shadow-lg">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">99.9%</div>
                    <p className="text-gray-700">Uptime Achieved</p>
                    <p className="text-sm text-gray-500">AWS Deployment</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-gray-800 font-semibold text-lg">Key Achievements:</h4>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Optimized a massive 100GB company database, achieving 20% performance improvement while
                        maintaining complete data integrity
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Successfully resolved 50+ critical software bugs in Node.js applications, boosting overall code
                        reliability by 30%
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>
                        Deployed full-stack application to AWS with Docker containerization, achieving 99.9% uptime and
                        reducing deployment time by 40%
                      </span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gradient-to-r from-rose-50/50 to-pink-50/50 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mx-auto"></div>
          </motion.div>

          <div className="space-y-12">
            {/* Project 1: AI-Driven Smart Agriculture Platform */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/70 border-emerald-100 backdrop-blur-lg overflow-hidden shadow-2xl shadow-emerald-200/20 hover:shadow-emerald-300/30 transition-all duration-300 hover:scale-105">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-emerald-100 to-teal-100 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <Brain className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-800">AI Agriculture</h3>
                      <p className="text-emerald-600">Smart Farming Solution</p>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-gray-800 text-2xl mb-2">
                        AI-Driven Smart Agriculture Platform
                      </CardTitle>
                      <div className="flex flex-wrap gap-2">
                        {["Python", "TensorFlow", "React", "Node.js", "CNN", "Machine Learning"].map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200 hover:scale-105 transition-transform duration-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      <p className="text-gray-600">
                        Integrated machine learning and image processing to create a unified system for crop
                        recommendation and disease diagnosis, reducing manual intervention by 40%.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-lg bg-emerald-100 border border-emerald-200 shadow-lg">
                          <div className="text-2xl font-bold text-emerald-600">90%</div>
                          <p className="text-sm text-gray-500">CNN Accuracy</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-teal-100 border border-teal-200 shadow-lg">
                          <div className="text-2xl font-bold text-teal-600">10K+</div>
                          <p className="text-sm text-gray-500">Training Images</p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        <li>• Trained CNN models on 10,000+ crop disease images with 90% accuracy</li>
                        <li>• Deployed supervised learning algorithms for optimal crop prediction</li>
                        <li>• Built full-stack web interface enabling real-time farmer insights</li>
                      </ul>
                    </CardContent>
                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-emerald-300 text-emerald-600 hover:bg-emerald-50 bg-white/80 hover:shadow-lg hover:shadow-emerald-200/30 transition-all duration-300"
                        asChild
                      >
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-teal-300 text-teal-600 hover:bg-teal-50 bg-white/80 hover:shadow-lg hover:shadow-teal-200/30 transition-all duration-300"
                        asChild
                      >
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Project 2: PathCrafter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/70 border-purple-100 backdrop-blur-lg overflow-hidden shadow-2xl shadow-purple-200/20 hover:shadow-purple-300/30 transition-all duration-300 hover:scale-105">
                <div className="md:flex">
                  <div className="md:w-2/3 p-8">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-gray-800 text-2xl mb-2 flex items-center gap-2">
                        🔷 PathCrafter - AI-Powered Learning Path Generator
                      </CardTitle>
                      <div className="flex flex-wrap gap-2">
                        {["React.js", "Node.js", "Express.js", "MongoDB", "Python", "Flask", "Render", "Vercel"].map(
                          (tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200 hover:scale-105 transition-transform duration-200"
                            >
                              {tech}
                            </Badge>
                          ),
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      <p className="text-gray-600">
                        A full-stack, AI-enhanced web application that generates customized learning paths based on user
                        goals, available time, and difficulty preferences. Features real-time ML analysis and
                        intelligent recommendations.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-lg bg-purple-100 border border-purple-200 shadow-lg">
                          <div className="text-2xl font-bold text-purple-600 flex items-center justify-center gap-1">
                            <Rocket className="w-6 h-6" />
                            AI
                          </div>
                          <p className="text-sm text-gray-500">ML-Powered Recommendations</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-pink-100 border border-pink-200 shadow-lg">
                          <div className="text-2xl font-bold text-pink-600 flex items-center justify-center gap-1">
                            <BarChart3 className="w-6 h-6" />
                            Real-time
                          </div>
                          <p className="text-sm text-gray-500">Progress Tracking</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-gray-800 font-semibold">Key Features:</h4>
                        <ul className="space-y-2 text-gray-600 text-sm">
                          <li className="flex items-start gap-2">
                            <Rocket className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                            <span>Goal-based path generation using enhanced ML service</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Brain className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                            <span>Real-time ML model analyzes inputs for structured plans and milestones</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <BarChart3 className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <span>Detailed progress tracking, analytics, and personalized metrics</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Shield className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span>Secure user authentication with register/login/profile management</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <Cloud className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                            <span>Deployed using Render (backend/ML) and Vercel (frontend)</span>
                          </li>
                        </ul>
                      </div>
                    </CardContent>
                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-300 text-purple-600 hover:bg-purple-50 bg-white/80 hover:shadow-lg hover:shadow-purple-200/30 transition-all duration-300"
                        asChild
                      >
                        <a href="https://github.com/RishyendraRamakuri/PathCrafter" target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-white/80 hover:shadow-lg hover:shadow-pink-200/30 transition-all duration-300"
                        asChild
                      >
                        <a href="https://path-crafter-21.vercel.app/" target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-1/3 bg-gradient-to-br from-purple-100 to-pink-100 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <Target className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-800">PathCrafter</h3>
                      <p className="text-purple-600">AI Learning Paths</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Project 3: 5G Anomaly Detection */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/70 border-orange-100 backdrop-blur-lg overflow-hidden shadow-2xl shadow-orange-200/20 hover:shadow-orange-300/30 transition-all duration-300 hover:scale-105">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-orange-100 to-red-100 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <Zap className="w-16 h-16 text-orange-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold text-gray-800">5G Detection</h3>
                      <p className="text-orange-600">Network Security</p>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-gray-800 text-2xl mb-2">5G Anomaly Detection using LSTM</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        {["Python", "LSTM", "TensorFlow", "Deep Learning", "5G Networks"].map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-gradient-to-r from-orange-100 to-red-100 text-orange-700 border-orange-200 hover:scale-105 transition-transform duration-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      <p className="text-gray-600">
                        Developed an advanced LSTM model to detect network anomalies in 5G logs, achieving exceptional
                        prediction accuracy on a massive dataset.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-lg bg-orange-100 border border-orange-200 shadow-lg">
                          <div className="text-2xl font-bold text-orange-600">95%</div>
                          <p className="text-sm text-gray-500">Prediction Accuracy</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-red-100 border border-red-200 shadow-lg">
                          <div className="text-2xl font-bold text-red-600">1M+</div>
                          <p className="text-sm text-gray-500">Dataset Entries</p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        <li>• Implemented LSTM neural network for time-series anomaly detection</li>
                        <li>• Processed and analyzed over 1 million 5G network log entries</li>
                        <li>• Achieved industry-leading 95% accuracy in anomaly prediction</li>
                      </ul>
                    </CardContent>
                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-white/80 hover:shadow-lg hover:shadow-orange-200/30 transition-all duration-300"
                        asChild
                      >
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-300 text-red-600 hover:bg-red-50 bg-white/80 hover:shadow-lg hover:shadow-red-200/30 transition-all duration-300"
                        asChild
                      >
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <Globe className="w-4 h-4 mr-2" />
                          Research Paper
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Certifications & Achievements</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Software Development",
                org: "Amazon",
                type: "Professional",
                color: "from-orange-200 to-red-200",
                textColor: "text-orange-700",
                link: "https://www.coursera.org/account/accomplishments/verify/8QDGINLJBRF4",
              },
              {
                title: "Data Structures & Algorithms",
                org: "Amazon",
                type: "Professional",
                color: "from-orange-200 to-red-200",
                textColor: "text-orange-700",
                link: "https://www.coursera.org/account/accomplishments/verify/8QDGINLJBRF4",
              },
              {
                title: "Programming in Java",
                org: "NPTEL",
                type: "Academic",
                color: "from-blue-200 to-indigo-200",
                textColor: "text-blue-700",
                link: "https://archive.nptel.ac.in/content/noc/NOC24/SEM1/Ecertificates/106/noc24-cs43/Course/NPTEL24CS43S95740420230657843.pdf",
              },
              {
                title: "DSA Gold Certification",
                org: "SmartInterviews",
                type: "Gold",
                color: "from-yellow-200 to-orange-200",
                textColor: "text-yellow-700",
                link: "https://smartinterviews.in/certificate/41fbef5d",
              },
              {
                title: "Machine Learning with Python",
                org: "IBM",
                type: "Professional",
                color: "from-cyan-200 to-blue-200",
                textColor: "text-cyan-700",
                link: "https://www.coursera.org/account/accomplishments/verify/B5HLLPCEL64H",
              },
              {
                title: "1st Prize IoT Hackathon",
                org: "Competition",
                type: "Achievement",
                color: "from-emerald-200 to-teal-200",
                textColor: "text-emerald-700",
                link: "#",
              },
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="block">
                  <Card className="bg-white/70 border-purple-100 backdrop-blur-lg hover:bg-white/80 transition-all duration-300 h-full cursor-pointer shadow-2xl hover:shadow-3xl">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${cert.color} flex items-center justify-center mb-4 shadow-lg`}
                      >
                        <Award className={`w-6 h-6 ${cert.textColor}`} />
                      </div>
                      <CardTitle className="text-gray-800 text-lg">{cert.title}</CardTitle>
                      <CardDescription className="text-blue-600">{cert.org}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge className={`bg-gradient-to-r ${cert.color} ${cert.textColor} border-0 shadow-lg`}>
                        {cert.type}
                      </Badge>
                    </CardContent>
                  </Card>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section id="leadership" className="py-20 bg-gradient-to-r from-violet-50/50 to-purple-50/50 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Leadership & Impact</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* OPEN HOUSE 2025 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/70 border-blue-100 backdrop-blur-lg h-full shadow-2xl shadow-blue-200/20 hover:shadow-blue-300/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-xl flex items-center justify-center shadow-lg">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-800 text-xl">Lead Student Coordinator</CardTitle>
                      <CardDescription className="text-blue-600">OPEN HOUSE 2025 • VNR VJIET</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-blue-100 border border-blue-200 shadow-lg">
                      <div className="text-2xl font-bold text-blue-600">300+</div>
                      <p className="text-sm text-gray-500">Project Teams</p>
                    </div>
                    <div className="p-3 rounded-lg bg-cyan-100 border border-cyan-200 shadow-lg">
                      <div className="text-2xl font-bold text-cyan-600">1000+</div>
                      <p className="text-sm text-gray-500">Visitors</p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-100 border border-purple-200 shadow-lg">
                      <div className="text-2xl font-bold text-purple-600">35+</div>
                      <p className="text-sm text-gray-500">Volunteers</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Managed 300+ project teams ensuring seamless logistics and crowd flow</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Handled 100+ spot registrations efficiently</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Reduced scheduling conflicts by 40% through optimized workflows</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* IoT Marathon 2025 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/70 border-purple-100 backdrop-blur-lg h-full shadow-2xl shadow-purple-200/20 hover:shadow-purple-300/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl flex items-center justify-center shadow-lg">
                      <Cpu className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <CardTitle className="text-gray-800 text-xl">Lead Student Coordinator</CardTitle>
                      <CardDescription className="text-purple-600">IoT Marathon 2025 • VNR VJIET</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 rounded-lg bg-purple-100 border border-purple-200 shadow-lg">
                      <div className="text-2xl font-bold text-purple-600">100+</div>
                      <p className="text-sm text-gray-500">Teams</p>
                    </div>
                    <div className="p-3 rounded-lg bg-pink-100 border border-pink-200 shadow-lg">
                      <div className="text-2xl font-bold text-pink-600">75+</div>
                      <p className="text-sm text-gray-500">Presentations</p>
                    </div>
                    <div className="p-3 rounded-lg bg-rose-100 border border-rose-200 shadow-lg">
                      <div className="text-2xl font-bold text-rose-600">20</div>
                      <p className="text-sm text-gray-500">Days Event</p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Directed VNR VJIET's premier 20-day IoT event</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Conducted workshops on sensor networks and edge computing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-rose-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>Improved project quality by 40% through mentorship pairings</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Extra-Curricular Activities */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12"
          >
            <Card className="bg-white/70 border-emerald-100 backdrop-blur-lg shadow-2xl shadow-emerald-200/20 hover:shadow-emerald-300/30 transition-all duration-300 hover:scale-105">
              <CardHeader>
                <CardTitle className="text-gray-800 text-2xl text-center mb-6">Beyond Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Dumbbell className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-gray-800 font-semibold text-lg mb-2">Fitness & Wellness</h3>
                    <p className="text-gray-600 text-sm">
                      Maintain a disciplined fitness regimen to enhance productivity and stress resilience
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-orange-200 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Mountain className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="text-gray-800 font-semibold text-lg mb-2">Cultural Exploration</h3>
                    <p className="text-gray-600 text-sm">
                      Plan group expeditions to culturally rich regions, fostering cross-cultural awareness
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <Trophy className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-gray-800 font-semibold text-lg mb-2">College Cricket</h3>
                    <p className="text-gray-600 text-sm">
                      Played competitively, emphasizing teamwork and strategic planning
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-cyan-50/50 to-blue-50/50 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Let's Connect</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to collaborate on innovative projects or discuss opportunities in software development and AI/ML?
              Let's build the future together.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <Card className="bg-white/70 border-blue-100 backdrop-blur-lg shadow-2xl shadow-blue-200/20 hover:shadow-blue-300/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-gray-800 text-2xl">Get In Touch</CardTitle>
                  <CardDescription className="text-gray-600">
                    I'm always open to discussing new opportunities and innovative projects.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-xl flex items-center justify-center shadow-lg">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Email</p>
                      <p className="text-blue-600">ramakuririshyendra@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-xl flex items-center justify-center shadow-lg">
                      <Phone className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Phone</p>
                      <p className="text-emerald-600">+91-8688940274</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-200 to-pink-200 rounded-xl flex items-center justify-center shadow-lg">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-800 font-medium">Location</p>
                      <p className="text-purple-600">Hyderabad, India</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-white/70 border-purple-100 backdrop-blur-lg shadow-2xl shadow-purple-200/20 hover:shadow-purple-300/30 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-gray-800 text-xl">Connect Online</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-white border-0 flex-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      asChild
                    >
                      <a href="http://github.com/RishyendraRamakuri" target="_blank" rel="noopener noreferrer">
                        <Github className="w-5 h-5 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white border-0 flex-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      asChild
                    >
                      <a href="https://www.linkedin.com/in/ramakuri-rishyendra-3645432b4/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-5 h-5 mr-2" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/70 border-pink-100 backdrop-blur-lg shadow-2xl shadow-pink-200/20 hover:shadow-pink-300/30 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-gray-800 text-2xl">Send a Message</CardTitle>
                  <CardDescription className="text-gray-600">
                    Have a project in mind? Let's discuss how we can work together.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-gray-700 text-sm font-medium mb-2 block">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          className="w-full px-4 py-3 bg-white/80 border border-purple-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 backdrop-blur-sm transition-all duration-300"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="text-gray-700 text-sm font-medium mb-2 block">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          className="w-full px-4 py-3 bg-white/80 border border-purple-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 backdrop-blur-sm transition-all duration-300"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-medium mb-2 block">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-white/80 border border-purple-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 backdrop-blur-sm transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-medium mb-2 block">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        required
                        className="w-full px-4 py-3 bg-white/80 border border-purple-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 backdrop-blur-sm transition-all duration-300"
                        placeholder="Project Collaboration"
                      />
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm font-medium mb-2 block">Message</label>
                      <textarea
                        rows={5}
                        name="message"
                        required
                        className="w-full px-4 py-3 bg-white/80 border border-purple-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-200 resize-none backdrop-blur-sm transition-all duration-300"
                        placeholder="Tell me about your project or opportunity..."
                      />
                    </div>

                    {submitStatus.type && (
                      <div
                        className={`p-4 rounded-xl ${
                          submitStatus.type === "success"
                            ? "bg-emerald-100 border border-emerald-200 text-emerald-700"
                            : "bg-red-100 border border-red-200 text-red-700"
                        }`}
                      >
                        {submitStatus.message}
                      </div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-400 hover:via-purple-400 hover:to-blue-400 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-5 h-5 mr-2"
                          >
                            <Sparkles className="w-5 h-5" />
                          </motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-purple-100 bg-gradient-to-r from-purple-50/30 to-pink-50/30 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
                ✨ Ramakuri Rishyendra
              </h3>
              <p className="text-gray-600 mb-6">
                Aspiring Software Engineer crafting the future through code, AI, and innovation
              </p>
              <div className="flex justify-center gap-6">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-purple-600 transition-all duration-300 hover:scale-110"
                  asChild
                >
                  <a href="http://github.com/RishyendraRamakuri" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-blue-600 transition-all duration-300 hover:scale-110"
                  asChild
                >
                  <a href="https://www.linkedin.com/in/ramakuri-rishyendra-3645432b4/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-pink-600 transition-all duration-300 hover:scale-110"
                  asChild
                >
                  <a href="mailto:ramakuririshyendra@gmail.com">
                    <Mail className="w-5 h-5" />
                  </a>
                </Button>
              </div>
              <p className="text-gray-400 text-sm mt-8">© 2024 Ramakuri Rishyendra. All rights reserved.</p>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  )
}
