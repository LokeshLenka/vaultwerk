import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Stack } from "@phosphor-icons/react";
import SplitText from "@/components/SplitText";
import BlurText from "@/components/BlurText";
import ShinyText from "@/components/ShinyText";
import StarBorder from "@/components/StarBorder";
import ClickSpark from "@/components/ClickSpark";
import Magnet from "@/components/Magnet";

/**
 * Landing hero — a single viewport, nothing below the fold.
 * Eyebrow (ShinyText) → headline (SplitText) → subcopy (BlurText) →
 * CTAs (StarBorder + Magnet + ClickSpark). Pure-CSS glow + grid backdrop.
 */
function HomePage() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] items-center justify-center overflow-hidden">
      {/* Backdrop: soft glow + fading grid, CSS only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/3 h-[420px] w-[680px] max-w-none -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-400/20 blur-[140px] dark:bg-zinc-100/10" />
        <div
          className="absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:56px_56px] opacity-60 [mask-image:radial-gradient(ellipse_55%_45%_at_50%_42%,black,transparent)]"
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center px-4 text-center">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur"
        >
          <span className="size-1.5 rounded-full bg-emerald-500" />
          <ShinyText
            text="Your personal tool memory"
            speed={3}
            color="var(--muted-foreground)"
            shineColor="var(--foreground)"
            spread={80}
            className="text-xs"
          />
        </motion.span>

        <SplitText
          tag="h1"
          text="Save tools before you forget them."
          splitType="chars"
          delay={28}
          duration={0.9}
          ease="power3.out"
          from={{ opacity: 0, y: 36 }}
          to={{ opacity: 1, y: 0 }}
          textAlign="center"
          className="max-w-3xl text-balance text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
        />

        <BlurText
          text="VaultWerk organizes your developer tools into a searchable library and curated collections — so the perfect tool is there when you need it."
          delay={420}
          animateBy="words"
          stepDuration={0.3}
          className="mt-6 max-w-xl text-balance text-sm leading-6 text-muted-foreground sm:text-base"
        />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <ClickSpark sparkCount={10} sparkColor="#a3a3a3">
            <Magnet padding={60} magnetStrength={1.5}>
              <StarBorder
                as={Link}
                to="/dashboard/library"
                color="var(--primary)"
                backgroundColor="var(--primary)"
                textColor="var(--primary-foreground)"
                borderColor="transparent"
                speed="5s"
                className="rounded-[20px]"
              >
                <span className="inline-flex items-center gap-2 text-[15px] font-medium">
                  Get started
                  <ArrowRight size={16} weight="bold" />
                </span>
              </StarBorder>
            </Magnet>
          </ClickSpark>

          <Magnet padding={60} magnetStrength={1.5}>
            <Link
              to="/timeline"
              className="inline-flex items-center gap-2 rounded-[20px] border border-border bg-background/80 px-[26px] py-[16px] text-[15px] font-medium text-foreground backdrop-blur transition-colors hover:bg-muted/60"
            >
              <Stack size={16} />
              View roadmap
            </Link>
          </Magnet>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.15 }}
          className="mt-8 text-xs text-muted-foreground"
        >
          Open source · MIT licensed · No credit card
        </motion.p>
      </div>
    </section>
  );
}

export default HomePage;
