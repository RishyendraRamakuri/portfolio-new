"use client"

import type React from "react"
import Image from 'next/image'

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Github, Linkedin, Mail, Phone, MapPin, Code, Database, Cloud, Brain, Award, Users, Target, ChevronDown, Zap, Cpu, Globe, BookOpen, Trophy, Mountain, Dumbbell, BarChart3, Shield, Rocket, Send, Sparkles, Star, Hospital, Menu, X, ArrowRight, Play, Download, ExternalLink } from 'lucide-react'

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [submitStatus, setSubmitStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
    setIsMenuOpen(false)
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
        const form = e.target as HTMLFormElement
        form.reset()
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-zinc-900 relative overflow-hidden">
      {/* Cursor Follower */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      />

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Floating Orbs */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            className="absolute w-32 h-32 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fillOpacity%3D%220.02%22%3E%3Ccircle%20cx%3D%227%22%20cy%3D%227%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      </div>

      {/* Modern Navigation */}
      <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-6 py-3 shadow-2xl"
        >
          <div className="flex items-center gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
            >
              ✨ Rishyendra
            </motion.div>
            
            <div className="hidden md:flex items-center gap-6">
              {["Home", "About", "Skills", "Experience", "Projects", "Leadership", "Contact"].map((item) => (
                <motion.button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-sm font-medium transition-all duration-300 px-3 py-2 rounded-lg ${
                    activeSection === item.toLowerCase()
                      ? "bg-white/20 text-cyan-400"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white/70 hover:text-white"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden mt-4 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4 shadow-2xl"
            >
              {["Home", "About", "Skills", "Experience", "Projects", "Leadership", "Contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left text-white/70 hover:text-white py-2 px-3 rounded-lg hover:bg-white/10 transition-all duration-300"
                >
                  {item}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section - Redesigned */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="container mx-auto px-6 z-10 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105">
                <div className="flex items-center gap-6 mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg opacity-50"></div>
                    <Image
                      src="/Profile.png"
                      alt="Ramakuri Rishyendra"
                      width={120}
                      height={120}
                      className="rounded-full object-cover relative z-10 border-4 border-white/20"
                    />
                  </motion.div>
                  <div>
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-2xl font-bold text-white mb-2"
                    >
                      Ramakuri Rishyendra
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-cyan-400 font-medium"
                    >
                      Software Engineer
                    </motion.p>
                  </div>
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-3 text-white/80"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span>Hyderabad, India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <span>B.Tech ECE • VNR VJIET • 8.15 CPI</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code className="w-4 h-4 text-cyan-400" />
                    <span>AI/ML Enthusiast • Full-Stack Developer</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex gap-3 mt-6"
                >
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                    asChild
                  >
                    <a href="https://www.linkedin.com/in/ramakuri-rishyendra-3645432b4/" target="_blank" rel="noopener noreferrer">
                      <Linkedin className="w-4 h-4 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                    asChild
                  >
                    <a href="http://github.com/RishyendraRamakuri" target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      GitHub
                    </a>
                  </Button>
                </motion.div>
              </Card>
            </motion.div>

            {/* Right Side - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center lg:text-left"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6"
              >
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                    Crafting the
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                    Future
                  </span>
                </h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xl text-white/80 mb-8 max-w-2xl"
                >
                  Transforming ideas into intelligent solutions through code, AI, and innovation. 
                  Building tomorrow's technology today.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105"
                  onClick={() => scrollToSection("projects")}
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Explore My Work
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/40 text-white hover:bg-white/20 hover:text-white backdrop-blur-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                  onClick={() => scrollToSection("contact")}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Let's Connect
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/60 text-sm">Scroll to explore</span>
            <ChevronDown className="w-6 h-6 text-cyan-400" />
          </div>
        </motion.div>
      </section>

      {/* About Section - Bento Grid Layout */}
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">About Me</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Main Story Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 h-full shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-white text-2xl mb-4">My Journey</CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-white/80 space-y-4">
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

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 h-full shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-white flex items-center gap-2 text-lg">
                    <BookOpen className="w-5 h-5 text-cyan-400" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0 text-white/80 space-y-4">
                  <div>
                    <p className="font-semibold text-white">B.Tech ECE</p>
                    <p className="text-cyan-400 text-sm">VNR VJIET (2026)</p>
                    <p className="text-cyan-400 font-bold">CPI: 8.15</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Intermediate</p>
                    <p className="text-cyan-400 text-sm">Alphores Junior College</p>
                    <p className="text-cyan-400 font-bold">97.3%</p>
                  </div>
                  <div>
                    <p className="font-semibold text-white">SSC</p>
                    <p className="text-cyan-400 text-sm">Johnson Global High School</p>
                    <p className="text-cyan-400 font-bold">10.0 GPA</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-xl border border-cyan-400/30 p-6 h-full shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 hover:scale-105">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-white mb-2"
                  >
                    5+
                  </motion.div>
                  <p className="text-white font-medium">Projects Completed</p>
                  <p className="text-white/80 text-sm">Full-stack & AI/ML</p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl border border-blue-400/30 p-6 h-full shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:scale-105">
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-white mb-2"
                  >
                    5+
                  </motion.div>
                  <p className="text-white font-medium">Certifications</p>
                  <p className="text-white/80 text-sm">Professional & Academic</p>
                </div>
              </Card>
            </motion.div>

            {/* Core Strengths */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 h-full shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105">
                <CardHeader className="p-0 mb-4">
                  <CardTitle className="text-white flex items-center gap-2 text-lg">
                    <Target className="w-5 h-5 text-purple-400" />
                    Core Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Problem-Solving",
                      "Team Leadership",
                      "Innovation",
                      "Communication",
                    ].map((strength, index) => (
                      <motion.div
                        key={strength}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        viewport={{ once: true }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border-purple-400/30 hover:scale-105 transition-transform duration-200 w-full justify-center"
                        >
                          {strength}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section - Interactive */}
      <section id="skills" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Technical Arsenal</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </motion.div>

          <Tabs defaultValue="languages" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/10 border-white/20 backdrop-blur-xl shadow-lg mb-8">
              <TabsTrigger
                value="languages"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/30 data-[state=active]:to-blue-500/30 data-[state=active]:text-white text-white/70"
              >
                Languages
              </TabsTrigger>
              <TabsTrigger
                value="tools"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/30 data-[state=active]:to-blue-500/30 data-[state=active]:text-white text-white/70"
              >
                Tools & Tech
              </TabsTrigger>
              <TabsTrigger
                value="platforms"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/30 data-[state=active]:to-blue-500/30 data-[state=active]:text-white text-white/70"
              >
                Platforms
              </TabsTrigger>
              <TabsTrigger
                value="core"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500/30 data-[state=active]:to-blue-500/30 data-[state=active]:text-white text-white/70"
              >
                Core Skills
              </TabsTrigger>
            </TabsList>

            <TabsContent value="languages" className="mt-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { name: "Java", icon: Code, color: "from-orange-500 to-red-500" },
                  { name: "Python", icon: Brain, color: "from-blue-500 to-cyan-500" },
                  { name: "JavaScript", icon: Globe, color: "from-yellow-500 to-orange-500" },
                  { name: "MySQL", icon: Database, color: "from-cyan-500 to-blue-500" },
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, rotateY: 10 }}
                    className="group"
                  >
                    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/20 h-full">
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${skill.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <skill.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-white font-semibold text-lg">{skill.name}</h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tools" className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {["Node.js", "React", "FastAPI", "Next.js", "Docker", "MySQL"].map((tool, index) => (
                  <motion.div
                    key={tool}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.1, rotateZ: 5 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer shadow-xl hover:shadow-cyan-500/20">
                      <CardContent className="p-4 text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-xl flex items-center justify-center mx-auto mb-2 shadow-lg">
                          <Database className="w-6 h-6 text-cyan-400" />
                        </div>
                        <p className="text-white font-medium text-sm">{tool}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="platforms" className="mt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["GitHub", "VS Code", "Docker", "Postman", "Railway", "Render", "Vercel", "AWS"].map((platform, index) => (
                  <motion.div
                    key={platform}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-blue-500/20">
                      <CardContent className="p-6 text-center">
                        <div className="w-14 h-14 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                          <Cloud className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-white font-semibold">{platform}</h3>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="core" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105 h-full">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Globe className="w-5 h-5 text-cyan-400" />
                        Web Development & Machine Learning
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-white/80">
                      Full-stack development with modern frameworks and machine learning integration for intelligent solutions.
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105 h-full">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Database className="w-5 h-5 text-blue-400" />
                        Database Management & DSA
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-white/80">
                      Expertise in database management, data structures & algorithms, and object-oriented programming.
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Continue with the rest of the sections... */}
      
      {/* Experience Section - Timeline */}
      <section id="experience" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Professional Experience</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-2xl mb-2">Web Development Intern</CardTitle>
                    <CardDescription className="text-cyan-400 text-lg">OurTown • May - Jul 2024</CardDescription>
                  </div>
                  <Badge className="bg-gradient-to-r from-cyan-500/30 to-blue-500/30 text-white border-cyan-400/30">
                    3 Months
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { number: "3", label: "Team Members", desc: "Full-Stack Development" },
                    { number: "100%", label: "Project Delivery", desc: "Under Tight Deadlines" },
                    { number: "React", label: "Tech Stack", desc: "Node.js, MongoDB" },
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center p-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shadow-lg"
                    >
                      <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.number}</div>
                      <p className="text-white">{stat.label}</p>
                      <p className="text-sm text-white/60">{stat.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Key Achievements:</h4>
                  <ul className="space-y-3 text-white/80">
                    {[
                      "Collaborated in a 3-member team to develop a full-stack web application (React, Node.js, MongoDB) for restaurant order and booking management, delivering a user-centric solution",
                      "Engineered robust frontend and efficient backend APIs for authentication, order, and reservation scheduling, driving project progress through proactive task management and Git-based collaboration",
                      "Demonstrated ownership and adaptability by deploying stable builds under tight deadlines, successfully responding to evolving requirements"
                    ].map((achievement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Projects Section - Interactive Cards */}
      <section id="projects" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Featured Projects</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </motion.div>

          <div className="space-y-12">
            {/* Project 1: PathCrafter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500">
                <div className="md:flex">
                  <div className="md:w-2/3 p-8">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-white text-2xl mb-2 flex items-center gap-2">
                        🔷 AI-Powered Learning Path Generator
                      </CardTitle>
                      <div className="flex flex-wrap gap-2">
                        {["React.js", "Node.js", "Express.js", "MongoDB", "Python", "Flask", "Render", "Vercel"].map(
                          (tech) => (
                            <Badge
                              key={tech}
                              variant="secondary"
                              className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-400/30 hover:scale-105 transition-transform duration-200"
                            >
                              {tech}
                            </Badge>
                          ),
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      <p className="text-white/80">
                        A full-stack, AI-enhanced web application that generates customized learning paths based on user
                        goals, available time, and difficulty preferences. Features real-time ML analysis and
                        intelligent recommendations.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shadow-lg">
                          <div className="text-2xl font-bold text-cyan-400 flex items-center justify-center gap-1">
                            <Rocket className="w-6 h-6" />
                            AI
                          </div>
                          <p className="text-sm text-white/60">ML-Powered Recommendations</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 shadow-lg">
                          <div className="text-2xl font-bold text-blue-400 flex items-center justify-center gap-1">
                            <BarChart3 className="w-6 h-6" />
                            Real-time
                          </div>
                          <p className="text-sm text-white/60">Progress Tracking</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <h4 className="text-white font-semibold">Key Features:</h4>
                        <ul className="space-y-2 text-white/80 text-sm">
                          {[
                            { icon: Rocket, text: "Goal-based path generation using enhanced ML service", color: "text-cyan-400" },
                            { icon: Brain, text: "Real-time ML model analyzes inputs for structured plans and milestones", color: "text-purple-400" },
                            { icon: BarChart3, text: "Detailed progress tracking, analytics, and personalized metrics", color: "text-blue-400" },
                            { icon: Shield, text: "Secure user authentication with register/login/profile management", color: "text-emerald-400" },
                            { icon: Cloud, text: "Deployed using Render (backend/ML) and Vercel (frontend)", color: "text-orange-400" },
                          ].map((feature, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.5, delay: index * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-start gap-2"
                            >
                              <feature.icon className={`w-4 h-4 ${feature.color} mt-0.5 flex-shrink-0`} />
                              <span>{feature.text}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-cyan-400/30 text-cyan-400 hover:bg-cyan-500/20 bg-white/10 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
                        asChild
                      >
                        <a href="https://github.com/RishyendraRamakuri" target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-400/30 text-blue-400 hover:bg-blue-500/20 bg-white/10 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                        asChild
                      >
                        <a href="https://path-crafter-21.vercel.app/" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    </div>
                  </div>
                  <div className="md:w-1/3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Target className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white">PathCrafter</h3>
                      <p className="text-cyan-400">AI Learning Paths</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Project 2: Healthcare Platform */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Hospital className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white">Healthcare Platform</h3>
                      <p className="text-blue-400">Appointment Management</p>
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <CardHeader className="p-0 mb-6">
                      <CardTitle className="text-white text-2xl mb-2">Multi-Tenant Healthcare Appointment Platform</CardTitle>
                      <div className="flex flex-wrap gap-2">
                        {["Next.js", "Node.js", "MongoDB", "Razorpay", "Scalable Architecture"].map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-blue-400/30 hover:scale-105 transition-transform duration-200"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="p-0 space-y-4">
                      <p className="text-white/80">
                        Developed a scalable full-stack platform for hospital appointment scheduling, enabling dynamic bookings, payments, and queue management.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border border-blue-400/30 shadow-lg">
                          <div className="text-2xl font-bold text-blue-400">Dynamic</div>
                          <p className="text-sm text-white/60">Bookings & Payments</p>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 shadow-lg">
                          <div className="text-2xl font-bold text-purple-400">Multi-Tenant</div>
                          <p className="text-sm text-white/60">Hospital Support</p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-white/80 text-sm">
                        {[
                          "Built a centralized login gateway for hospital authentication with secure redirection",
                          "Integrated mock and live Razorpay payments for various transactions",
                          "Designed modular admin dashboards for real-time management of doctors, queues, and patient histories",
                          "Created a responsive, secure user-facing interface for booking, login/signup, reviews, and personalized appointment flows",
                          "Deployed frontend on Vercel and backend on Railway with robust CORS and environment configuration"
                        ].map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span>{feature}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                    <div className="flex gap-3 mt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-blue-400/30 text-blue-400 hover:bg-blue-500/20 bg-white/10 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                        asChild
                      >
                        <a href="https://github.com/RishyendraRamakuri/QuickCare" target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4 mr-2" />
                          View Code
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-purple-400/30 text-purple-400 hover:bg-purple-500/20 bg-white/10 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300"
                        asChild
                      >
                        <a href="https://portfolio-ten-rho-70.vercel.app/quickcare.html" target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
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

      {/* Certifications Section - Grid Layout */}
      <section id="certifications" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Certifications & Achievements</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Software Development",
                org: "Amazon",
                type: "Professional",
                color: "from-orange-500 to-red-500",
                textColor: "text-orange-400",
                link: "https://www.coursera.org/account/accomplishments/verify/8QDGINLJBRF4",
              },
              {
                title: "Programming in Java",
                org: "NPTEL",
                type: "Academic",
                color: "from-blue-500 to-indigo-500",
                textColor: "text-blue-400",
                link: "https://archive.nptel.ac.in/content/noc/NOC24/SEM1/Ecertificates/106/noc24-cs43/Course/NPTEL24CS43S95740420230657843.pdf",
              },
              {
                title: "DSA Diamond Certification",
                org: "SmartInterviews",
                type: "Diamond",
                color: "from-purple-500 to-pink-500",
                textColor: "text-purple-400",
                link: "https://smartinterviews.in/certificate/41fbef5d",
              },
              {
                title: "SQL (Basic)",
                org: "HackerRank",
                type: "Professional",
                color: "from-green-500 to-emerald-500",
                textColor: "text-green-400",
                link: "https://www.hackerrank.com/certificates/iframe/f15756146775",
              },
              {
                title: "Machine Learning with Python",
                org: "IBM",
                type: "Professional",
                color: "from-cyan-500 to-blue-500",
                textColor: "text-cyan-400",
                link: "https://www.coursera.org/account/accomplishments/verify/B5HLLPCEL64H",
              },
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="group"
              >
                <a href={cert.link} target="_blank" rel="noopener noreferrer" className="block">
                  <Card className="bg-white/10 backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-all duration-300 h-full cursor-pointer shadow-2xl hover:shadow-cyan-500/20 group-hover:border-cyan-400/30">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-r ${cert.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Award className={`w-6 h-6 text-white`} />
                      </div>
                      <CardTitle className="text-white text-lg group-hover:text-cyan-400 transition-colors duration-300">{cert.title}</CardTitle>
                      <CardDescription className="text-cyan-400">{cert.org}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Badge className={`bg-gradient-to-r ${cert.color}/20 ${cert.textColor} border-0 shadow-lg`}>
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

      {/* Leadership Section - Enhanced */}
      <section id="leadership" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Leadership & Impact</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto"></div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* OPEN HOUSE 2025 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 h-full shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-xl flex items-center justify-center shadow-lg">
                      <Users className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-xl">Lead Student Coordinator</CardTitle>
                      <CardDescription className="text-cyan-400">OPEN HOUSE 2025 • VNR VJIET</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { number: "300+", label: "Project Teams", desc: "Managed Successfully" },
                      { number: "1000+", label: "Visitors", desc: "Event Attendance" },
                      { number: "35+", label: "Volunteers", desc: "Team Coordination" },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 shadow-lg"
                      >
                        <div className="text-2xl font-bold text-cyan-400 mb-1">{stat.number}</div>
                        <p className="text-white text-sm font-medium">{stat.label}</p>
                        <p className="text-xs text-white/60">{stat.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                  <ul className="space-y-3 text-white/80">
                    {[
                      "Managed 300+ project teams ensuring seamless logistics and crowd flow",
                      "Handled 100+ spot registrations efficiently",
                      "Reduced scheduling conflicts by 40% through optimized workflows"
                    ].map((achievement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
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
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 h-full shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-xl flex items-center justify-center shadow-lg">
                      <Cpu className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-xl">Lead Student Coordinator</CardTitle>
                      <CardDescription className="text-purple-400">IoT Marathon 2025 • VNR VJIET</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { number: "100+", label: "Teams", desc: "Participated" },
                      { number: "75+", label: "Presentations", desc: "Evaluated" },
                      { number: "20", label: "Days Event", desc: "Duration" },
                    ].map((stat, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 shadow-lg"
                      >
                        <div className="text-2xl font-bold text-purple-400 mb-1">{stat.number}</div>
                        <p className="text-white text-sm font-medium">{stat.label}</p>
                        <p className="text-xs text-white/60">{stat.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                  <ul className="space-y-3 text-white/80">
                    {[
                      "Directed VNR VJIET's premier 20-day IoT event",
                      "Conducted workshops on sensor networks and edge computing",
                      "Improved project quality by 40% through mentorship pairings"
                    ].map((achievement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
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
          >
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105">
              <CardHeader>
                <CardTitle className="text-white text-2xl text-center mb-6">Beyond Technology</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    {
                      icon: Dumbbell,
                      title: "Fitness & Wellness",
                      desc: "Maintain a disciplined fitness regimen to enhance productivity and stress resilience",
                      color: "from-emerald-500 to-teal-500",
                      iconColor: "text-emerald-400"
                    },
                    {
                      icon: Mountain,
                      title: "Cultural Exploration",
                      desc: "Plan group expeditions to culturally rich regions, fostering cross-cultural awareness",
                      color: "from-orange-500 to-red-500",
                      iconColor: "text-orange-400"
                    },
                    {
                      icon: Trophy,
                      title: "College Cricket",
                      desc: "Played competitively, emphasizing teamwork and strategic planning",
                      color: "from-blue-500 to-indigo-500",
                      iconColor: "text-blue-400"
                    }
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ scale: 1.05 }}
                      className="text-center group"
                    >
                      <div className={`w-16 h-16 bg-gradient-to-r ${activity.color}/30 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <activity.icon className={`w-8 h-8 ${activity.iconColor}`} />
                      </div>
                      <h3 className="text-white font-semibold text-lg mb-2">{activity.title}</h3>
                      <p className="text-white/80 text-sm">{activity.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - Modern Form */}
      <section id="contact" className="py-20 relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">Let's Connect</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6"></div>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
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
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Get In Touch</CardTitle>
                  <CardDescription className="text-white/80">
                    I'm always open to discussing new opportunities and innovative projects.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {[
                    { icon: Mail, label: "Email", value: "ramakuririshyendra@gmail.com", color: "from-cyan-500 to-blue-500" },
                    { icon: Phone, label: "Phone", value: "+91-8688940274", color: "from-emerald-500 to-teal-500" },
                    { icon: MapPin, label: "Location", value: "Hyderabad, India", color: "from-purple-500 to-pink-500" },
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 group"
                    >
                      <div className={`w-12 h-12 bg-gradient-to-r ${contact.color}/30 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <contact.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-white font-medium">{contact.label}</p>
                        <p className="text-cyan-400">{contact.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-white text-xl">Connect Online</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white border-0 flex-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      asChild
                    >
                      <a href="http://github.com/RishyendraRamakuri" target="_blank" rel="noopener noreferrer">
                        <Github className="w-5 h-5 mr-2" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-0 flex-1 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
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
              <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Send a Message</CardTitle>
                  <CardDescription className="text-white/80">
                    Have a project in mind? Let's discuss how we can work together.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">First Name</label>
                        <input
                          type="text"
                          name="firstName"
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 backdrop-blur-sm transition-all duration-300"
                          placeholder="John"
                        />
                      </div>
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Last Name</label>
                        <input
                          type="text"
                          name="lastName"
                          required
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 backdrop-blur-sm transition-all duration-300"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 backdrop-blur-sm transition-all duration-300"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">Subject</label>
                      <input
                        type="text"
                        name="subject"
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 backdrop-blur-sm transition-all duration-300"
                        placeholder="Project Collaboration"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-medium mb-2 block">Message</label>
                      <textarea
                        rows={5}
                        name="message"
                        required
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 resize-none backdrop-blur-sm transition-all duration-300"
                        placeholder="Tell me about your project or opportunity..."
                      />
                    </div>

                    {submitStatus.type && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl ${
                          submitStatus.type === "success"
                            ? "bg-emerald-500/20 border border-emerald-400/30 text-emerald-400"
                            : "bg-red-500/20 border border-red-400/30 text-red-400"
                        }`}
                      >
                        {submitStatus.message}
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
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
                          <ArrowRight className="w-5 h-5 ml-2" />
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
      <footer className="py-12 border-t border-white/10 bg-gradient-to-r from-gray-900/50 to-slate-900/50 relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                ✨ Ramakuri Rishyendra
              </h3>
              <p className="text-white/80 mb-6">
                Aspiring Software Engineer crafting the future through code, AI, and innovation
              </p>
              <div className="flex justify-center gap-6">
                {[
                  { icon: Github, href: "http://github.com/RishyendraRamakuri", color: "hover:text-gray-400" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/ramakuri-rishyendra-3645432b4/", color: "hover:text-blue-400" },
                  { icon: Mail, href: "mailto:ramakuririshyendra@gmail.com", color: "hover:text-cyan-400" },
                ].map((social, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`text-white/60 ${social.color} transition-all duration-300`}
                      asChild
                    >
                      <a href={social.href} target="_blank" rel="noopener noreferrer">
                        <social.icon className="w-5 h-5" />
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </div>
              <p className="text-white/40 text-sm mt-8">© 2024 Ramakuri Rishyendra. All rights reserved.</p>
            </motion.div>
          </div>
        </div>
      </footer>

      {/* Floating Action Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2 }}
        className="fixed bottom-8 right-8 z-40"
      >
        <Button
          onClick={() => scrollToSection("home")}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110"
        >
          <ChevronDown className="w-6 h-6 rotate-180" />
        </Button>
      </motion.div>
    </div>
  )
}
