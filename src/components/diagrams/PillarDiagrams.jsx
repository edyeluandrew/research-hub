import React from 'react';
import { Node, Edge, Dot, Frame } from './parts';

/**
 * Stage illustrations for the four pillars of the Beta-Tech Labs cycle.
 * Each one is a node/edge diagram drawn in the same visual language:
 * filled chips for outputs, outlined chips for internal steps,
 * solid lines for the main path and dotted lines for feedback.
 */

export const ResearchDiagram = () => (
  <Frame caption="every initiative starts as a question, not a build">
    <Edge d="M60 45 V92 Q60 100 68 100 H132" />
    <Edge d="M60 155 V108 Q60 100 68 100 H132" />
    <Edge d="M278 45 V92 Q278 100 270 100 H208" />
    <Edge d="M278 155 V108 Q278 100 270 100 H208" />
    <Dot cx={60} cy={52} />
    <Dot cx={60} cy={148} />
    <Dot cx={278} cy={52} />
    <Dot cx={278} cy={148} />
    <Node x={28} y={27} w={64} label="community" />
    <Node x={28} y={155} w={64} label="literature" />
    <Node x={244} y={27} w={68} label="field data" />
    <Node x={244} y={155} w={68} label="experiments" />
    <Node x={132} y={91} w={76} rx={9} tone="outline" label="research" />
  </Frame>
);

export const ProductDiagram = () => (
  <Frame caption="an insight only becomes a product after it survives testing">
    <Edge d="M170 36 V66" />
    <Edge d="M140 84 V112" />
    <Edge d="M194 112 V84" />
    <Edge d="M118 121 H70 Q58 121 58 133 V162" />
    <Edge d="M89 171 H188 Q194 171 194 165 V130" />
    <Edge d="M134 75 H24 Q16 75 16 83 V171 H27" dotted />
    <Edge d="M206 75 H274 Q282 75 282 83 V162" dotted />
    <Dot cx={16} cy={120} />
    <Dot cx={282} cy={120} />
    <Node x={144} y={18} w={52} label="insight" />
    <Node x={134} y={66} w={72} label="concept" />
    <Node x={118} y={112} w={44} tone="outline" label="design" />
    <Node x={169} y={112} w={50} tone="outline" label="validate" />
    <Node x={27} y={162} w={62} label="prototype" />
    <Node x={256} y={162} w={52} label="product" />
  </Frame>
);

export const EngineeringDiagram = () => (
  <Frame caption="partner systems ship in stages, then iterate on real usage">
    <Edge d="M71 100 H92 Q100 100 100 92 V60 Q100 52 108 52 H149" dotted />
    <Edge d="M71 100 H149" />
    <Edge d="M71 100 H92 Q100 100 100 108 V140 Q100 148 108 148 H149" />
    <Edge d="M191 52 H232 Q240 52 240 60 V92 Q240 100 248 100 H261" dotted />
    <Edge d="M191 100 H261" />
    <Edge d="M191 148 H232 Q240 148 240 140 V108 Q240 100 248 100 H261" />
    <Edge d="M290 82 V26 Q290 18 282 18 H58 Q50 18 50 26 V91" dotted flow />
    <Dot cx={100} cy={100} />
    <Dot cx={240} cy={100} />
    <Node x={29} y={91} w={42} label="brief" />
    <Node x={149} y={43} w={42} tone="outline" label="scope" />
    <Node x={149} y={91} w={42} tone="outline" label="build" />
    <Node x={149} y={139} w={42} tone="outline" label="pilot" />
    <Node x={261} y={91} w={58} label="handover" />
  </Frame>
);

export const TalentDiagram = () => (
  <Frame caption="the people we train become the people who run the next cycle">
    <Edge d="M76 92 H100 Q108 92 108 84 V66 Q108 58 116 58 H136" />
    <Edge d="M76 92 H116 Q124 92 124 102 V110 H140" />
    <Edge d="M200 58 H236 Q244 58 244 66 V84 Q244 92 252 92 H265" />
    <Edge d="M196 110 H244 Q252 110 252 102 V92 H265" />
    <Edge d="M292 101 V160 Q292 172 280 172 H194" dotted flow />
    <Edge d="M142 172 H48 Q36 172 36 160 V101" dotted flow />
    <Dot cx={244} cy={92} />
    <Dot cx={116} cy={92} />
    <Node x={28} y={83} w={48} label="student" />
    <Node x={136} y={49} w={64} tone="outline" label="mentorship" />
    <Node x={140} y={101} w={56} tone="outline" label="real work" />
    <Node x={265} y={83} w={54} label="engineer" />
    <Node x={142} y={163} w={52} rx={9} tone="outline" label="research" />
  </Frame>
);

export const PILLAR_DIAGRAMS = {
  research: ResearchDiagram,
  product: ProductDiagram,
  engineering: EngineeringDiagram,
  talent: TalentDiagram,
};
