// ═══════════════════════════════════════════════════════════════════════
// VibeAI Intelligence Dashboard Panel
// Shows learner insights, predictions, and adaptive recommendations
// Integrates seamlessly into the existing dashboard design
// ═══════════════════════════════════════════════════════════════════════

import { useEffect, useState } from 'react';
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
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIntelligence } from '@/hooks/useIntelligence';
import { supabase } from '@/lib/supabase';
import type {
  LessonRecommendation,
  PredictiveSignal,
  AdaptivePath,
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
        className="group flex items-start gap-3 p-3.5 rounded-xl bg-secondary/30 hover:bg-secondary/60 border border-white/5 hover:border-accent/20 transition-all"
      >
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
          <TypeIcon size={16} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate group-hover:text-accent transition-colors">
            {rec.title}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">
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
      className={`p-3.5 rounded-xl border ${severityStyles[signal.severity]}`}
    >
      <div className="flex items-start gap-2.5">
        <SeverityIcon size={15} className={`${severityColors[signal.severity]} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-foreground">{signal.message}</p>
          <p className="text-[11px] text-muted-foreground mt-1">{signal.recommendation}</p>
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

  return (
    <div className="space-y-6">
      {/* ── Progress Insight Banner ──────────────────────────────────── */}
      {path?.progressInsight && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-elevated p-5 border-l-4 border-accent bg-gradient-to-r from-accent/5 via-transparent to-transparent"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">AI Learning Insight</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{path.progressInsight}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Learner Profile Card ─────────────────────────────────────── */}
      <div className="card-elevated p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center">
              <GraduationCap size={18} className="text-accent" />
            </div>
            <h3 className="text-base font-semibold text-foreground">Your Learning Profile</h3>
          </div>
          <RiskBadge risk={summary.risk} />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="p-3 rounded-xl bg-secondary/40 border border-white/5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Knowledge</p>
            <div className="flex items-end gap-1.5">
              <span className="text-2xl font-bold text-foreground">{summary.score}</span>
              <span className="text-xs text-muted-foreground mb-1">/100</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-secondary/40 border border-white/5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Level</p>
            <div className="mt-1">
              <DifficultyBadge level={summary.level} />
            </div>
          </div>
          <div className="p-3 rounded-xl bg-secondary/40 border border-white/5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Quiz Avg</p>
            <span className="text-2xl font-bold text-foreground">{summary.quizAverage}%</span>
          </div>
          <div className="p-3 rounded-xl bg-secondary/40 border border-white/5">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Speed</p>
            <span className="text-sm font-semibold text-foreground capitalize">{summary.speed}</span>
          </div>
        </div>

        {/* Strengths & Weaknesses */}
        {(summary.strengths.length > 0 || summary.weaknesses.length > 0) && (
          <div className="space-y-3">
            {summary.strengths.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-1.5">Strengths</p>
                <div className="flex flex-wrap gap-1.5">
                  {summary.strengths.map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {summary.weaknesses.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-1.5">Focus Areas</p>
                <div className="flex flex-wrap gap-1.5">
                  {summary.weaknesses.map(w => (
                    <span key={w} className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {w}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Difficulty Calibration */}
        {path?.difficultyCalibration && path.difficultyCalibration.currentLevel !== path.difficultyCalibration.recommendedLevel && (
          <div className="mt-4 p-3 rounded-xl bg-accent/5 border border-accent/15">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles size={12} className="text-accent" />
              <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Difficulty Adjustment</p>
            </div>
            <p className="text-xs text-muted-foreground">{path.difficultyCalibration.reason}</p>
          </div>
        )}
      </div>

      {/* ── Adaptive Recommendations ─────────────────────────────────── */}
      {path && (
        <div className="card-elevated p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Sparkles size={18} className="text-purple-400" />
            </div>
            <h3 className="text-base font-semibold text-foreground">Personalized For You</h3>
          </div>

          <div className="space-y-3">
            {/* Next Lesson (Primary) */}
            {path.nextLesson && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Recommended Next</p>
                <RecommendationCard rec={path.nextLesson} index={0} />
              </div>
            )}

            {/* Reinforcement */}
            {path.reinforcementTopics.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-amber-400 mb-2 mt-4">Reinforce Knowledge</p>
                {path.reinforcementTopics.slice(0, 2).map((rec, i) => (
                  <RecommendationCard key={rec.lessonId} rec={rec} index={i + 1} />
                ))}
              </div>
            )}

            {/* Practice */}
            {path.practiceActivities.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-2 mt-4">Practice & Test</p>
                {path.practiceActivities.slice(0, 2).map((rec, i) => (
                  <RecommendationCard key={rec.lessonId} rec={rec} index={i + 2} />
                ))}
              </div>
            )}

            {/* Advanced */}
            {path.advancedSuggestions.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-2 mt-4">Advanced Challenge</p>
                {path.advancedSuggestions.slice(0, 1).map((rec, i) => (
                  <RecommendationCard key={rec.lessonId} rec={rec} index={i + 3} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Predictive Signals ───────────────────────────────────────── */}
      {predictions.length > 0 && (
        <div className="card-elevated p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
              <Shield size={18} className="text-blue-400" />
            </div>
            <h3 className="text-base font-semibold text-foreground">Learning Signals</h3>
          </div>
          <div className="space-y-2.5">
            {predictions.slice(0, 3).map((signal, i) => (
              <PredictionAlert key={`${signal.type}-${i}`} signal={signal} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── Topic Performance ────────────────────────────────────────── */}
      {intelligence.performance?.topicBreakdown && intelligence.performance.topicBreakdown.length > 0 && (
        <div className="card-elevated p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <BarChart3 size={18} className="text-emerald-400" />
            </div>
            <h3 className="text-base font-semibold text-foreground">Topic Mastery</h3>
          </div>
          <div className="space-y-3">
            {intelligence.performance.topicBreakdown.map(topic => (
              <div key={topic.topicId} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{topic.topicName}</span>
                    <TrendIcon trend={topic.trend} />
                  </div>
                  <span className="text-sm font-bold text-foreground">{topic.proficiency}%</span>
                </div>
                <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${topic.proficiency}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${
                      topic.proficiency >= 80 ? 'bg-emerald-500' :
                      topic.proficiency >= 50 ? 'bg-accent' :
                      'bg-amber-500'
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default IntelligencePanel;
