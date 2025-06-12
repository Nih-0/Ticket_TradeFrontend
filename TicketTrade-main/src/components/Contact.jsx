import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Chatbot from './ChatBot';

const ContactUs = () => {
  const form = useRef();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setSuccess(true);
          setError(false);
          form.current.reset();
        },
        () => {
          setError(true);
          setSuccess(false);
        }
      );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Left Column: Terms and Conditions */}
        <div className="col-md-6 mb-4">
          <div className="card shadow p-4 h-100">
            <h2 className="card-title text-center mb-4">Terms & Conditions</h2>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <p>
                Welcome to <strong>TicketTrade!</strong> By accessing or using our platform, you agree to comply with and be bound by the following terms:
              </p>

              <h5>1. Responsible Use</h5>
              <ul>
                <li>Use the platform lawfully and respectfully.</li>
                <li>Avoid uploading false, misleading, or inappropriate content.</li>
                <li>Do not disrupt others with fraudulent listings or abusive language.</li>
              </ul>

              <h5>2. Ticket Listings & Sales</h5>
              <ul>
                <li>Users can list tickets through the "List Ticket" section.</li>
                <li>TicketTrade charges a small service fee upon sale (clearly stated upfront).</li>
                <li>Uploaded info must be accurate. You can edit/delete listings in "My Tickets".</li>
              </ul>

              <h5>3. Payments & Refunds</h5>
              <ul>
                <li>We accept Credit/Debit Cards, UPI, and Net Banking.</li>
                <li>No direct refunds. You may resell tickets to recover costs.</li>
                <li>Issues? Contact: <a href="mailto:support@tickettrade.com">support@tickettrade.com</a></li>
              </ul>

              <h5>4. Account & Support</h5>
              <ul>
                <li>Keep your account info accurate.</li>
                <li>Login issues? Check credentials or reach out to support.</li>
                <li>Tickets are sent via email and shown in "My Tickets".</li>
              </ul>

              <h5>5. Privacy & Conduct</h5>
              <ul>
                <li>Respect user privacy and platform integrity.</li>
                <li>Misuse, harassment, or suspicious activity can lead to suspension.</li>
              </ul>

              <h5>6. Changes to Terms</h5>
              <p>
                We may update these terms anytime. Continued use of TicketTrade means you accept the latest version.
              </p>

              <h5>7. Need Help?</h5>
              <p>
                We’re here for you:
                <br />
                Chat with our bot anytime.
                <br />
                Contact: <a href="mailto:support@tickettrade.com">support@tickettrade.com</a> or call: +1 234 567 890
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Us Form */}
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="card-title text-center mb-4">Contact Us</h2>
            <form ref={form} onSubmit={sendEmail}>
              <div className="mb-3">
                <input
                  type="text"
                  name="user_name"
                  placeholder="Your Name"
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  name="user_email"
                  placeholder="Your Email"
                  required
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  required
                  rows="5"
                  className="form-control"
                />
              </div>
              <button
                type="submit"
                className="btn text-white w-100"
                style={{ backgroundColor: "#f97316" }}
              >
                Send Message
              </button>
              {success && (
                <div className="alert alert-success mt-3 p-2 text-center">
                  Message sent successfully!
                </div>
              )}
              {error && (
                <div className="alert alert-danger mt-3 p-2 text-center">
                  Failed to send message. Try again later.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Chatbot outside the main layout */}
      <div className="mt-4">
        <Chatbot />
      </div>
    </div>
  );
};

export default ContactUs;
