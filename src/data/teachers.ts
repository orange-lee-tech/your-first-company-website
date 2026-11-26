import { withBasePath } from "@/lib/site";

export type TeacherGender = "male" | "female";

export type Teacher = {
  id: string;
  name: string;
  school: string;
  title: string;
  gender: TeacherGender;
  portraitImage: string;
  cardImage?: string;
  featured?: boolean;
  hasDetail?: boolean;
  detailPath?: string;
  summary?: string;
};

export const teachers: Teacher[] = [
  {
    "id": "lin-qiao",
    "name": "林乔",
    "school": "远岚教学示例团队",
    "title": "学习规划示例顾问",
    "gender": "female",
    "featured": true,
    "hasDetail": true,
    "detailPath": "/teachers/lin-qiao",
    "summary": "虚构角色，用于展示团队档案与服务的关系。"
  },
  {
    "id": "chen-yang",
    "name": "陈扬",
    "school": "远岚教学示例团队",
    "title": "项目复盘示例顾问",
    "gender": "male",
    "featured": true,
    "hasDetail": true,
    "detailPath": "/teachers/chen-yang",
    "summary": "虚构角色，用于展示团队档案与服务的关系。"
  },
  {
    "id": "xu-he",
    "name": "许禾",
    "school": "远岚教学示例团队",
    "title": "研究准备示例顾问",
    "gender": "female",
    "featured": true,
    "hasDetail": true,
    "detailPath": "/teachers/xu-he",
    "summary": "虚构角色，用于展示团队档案与服务的关系。"
  }
].map((teacher): Teacher => ({
  ...teacher,
  gender: teacher.gender as TeacherGender,
  portraitImage: withBasePath("/images/demo/person.svg"),
}));
export const featuredTeachers = teachers.filter((teacher) => teacher.featured);
