import { useRef, useEffect, useState, useCallback } from "react";
import { Link } from "wouter";
import { motion, useInView, useSpring } from "framer-motion";
import { ArrowRight, Briefcase, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Video CDN URL
const VIDEO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663029149863/X4TbsfVB7MDUndQ2ovXiVF/FinalBrainPowerAIPortal_72f7d853.mp4";

// Original image URLs from ai-portal source
const IMAGES = {
  heroLeft: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029149863/X4TbsfVB7MDUndQ2ovXiVF/robot-ai-combined_3440e05b.png",  // Combined robot+neural (CDN)
  heroRight: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029149863/X4TbsfVB7MDUndQ2ovXiVF/neionimage_7d1baf2f.png",  // Neural head pink/purple (CDN)
  heroOuter: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029149863/X4TbsfVB7MDUndQ2ovXiVF/male-robot-ai-U9KnDeqYsDhgpp9XahVBFM.webp",  // Male robot AI (CDN)
  heroBackground: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029149863/X4TbsfVB7MDUndQ2ovXiVF/robot-ai-combined_3440e05b.png", // Combined robot+neural (CDN)
  phoneLeft: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029149863/X4TbsfVB7MDUndQ2ovXiVF/worldsfirst_d1c8bd17.png",  // App screenshot - World's First DIS
  phoneRight: "https://d2xsxph8kpxj0f.cloudfront.net/310419663029149863/X4TbsfVB7MDUndQ2ovXiVF/brainpower-choosescope_8bf4fd76.png",  // App screenshot - Choose Scope
  appGif: "https://i.imgur.com/pCFfCo8.gif",        // App interface GIF
  conceptSystemic: "https://i.imgur.com/5mVtSaH.png",
  conceptCognitive: "https://i.imgur.com/6MKuZfE.png",
  conceptDecision: "https://i.imgur.com/Y3N0o6Q.png",
  conceptMental: "https://i.imgur.com/1JM2cqu.png",
};

const concepts = [
  {
    title: "Systemic Thinking",
    slug: "systemic-thinking",
    description: "See the whole, not just the parts.",
    image: IMAGES.conceptSystemic,
  },
  {
    title: "Cognitive Biases",
    slug: "cognitive-biases",
    description: "Identify blind spots in human judgment.",
    image: IMAGES.conceptCognitive,
  },
  {
    title: "Decision Intelligence",
    slug: "decision-intelligence",
    description: "Clarity when decisions carry weight.",
    image: IMAGES.conceptDecision,
  },
  {
    title: "Mental Models",
    slug: "mental-models",
    description: "Expand how problems are framed.",
    image: IMAGES.conceptMental,
  },
];

const metrics = [
  { label: "Decision Clarity", value: 87, suffix: "↑" },
  { label: "Strategic Resolution Speed", value: 3.2, suffix: "×", precision: 1 },
  { label: "Cognitive Load Reduction", value: 42, suffix: "↓" },
  { label: "Intelligence Layers Active", value: 12, suffix: "" },
];

// Neural Canvas Animation
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const NODES = 250;
    const LINK_DIST = 220;
    const FLOW_SPEED = 0.3;
    let nodes: any[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    function initNodes() {
      nodes = [];
      if (!canvas) return;
      for (let i = 0; i < NODES; i++) {
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: -FLOW_SPEED * (0.8 + Math.random() * 0.4),
          vy: (Math.random() - 0.5) * 0.2,
          r: 1 + Math.random() * 2,
          blinkPhase: Math.random() * Math.PI * 2,
        });
      }
    }

    function dist(a: { x: number; y: number }, b: { x: number; y: number }) {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      return Math.sqrt(dx * dx + dy * dy);
    }

    let t = 0;
    const render = () => {
      t += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < -50) {
          n.x = canvas.width + 50;
          n.y = Math.random() * canvas.height;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = dist(a, b);
          if (d < LINK_DIST) {
            const strength = 1 - d / LINK_DIST;
            const pulse = 0.7 + 0.3 * Math.sin(t * 0.5 + (a.blinkPhase + b.blinkPhase));
            ctx.strokeStyle = `rgba(0,200,255,${0.45 * strength * pulse})`;
            ctx.lineWidth = 0.8 + 2.0 * strength;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        const blink = 0.5 + 0.5 * Math.sin(t + n.blinkPhase);
        const alpha = 0.2 + 0.8 * blink;
        ctx.beginPath();
        ctx.fillStyle = `rgba(180,240,255,${alpha})`;
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.7,
      }}
    />
  );
}

// Animated Number Component
function AnimatedNumber({ value, precision = 0, suffix = "" }: { value: number; precision?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const spring = useSpring(0, { damping: 100, stiffness: 100, mass: 3 });

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [spring, value, isInView]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${latest.toFixed(precision)}${suffix}`;
      }
    });
  }, [spring, precision, suffix]);

  return <span ref={ref}>0</span>;
}

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#0a0b1e", color: "white" }}>
      {/* Neural Canvas Background */}
      <NeuralCanvas />

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ minHeight: "100vh", zIndex: 1, padding: "2rem 1rem" }}
      >
        <div className="relative z-10 flex flex-col items-center max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight"
            style={{ textShadow: "0 2px 15px rgba(0,0,0,0.5)" }}
          >
            <span
              style={{
                background: "linear-gradient(135deg, #00d4ff 0%, #b24bf3 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              BrainPower AI:
            </span>
            <br />
            <span className="text-white">Your Personal Thinking System</span>
          </motion.h1>

          {/* Hero Images Row */}
          <div className="relative z-10 flex w-full justify-center items-center gap-1 sm:gap-2 md:gap-4 my-8 pointer-events-none"
            style={{ height: "clamp(180px, 35vw, 420px)" }}>
            {/* Left phone - real app screenshot, tilted left */}
            <div className="hidden sm:flex items-end justify-center" style={{
              width: "clamp(70px, 12vw, 175px)",
              transform: "rotate(-14deg) translateY(8px)",
              transformOrigin: "bottom center",
              opacity: 0.70,
              filter: "drop-shadow(0 0 22px rgba(0,212,255,0.3))"
            }}>
              <img
                src={IMAGES.phoneLeft}
                alt="BrainPower AI - Decision Intelligence System"
                style={{ width: "100%", objectFit: "contain", borderRadius: "22px" }}
              />
            </div>
            {/* Left main - Robot */}
            <div style={{ width: "clamp(120px, 28vw, 320px)" }}>
              <img
                src={IMAGES.heroLeft}
                alt="AI Robot"
                style={{ width: "100%", objectFit: "contain" }}
              />
            </div>
            {/* Right main - Neural Head */}
            <div style={{ width: "clamp(120px, 28vw, 320px)" }}>
              <img
                src={IMAGES.heroRight}
                alt="Neural AI Head"
                style={{ width: "100%", objectFit: "contain" }}
              />
            </div>
            {/* Right phone - real app screenshot, tilted right */}
            <div className="hidden sm:flex items-end justify-center" style={{
              width: "clamp(70px, 12vw, 175px)",
              transform: "rotate(14deg) translateY(8px)",
              transformOrigin: "bottom center",
              opacity: 0.70,
              filter: "drop-shadow(0 0 22px rgba(178,75,243,0.3))"
            }}>
              <img
                src={IMAGES.phoneRight}
                alt="BrainPower AI - Intelligence Layers"
                style={{ width: "100%", objectFit: "contain", borderRadius: "22px" }}
              />
            </div>
          </div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto mb-10 rounded-lg p-3"
            style={{ backgroundColor: "rgba(44, 76, 156, 0.3)", backdropFilter: "blur(2px)" }}
          >
            <p className="text-lg md:text-xl px-3" style={{ color: "#c084fc", textShadow: "0 1px 10px rgba(0,0,0,0.5)" }}>
              Enhance your clarity, structure your thoughts, and improve the quality of your decisions.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <a href="#concepts">
              <Button
                size="lg"
                className="w-48 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #00d4ff, #0099bb)",
                  color: "#0a0b1e",
                  fontWeight: "bold",
                  boxShadow: "0 0 20px rgba(0,212,255,0.4)",
                }}
              >
                Explore Concepts
              </Button>
            </a>
            <Link href="/investors">
              <Button
                size="lg"
                className="w-48 transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg, #b24bf3, #7c3aed)",
                  color: "white",
                  fontWeight: "bold",
                  boxShadow: "0 0 20px rgba(178,75,243,0.4)",
                }}
              >
                <Briefcase className="mr-2 h-4 w-4" />
                For Investors
              </Button>
            </Link>
            <Link href="/login">
              <Button
                size="lg"
                variant="outline"
                className="w-48 transition-all duration-300"
                style={{
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.05)",
                }}
              >
                <Lock className="mr-2 h-4 w-4" />
                Admin Login
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* App Preview Section */}
      <section className="relative py-16" style={{ zIndex: 1, backgroundColor: "rgba(10,11,30,0.8)" }}>
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #b24bf3)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            See BrainPower AI in Action
          </motion.h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Watch how our AI-powered platform guides you through complex decisions with structured reasoning frameworks.
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mx-auto rounded-2xl overflow-hidden relative group"
            style={{
              maxWidth: "800px",
              border: "1px solid rgba(0,212,255,0.3)",
              boxShadow: "0 0 40px rgba(0,212,255,0.15)",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              const video = e.currentTarget.querySelector("video");
              if (video) {
                video.muted = false;
                video.play().catch(() => { video.muted = true; video.play(); });
              }
            }}
            onMouseLeave={(e) => {
              const video = e.currentTarget.querySelector("video");
              if (video) {
                video.pause();
                video.currentTime = 0;
                video.muted = true;
              }
            }}
          >
            <video
              src={VIDEO_URL}
              muted
              playsInline
              preload="metadata"
              style={{ width: "100%", display: "block" }}
            />
            {/* Hover overlay hint */}
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 group-hover:opacity-0"
              style={{ backgroundColor: "rgba(0,0,0,0.35)" }}
            >
              <div
                className="flex flex-col items-center gap-2"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{
                    width: 72,
                    height: 72,
                    background: "rgba(0,212,255,0.2)",
                    border: "2px solid rgba(0,212,255,0.6)",
                    boxShadow: "0 0 30px rgba(0,212,255,0.4)",
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span style={{ fontSize: "0.85rem", color: "rgba(0,212,255,0.9)", letterSpacing: "0.05em" }}>
                  Hover to play
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Metrics Section */}
      <section className="relative py-16" style={{ zIndex: 1 }}>
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                className="text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div
                  className="text-5xl md:text-7xl font-bold"
                  style={{
                    color: "#00d4ff",
                    textShadow: "0 0 20px rgba(0,212,255,0.5), 0 0 40px rgba(0,212,255,0.3)",
                  }}
                >
                  <AnimatedNumber value={metric.value} precision={metric.precision} suffix={metric.suffix} />
                </div>
                <p className="mt-4 text-sm md:text-base text-gray-400">{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Concepts Section */}
      <section id="concepts" className="relative py-16" style={{ zIndex: 1 }}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl text-center mx-auto mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-white"
            >
              Conceptual Foundations
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {concepts.map((concept, index) => (
              <motion.div
                key={concept.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <Link href={`/concepts/${concept.slug}`}>
                  <Card
                    className="h-full flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-2"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(0,212,255,0.2)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    }}
                  >
                    <CardHeader className="p-0">
                      <div className="relative h-48 w-full overflow-hidden">
                        <img
                          src={concept.image}
                          alt={concept.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                        <div
                          className="absolute inset-0"
                          style={{ background: "linear-gradient(to top, rgba(10,11,30,0.8), transparent)" }}
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex-grow flex flex-col">
                      <CardTitle className="text-xl font-semibold mb-2 text-white">{concept.title}</CardTitle>
                      <CardDescription className="flex-grow text-gray-400">{concept.description}</CardDescription>
                      <div className="mt-4 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ color: "#00d4ff" }}>
                        Learn more <ArrowRight className="inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="relative py-12 text-center"
        style={{ zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.1)" }}
      >
        <p className="text-gray-500 text-sm">
          © {new Date().getFullYear()} BrainPower AI. All rights reserved.
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/investors" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
            Investor Portal
          </Link>
          <Link href="/login" className="text-sm text-gray-400 hover:text-cyan-400 transition-colors">
            Admin Login
          </Link>
        </div>
      </footer>
    </div>
  );
}
