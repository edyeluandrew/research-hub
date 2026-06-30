import { MessageCircle } from 'lucide-react';
import { CONTACT } from '../config/site';

const WhatsAppFloat = () => (
  <a
    href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Hi Beta Tech Labs! I would like to discuss a project.')}`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={28} />
  </a>
);

export default WhatsAppFloat;
