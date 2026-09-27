import React, { useRef, useEffect, useState } from 'react';
import { Network, ZoomIn, ZoomOut, RefreshCw, Eye } from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  category: 'Site' | 'Activity' | 'Hazard' | 'Barrier' | 'SIF_Rule';
  color: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
}

interface GraphLink {
  source: string;
  target: string;
}

export const KnowledgeGraph3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  const nodesData: GraphNode[] = [
    { id: "site_duliajan", label: "Duliajan Rig-12", category: "Site", color: "#0A0B0D" },
    { id: "site_digboi", label: "Digboi Field Station", category: "Site", color: "#0A0B0D" },
    { id: "site_naharkatiya", label: "Naharkatiya Pad 4A", category: "Site", color: "#0A0B0D" },
    { id: "site_rajasthan", label: "Rajasthan Basin Rig-07", category: "Site", color: "#0A0B0D" },

    { id: "act_lifting", label: "Lifting Operations", category: "Activity", color: "#785A44" },
    { id: "act_confined", label: "Confined Space Entry", category: "Activity", color: "#785A44" },
    { id: "act_electrical", label: "Electrical Maintenance", category: "Activity", color: "#785A44" },
    { id: "act_drilling", label: "High Pressure Drilling", category: "Activity", color: "#785A44" },

    { id: "haz_suspended", label: "Suspended Load (>500kg)", category: "Hazard", color: "#8E1A29" },
    { id: "haz_h2s", label: "H2S Toxic Gas Pockets", category: "Hazard", color: "#8E1A29" },
    { id: "haz_voltage", label: "415V/3.3kV Live Power", category: "Hazard", color: "#8E1A29" },
    { id: "haz_pressure", label: "3500 PSI Circulating Line", category: "Hazard", color: "#8E1A29" },

    { id: "bar_barricade", label: "Exclusion Barricade", category: "Barrier", color: "#BA2E53" },
    { id: "bar_gastest", label: "Multi-Gas Tester", category: "Barrier", color: "#BA2E53" },
    { id: "bar_loto", label: "LOTO Lockout Padlock", category: "Barrier", color: "#BA2E53" },
    { id: "bar_whipcheck", label: "Safety Whip-Check", category: "Barrier", color: "#BA2E53" },

    { id: "rule_lift", label: "Safe Mechanical Lifting", category: "SIF_Rule", color: "#5B1527" },
    { id: "rule_confined", label: "Confined Space Standard", category: "SIF_Rule", color: "#5B1527" },
    { id: "rule_isolation", label: "Energy Isolation", category: "SIF_Rule", color: "#5B1527" },
    { id: "rule_lineoffire", label: "Line of Fire Rule", category: "SIF_Rule", color: "#5B1527" }
  ];

  const linksData: GraphLink[] = [
    { source: "site_duliajan", target: "act_lifting" },
    { source: "act_lifting", target: "haz_suspended" },
    { source: "haz_suspended", target: "bar_barricade" },
    { source: "bar_barricade", target: "rule_lift" },

    { source: "site_digboi", target: "act_confined" },
    { source: "act_confined", target: "haz_h2s" },
    { source: "haz_h2s", target: "bar_gastest" },
    { source: "bar_gastest", target: "rule_confined" },

    { source: "site_naharkatiya", target: "act_electrical" },
    { source: "act_electrical", target: "haz_voltage" },
    { source: "haz_voltage", target: "bar_loto" },
    { source: "bar_loto", target: "rule_isolation" },

    { source: "site_rajasthan", target: "act_drilling" },
    { source: "act_drilling", target: "haz_pressure" },
    { source: "haz_pressure", target: "bar_whipcheck" },
    { source: "bar_whipcheck", target: "rule_lineoffire" }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 450);

    // Initial node positioning
    const nodes = nodesData.map((node, i) => {
      const angle = (i / nodesData.length) * 2 * Math.PI;
      const radius = 140 + (i % 3) * 35;
      return {
        ...node,
        x: width / 2 + Math.cos(angle) * radius,
        y: height / 2 + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
      };
    });

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background grid
      ctx.strokeStyle = '#F0F0EA';
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Update node positions gently
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 40 || n.x > width - 40) n.vx *= -1;
        if (n.y < 40 || n.y > height - 40) n.vy *= -1;
      });

      // Draw links
      linksData.forEach((link) => {
        const sourceNode = nodes.find((n) => n.id === link.source);
        const targetNode = nodes.find((n) => n.id === link.target);
        if (sourceNode && targetNode) {
          ctx.beginPath();
          ctx.moveTo(sourceNode.x, sourceNode.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          ctx.strokeStyle = '#D8D8CF';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }
      });

      // Draw nodes
      nodes.forEach((node) => {
        const isSelected = selectedNode?.id === node.id;
        const matchesFilter = categoryFilter === 'All' || node.category === categoryFilter;
        const radius = isSelected ? 12 : (matchesFilter ? 9 : 6);

        // Glow ring
        if (isSelected || matchesFilter) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, radius + 4, 0, 2 * Math.PI);
          ctx.fillStyle = node.color + '22';
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = matchesFilter ? node.color : '#CCCCCC';
        ctx.fill();
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Node Label
        ctx.font = isSelected ? 'bold 11px Plus Jakarta Sans' : '10px Plus Jakarta Sans';
        ctx.fillStyle = matchesFilter ? '#0A0B0D' : '#888888';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, node.x, node.y + radius + 13);
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const hit = nodes.find((n) => {
        const dx = n.x - clickX;
        const dy = n.y - clickY;
        return Math.sqrt(dx * dx + dy * dy) < 18;
      });

      setSelectedNode(hit || null);
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [categoryFilter, selectedNode]);

  const categories = ['All', 'Site', 'Activity', 'Hazard', 'Barrier', 'SIF_Rule'];

  return (
    <div className="bg-white rounded-xl border border-classic-border shadow-3d-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 mb-4 border-b border-classic-border/80 gap-3">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-classic-wine px-2 py-0.5 rounded bg-classic-burgundy/10 border border-classic-burgundy/20">
            Across-Site Intelligence
          </span>
          <h3 className="text-base font-bold text-classic-black tracking-tight mt-1.5 flex items-center gap-2">
            Interactive Safety Knowledge Graph
          </h3>
          <p className="text-xs text-classic-warmgray mt-0.5">
            Connects Site &rarr; Activity &rarr; Stored Energy Hazard &rarr; Critical Barrier &rarr; IOGP SIF Rule.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-classic-burgundy text-white shadow-xs'
                  : 'bg-classic-cream text-classic-slate hover:bg-classic-border border border-classic-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas container */}
      <div className="relative rounded-lg overflow-hidden border border-classic-border bg-classic-ivory">
        <canvas ref={canvasRef} className="w-full cursor-crosshair" />

        {/* Selected Node Inspector Overlay */}
        {selectedNode && (
          <div className="absolute bottom-3 left-3 p-3.5 bg-classic-black/95 backdrop-blur text-white rounded-lg border border-classic-slate shadow-3d-md text-xs max-w-xs animate-in fade-in slide-in-from-bottom-2">
            <div className="flex justify-between items-start mb-1">
              <span className="text-[9px] uppercase font-mono font-bold px-1.5 py-0.2 rounded bg-classic-wine text-white">
                {selectedNode.category}
              </span>
              <button onClick={() => setSelectedNode(null)} className="text-white/60 hover:text-white text-xs">&times;</button>
            </div>
            <div className="font-bold text-sm text-white mt-1">{selectedNode.label}</div>
            <div className="text-[10px] text-classic-warmgray mt-1 leading-snug">
              Connected across 4 operational assets in Assam and Rajasthan. Linked to recurring line-of-fire precursor patterns.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
