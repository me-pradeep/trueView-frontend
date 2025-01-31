import React from "react";

function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 bg-white shadow-md rounded-lg overflow-y-auto">
      <h1 className="text-3xl font-semibold text-center text-gray-900">Terms of Service for Secrate</h1>
      
      <p className="text-lg text-gray-600">
        <strong>Effective Date:</strong> 1/31/2025
      </p>

      <p className="text-lg text-gray-700">
        These Terms of Service ("Terms") govern your access to and use of Secrate’s website and services. By accessing or using our website, you agree to be bound by these Terms.
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">1. Use of the Service</h2>
        <p className="text-lg text-gray-700">
          You must be at least 13 years old to use our service. By using Secrate, you agree to use it in accordance with applicable laws and regulations.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">2. Account Registration</h2>
        <p className="text-lg text-gray-700">
          To access certain features of the service, you may need to create an account. You are responsible for maintaining the confidentiality of your login information.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">3. Prohibited Activities</h2>
        <p className="text-lg text-gray-700">
          You agree not to engage in any activity that:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Violates any laws or regulations.</li>
          <li>Harms or disrupts the service or other users.</li>
          <li>Attempts to gain unauthorized access to our systems or accounts.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">4. Intellectual Property</h2>
        <p className="text-lg text-gray-700">
          All content, trademarks, and logos displayed on Secrate are the property of Secrate or its licensors. You may not use, copy, or distribute such content without permission.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">5. Termination</h2>
        <p className="text-lg text-gray-700">
          We reserve the right to suspend or terminate your access to the service if you violate these Terms.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">6. Limitation of Liability</h2>
        <p className="text-lg text-gray-700">
          In no event will Secrate be liable for any damages, losses, or other consequences that arise from your use of the service.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">7. Changes to the Terms</h2>
        <p className="text-lg text-gray-700">
          We may update these Terms at any time. The updated version will be posted on our website, and the "Effective Date" will be revised.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">8. Governing Law</h2>
        <p className="text-lg text-gray-700">
          These Terms are governed by the laws of India.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">9. Contact Us</h2>
        <p className="text-lg text-gray-700">
          If you have any questions about these Terms, please contact us at{" "}
          <a href="mailto:support@secrate.me" className="text-blue-600 hover:underline">
            pradeepyad089@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
}

export default TermsOfService;
