import React from "react";

function Page() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 bg-white shadow-md rounded-lg overflow-y-auto">
      <h1 className="text-3xl font-semibold text-center text-gray-900">Privacy Policy for Secrate</h1>
      
      <p className="text-lg text-gray-600">
        <strong>Effective Date:</strong> 1/31/2025
      </p>

      <p className="text-lg text-gray-700">
        At Secrate, accessible from{" "}
        <a href="https://secrate.me" className="text-blue-600 hover:underline">
          https://secrate.me
        </a>
        , one of our main priorities is the privacy of our visitors. This Privacy
        Policy document contains types of information that is collected and recorded by Secrate and how we use it.
      </p>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">1. Information We Collect</h2>
        <p className="text-lg text-gray-700">
          We collect the following types of personal data:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>
            <strong>Personal Identifiable Information (PII):</strong> When you sign up or log in using third-party services (like Google), we may collect personal information such as your name, email address, and profile picture.
          </li>
          <li>
            <strong>Usage Data:</strong> Information about how you interact with our website, such as IP addresses, browser type, and pages visited.
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">2. How We Use Your Information</h2>
        <ul className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>To provide and maintain our service.</li>
          <li>To personalize your experience.</li>
          <li>To communicate with you (e.g., send important updates about the service).</li>
          <li>To improve our website and service based on user feedback.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">3. Data Security</h2>
        <p className="text-lg text-gray-700">
          We implement security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please remember that no method of transmission over the internet is 100% secure.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">4. Third-Party Services</h2>
        <p className="text-lg text-gray-700">
          We may use third-party services (such as Firebase and Google) that collect information to provide analytics and improve your experience.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">5. Your Rights</h2>
        <ul className="list-decimal pl-6 space-y-2 text-gray-700">
          <li>Access, update, or delete your personal data.</li>
          <li>Opt out of marketing communications at any time.</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">6. Cookies</h2>
        <p className="text-lg text-gray-700">
          We use cookies to enhance your user experience. You can control cookie settings through your browser.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">7. Contact Us</h2>
        <p className="text-lg text-gray-700">
          If you have any questions or concerns about your privacy, please contact us at{" "}
          <a href="mailto:support@secrate.me" className="text-blue-600 hover:underline">
            pradeepyad089@gmail.com
          </a>.
        </p>
      </div>
    </div>
  );
}

export default Page;
