import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/ui/LegalPage";
import { canonicalFor } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "The terms for using the Emerg Technologies website.",
  alternates: canonicalFor("/terms"),
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      intro="By using this website you agree to the terms below. If you do not agree, please do not use it."
    >
      <section>
        <h2>About this site</h2>
        <p>
          This website presents Emerg Technologies, its services and its products. The information
          is provided in good faith for general information and may change without notice.
        </p>
      </section>

      <section>
        <h2>Products, prototypes and concepts</h2>
        <p>
          Projects listed on this site carry a status: live, early access, prototype, in
          development or concept. Prototypes and concepts are demonstrations. They are not
          production services, may contain fictional data, and should not be relied on for real
          decisions or sensitive information. Descriptions of a product&rsquo;s intended features do
          not guarantee that those features are available.
        </p>
      </section>

      <section>
        <h2>Enquiries are not contracts</h2>
        <p>
          Sending an enquiry does not create an agreement for us to provide services. Any project
          will be agreed separately and in writing.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <ul>
          <li>Do not attempt to disrupt, probe or gain unauthorized access to this site.</li>
          <li>Do not submit unlawful, abusive or misleading content through the contact form.</li>
          <li>Do not use automated tools to send messages through the form.</li>
        </ul>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          The content, design and logo of this website belong to Emerg Technologies unless stated
          otherwise. You may not copy or reuse them without permission. Names of third-party
          products belong to their owners.
        </p>
      </section>

      <section>
        <h2>External links</h2>
        <p>
          Links to other sites are provided for convenience. We do not control those sites and are
          not responsible for their content or practices.
        </p>
      </section>

      <section>
        <h2>Disclaimer and liability</h2>
        <p>
          The site is provided &ldquo;as is&rdquo;. To the extent the law allows, Emerg Technologies is
          not liable for loss arising from your use of this website or reliance on its content.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms? Reach us through the <Link href="/contact">contact page</Link>.
        </p>
      </section>
    </LegalPage>
  );
}
