// ═══════════════════════════════════════════════════════════════════════
// VibeAI Content Metadata Registry
// Maps course/lesson structure to intelligence metadata
// ═══════════════════════════════════════════════════════════════════════

import { ContentMetadata, DifficultyLevel } from './types';
import { expandedCourses } from '@/data/courses-expanded';

// ─── Topic ID Mapping ────────────────────────────────────────────────
// Maps course IDs to topic identifiers used by the intelligence system

const COURSE_TOPIC_MAP: Record<number, string> = {
  1: 'ai-foundations',
  2: 'machine-learning',
  3: 'nlp',
  4: 'llm',
  5: 'prompt-engineering',
  6: 'generative-ai',
  7: 'chatbots',
  8: 'automation-agents',
  9: 'vibe-coding',
  10: 'career-ai',
};

const COURSE_TOPIC_NAMES: Record<string, string> = {
  'ai-foundations': 'AI Foundations',
  'machine-learning': 'Machine Learning',
  'nlp': 'Natural Language Processing',
  'llm': 'Large Language Models',
  'prompt-engineering': 'Prompt Engineering',
  'generative-ai': 'Generative AI',
  'chatbots': 'Chatbot Development',
  'automation-agents': 'Automation & Agents',
  'vibe-coding': 'Vibe Coding',
  'career-ai': 'AI Career Readiness',
};

// ─── Difficulty Assignment ───────────────────────────────────────────
// Course-level default difficulties based on curriculum design

const COURSE_DIFFICULTY: Record<number, DifficultyLevel> = {
  1: 'beginner',
  2: 'intermediate',
  3: 'intermediate',
  4: 'advanced',
  5: 'beginner',
  6: 'intermediate',
  7: 'intermediate',
  8: 'advanced',
  9: 'beginner',
  10: 'beginner',
};

// ─── Concept Dependencies ────────────────────────────────────────────
// Which courses depend on knowledge from other courses

const COURSE_DEPENDENCIES: Record<number, number[]> = {
  1: [],
  2: [1],
  3: [1, 2],
  4: [1, 3],
  5: [1],
  6: [1, 4],
  7: [1, 5],
  8: [1, 5, 7],
  9: [1, 5],
  10: [1],
};

// ─── Skill Outcomes ──────────────────────────────────────────────────

const COURSE_SKILLS: Record<number, string[]> = {
  1: ['ai-literacy', 'ai-history', 'ai-ethics', 'critical-thinking'],
  2: ['data-analysis', 'model-evaluation', 'statistical-reasoning'],
  3: ['text-processing', 'sentiment-analysis', 'language-understanding'],
  4: ['llm-architecture', 'transformer-models', 'fine-tuning'],
  5: ['prompt-design', 'output-optimization', 'ai-communication'],
  6: ['content-generation', 'image-synthesis', 'creative-ai'],
  7: ['conversation-design', 'bot-development', 'ux-for-ai'],
  8: ['workflow-automation', 'agent-design', 'system-integration'],
  9: ['ai-assisted-coding', 'development-workflow', 'code-generation'],
  10: ['career-planning', 'ai-portfolio', 'industry-awareness'],
};

// ─── Progressive Difficulty Within Modules ───────────────────────────

function getModuleDifficulty(
  courseDifficulty: DifficultyLevel,
  moduleIndex: number,
  totalModules: number
): DifficultyLevel {
  const progressRatio = moduleIndex / Math.max(1, totalModules - 1);

  if (courseDifficulty === 'beginner') {
    if (progressRatio < 0.5) return 'beginner';
    if (progressRatio < 0.8) return 'beginner'; // stays beginner but approaches intermediate
    return 'intermediate';
  }
  if (courseDifficulty === 'intermediate') {
    if (progressRatio < 0.3) return 'beginner';
    if (progressRatio < 0.7) return 'intermediate';
    return 'advanced';
  }
  // advanced
  if (progressRatio < 0.2) return 'intermediate';
  return 'advanced';
}

// ─── Parse duration string to minutes ────────────────────────────────

function parseDurationToMinutes(duration: string): number {
  const match = duration.match(/(\d+)\s*(min|hour|h|m)/i);
  if (!match) return 15; // default
  const val = parseInt(match[1]);
  const unit = match[2].toLowerCase();
  return unit.startsWith('h') ? val * 60 : val;
}

// ─── Build Content Metadata Registry ─────────────────────────────────

export function buildContentMetadataRegistry(): Map<string, ContentMetadata> {
  const registry = new Map<string, ContentMetadata>();

  for (const course of expandedCourses) {
    const modules = course.modules || course.chapters || [];
    const topicId = COURSE_TOPIC_MAP[course.id] || `course-${course.id}`;
    const courseDifficulty = COURSE_DIFFICULTY[course.id] || 'beginner';
    const dependencies = COURSE_DEPENDENCIES[course.id] || [];
    const skills = COURSE_SKILLS[course.id] || [];

    modules.forEach((module, moduleIndex) => {
      const moduleDifficulty = getModuleDifficulty(courseDifficulty, moduleIndex, modules.length);

      module.lessons.forEach((lesson, lessonIndex) => {
        if (!lesson.id) return;

        // Build dependency chain: previous lessons in this module
        const conceptDeps: string[] = [];
        // Add cross-course dependencies
        dependencies.forEach(depCourseId => {
          const depCourse = expandedCourses.find(c => c.id === depCourseId);
          if (depCourse) {
            const depModules = depCourse.modules || depCourse.chapters || [];
            depModules.forEach(m => {
              m.lessons.forEach(l => {
                if (l.id) conceptDeps.push(l.id);
              });
            });
          }
        });
        // Add previous lessons within same course
        for (let mi = 0; mi <= moduleIndex; mi++) {
          const targetModule = modules[mi];
          const lessonLimit = mi < moduleIndex ? targetModule.lessons.length : lessonIndex;
          for (let li = 0; li < lessonLimit; li++) {
            const prevLesson = targetModule.lessons[li];
            if (prevLesson.id) conceptDeps.push(prevLesson.id);
          }
        }

        const metadata: ContentMetadata = {
          courseId: course.id,
          lessonId: lesson.id,
          moduleIndex,
          lessonIndex,
          difficultyLevel: moduleDifficulty,
          conceptDependencies: conceptDeps.slice(-10), // limit to latest 10
          skillOutcome: skills,
          estimatedTimeMinutes: parseDurationToMinutes(lesson.duration),
          practiceRequired: lesson.type === 'quiz' || (lesson.activity !== undefined && lesson.activity !== ''),
          topicId,
          conceptTags: [
            topicId,
            `module-${moduleIndex + 1}`,
            lesson.type || 'reading',
            moduleDifficulty,
          ],
        };

        registry.set(lesson.id, metadata);
      });
    });
  }

  return registry;
}

// ─── Exported Helpers ────────────────────────────────────────────────

export function getTopicId(courseId: number): string {
  return COURSE_TOPIC_MAP[courseId] || `course-${courseId}`;
}

export function getTopicName(topicId: string): string {
  return COURSE_TOPIC_NAMES[topicId] || topicId;
}

export function getCourseDifficulty(courseId: number): DifficultyLevel {
  return COURSE_DIFFICULTY[courseId] || 'beginner';
}

export function getCourseDependencies(courseId: number): number[] {
  return COURSE_DEPENDENCIES[courseId] || [];
}

export function getCourseSkills(courseId: number): string[] {
  return COURSE_SKILLS[courseId] || [];
}

export { COURSE_TOPIC_MAP, COURSE_TOPIC_NAMES };
