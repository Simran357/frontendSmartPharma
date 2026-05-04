export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-3">
        
        {/* Logo / About */}
        <div>
          <h2 className="text-xl font-bold text-white">Smart Pharma</h2>
          <p className="text-md mt-3">
           Smart Billing, Inventory Control & Expiry Loss Prevention for modern pharmacies.
          </p>
        </div>


        {/* links */}
        <div>
          <h2 className="text-white text-xl font-bold mb-3">Quick Links</h2>
          <ul className="space-y-2">
    <li>
      <a href="/" className="hover:text-white">Home</a>
    </li>
    <li>
      <a href="/about" className="hover:text-white">Medicines</a>
    </li>
    <li>
      <a href="/about" className="hover:text-white">Services</a>
    </li>
    <li>
      <a href="/about" className="hover:text-white">Contact</a>
    </li>
    <li>
      <a href="/about" className="hover:text-white">Role Based</a>
    </li>
    </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white text-xl font-semibold mb-3">Contact Info</h3>
          <p className="text-sm"> 123 Pharmacy Lane, Chandigarh</p>
          <p className="text-sm mt-1"> +91345764689</p>
          <p className="text-sm mt-1">📧 contact@smartpharma.in</p>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-sm text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © 2026 Smart Pharma. All rights reserved.
      </div>
    </footer>
  );
}