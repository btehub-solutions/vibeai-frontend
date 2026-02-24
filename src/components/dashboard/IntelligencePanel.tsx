import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
  BookOpen,
  RefreshCw,
  Shield,
  Lightbulb,
  Clock,
  BarChart3,
  GraduationCap,
  ChevronRight,
  AlertCircle,
  ArrowUpRight,
  Compass,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntelligence } from '@/hooks/useIntelligence';
import { supabase } from '@/lib/supabase';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import type {
  LessonRecommendation,
  PredictiveSignal,
} from '@/intelligence';

// ─── Difficulty Badge ────────────────────────────────────────────────

function DifficultyBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    beginner: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20',
    intermediate: 'bg-amber-500/15 text-amber-400 border-amber-500/20',
    advanced: 'bg-rose-500/15 text-rose-400 border-rose-500/20',
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${colors[level] || colors.beginner}`}>
      {level}
    </span>
  );
}

// ─── Trend Icon ──────────────────────────────────────────────────────

function TrendIcon({ trend }: { trend: 'improving' | 'stable' | 'declining' }) {
  if (trend === 'improving') return <TrendingUp size={14} className="text-emerald-400" />;
  if (trend === 'declining') return <TrendingDown size={14} className="text-rose-400" />;
  return <Minus size={14} className="text-muted-foreground" />;
}

// ─── Risk Badge ──────────────────────────────────────────────────────

function RiskBadge({ risk }: { risk: string }) {
  const styles: Record<string, string> = {
    low: 'bg-emerald-500/10 text-emerald-400',
    medium: 'bg-amber-500/10 text-amber-400',
    high: 'bg-orange-500/10 text-orange-400',
    critical: 'bg-rose-500/10 text-rose-400',
  };
  return (
    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg ${styles[risk] || styles.low}`}>
      {risk} risk
    </span>
  );
}

// ─── Recommendation Card ─────────────────────────────────────────────

function RecommendationCard({ rec, index }: { rec: LessonRecommendation; index: number }) {
  const typeIcons: Record<string, typeof Zap> = {
    next: Zap,
    reinforcement: RefreshCw,
    practice: Target,
    advanced: ArrowUpRight,
    review: BookOpen,
  };
  const TypeIcon = typeIcons[rec.type] || Zap;
  const typeColors: Record<string, string> = {
    next: 'text-accent bg-accent/10',
    reinforcement: 'text-amber-400 bg-amber-500/10',
    practice: 'text-purple-400 bg-purple-500/10',
    advanced: 'text-rose-400 bg-rose-500/10',
    review: 'text-blue-400 bg-blue-500/10',
  };
  const color = typeColors[rec.type] || typeColors.next;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link
        to={`/dashboard/courses/${rec.courseId}/lessons/${rec.lessonId}`}
        className="group flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3.5 rounded-xl bg-secondary/30 hover:bg-secondary/60 border border-white/5 hover:border-accent/20 transition-all"
      >
        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
          <TypeIcon size={14} className="sm:w-4 sm:h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs sm:text-sm font-medium text-foreground truncate group-hover:text-accent transition-colors">
            {rec.title}
          </p>
          <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5 line-clamp-1 sm:line-clamp-2">
            {rec.reason}
          </p>
          <div className="flex items-center gap-2 mt-1.5">
            <DifficultyBadge level={rec.difficulty} />
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <Clock size={10} /> {rec.estimatedTime}
            </span>
          </div>
        </div>
        <ChevronRight size={14} className="text-muted-foreground group-hover:text-accent transition-colors mt-1 flex-shrink-0" />
      </Link>
    </motion.div>
  );
}

// ─── Prediction Alert ────────────────────────────────────────────────

function PredictionAlert({ signal, index }: { signal: PredictiveSignal; index: number }) {
  const severityStyles: Record<string, string> = {
    info: 'border-blue-500/20 bg-blue-500/5',
    warning: 'border-amber-500/20 bg-amber-500/5',
    critical: 'border-rose-500/20 bg-rose-500/5',
  };
  const severityIcons: Record<string, typeof Lightbulb> = {
    info: Lightbulb,
    warning: AlertCircle,
    critical: AlertTriangle,
  };
  const SeverityIcon = severityIcons[signal.severity] || Lightbulb;
  const severityColors: Record<string, string> = {
    info: 'text-blue-400',
    warning: 'text-amber-400',
    critical: 'text-rose-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`p-3 sm:p-3.5 rounded-xl border ${severityStyles[signal.severity]}`}
    >
      <div className="flex items-start gap-2 sm:gap-2.5">
        <SeverityIcon size={14} className={`${severityColors[signal.severity]} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground">{signal.message}</p>
          <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-1">{signal.recommendation}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ═══════════════════════════════════════════════════════════════════════
// Main Component: Intelligence Panel
// ═══════════════════════════════════════════════════════════════════════

export function IntelligencePanel() {
  const intelligence = useIntelligence();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        intelligence.initialize(user.id);
        setIsReady(true);
      }
    };
    init();
  }, []);

  if (!isReady || !intelligence.profileSummary) {
    return null; // Render nothing until ready
  }

  const summary = intelligence.profileSummary;
  const path = intelligence.adaptivePath;
  const predictions = intelligence.predictions;
  const performance = intelligence.performance;

  return (
    <div className="space-y-4 sm:space-y-6 min-w-0 overflow-hidden">
      {/* ── Progress Insight Banner ──────────────────────────────────── */}
      {path?.progressInsight && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated p-4 sm:p-5 border-l-4 border-accent bg-gradient-to-r from-accent/5 via-transparent to-transparent min-w-0"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1">AI Insight</p>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{path.progressInsight}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Intelligence Dashboard ──────────────────────────────────── */}
      <div className="card-elevated p-3 sm:p-6 mb-3 sm:mb-6 overflow-hidden min-w-0">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 sm:p-2.5 rounded-xl bg-accent/10 flex-shrink-0">
            <Brain className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-bold text-foreground truncate">Intelligence Hub</h2>
            <p className="text-[10px] sm:text-xs text-muted-foreground truncate">AI-powered learner insights & predictions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6">
          {/* Topic Mastery */}
          <div className="space-y-4 min-w-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Compass size={14} className="text-accent" />
                Topic Mastery
              </h3>
              <span className="text-[10px] text-muted-foreground">Updated</span>
            </div>
            <div className="space-y-3">
              {performance?.topicBreakdown.map((topic) => (
                <div key={topic.topicId} className="space-y-1.5 min-w-0 w-full overflow-hidden">
                  <div className="flex justify-between text-xs min-w-0">
                    <span className="text-muted-foreground truncate mr-2 flex-1">{topic.topicName}</span>
                    <span className="text-foreground font-medium flex-shrink-0">{topic.proficiency}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden min-w-0">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${topic.proficiency}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
                    />
                  </div>
                </div>
              ))}
              {(!performance?.topicBreakdown || performance.topicBreakdown.length === 0) && (
                <p className="text-[10px] text-muted-foreground italic">No mastery data yet.</p>
              )}
            </div>
          </div>

          {/* Predictive Signals Mini-Panel */}
          <div className="space-y-4 min-w-0">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Zap size={14} className="text-primary" />
              Learning Signals
            </h3>
            <div className="space-y-2">
              {predictions.slice(0, 2).map((signal, i) => (
                <PredictionAlert key={i} signal={signal} index={i} />
              ))}
              {predictions.length === 0 && (
                <div className="p-4 rounded-xl border border-white/5 bg-white/5 text-center">
                  <CheckCircle2 size={24} className="text-emerald-400 mx-auto mb-2 opacity-50" />
                  <p className="text-[10px] text-muted-foreground">All signals clear! You're learning at an optimal pace.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Adaptive Recommendations ─────────────────────────────────── */}
      {path && (
        <div className="card-elevated p-3 sm:p-6 min-w-0 overflow-hidden">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
              <Sparkles size={16} className="text-purple-400" />
            </div>
            <h3 className="text-sm sm:text-base font-semibold text-foreground">Personalized Path</h3>
          </div>

          <div className="space-y-4">
            {/* Next Lesson (Primary) */}
            {path.nextLesson && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Recommended Next</p>
                <RecommendationCard rec={path.nextLesson} index={0} />
              </div>
            )}

            {/* Other categories collapsed on mobile if many? No, just keep simple */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {path.reinforcementTopics.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-2">Reinforcement</p>
                  {path.reinforcementTopics.slice(0, 1).map((rec, i) => (
                    <RecommendationCard key={rec.lessonId} rec={rec} index={i + 1} />
                  ))}
                </div>
              )}
              {path.practiceActivities.length > 0 && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-2">Practice</p>
                  {path.practiceActivities.slice(0, 1).map((rec, i) => (
                    <RecommendationCard key={rec.lessonId} rec={rec} index={i + 2} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IntelligencePanel;
