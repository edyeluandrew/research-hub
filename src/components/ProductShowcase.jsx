import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import { getProjectsData, PROJECT_LOGOS, defaultProjectsData } from '../data/dataStore';
import Reveal from './Reveal';

const STATUS_TONE = {
  Launched: 'pd-status--launched',
  'In Development': 'pd-status--dev',
  'In Testing': 'pd-status--dev',
};

const rank = (project) => (project.status === 'Launched' ? 0 : 1);

const initialProducts = [...defaultProjectsData]
  .sort((a, b) => rank(a) - rank(b))
  .slice(0, 4);

const ProductShowcase = () => {
  const [products, setProducts] = useState(initialProducts);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getProjectsData();
        const list = Array.isArray(data) ? data : [];
        setProducts([...list].sort((a, b) => rank(a) - rank(b)).slice(0, 4));
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      }
    };

    load();
    const onUpdate = () => load();
    window.addEventListener('projectsDataUpdated', onUpdate);
    return () => window.removeEventListener('projectsDataUpdated', onUpdate);
  }, []);

  if (products.length === 0) return null;

  return (
    <section id="work" className="section section--muted">
      <div className="shell">
        <Reveal className="sec-head sec-head--split">
          <div>
            <p className="eyebrow">Our products</p>
            <h2 className="display-2" style={{ marginTop: '1rem' }}>
              Built, shipped, and running.
            </h2>
          </div>
          <div>
            <p className="lead">
              Platforms in AI, blockchain, IoT, and web engineering, researched and delivered by our
              team in Kabale.
            </p>
            <Link to="/projects" className="btn-text" style={{ marginTop: '1.25rem' }}>
              View all work
              <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>

        <div className="pd-grid">
          {products.map((product, index) => {
            const logo = product.image || PROJECT_LOGOS[product.title?.toLowerCase().trim()];
            const tone = STATUS_TONE[product.status] || '';

            return (
              <Reveal key={product.id || product.title} delay={index * 70}>
                <article className="pd-card">
                  <div className="pd-thumb">
                    {logo ? (
                      <img src={logo} alt={`${product.title} logo`} loading="lazy" />
                    ) : (
                      <span className="pd-thumb-fallback">
                        <Layers size={28} strokeWidth={1.5} />
                      </span>
                    )}
                    {product.status && (
                      <span className={`status-pill pd-status ${tone}`}>{product.status}</span>
                    )}
                  </div>

                  <div className="pd-body">
                    {product.category && <p className="pd-category">{product.category}</p>}
                    <h3 className="pd-title">{product.title}</h3>
                    {product.description && <p className="pd-desc">{product.description}</p>}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
