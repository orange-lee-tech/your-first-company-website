import { teachers, type Teacher } from "@/data/teachers";

export type TeacherDetail = {
  overview: string;
  focusAreas: string[];
  publicHighlights: string[];
  serviceValue: string;
};

export const teacherDetails: Record<string, TeacherDetail> = {
  "lin-qiao": {
    "overview": "林乔是用于教学展示的虚构学习规划示例顾问。",
    "focusAreas": [
      "学习规划示例顾问",
      "阶段复盘"
    ],
    "publicHighlights": [
      "示例资料整理",
      "示例任务设计"
    ],
    "serviceValue": "协助说明目标与交付边界。"
  },
  "chen-yang": {
    "overview": "陈扬是用于教学展示的虚构项目复盘示例顾问。",
    "focusAreas": [
      "项目复盘示例顾问",
      "阶段复盘"
    ],
    "publicHighlights": [
      "示例资料整理",
      "示例任务设计"
    ],
    "serviceValue": "协助说明目标与交付边界。"
  },
  "xu-he": {
    "overview": "许禾是用于教学展示的虚构研究准备示例顾问。",
    "focusAreas": [
      "研究准备示例顾问",
      "阶段复盘"
    ],
    "publicHighlights": [
      "示例资料整理",
      "示例任务设计"
    ],
    "serviceValue": "协助说明目标与交付边界。"
  }
};

export const detailedTeachers = teachers.filter(
  (teacher) => teacher.hasDetail && teacher.detailPath && teacherDetails[teacher.id],
);

export function getDetailedTeacherById(id: string):
  | {
      teacher: Teacher;
      detail: TeacherDetail;
    }
  | undefined {
  const teacher = teachers.find((item) => item.id === id);

  if (!teacher || !teacher.hasDetail || !teacher.detailPath) {
    return undefined;
  }

  const detail = teacherDetails[id];

  if (!detail) {
    return undefined;
  }

  return {
    teacher,
    detail,
  };
}