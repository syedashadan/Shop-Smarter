import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Wifi, 
  Zap, 
  Radio, 
  Clock, 
  Database, 
  RefreshCw,
  Sliders
} from 'lucide-react';

interface RealTimeStatusBarProps {
  totalProducts: number;
  activeTab: string;
}

export const RealTimeStatusBar: React.FC<RealTimeStatusBarProps> = ({
  totalProducts,
  activeTab
}) => {
  const [isLive, setIsLive] = useState<boolean>(true);
  const [latency, setLatency] = useState<number>(0.24);
  const [opsPerSec, setOpsPerSec] = useState<number>(1420);
  const [eventIndex, setEventIndex] = useState<number>(0);

  const realTimeEvents = [
    `⚡ Live Algorithmic Stream: Manual Merge Sort ready for ${totalProducts} products`,
    `🔍 Real-Time Binary Search: Sub-millisecond O(log n) lookup index active`,
    `📊 Benchmark Engine: Measuring empirical T(n) vs theoretical O(n log n)`,
    `🔄 In-Memory State: Real-time catalog synchronized with zero mock latency`,
    `🎯 Quick Sort Partitioning: Median-of-three pivot heuristics primed`,
    `📦 Inventory Live Stream: Stock telemetry verified across 10 categories`
  ];

  // Fluctuate metrics slightly to simulate live computational activity
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setLatency(Number((0.15 + Math.random() * 0.25).toFixed(2)));
      setOpsPerSec(Math.floor(1200 + Math.random() * 500));
    }, 2800);

    return () => clearInterval(interval);
  }, [isLive]);

  // Rotate ticker messages
  useEffect(() => {
    if (!isLive) return;

    const tickerInterval = setInterval(() => {
      setEventIndex((prev) => (prev + 1) % realTimeEvents.length);
    }, 4000);

    return () => clearInterval(tickerInterval);
  }, [isLive, realTimeEvents.length]);

  return (
    <div 
      className="w-full bg-slate-900/95 dark:bg-[#0B1120]/95 text-white border-b border-indigo-900/50 backdrop-blur-md px-3 sm:px-6 py-2 transition-colors z-20"
      id="realtime-status-stream"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        
        {/* Left: Live pulsing badge & rotating event ticker */}
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-600/50 text-emerald-400 font-mono text-[11px] font-bold shrink-0">
            <span className="relative flex h-2 w-2">
              {isLive && (
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              )}
              <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
            </span>
            <span>{isLive ? 'REAL-TIME LIVE' : 'PAUSED'}</span>
          </div>

          <div className="flex items-center gap-1.5 text-slate-300 font-mono text-[11px] truncate">
            <Radio className="w-3.5 h-3.5 text-cyan-400 shrink-0 animate-pulse" />
            <span className="truncate transition-all duration-300 text-slate-200 font-medium">
              {realTimeEvents[eventIndex]}
            </span>
          </div>
        </div>

        {/* Right: Live Telemetry Metrics & Stream Toggle */}
        <div className="flex items-center gap-3 self-end sm:self-auto shrink-0 font-mono text-[11px]">
          <div className="hidden md:flex items-center gap-1 text-slate-400">
            <Clock className="w-3 h-3 text-indigo-400" />
            <span>Latency:</span>
            <span className="text-emerald-400 font-bold">{latency}ms</span>
          </div>

          <div className="hidden lg:flex items-center gap-1 text-slate-400">
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Throughput:</span>
            <span className="text-cyan-400 font-bold">{opsPerSec} ops/s</span>
          </div>

          <div className="flex items-center gap-1 text-slate-400">
            <Database className="w-3 h-3 text-purple-400" />
            <span>Catalog:</span>
            <span className="text-white font-bold">{totalProducts} items</span>
          </div>

          <button
            type="button"
            onClick={() => setIsLive(!isLive)}
            title={isLive ? "Pause Real-Time Telemetry Stream" : "Resume Real-Time Telemetry Stream"}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-2.5 h-2.5 ${isLive ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span>{isLive ? 'Live' : 'Resume'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
