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
      value: 'maicolcoralbravo@gmail.com',
      link: 'mailto:maicolcoralbravo@gmail.com',
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/Mai1203',
      link: 'https://github.com/Mai1203',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'www.linkedin.com/in/maicol-coral-3626a4251',
      link: 'https://www.linkedin.com/in/maicol-coral-3626a4251',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Available for remote work',
      link: null,
    },
  ];

  return (
    <div className="p-4 md:p-8 text-white max-w-4xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold text-[#00ff9f] mb-6 md:mb-8 text-center md:text-left">Get In Touch</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pb-8">
        <div className="order-2 md:order-1">
          <h2 className="text-base md:text-lg font-semibold mb-4 border-b border-white/10 pb-2">Contact Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4">
            {contacts.map((contact) => {
              const Icon = contact.icon;
              return (
                <div key={contact.label} className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-[#00ff9f]/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-[#00ff9f]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] uppercase tracking-wider text-white/40 mb-0.5">{contact.label}</div>
                    {contact.link ? (
                      <a
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00ff9f] hover:underline text-sm font-medium truncate block"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <div className="text-white/80 text-sm font-medium truncate block">{contact.value}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="order-1 md:order-2">
          <h2 className="text-base md:text-lg font-semibold mb-4 border-b border-white/10 pb-2">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-white/50 mb-1.5 ml-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-[#00ff9f]/50 focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/20 text-sm"
                  required
                  placeholder="Your Name"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-widest text-white/50 mb-1.5 ml-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-[#00ff9f]/50 focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/20 text-sm"
                  required
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-widest text-white/50 mb-1.5 ml-1">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={4}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg focus:border-[#00ff9f]/50 focus:bg-white/10 focus:outline-none transition-all placeholder:text-white/20 text-sm resize-none"
                required
                placeholder="How can I help you?"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#00ff9f] to-[#00ccff] hover:brightness-110 active:scale-[0.98] text-black font-bold rounded-lg transition-all shadow-[0_4px_15px_rgba(0,255,159,0.3)] uppercase tracking-widest text-xs"
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
