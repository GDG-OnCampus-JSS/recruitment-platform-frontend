'use client';

import {
  MoveLeft,
  Home,
  Code2,
  Terminal,
  Braces,
  Binary,
  Cpu,
  Database,
  Bug,
  FileCode2,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import './not-found.css';

const TechIcons = [Code2, Terminal, Braces, Binary, Cpu, Database, Bug, FileCode2];

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4">
      {/* Animated code background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-grid-primary/[0.03] absolute inset-0 -z-10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-[40rem] w-[40rem] animate-pulse rounded-full bg-primary/5 blur-3xl" />
        </div>

        {/* Floating tech icons */}
        {[...Array(24)].map((_, i) => {
          const Icon = TechIcons[i % TechIcons.length];
          return (
            <Icon
              key={i}
              className="animate-float absolute text-primary/10"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                width: `${Math.random() * 24 + 16}px`,
                height: `${Math.random() * 24 + 16}px`,
              }}
            />
          );
        })}

        {/* Binary rain effect */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="binary-column"
              style={{
                left: `${i * 10}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              01
            </div>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative w-full max-w-md space-y-8 text-center">
        <div className="space-y-6">
          {/* Error code with tech styling */}
          <div className="relative">
            <div className="glitch-text relative z-10 font-mono text-[150px] font-bold leading-none tracking-tight text-primary">
              404
            </div>
            <div className="absolute inset-0 animate-pulse bg-primary/20 opacity-50 blur-3xl" />
          </div>

          {/* Terminal-style error message */}
          <div className="space-y-3 rounded-lg border border-primary/20 bg-background/30 bg-red-100 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2">
              <Terminal className="h-5 w-5 text-red-500" />
              <h2 className="font-mono text-2xl font-semibold text-red-500">
                Error: Page Not Found
              </h2>
            </div>
            <div className="font-mono text-sm text-red-400">
              <p className="typing-effect">Exception: Route not found in production build.</p>
              <p className="typing-effect" style={{ animationDelay: '1s' }}>
                Stack trace: User navigation → 404
              </p>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              variant="outline"
              asChild
              className="gap-2 border-primary/20 bg-background/30 py-5 font-mono backdrop-blur-sm hover:bg-primary/5"
            >
              <Link href="/">
                <MoveLeft className="h-4 w-4" />
                cd ..
              </Link>
            </Button>
            <Button asChild className="gap-2 bg-theme py-5 font-mono hover:bg-theme-interactive">
              <Link href="/dashboard">
                <Home className="h-4 w-4" />
                ~/dashboard
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
