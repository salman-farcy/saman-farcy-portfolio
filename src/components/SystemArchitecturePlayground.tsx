import React, { useState, useEffect } from "react";
import { Terminal, Play, Cpu, ShieldAlert, Database, HelpCircle, Activity, Server, Radio, Sparkles, CheckCircle2 } from "lucide-react";
import { ThemePreset } from "../types";

interface SystemArchitecturePlaygroundProps {
  activeTheme: ThemePreset;
}

type Scenario = "cache-hit" | "db-query" | "ddos-spike" | "idle";

export default function SystemArchitecturePlayground({ activeTheme }: SystemArchitecturePlaygroundProps) {
  const [scenario, setScenario] = useState<Scenario>("idle");
  const [rateLimiterOn, setRateLimiterOn] = useState(true);
  const [replicaCount, setReplicaCount] = useState(3);
  const [redisEnabled, setRedisEnabled] = useState(true);
  const [statusText, setStatusText] = useState("System status: Nominal. Waiting for transaction simulation...");
  const [latency, setLatency] = useState(0);
  const [throughput, setThroughput] = useState(0);
  const [activeSockets, setActiveSockets] = useState(1200);
  const [progress, setProgress] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Simulation parameters depending on scenario
  useEffect(() => {
    if (!isSimulating) return;

    let timer: NodeJS.Timeout;
    setProgress(0);

    const stepDuration = 40; // total duration ~ 2.5s
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSimulating(false);
          return 100;
        }
        return prev + 2.5;
      });
    }, stepDuration);

    if (scenario === "cache-hit") {
      setLatency(6);
      setThroughput(185000);
      setActiveSockets(15420);
      setStatusText("Inbound Request -> Routed via CDN -> Cache HIT. Returning static response immediately.");
    } else if (scenario === "db-query") {
      setLatency(redisEnabled ? 35 : 220);
      setThroughput(redisEnabled ? 45000 : 8200);
      setActiveSockets(4800);
      setStatusText(
        redisEnabled 
          ? "CDN Miss -> Gateway -> Redis Cache HIT. Returned fast relational query." 
          : "CDN Miss -> Gateway -> Cache Bypass -> Disk read on database shard replica. Latency elevated."
      );
    } else if (scenario === "ddos-spike") {
      if (rateLimiterOn) {
        setLatency(12);
        setThroughput(320000);
        setActiveSockets(85000);
        setStatusText("CRITICAL: Massive traffic surge detected! API Gateway rate limit rule active. Blocked 92% of redundant malicious packets (HTTP 429). Server protected.");
      } else {
        setLatency(1450);
        setThroughput(14000);
        setActiveSockets(120000);
        setStatusText("WARNING: No rate limiting! Microservice pods CPU pinned at 98%. Database threads exhausted. Server experiencing high response queuing delay.");
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [scenario, isSimulating, redisEnabled, rateLimiterOn]);

  const triggerSimulation = (type: Scenario) => {
    if (isSimulating) return;
    setScenario(type);
    setIsSimulating(true);
  };

  return (
    <section id="architecture-sandbox" className="py-24 relative overflow-hidden px-4 sm:px-6 lg:px-8 border-t border-zinc-800/50">
      {/* Absolute background accent lights */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-[160px] pointer-events-none opacity-20" style={{ backgroundColor: activeTheme.primary }} />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full blur-[180px] pointer-events-none opacity-15" style={{ backgroundColor: activeTheme.accent }} />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono mb-4 uppercase tracking-wider backdrop-blur-md"
               style={{ borderColor: `${activeTheme.primary}30`, color: activeTheme.primary, backgroundColor: `${activeTheme.primary}08` }}>
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Interactive Playground
          </div>
          <h2 className="text-4xl sm:text-5xl font-display font-black tracking-tight text-white mb-4 uppercase">
            Distributed Systems <br/>
            <span className="bg-gradient-to-r bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${activeTheme.primary}, ${activeTheme.accent})` }}>
              Architecture Sandbox
            </span>
          </h2>
          <p className="text-zinc-400 font-sans text-sm sm:text-base leading-relaxed">
            As a 10-year veteran systems engineer, I build for enterprise-level load. Interact with my high-availability distributed architecture simulation below to test performance thresholds and mitigation strategies in real-time.
          </p>
        </div>

        {/* Bento Grid Sandbox Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Controls & Configuration Panel - 5 cols */}
          <div className={`lg:col-span-4 rounded-3xl border ${activeTheme.glassBorder} ${activeTheme.glassBg} p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group`}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl border" style={{ borderColor: `${activeTheme.primary}25`, backgroundColor: `${activeTheme.primary}10` }}>
                  <Cpu className="w-5 h-5 text-white" style={{ color: activeTheme.primary }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-lg">System Controller</h3>
                  <p className="text-xs font-mono text-zinc-500 uppercase tracking-wider">// Control Node Inputs</p>
                </div>
              </div>

              {/* Toggle controls */}
              <div className="space-y-6">
                
                {/* Redis cache toggle */}
                <div className="p-4 rounded-2xl bg-zinc-950/40 border border-zinc-800/60 hover:border-zinc-700/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-display font-semibold text-zinc-200">Distributed Cache (Redis)</span>
                    <button 
                      onClick={() => setRedisEnabled(!redisEnabled)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${redisEnabled ? 'bg-emerald-500' : 'bg-zinc-700'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${redisEnabled ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500">Enable 2-tier caching layer to prevent hot-path read operations hitting disk partitions directly.</p>
                </div>

                {/* API Gateway Rate Limiter rule */}
                <div className="p-4 rounded-2xl bg-zinc-950/40 border border-zinc-800/60 hover:border-zinc-700/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-display font-semibold text-zinc-200">Gateway DDoS Rate Limiting</span>
                    <button 
                      onClick={() => setRateLimiterOn(!rateLimiterOn)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${rateLimiterOn ? 'bg-emerald-500' : 'bg-zinc-700'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${rateLimiterOn ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500">Inject security firewall policy to throttle abusive clients above 1,000 requests/minute per IP.</p>
                </div>

                {/* Kubernetes replica slider */}
                <div className="p-4 rounded-2xl bg-zinc-950/40 border border-zinc-800/60 hover:border-zinc-700/50 transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-display font-semibold text-zinc-200 font-mono text-zinc-300">App Pod Cluster: {replicaCount} pods</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="8" 
                    value={replicaCount} 
                    onChange={(e) => setReplicaCount(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg appearance-none cursor-pointer bg-zinc-800"
                    style={{ accentColor: activeTheme.primary }}
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-500 mt-1">
                    <span>1 instance (Single)</span>
                    <span>8 instances (Sharded Auto-scaling)</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Simulated scenarios selector */}
            <div className="pt-6 border-t border-zinc-800/50 mt-6">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">// Inject Traffic Scenario</h4>
              <div className="grid grid-cols-1 gap-2.5">
                <button
                  disabled={isSimulating}
                  onClick={() => triggerSimulation("cache-hit")}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-display font-semibold transition-all duration-300 flex items-center justify-between ${
                    scenario === "cache-hit" && isSimulating 
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400" 
                      : "border-zinc-800 bg-zinc-950/20 hover:border-zinc-700/40 hover:bg-zinc-900/30 text-zinc-300"
                  }`}
                >
                  <span>1. Edge CDN / Static Cache Hit</span>
                  <span className="font-mono text-[10px] text-zinc-500">Read Heavy</span>
                </button>
                <button
                  disabled={isSimulating}
                  onClick={() => triggerSimulation("db-query")}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-display font-semibold transition-all duration-300 flex items-center justify-between ${
                    scenario === "db-query" && isSimulating 
                      ? "border-cyan-500/40 bg-cyan-500/10 text-cyan-400" 
                      : "border-zinc-800 bg-zinc-950/20 hover:border-zinc-700/40 hover:bg-zinc-900/30 text-zinc-300"
                  }`}
                >
                  <span>2. Dynamic Transaction & DB Query</span>
                  <span className="font-mono text-[10px] text-zinc-500">Complex write</span>
                </button>
                <button
                  disabled={isSimulating}
                  onClick={() => triggerSimulation("ddos-spike")}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-display font-semibold transition-all duration-300 flex items-center justify-between ${
                    scenario === "ddos-spike" && isSimulating 
                      ? "border-rose-500/40 bg-rose-500/10 text-rose-400 animate-pulse" 
                      : "border-zinc-800 bg-zinc-950/20 hover:border-zinc-700/40 hover:bg-rose-950/10 hover:border-rose-900/30 text-zinc-300"
                  }`}
                >
                  <span>3. High-Concurrency Traffic Spike</span>
                  <span className="font-mono text-[10px] text-rose-400">Stress Test</span>
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Topology Visualizer - 8 cols */}
          <div className={`lg:col-span-8 rounded-3xl border ${activeTheme.glassBorder} ${activeTheme.glassBg} p-6 sm:p-8 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden group`}>
            
            {/* Real-time Dashboard HUD */}
            <div className="grid grid-cols-3 gap-4 mb-8 bg-zinc-950/65 border border-zinc-800/40 rounded-2xl p-4 font-mono">
              <div className="text-center sm:text-left">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Latency Response</span>
                <span className={`text-lg sm:text-2xl font-bold font-mono transition-colors duration-300 ${
                  latency > 500 ? 'text-rose-400' : latency > 100 ? 'text-amber-400' : 'text-emerald-400'
                }`}>
                  {isSimulating ? `${latency}ms` : "0ms"}
                </span>
              </div>
              <div className="border-l border-zinc-800/60 pl-4 text-center sm:text-left">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Est. Throughput</span>
                <span className="text-lg sm:text-2xl font-bold font-mono text-zinc-200">
                  {isSimulating ? `${(throughput / 1000).toFixed(1)}k QPS` : "0 QPS"}
                </span>
              </div>
              <div className="border-l border-zinc-800/60 pl-4 text-center sm:text-left">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Active Connections</span>
                <span className="text-lg sm:text-2xl font-bold font-mono text-zinc-200">
                  {isSimulating ? activeSockets.toLocaleString() : "Idle"}
                </span>
              </div>
            </div>

            {/* Topology Flowchart */}
            <div className="flex-1 min-h-[300px] flex flex-col justify-between py-6 relative">
              
              {/* Animated Progress Connection Wire Line */}
              {isSimulating && (
                <div className="absolute left-1/2 top-4 bottom-4 w-0.5 bg-zinc-800/50 -translate-x-1/2 pointer-events-none overflow-hidden z-0">
                  <div 
                    className="w-full h-[60px] blur-[1px] absolute top-0 transition-transform duration-75"
                    style={{ 
                      transform: `translateY(${progress * 3}px)`,
                      backgroundImage: `linear-gradient(to bottom, transparent, ${activeTheme.primary}, transparent)`
                    }} 
                  />
                </div>
              )}

              {/* Node 1: Client Layer */}
              <div className="flex justify-between items-center z-10">
                <div className="w-1/3 text-right pr-4 hidden sm:block">
                  <span className="text-[10px] font-mono text-zinc-500">// Client-Side SPA Context</span>
                </div>
                <div className="flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 px-5 py-3.5 rounded-2xl w-full sm:w-auto sm:min-w-[220px] transition-all duration-300">
                  <Radio className="w-4 h-4 text-emerald-400 animate-pulse shrink-0" />
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-white tracking-wide uppercase">Client App</h4>
                    <p className="text-[10px] font-mono text-zinc-500">React Client Cluster</p>
                  </div>
                </div>
                <div className="w-1/3 hidden sm:block pl-4">
                  {isSimulating && <span className="text-[10px] text-emerald-400 font-mono">Inbound API Call</span>}
                </div>
              </div>

              {/* Node 2: CDN / API Gateway Gateway Layer */}
              <div className="flex justify-between items-center z-10">
                <div className="w-1/3 text-right pr-4 hidden sm:block">
                  <span className="text-[10px] font-mono text-zinc-500">// Geodistributed Edge CDN</span>
                </div>
                <div className={`flex items-center gap-3 border px-5 py-3.5 rounded-2xl w-full sm:w-auto sm:min-w-[220px] transition-all duration-300 ${
                  isSimulating && scenario === "ddos-spike" && rateLimiterOn
                    ? "border-rose-500/50 bg-rose-950/20 text-rose-300"
                    : "bg-zinc-900/90 border-zinc-800 text-zinc-300"
                }`}>
                  <Server className="w-4 h-4 text-purple-400 shrink-0" />
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-white tracking-wide uppercase">Edge CDN & Gateway</h4>
                    <p className="text-[10px] font-mono text-zinc-500">Cloudflare Edge Nodes</p>
                  </div>
                </div>
                <div className="w-1/3 hidden sm:block pl-4">
                  {isSimulating && scenario === "cache-hit" && (
                    <span className="text-[10px] text-emerald-400 font-mono animate-bounce">Cache Hit (Return)</span>
                  )}
                  {isSimulating && scenario === "ddos-spike" && rateLimiterOn && (
                    <span className="text-[10px] text-rose-400 font-mono animate-pulse">429 Throttled</span>
                  )}
                </div>
              </div>

              {/* Node 3: Microservice App Server Layer */}
              <div className="flex justify-between items-center z-10">
                <div className="w-1/3 text-right pr-4 hidden sm:block">
                  <span className="text-[10px] font-mono text-zinc-500">// Node Cluster: {replicaCount} Pods</span>
                </div>
                <div className={`flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 px-5 py-3.5 rounded-2xl w-full sm:w-auto sm:min-w-[220px] transition-all duration-300 ${
                  isSimulating && scenario === "ddos-spike" && !rateLimiterOn
                    ? "border-rose-500/50 bg-rose-950/20 animate-bounce"
                    : "border-zinc-800"
                }`}>
                  <Cpu className="w-4 h-4 text-indigo-400 shrink-0" />
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-white tracking-wide uppercase">Microservice Nodes</h4>
                    <p className="text-[10px] font-mono text-zinc-500">Kubernetes Auto-scaled Pods</p>
                  </div>
                </div>
                <div className="w-1/3 hidden sm:block pl-4">
                  {isSimulating && scenario === "db-query" && redisEnabled && (
                    <span className="text-[10px] text-emerald-400 font-mono">Redis Cache Hit</span>
                  )}
                  {isSimulating && scenario === "db-query" && !redisEnabled && (
                    <span className="text-[10px] text-amber-400 font-mono">Redis Cache Miss</span>
                  )}
                </div>
              </div>

              {/* Node 4: Cache & Database Cluster Layer */}
              <div className="flex justify-between items-center z-10">
                <div className="w-1/3 text-right pr-4 hidden sm:block">
                  <span className="text-[10px] font-mono text-zinc-500">// Distributed Relational DB</span>
                </div>
                <div className={`flex items-center gap-3 bg-zinc-900/90 border border-zinc-800 px-5 py-3.5 rounded-2xl w-full sm:w-auto sm:min-w-[220px] transition-all duration-300 ${
                  isSimulating && scenario === "db-query" && !redisEnabled
                    ? "border-amber-500/40 text-amber-300"
                    : "border-zinc-800"
                }`}>
                  <Database className="w-4 h-4 text-cyan-400 shrink-0" />
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-white tracking-wide uppercase">PostgreSQL & Redis</h4>
                    <p className="text-[10px] font-mono text-zinc-500">Master-Replica Partitioned</p>
                  </div>
                </div>
                <div className="w-1/3 hidden sm:block pl-4">
                  {isSimulating && scenario === "db-query" && !redisEnabled && (
                    <span className="text-[10px] text-rose-400 font-mono animate-pulse">Heavy Disk Read</span>
                  )}
                </div>
              </div>

            </div>

            {/* Terminal Live Telemetry Output Console */}
            <div className="mt-6 bg-black/80 rounded-2xl p-4.5 border border-zinc-800/80 font-mono text-xs text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 p-2 text-zinc-700 select-none text-[10px] tracking-wider uppercase font-bold">
                Telemetry Log
              </div>
              <div className="flex items-center gap-2 mb-2 text-zinc-500 font-bold border-b border-zinc-900 pb-1.5 uppercase tracking-widest text-[10px]">
                <Terminal className="w-3.5 h-3.5" />
                <span>Console stdout</span>
              </div>
              <div className="space-y-1 text-zinc-300 font-mono text-[11px] leading-relaxed">
                <p className="text-zinc-500">[{new Date().toISOString().slice(11, 19)}] SYS_LOG: Node environment launched with cluster pods = {replicaCount}.</p>
                <p className={isSimulating ? "text-cyan-400" : "text-zinc-400"}>
                  [{new Date().toISOString().slice(11, 19)}] {statusText}
                </p>
                {isSimulating && (
                  <p className="text-emerald-400 animate-pulse">
                    &gt; latency={latency}ms throughput={throughput}qps caching={redisEnabled ? "ACTIVE" : "BYPASSED"}
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
