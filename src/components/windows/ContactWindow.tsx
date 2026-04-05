import { Mail, Github, Linkedin, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export default function ContactWindow() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent! (Demo mode)');
    setFormData({ name: '', email: '', message: '' });
  };

  const contacts = [
    {
      icon: Mail,
      label: 'Email',
      value: 'stiven@example.com',
      link: 'mailto:stiven@example.com',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/stiven',
      link: 'https://github.com',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/stiven',
      link: 'https://linkedin.com',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Available for remote work',
      link: null,
    },
  ];

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold text-[#00ff9f] mb-6">Get In Touch</h1>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          <div className="space-y-4">
            {contacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <div key={contact.label} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#00ff9f]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#00ff9f]" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60">{contact.label}</div>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00ff9f] hover:underline"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <div className="text-white/80">{contact.value}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-white/60 mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded focus:border-[#00ff9f] focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded focus:border-[#00ff9f] focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-1">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded focus:border-[#00ff9f] focus:outline-none transition-colors resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#00ff9f] hover:bg-[#00cc7f] text-black font-medium rounded transition-colors"
            >
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
