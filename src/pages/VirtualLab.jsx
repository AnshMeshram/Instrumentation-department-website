import { useState, useMemo, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Activity, Cpu, GitBranch, Settings, Play, RefreshCw, Info } from "lucide-react";
import useDocumentMetadata from "../hooks/useDocumentMetadata";

// Discrete PID loop simulation function
function simulatePID(Kp, Ki, Kd, setpoint, plantType = "motor", injectDisturbance = false) {
  const dt = 0.05; // 50ms step size
  const steps = 100; // 5 seconds total simulation
  const data = [];

  let pv = plantType === "oven" ? 25 : 0; // Process variable (e.g. speed, temperature, height)
  let velocity = 0;
  let integral = 0;
  let prevError = setpoint - pv;

  for (let t = 0; t < steps; t++) {
    const timeSec = t * dt;
    const error = setpoint - pv;
    
    // PID terms
    integral += error * dt;
    // Anti-windup clamping for integral term
    integral = Math.max(-50, Math.min(50, integral));
    
    const derivative = (error - prevError) / dt;
    const controlOutput = Kp * error + Ki * integral + Kd * derivative;
    
    // Saturation limit (PWM Duty cycle: 0% to 100%)
    const pwmOutput = Math.max(0, Math.min(100, controlOutput));
    
    // Physics models
    if (plantType === "motor") {
      // Physical parameters of a DC Motor velocity model
      const inertia = 0.15;
      const damping = 0.6;
      const motorGain = 1.2;
      
      let torque = pwmOutput * motorGain;
      if (injectDisturbance && t >= 50) {
        torque -= 30; // Inject load torque disturbance
      }
      
      const acceleration = (torque - damping * velocity - pv) / inertia;
      velocity += acceleration * dt;
      pv += velocity * dt;
    } else if (plantType === "oven") {
      // Thermal oven model (slow 1st-order process with thermal loss)
      const inertia = 1.2;
      const ambientTemp = 25;
      
      let heatInput = pwmOutput * 0.9;
      if (injectDisturbance && t >= 50) {
        heatInput -= 25; // Inject sudden thermal loss
      }
      
      const heatLoss = (pv - ambientTemp) * 0.08;
      const rateOfChange = (heatInput - heatLoss) / inertia;
      pv += rateOfChange * dt;
    } else if (plantType === "levitation") {
      // Magnetic levitation height model (Unstable, 2nd-order with gravity and damping)
      const mass = 0.2;
      const gravity = 9.81;
      const damping = 0.4;
      
      let force = pwmOutput * 0.08;
      if (injectDisturbance && t >= 50) {
        force -= 1.5; // Inject downward load disturbance
      }
      
      const acceleration = (force * 15 - mass * gravity - damping * velocity);
      velocity += acceleration * dt;
      pv += velocity * dt;
    }
    
    // Safe clamp to avoid division by zero or infinite scaling in graph
    pv = Math.max(0, Math.min(200, pv));
    prevError = error;

    data.push({
      time: timeSec,
      setpoint: setpoint,
      pv: pv,
      pwm: pwmOutput,
    });
  }

  // Calculate performance metrics
  let maxVal = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i].pv > maxVal) {
      maxVal = data[i].pv;
    }
  }

  const overshoot = setpoint > 0 && maxVal > setpoint
    ? ((maxVal - setpoint) / setpoint) * 100
    : 0;

  // Find settling time (within 2% of setpoint)
  let settlingTime = -1;
  const finalVal = data[data.length - 1].pv;
  const threshold = setpoint * 0.02;
  
  for (let i = data.length - 1; i >= 0; i--) {
    if (Math.abs(data[i].pv - finalVal) > threshold) {
      settlingTime = data[Math.min(i + 1, data.length - 1)].time;
      break;
    }
  }
  if (settlingTime === -1) settlingTime = 0;

  // Find rise time (10% to 90% of setpoint)
  let t10 = -1;
  let t90 = -1;
  for (let i = 0; i < data.length; i++) {
    if (t10 === -1 && data[i].pv >= setpoint * 0.1) t10 = data[i].time;
    if (t90 === -1 && data[i].pv >= setpoint * 0.9) t90 = data[i].time;
  }
  const riseTime = t90 > t10 && t10 !== -1 ? t90 - t10 : 0;

  return {
    data,
    metrics: {
      overshoot: overshoot.toFixed(1),
      settlingTime: settlingTime.toFixed(2),
      riseTime: riseTime.toFixed(2),
      steadyStateError: Math.abs(setpoint - finalVal).toFixed(2),
    }
  };
}

export default function VirtualLab() {
  const [plantType, setPlantType] = useState("motor");
  const [injectDisturbance, setInjectDisturbance] = useState(false);
  const [Kp, setKp] = useState(3.0);
  const [Ki, setKi] = useState(1.5);
  const [Kd, setKd] = useState(0.2);
  const [setpoint, setSetpoint] = useState(60);

  // Animation states for live demo
  const [liveIndex, setLiveIndex] = useState(99);
  const [isAnimating, setIsAnimating] = useState(false);

  useDocumentMetadata({
    title: "Virtual Lab PID Simulator",
    description: "Experience dynamic closed-loop control system responses. Configure PID gains, select motor, thermal, or levitation plants, and inject external load disturbances live.",
  });

  const plantSubtitles = {
    motor: "Interactive PID feedback loop simulator representing a closed-loop velocity control system for a DC Motor.",
    oven: "Interactive PID feedback loop simulator representing a closed-loop thermal control system for an Industrial Oven.",
    levitation: "Interactive PID feedback loop simulator representing a closed-loop position control system for a Magnetic Levitation block.",
  };

  const plantUnits = {
    motor: "RPM",
    oven: "°C",
    levitation: "mm",
  };

  const plantQuantity = {
    motor: "Motor Velocity",
    oven: "Oven Temperature",
    levitation: "Object Height",
  };

  const setpointRanges = {
    motor: { min: 10, max: 100, step: 5 },
    oven: { min: 30, max: 150, step: 5 },
    levitation: { min: 10, max: 90, step: 5 },
  };

  const activeUnit = plantUnits[plantType];
  const activeQuantity = plantQuantity[plantType];
  const currentRange = setpointRanges[plantType];

  const { data, metrics } = useMemo(() => {
    return simulatePID(Kp, Ki, Kd, setpoint, plantType, injectDisturbance);
  }, [Kp, Ki, Kd, setpoint, plantType, injectDisturbance]);

  const handlePlantChange = (type) => {
    setPlantType(type);
    setIsAnimating(false);
    setLiveIndex(99);
    if (type === "motor") {
      setKp(3.0);
      setKi(1.5);
      setKd(0.2);
      setSetpoint(60);
    } else if (type === "oven") {
      setKp(5.0);
      setKi(0.5);
      setKd(1.2);
      setSetpoint(80);
    } else if (type === "levitation") {
      setKp(6.0);
      setKi(1.2);
      setKd(0.8);
      setSetpoint(50);
    }
  };

  // Handle live loop animation
  useEffect(() => {
    if (!isAnimating) return;
    
    const timer = setInterval(() => {
      setLiveIndex((prev) => {
        if (prev >= 99) {
          setIsAnimating(false);
          clearInterval(timer);
          return 99;
        }
        return prev + 1;
      });
    }, 40); // animate over 4 seconds

    return () => clearInterval(timer);
  }, [isAnimating]);

  // Scaled coordinates for SVG plotting
  const svgWidth = 500;
  const svgHeight = 220;

  const getCoordinates = useMemo(() => {
    // scale factors
    const xScale = svgWidth / 5.0; // time scale (0 to 5s)
    const yMax = plantType === "oven" ? 180.0 : (plantType === "levitation" ? 100.0 : 120.0);
    const yScale = svgHeight / yMax; // dynamic value scale

    const points = data.map((d) => ({
      x: d.time * xScale,
      y: svgHeight - d.pv * yScale,
      setY: svgHeight - d.setpoint * yScale,
      pwmY: svgHeight - (d.pwm / 100) * 150 - 10, // scale PWM separately to sit on bottom
    }));

    // generate SVG paths
    const responsePath = points.length
      ? "M " + points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" L ")
      : "";

    const setpointPath = points.length
      ? `M 0,${points[0].setY.toFixed(1)} L ${svgWidth},${points[0].setY.toFixed(1)}`
      : "";

    // Render PWM waves live matching active index
    const activePwm = data[isAnimating ? liveIndex : 99].pwm;

    return {
      responsePath,
      setpointPath,
      points,
      activePwm,
      activePv: data[isAnimating ? liveIndex : 99].pv,
    };
  }, [data, isAnimating, liveIndex, plantType]);

  const handleReset = () => {
    setPlantType("motor");
    setInjectDisturbance(false);
    setKp(3.0);
    setKi(1.5);
    setKd(0.2);
    setSetpoint(60);
    setIsAnimating(false);
    setLiveIndex(99);
  };

  return (
    <div className="space-y-12 pb-12">
      <PageHeader
        title="Virtual Laboratory"
        subtitle={plantSubtitles[plantType]}
        badgeText="Lab Simulator"
      />

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Control Panel */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-none bg-white shadow-[var(--shadow-soft)] overflow-hidden">
            <div className="h-1.5 bg-[var(--color-accent)]" />
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4">
                <div className="flex items-center gap-2 text-[var(--color-primary)]">
                  <Settings size={20} className="text-[var(--color-accent)]" />
                  <h3 className="font-bold text-base text-[var(--color-heading)]">Controller Gains</h3>
                </div>
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-surface-soft)] text-[var(--color-text-soft)] transition-all"
                  title="Reset to default settings"
                >
                  <RefreshCw size={14} />
                </button>
              </div>

              <div className="space-y-5">
                {/* Plant Selector */}
                <label className="flex flex-col gap-1.5">
                  <span className="text-xs font-semibold text-[var(--color-text-soft)] uppercase tracking-wide">System Plant Type</span>
                  <Select value={plantType} onValueChange={handlePlantChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="System Plant Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="motor">DC Motor (Velocity Loop)</SelectItem>
                      <SelectItem value="oven">Thermal Oven (Temperature Loop)</SelectItem>
                      <SelectItem value="levitation">Magnetic Levitation (Position Loop)</SelectItem>
                    </SelectContent>
                  </Select>
                </label>

                {/* Disturbance Injection Switch */}
                <label className="flex items-center gap-3 cursor-pointer select-none py-1">
                  <input
                    type="checkbox"
                    checked={injectDisturbance}
                    onChange={(e) => {
                      setInjectDisturbance(e.target.checked);
                      setIsAnimating(false);
                      setLiveIndex(99);
                    }}
                    className="h-4 w-4 rounded border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                  />
                  <span className="text-xs font-bold text-[var(--color-text-soft)] uppercase tracking-wide">Inject Load Disturbance (at t = 2.5s)</span>
                </label>

                {/* Setpoint Slider */}
                <label className="block space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-soft)] uppercase tracking-wide">
                    <span>Target Setpoint (SP)</span>
                    <span className="font-bold text-[var(--color-heading)] text-sm">{setpoint} {activeUnit}</span>
                  </div>
                  <input
                    type="range"
                    min={currentRange.min}
                    max={currentRange.max}
                    step={currentRange.step}
                    value={setpoint}
                    onChange={(e) => setSetpoint(Number(e.target.value))}
                    className="w-full h-1.5 bg-[var(--color-surface-soft)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
                  />
                </label>

                {/* Kp Slider */}
                <label className="block space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-soft)] uppercase tracking-wide">
                    <span>Proportional Gain (Kp)</span>
                    <span className="font-bold text-[var(--color-accent)] text-sm">{Kp.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    step="0.1"
                    value={Kp}
                    onChange={(e) => setKp(Number(e.target.value))}
                    className="w-full h-1.5 bg-[var(--color-surface-soft)] rounded-lg appearance-none cursor-pointer accent-[var(--color-accent)]"
                  />
                </label>

                {/* Ki Slider */}
                <label className="block space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-soft)] uppercase tracking-wide">
                    <span>Integral Gain (Ki)</span>
                    <span className="font-bold text-[var(--color-highlight)] text-sm">{Ki.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.1"
                    value={Ki}
                    onChange={(e) => setKi(Number(e.target.value))}
                    className="w-full h-1.5 bg-[var(--color-surface-soft)] rounded-lg appearance-none cursor-pointer accent-[var(--color-highlight)]"
                  />
                </label>

                {/* Kd Slider */}
                <label className="block space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[var(--color-text-soft)] uppercase tracking-wide">
                    <span>Derivative Gain (Kd)</span>
                    <span className="font-bold text-amber-500 text-sm">{Kd.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.05"
                    value={Kd}
                    onChange={(e) => setKd(Number(e.target.value))}
                    className="w-full h-1.5 bg-[var(--color-surface-soft)] rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </label>
              </div>

              <button
                onClick={() => {
                  setLiveIndex(0);
                  setIsAnimating(true);
                }}
                disabled={isAnimating}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--color-primary)] hover:bg-[var(--color-primary-strong)] text-white text-sm font-bold shadow-md transition-all disabled:opacity-50"
              >
                <Play size={16} />
                {isAnimating ? "Simulating Loop..." : "Run Step Response"}
              </button>
            </CardContent>
          </Card>

          {/* Physical System Context Card */}
          <Card className="border-none bg-black text-white shadow-2xl overflow-hidden">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-[var(--color-accent)]">
                <Cpu size={20} />
                <h3 className="font-bold text-base text-white font-[var(--font-serif)]">System Working</h3>
              </div>
              <p className="text-sm leading-relaxed text-white/80 font-medium">
                The PID controller computes control inputs based on the calculated error ($e = SP - PV$).
                Adjusting the parameters affects motor performance live:
              </p>
              <ul className="text-xs space-y-2 text-white/70">
                <li>• <strong className="text-[var(--color-accent)]">Kp</strong> reduces rise time but increases overshoot.</li>
                <li>• <strong className="text-[var(--color-highlight)]">Ki</strong> eliminates steady-state error but increases settling time.</li>
                <li>• <strong className="text-amber-400">Kd</strong> adds damping to reduce overshoot and limit oscillation.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Display Oscilloscope Screen and Details */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-none bg-white shadow-[var(--shadow-soft)] overflow-hidden">
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">
                <div className="flex items-center gap-2">
                  <Activity size={20} className="text-[var(--color-accent)]" />
                  <h3 className="font-bold text-lg text-[var(--color-heading)]">Digital Oscilloscope View</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-[var(--color-surface-soft)] text-[var(--color-text)] border border-[var(--color-border)]">
                    Time Base: 0.5s/div
                  </Badge>
                  <Badge className="bg-[var(--color-surface-soft)] text-[var(--color-text)] border border-[var(--color-border)]">
                    {activeQuantity} ({activeUnit})
                  </Badge>
                </div>
              </div>

              {/* Dynamic Oscilloscope SVG Graph */}
              <div className="relative border border-[var(--color-border)] bg-slate-950 rounded-2xl p-4 overflow-hidden shadow-inner">
                {/* Grid markings */}
                <div className="absolute inset-0 grid grid-cols-10 grid-rows-6 opacity-10 pointer-events-none">
                  {Array.from({ length: 60 }).map((_, i) => (
                    <div key={i} className="border-t border-l border-emerald-400 h-full w-full" />
                  ))}
                </div>

                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto relative z-10 overflow-visible">
                  {/* Setpoint Dashed Line (Target) */}
                  <path
                    d={getCoordinates.setpointPath}
                    fill="none"
                    stroke="rgba(239, 68, 68, 0.7)"
                    strokeWidth="1.5"
                    strokeDasharray="4,4"
                  />
                  
                  {/* Process Variable (PV) Curve */}
                  <path
                    d={getCoordinates.responsePath}
                    fill="none"
                    stroke="var(--color-accent)"
                    strokeWidth="2.5"
                    className="transition-all duration-300"
                    strokeDasharray={isAnimating ? "500" : "none"}
                    strokeDashoffset={isAnimating ? 500 - (liveIndex / 100) * 500 : 0}
                  />

                  {/* Graph labels */}
                  <text x="5" y="15" fill="rgba(239, 68, 68, 0.9)" className="text-[9px] font-bold uppercase tracking-wider">Setpoint (Target {activeUnit})</text>
                  <text x="5" y="30" fill="var(--color-accent)" className="text-[9px] font-bold uppercase tracking-wider">{activeQuantity} (PV)</text>
                  <text x={svgWidth - 5} y={svgHeight - 8} fill="rgba(255,255,255,0.4)" className="text-[9px]" textAnchor="end">5.0s</text>
                  <text x="5" y={svgHeight - 8} fill="rgba(255,255,255,0.4)" className="text-[9px]">0.0s</text>
                </svg>

                {/* Simulated Oscillating Needle Gauge representing the current PV */}
                <div className="absolute top-4 right-4 bg-black/60 border border-slate-800 rounded-xl px-4 py-2 text-right backdrop-blur-sm z-20">
                  <p className="text-[8px] font-bold uppercase text-slate-400 tracking-wider">Active {activeUnit}</p>
                  <p className="text-lg font-black text-emerald-400 font-mono">
                    {getCoordinates.activePv.toFixed(1)}
                  </p>
                </div>
              </div>

              {/* Loop Performance Parameters */}
              <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                <div className="bg-[var(--color-surface-soft)] p-4 rounded-xl border border-[var(--color-border)]">
                  <p className="text-[8px] font-bold uppercase text-[var(--color-text-soft)] tracking-wider">Overshoot (%)</p>
                  <p className="mt-1 text-xl font-bold text-[var(--color-heading)]">{metrics.overshoot}%</p>
                </div>
                <div className="bg-[var(--color-surface-soft)] p-4 rounded-xl border border-[var(--color-border)]">
                  <p className="text-[8px] font-bold uppercase text-[var(--color-text-soft)] tracking-wider">Rise Time (s)</p>
                  <p className="mt-1 text-xl font-bold text-[var(--color-heading)]">{metrics.riseTime}s</p>
                </div>
                <div className="bg-[var(--color-surface-soft)] p-4 rounded-xl border border-[var(--color-border)]">
                  <p className="text-[8px] font-bold uppercase text-[var(--color-text-soft)] tracking-wider">Settling Time (s)</p>
                  <p className="mt-1 text-xl font-bold text-[var(--color-heading)]">{metrics.settlingTime}s</p>
                </div>
                <div className="bg-[var(--color-surface-soft)] p-4 rounded-xl border border-[var(--color-border)]">
                  <p className="text-[8px] font-bold uppercase text-[var(--color-text-soft)] tracking-wider">Steady-State Error</p>
                  <p className="mt-1 text-xl font-bold text-[var(--color-heading)]">{metrics.steadyStateError}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actuator & PWM Output Panel */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-none bg-white shadow-[var(--shadow-soft)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Cpu size={18} className="text-[var(--color-accent)]" />
                  <h3 className="font-bold text-sm text-[var(--color-heading)]">PWM Gate Driver Output</h3>
                </div>
                
                <div className="h-28 w-full bg-slate-950 rounded-xl flex items-center justify-center relative overflow-hidden p-4">
                  {/* SVG PWM square wave matching active duty cycle */}
                  <svg viewBox="0 0 400 60" className="w-full h-full" preserveAspectRatio="none">
                    {(() => {
                      const duty = getCoordinates.activePwm / 100;
                      const cycles = 5;
                      const period = 400 / cycles;
                      const highWidth = period * duty;
                      const lowWidth = period - highWidth;
                      let path = `M 0 50`;
                      for (let c = 0; c < cycles; c++) {
                        const x0 = c * period;
                        path += ` L ${x0} 10 L ${x0 + highWidth} 10 L ${x0 + highWidth} 50 L ${x0 + highWidth + lowWidth} 50`;
                      }
                      return (
                        <path
                          d={path}
                          fill="none"
                          stroke="#34d399"
                          strokeWidth="2"
                          strokeLinecap="round"
                          className="transition-all duration-300"
                        />
                      );
                    })()}
                    {/* Faint grid lines */}
                    <line x1="0" y1="10" x2="400" y2="10" stroke="#065f46" strokeWidth="0.5" strokeDasharray="4 4" />
                    <line x1="0" y1="50" x2="400" y2="50" stroke="#065f46" strokeWidth="0.5" strokeDasharray="4 4" />
                  </svg>
                  <span className="absolute bottom-2 right-4 text-[9px] font-bold text-emerald-400/60 uppercase tracking-widest">
                    Duty Cycle: {getCoordinates.activePwm.toFixed(0)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none bg-white shadow-[var(--shadow-soft)]">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch size={18} className="text-[var(--color-highlight)]" />
                  <h3 className="font-bold text-sm text-[var(--color-heading)]">Closed-Loop Flow Diagram</h3>
                </div>
                
                <div className="py-2">
                  <svg viewBox="0 0 520 140" className="w-full" style={{ maxHeight: '140px' }}>
                    {/* Setpoint label */}
                    <text x="10" y="55" fontSize="9" fill="var(--color-text-soft)" fontWeight="600">r(t)</text>
                    {/* Arrow: Setpoint to summing junction */}
                    <line x1="30" y1="50" x2="60" y2="50" stroke="var(--color-text-soft)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                    {/* Summing junction circle */}
                    <circle cx="72" cy="50" r="12" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" />
                    <text x="68" y="54" fontSize="12" fill="var(--color-accent)" fontWeight="bold">Σ</text>
                    <text x="80" y="38" fontSize="8" fill="var(--color-text-soft)">+</text>
                    <text x="60" y="72" fontSize="8" fill="var(--color-text-soft)">−</text>
                    {/* Arrow: summing to controller */}
                    <line x1="84" y1="50" x2="130" y2="50" stroke="var(--color-text-soft)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                    {/* PID Controller block */}
                    <rect x="130" y="30" width="110" height="40" rx="8" fill="var(--color-primary-soft)" stroke="var(--color-primary)" strokeWidth="1.5" />
                    <text x="185" y="47" fontSize="10" textAnchor="middle" fill="var(--color-primary)" fontWeight="700">PID Controller</text>
                    <text x="185" y="60" fontSize="8" textAnchor="middle" fill="var(--color-primary)" opacity="0.7">Kp:{Kp} Ki:{Ki} Kd:{Kd}</text>
                    {/* Arrow: controller to plant */}
                    <line x1="240" y1="50" x2="290" y2="50" stroke="var(--color-text-soft)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                    <text x="260" y="42" fontSize="8" fill="var(--color-text-soft)">u(t)</text>
                    {/* Plant block */}
                    <rect x="290" y="30" width="110" height="40" rx="8" fill="#0a0a0a" stroke="var(--color-accent)" strokeWidth="1.5" />
                    <text x="345" y="47" fontSize="10" textAnchor="middle" fill="#34d399" fontWeight="700">{plantType === "motor" ? "DC Motor" : plantType === "oven" ? "Thermal Oven" : "Maglev"}</text>
                    <text x="345" y="60" fontSize="8" textAnchor="middle" fill="#34d399" opacity="0.7">{getCoordinates.activePv.toFixed(1)} {activeUnit}</text>
                    {/* Arrow: plant to output */}
                    <line x1="400" y1="50" x2="470" y2="50" stroke="var(--color-text-soft)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                    <text x="475" y="55" fontSize="9" fill="var(--color-heading)" fontWeight="600">y(t)</text>
                    {/* Feedback path */}
                    <line x1="450" y1="50" x2="450" y2="110" stroke="var(--color-highlight)" strokeWidth="1.5" />
                    <line x1="450" y1="110" x2="72" y2="110" stroke="var(--color-highlight)" strokeWidth="1.5" />
                    <line x1="72" y1="110" x2="72" y2="62" stroke="var(--color-highlight)" strokeWidth="1.5" markerEnd="url(#arrowhead-fb)" />
                    <text x="250" y="125" fontSize="8" textAnchor="middle" fill="var(--color-highlight)" fontWeight="600">Feedback (sensor)</text>
                    {/* Arrow marker definitions */}
                    <defs>
                      <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                        <polygon points="0 0, 8 3, 0 6" fill="var(--color-text-soft)" />
                      </marker>
                      <marker id="arrowhead-fb" markerWidth="8" markerHeight="6" refX="4" refY="0" orient="auto">
                        <polygon points="0 0, 8 0, 4 6" fill="var(--color-highlight)" />
                      </marker>
                    </defs>
                  </svg>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
