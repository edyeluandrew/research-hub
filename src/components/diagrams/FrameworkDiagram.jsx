import React from 'react';
import { Node, Edge, Dot, Arrow, Frame } from './parts';

/**
 * The Beta-Tech research framework as a pipeline: five phases left to right,
 * a dotted loop back from validation when the evidence says "not yet", and the
 * three things a ready finding can turn into.
 */

const PHASES = [
  { label: 'discover', x: 20, w: 62 },
  { label: 'investigate', x: 138, w: 76 },
  { label: 'synthesise', x: 270, w: 70 },
  { label: 'validate', x: 396, w: 62 },
  { label: 'ready', x: 514, w: 48 },
];

const ROW_Y = 40;
const ROW_H = 24;
const MID = ROW_Y + ROW_H / 2;

const FrameworkDiagram = () => (
  <Frame
    viewBox="0 0 600 220"
    caption="validation is a gate, not a formality — findings loop back until they hold"
  >
    {/* forward chain */}
    {PHASES.slice(0, 4).map((phase, index) => {
      const from = phase.x + phase.w;
      const to = PHASES[index + 1].x;
      return (
        <g key={phase.label}>
          <Edge d={`M${from} ${MID} H${to - 5}`} />
          <Arrow x={to} y={MID} />
        </g>
      );
    })}

    {/* validation sends work back to investigation */}
    <Edge d="M427 64 V92 Q427 104 415 104 H188 Q176 104 176 92 V69" dotted flow />
    <Arrow x={176} y={64} dir="up" />
    <text x={301} y={117} textAnchor="middle" className="dg-label dg-label--outline">
      not yet
    </text>

    {/* outputs bus */}
    <Edge d="M538 64 V140 Q538 152 526 152 H120" dotted />
    <Edge d="M120 152 V178" dotted />
    <Edge d="M300 152 V178" dotted />
    <Edge d="M430 152 V178" dotted />
    <Dot cx={300} cy={152} />
    <Dot cx={430} cy={152} />

    {PHASES.map((phase) => (
      <Node key={phase.label} x={phase.x} y={ROW_Y} w={phase.w} h={ROW_H} label={phase.label} />
    ))}

    <Node x={92} y={178} w={56} h={24} tone="outline" label="product" />
    <Node x={251} y={178} w={98} h={24} tone="outline" label="partner solution" />
    <Node x={392} y={178} w={76} h={24} tone="outline" label="publication" />
  </Frame>
);

export default FrameworkDiagram;
