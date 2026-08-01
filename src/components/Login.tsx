import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { btnPrimary } from "./ui";

const LOGIN_URL = "https://app.adsforge.io/login";

export default function Login() {
  return (
    <section id="login" className="border-b border-edge bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-24 text-center md:py-32">
        <Reveal>
          <h2 className="mx-auto max-w-2xl text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Your next campaign is one sentence away
            <span className="text-accent">.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
            Create a free account and turn a plain-English description into a
            fully configured Meta Ads campaign — drafted instantly, checked
            against policy, published in one click.
          </p>
          <div className="mt-9">
            <a href={LOGIN_URL} className={btnPrimary}>
              Create your free account
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <p className="mt-5 text-xs text-faint">
            No credit card required · Already have an account?{" "}
            <a
              href={LOGIN_URL}
              className="text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
            >
              Log in
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
