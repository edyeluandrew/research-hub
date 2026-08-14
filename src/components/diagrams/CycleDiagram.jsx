import React from 'react';
import { Arrow } from './parts';

/**
 * The master loop: research feeds products and partner solutions, those feed
 * talent, and the people we train raise the next set of research questions.
 * Nodes are clickable so the diagram drives the detail panel underneath it.
 */

const NODE_W = 196;
const NODE_H = 52;
const NODE_Y = 60;
const X = [24, 276, 528, 780];
const MID_Y = NODE_Y + NODE_H / 2;

const CycleDiagram = ({ stages, activeId, onSelect }) => (
  <>
    <svg
      viewBox="0 0 1000 300"
      className="cyc-svg"
      role="img"
      aria-label="The Beta-Tech Labs iterative cycle, from research and innovation through to talent development and back again"
    >
      {/* forward connectors */}
      {X.slice(0, 3).map((x, index) => {
        const from = x + NODE_W;
        const to = X[index + 1];
        return (
          <g key={`edge-${index}`}>
            <path d={`M${from} ${MID_Y} H${to - 6}`} className="dg-edge" />
            <Arrow x={to} y={MID_Y} size={5.5} />
          </g>
        );
      })}

      {/* return loop, split so the label sits inside the line */}
      <path d="M878 112 V204 Q878 220 862 220 H590" className="dg-edge dg-edge--dotted dg-flow" />
      <path
        d="M410 220 H138 Q122 220 122 204 V118"
        className="dg-edge dg-edge--dotted dg-flow"
      />
      <Arrow x={122} y={112} dir="up" size={5.5} />

      <rect x={410} y={207} width={180} height={26} rx={13} className="dg-node dg-node--outline" />
      <text x={500} y={220} textAnchor="middle" dominantBaseline="central" className="cyc-return-label">
        new research questions
      </text>

      {/* stages */}
      {stages.map((stage, index) => (
        <g
          key={stage.id}
          className={`cyc-stage${activeId === stage.id ? ' cyc-stage--active' : ''}`}
          onClick={() => onSelect?.(stage.id)}
          role="button"
          tabIndex={0}
          aria-pressed={activeId === stage.id}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              onSelect?.(stage.id);
            }
          }}
        >
          <rect x={X[index]} y={NODE_Y} width={NODE_W} height={NODE_H} rx={10} className="cyc-node" />
          <text x={X[index] + 18} y={NODE_Y + 19} className="cyc-index">
            {String(index + 1).padStart(2, '0')}
          </text>
          <text x={X[index] + 18} y={NODE_Y + 39} className="cyc-name">
            {stage.label}
          </text>
        </g>
      ))}
    </svg>

    {/* Compact stacked version for narrow screens */}
    <ol className="cyc-mobile">
      {stages.map((stage, index) => (
        <li key={stage.id}>
          <button
            type="button"
            className={`cyc-mobile-item${activeId === stage.id ? ' cyc-mobile-item--active' : ''}`}
            onClick={() => onSelect?.(stage.id)}
          >
            <span className="cyc-mobile-num">{String(index + 1).padStart(2, '0')}</span>
            <span>{stage.label}</span>
          </button>
        </li>
      ))}
      <li className="cyc-mobile-loop">new research questions</li>
    </ol>
  </>
);

export default CycleDiagram;
