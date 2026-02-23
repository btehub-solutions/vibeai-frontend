// ═══════════════════════════════════════════════════════════════════════
// usePageContext — Detects current page and provides platform context
// ═══════════════════════════════════════════════════════════════════════

import { useMemo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { PlatformContext, PageContext } from '@/services/ai-agents/types';
import { expandedCourses } from '@/data/courses-expanded';
import { tools } from '@/data/tools';

export function usePageContext(): PlatformContext {
  const location = useLocation();
  const params = useParams();

  return useMemo(() => {
    const path = location.pathname;
    let currentPage: PageContext = 'unknown';
    let courseId: string | undefined;
    let courseTitle: string | undefined;
    let lessonId: string | undefined;
    let lessonTitle: string | undefined;
    let toolId: string | undefined;
    let toolName: string | undefined;

    // ── Route Detection ──────────────────────────────────────────
    if (path === '/' || path === '') {
      currentPage = 'hero';
    } else if (path === '/dashboard') {
      currentPage = 'dashboard';
    } else if (path.match(/\/dashboard\/courses\/\d+\/lessons\/.+/)) {
      currentPage = 'lesson-player';
      courseId = params.courseId;
      lessonId = params.lessonId;
    } else if (path.match(/\/dashboard\/courses\/\d+/)) {
      currentPage = 'course-module';
      courseId = params.courseId;
    } else if (path === '/dashboard/courses') {
      currentPage = 'course-module';
    } else if (path.match(/\/dashboard\/tools\/\d+/)) {
      currentPage = 'ai-tools';
      toolId = params.toolId;
    } else if (path === '/dashboard/tools') {
      currentPage = 'ai-tools';
    } else if (path === '/dashboard/announcements') {
      currentPage = 'ai-updates';
    } else if (path === '/chat') {
      currentPage = 'chat-page';
    } else if (path === '/dashboard/consultation') {
      currentPage = 'consultation';
    } else if (path === '/dashboard/settings') {
      currentPage = 'settings';
    }

    // ── Resolve Course Title ─────────────────────────────────────
    if (courseId) {
      const course = expandedCourses.find(c => c.id === parseInt(courseId!, 10));
      if (course) {
        courseTitle = course.title;
        
        // Try to resolve lesson title
        if (lessonId && course.modules) {
          for (const mod of course.modules) {
            const lesson = mod.lessons.find(l => l.id === lessonId);
            if (lesson) {
              lessonTitle = lesson.title;
              break;
            }
          }
        }
      }
    }

    // ── Resolve Tool Name ────────────────────────────────────────
    if (toolId) {
      const tool = tools.find(t => t.id === parseInt(toolId!, 10));
      if (tool) {
        toolName = tool.name;
      }
    }

    return {
      currentPage,
      courseId,
      courseTitle,
      lessonId,
      lessonTitle,
      toolId,
      toolName,
    };
  }, [location.pathname, params.courseId, params.lessonId, params.toolId]);
}
