import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/', { replace: true, state: { scrollTo: 'contact' } });
  }, [navigate]);

  return null;
};

export default ContactRedirect;
