import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/ui/LegalPage";
import { canonicalFor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Emerg Technologies handles information collected through this website.",
  alternates: canonicalFor("/privacy"),
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro="This page explains what information this website collects, why, and what we do with it. We have tried to keep it short and plain."
    >
      <section>
        <h2>What we collect</h2>
        <p>
          The only information we ask you for is what you type into the contact form: your name,
          organization, email address, optional phone number, the service you are interested in, an
          optional budget range, your project description, and your confirmation that we may
          contact you.
        </p>
      </section>

      <section>
        <h2>How we use it</h2>
        <p>
          We use these details to read and reply to your enquiry. We do not use them for anything
          unrelated, and we do not sell them.
        </p>
      </section>

      <section>
        <h2>Who handles it</h2>
        <ul>
          <li>
            <strong>Email delivery.</strong> When you send the form, your message is passed to an
            email delivery service so that it reaches our inbox.
          </li>
          <li>
            <strong>Hosting.</strong> This site is hosted on Vercel, which may keep standard server
            logs such as IP addresses and request times for security and operation.
          </li>
        </ul>
      </section>

      <section>
        <h2>Cookies and tracking</h2>
        <p>
          This website does not set advertising or analytics cookies, and it does not load third-party
          trackers. Fonts are served from this site. If that changes, this page will be updated first.
        </p>
      </section>

      <section>
        <h2>Links to other sites</h2>
        <p>
          Our products page links to separate applications and websites. They have their own
          privacy practices, which this policy does not cover.
        </p>
      </section>

      <section>
        <h2>Keeping your information</h2>
        <p>
          We keep an enquiry for as long as needed to respond to it and to follow up on any project
          that results from it, then delete it.
        </p>
      </section>

      <section>
        <h2>Your choices</h2>
        <p>
          You can ask us to tell you what we hold about you, correct it, or delete it. Contact us
          through the <Link href="/contact">contact page</Link> and we will respond.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          If we change this policy we will update the date below. Material changes will be
          described on this page.
        </p>
      </section>
    </LegalPage>
  );
}
