import { useState, useEffect } from 'react';
import { getSiteContent } from '../data/dataStore';

const useSiteContent = () => {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const data = await getSiteContent();
        if (active) setContent(data);
      } catch (error) {
        console.error('Error loading site content:', error);
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    const handleUpdate = () => load();
    window.addEventListener('siteContentUpdated', handleUpdate);
    return () => {
      active = false;
      window.removeEventListener('siteContentUpdated', handleUpdate);
    };
  }, []);

  return { content, loading };
};

export default useSiteContent;
