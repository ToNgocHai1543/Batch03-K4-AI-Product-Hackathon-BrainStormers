import React, { useMemo, useState } from 'react';
import { GitBranch, Sparkles } from 'lucide-react';

/**
 * Real radial mind-map: center hub + Day01 branches (left) + Day02 branches (right)
 * with curved SVG connectors from bridge links.
 */
export default function KnowledgeMap({ bridgeLinks = [], fromDayCode, toDayCode }) {
  const [selectedId, setSelectedId] = useState(null);

  const links = Array.isArray(bridgeLinks) ? bridgeLinks : [];

  const layout = useMemo(() => {
    const width = 360;
    const height = Math.max(320, 80 + Math.max(links.length, 1) * 88);
    const cx = width / 2;
    const cy = height / 2;

    const leftX = 78;
    const rightX = width - 78;
    const n = Math.max(links.length, 1);

    const nodes = links.map((link, idx) => {
      const t = n === 1 ? 0.5 : idx / (n - 1);
      const y = 56 + t * (height - 112);
      return {
        link,
        src: { x: leftX, y, label: link.sourceConcept, ref: link.sourceRef, side: 'src' },
        tgt: { x: rightX, y, label: link.targetConcept, ref: link.targetRef, side: 'tgt' }
      };
    });

    return { width, height, cx, cy, nodes };
  }, [links]);

  const selected = links.find((l) => l.id === selectedId) || null;

  const curve = (x1, y1, x2, y2) => {
    const mx = (x1 + x2) / 2;
    return `M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`;
  };

  const truncate = (text, max = 22) => {
    if (!text) return '';
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2.5 animate-fade-in text-xs" style={{ backgroundColor: '#ffffff' }}>
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <div className="flex items-center gap-1.5 overflow-hidden">
          <GitBranch size={16} className="text-indigo-600 shrink-0" />
          <h3 className="text-xs font-bold text-slate-900 truncate">Sơ đồ tư duy</h3>
        </div>
        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200 shrink-0 whitespace-nowrap">
          {fromDayCode} ➔ {toDayCode}
        </span>
      </div>

      <p className="text-[11px] text-slate-600 leading-snug">
        Mind map cầu nối: nhánh trái = nền tảng <strong>{fromDayCode}</strong>, nhánh phải = ứng dụng <strong>{toDayCode}</strong>. Bấm node để xem chi tiết.
      </p>

      {links.length === 0 ? (
        <div className="p-6 text-center text-slate-400 italic text-[13px] border border-dashed border-slate-200 rounded-xl">
          Chưa có liên kết để vẽ sơ đồ tư duy.
        </div>
      ) : (
        <div className="rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white overflow-x-auto">
          <svg
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            width="100%"
            height={Math.min(layout.height, 420)}
            role="img"
            aria-label="Mind map cầu nối tri thức"
          >
            <defs>
              <marker id="arrow-mind" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L6,3 L0,6 Z" fill="#818cf8" />
              </marker>
              <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.12" />
              </filter>
            </defs>

            {/* soft guide rings */}
            <circle cx={layout.cx} cy={layout.cy} r={52} fill="none" stroke="#e2e8f0" strokeDasharray="4 4" />
            <circle cx={layout.cx} cy={layout.cy} r={90} fill="none" stroke="#f1f5f9" strokeDasharray="3 5" />

            {/* edges: left -> center -> right */}
            {layout.nodes.map(({ link, src, tgt }) => {
              const active = selectedId === link.id;
              const stroke = active ? '#0f2b5c' : '#a5b4fc';
              const width = active ? 2.4 : 1.5;
              return (
                <g key={`edge-${link.id}`}>
                  <path
                    d={curve(src.x + 52, src.y, layout.cx - 46, layout.cy)}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={width}
                    opacity={active ? 1 : 0.75}
                  />
                  <path
                    d={curve(layout.cx + 46, layout.cy, tgt.x - 52, tgt.y)}
                    fill="none"
                    stroke={active ? '#059669' : '#6ee7b7'}
                    strokeWidth={width}
                    opacity={active ? 1 : 0.8}
                    markerEnd="url(#arrow-mind)"
                  />
                </g>
              );
            })}

            {/* left nodes (Day01) */}
            {layout.nodes.map(({ link, src }) => {
              const active = selectedId === link.id;
              return (
                <g
                  key={`src-${link.id}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedId(link.id)}
                >
                  <rect
                    x={src.x - 56}
                    y={src.y - 26}
                    width={112}
                    height={52}
                    rx={12}
                    fill={active ? '#e0e7ff' : '#ffffff'}
                    stroke={active ? '#0f2b5c' : '#c7d2fe'}
                    strokeWidth={active ? 2 : 1.2}
                    filter="url(#softShadow)"
                  />
                  <text
                    x={src.x}
                    y={src.y - 4}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#0f172a"
                  >
                    {truncate(src.label, 18)}
                  </text>
                  <text
                    x={src.x}
                    y={src.y + 12}
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="600"
                    fill="#4338ca"
                  >
                    {truncate(src.ref, 20)}
                  </text>
                </g>
              );
            })}

            {/* right nodes (Day02) */}
            {layout.nodes.map(({ link, tgt }) => {
              const active = selectedId === link.id;
              return (
                <g
                  key={`tgt-${link.id}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => setSelectedId(link.id)}
                >
                  <rect
                    x={tgt.x - 56}
                    y={tgt.y - 26}
                    width={112}
                    height={52}
                    rx={12}
                    fill={active ? '#d1fae5' : '#ffffff'}
                    stroke={active ? '#059669' : '#a7f3d0'}
                    strokeWidth={active ? 2 : 1.2}
                    filter="url(#softShadow)"
                  />
                  <text
                    x={tgt.x}
                    y={tgt.y - 4}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="700"
                    fill="#0f172a"
                  >
                    {truncate(tgt.label, 18)}
                  </text>
                  <text
                    x={tgt.x}
                    y={tgt.y + 12}
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="600"
                    fill="#047857"
                  >
                    {truncate(tgt.ref, 20)}
                  </text>
                </g>
              );
            })}

            {/* center hub */}
            <g>
              <circle
                cx={layout.cx}
                cy={layout.cy}
                r={40}
                fill="#0f2b5c"
                filter="url(#softShadow)"
              />
              <circle
                cx={layout.cx}
                cy={layout.cy}
                r={40}
                fill="none"
                stroke="#818cf8"
                strokeWidth="2"
                opacity="0.5"
              />
              <text
                x={layout.cx}
                y={layout.cy - 6}
                textAnchor="middle"
                fontSize="10"
                fontWeight="800"
                fill="#ffffff"
              >
                CẦU NỐI
              </text>
              <text
                x={layout.cx}
                y={layout.cy + 10}
                textAnchor="middle"
                fontSize="9"
                fontWeight="600"
                fill="#c7d2fe"
              >
                {fromDayCode}→{toDayCode}
              </text>
            </g>

            {/* side labels */}
            <text x={20} y={22} fontSize="9" fontWeight="800" fill="#4338ca">{fromDayCode}</text>
            <text x={layout.width - 20} y={22} textAnchor="end" fontSize="9" fontWeight="800" fill="#047857">{toDayCode}</text>
          </svg>
        </div>
      )}

      {selected && (
        <div className="p-2.5 rounded-lg bg-indigo-50/80 border border-indigo-200 animate-fade-in space-y-1">
          <div className="flex items-center gap-1 text-indigo-900 text-xs font-bold">
            <Sparkles size={13} className="text-amber-500 shrink-0" />
            <span>{selected.sourceConcept} → {selected.targetConcept}</span>
          </div>
          <p className="text-xs text-slate-700 font-medium leading-relaxed">
            {selected.explanation}
          </p>
          <div className="flex flex-wrap gap-1 pt-0.5">
            <span className="px-1.5 py-0.5 rounded bg-indigo-100 text-indigo-800 text-[10px] font-bold">
              {selected.sourceRef}
            </span>
            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              {selected.targetRef}
            </span>
          </div>
        </div>
      )}

      {!selected && links.length > 0 && (
        <p className="text-[11px] text-slate-400 italic text-center">Chọn một nhánh trên mind map để xem giải thích.</p>
      )}
    </div>
  );
}
