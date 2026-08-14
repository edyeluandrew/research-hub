import { MessageCircle } from 'lucide-react';
import { CONTACT } from '../config/site';

const WhatsAppFloat = () => (
  <a
    href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
      'Hi Beta-Tech Labs, I would like to discuss a project.'
    )}`}
    target="_blank"
    rel="noopener noreferrer"
    className="wa-float"
    aria-label="Chat on WhatsApp"
  >
    <MessageCircle size={24} strokeWidth={2} />
  </a>
);

export default WhatsAppFloat;
