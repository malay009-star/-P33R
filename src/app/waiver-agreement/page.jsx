import React from "react";

const WaiverAgreement = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">P33R.com Waiver Agreement</h1>
      <p className="text-sm text-gray-600 mb-6">
        Last Updated: September 15, 2024
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="mb-4">
          This Waiver Agreement (&quot;Agreement&quot;) is a legally binding
          contract between you (&quot;User,&quot; &quot;you,&quot; or
          &quot;your&quot;) and P33R.com (&quot;Company,&quot; &quot;we,&quot;
          &quot;us,&quot; or &quot;our&quot;). By accessing or using the
          P33R.com website, mobile application, or other online services
          (collectively the &quot;Platform&quot;), you acknowledge that you have
          read, understood, and agree to the terms of this Agreement.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Assumption of Risk</h2>
        <p className="mb-4">
          By using the Platform, you acknowledge that engaging in peer-to-peer
          rental transactions involves inherent risks, including but not limited
          to risks of property damage, personal injury, or financial loss. You
          voluntarily assume all risks associated with your use of the Platform
          and the transactions you engage in through it.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Release of Liability</h2>
        <p className="mb-4">
          To the fullest extent permitted by law, you hereby release, waive, and
          discharge P33R.com, its affiliates, officers, directors, employees,
          agents, and licensors from any and all claims, liabilities, damages,
          losses, and expenses (including reasonable attorneys&apos; fees)
          arising out of or related to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Your use of the Platform.</li>
          <li>
            Your interactions with other users or third-party providers through
            the Platform.
          </li>
          <li>
            Any agreements, contracts, or transactions you enter into as a
            result of your use of the Platform.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">4. Indemnification</h2>
        <p className="mb-4">
          You agree to indemnify, defend, and hold harmless P33R.com, its
          affiliates, officers, directors, employees, agents, and licensors from
          and against any claims, liabilities, damages, losses, and expenses
          (including reasonable attorneys&apos; fees) arising out of or related
          to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Your breach of this Agreement.</li>
          <li>Your violation of any applicable laws or regulations.</li>
          <li>
            Your infringement of any third-party rights, including intellectual
            property rights.
          </li>
          <li>
            Your negligent or wrongful acts or omissions in connection with your
            use of the Platform.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">5. No Warranty</h2>
        <p className="mb-4">
          The Platform is provided &quot;as-is&quot; and
          &quot;as-available&quot; without any warranties of any kind, express
          or implied. P33R.com makes no representations or warranties regarding
          the safety, quality, legality, or suitability of any rental
          properties, transactions, or interactions facilitated through the
          Platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          6. Limitation of Liability
        </h2>
        <p className="mb-4">
          To the fullest extent permitted by law, P33R.com shall not be liable
          for any direct, indirect, incidental, special, consequential, or
          punitive damages arising out of or related to your use of the
          Platform, even if P33R.com has been advised of the possibility of such
          damages.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          7. Governing Law and Dispute Resolution
        </h2>
        <p className="mb-4">
          This Agreement shall be governed by and construed in accordance with
          the laws of the [Insert Jurisdiction]. Any disputes arising out of or
          relating to this Agreement or your use of the Platform shall be
          resolved through binding arbitration in accordance with the rules of
          [Insert Arbitration Body], and you hereby consent to the jurisdiction
          of such arbitration.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">8. Entire Agreement</h2>
        <p className="mb-4">
          This Agreement constitutes the entire understanding between you and
          P33R.com regarding the subject matter herein and supersedes all prior
          agreements, understandings, and representations.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">9. Severability</h2>
        <p className="mb-4">
          If any provision of this Agreement is found to be invalid or
          unenforceable, the remaining provisions shall remain in full force and
          effect.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          10. Changes to this Agreement
        </h2>
        <p className="mb-4">
          We reserve the right to modify this Agreement at any time. If we make
          material changes, we will notify you by email or through the Platform.
          Your continued use of the Platform after any changes to this Agreement
          constitutes your acceptance of the revised terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">11. Contact Information</h2>
        <p className="mb-4">
          If you have any questions about this Agreement, please contact us at:
        </p>
        <p className="mb-4">
          John T. Rose, esq
          <br />
          Fox Rothschild
          <br />
          <a
            href="mailto:jrose@foxrothschild.com"
            className="text-blue-600 underline"
          >
            jrose@foxrothschild.com
          </a>
          <br />
          <a href="mailto:Admin@p33r.com" className="text-blue-600 underline">
            Admin@p33r.com
          </a>
          <br />
          404.881.5940 Phone
          <br />
          404.962.1200 Fax
        </p>
      </section>
    </div>
  );
};

export default WaiverAgreement;
