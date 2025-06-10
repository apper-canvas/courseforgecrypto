import lessonData from '../mockData/lessons.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let lessons = [...lessonData];

const lessonService = {
  async getAll() {
    await delay(300);
    return [...lessons];
  },

  async getById(id) {
    await delay(250);
    const lesson = lessons.find(l => l.id === id);
    if (!lesson) {
      throw new Error('Lesson not found');
    }
    return { ...lesson };
  },

  async getByModuleId(moduleId) {
    await delay(300);
    return lessons
      .filter(l => l.moduleId === moduleId)
      .sort((a, b) => a.order - b.order)
      .map(l => ({ ...l }));
  },

  async create(lessonData) {
    await delay(400);
    const newLesson = {
      id: Date.now().toString(),
      ...lessonData,
      resources: lessonData.resources || []
    };
    lessons.push(newLesson);
    return { ...newLesson };
  },

  async update(id, updates) {
    await delay(350);
    const index = lessons.findIndex(l => l.id === id);
    if (index === -1) {
      throw new Error('Lesson not found');
    }
    lessons[index] = {
      ...lessons[index],
      ...updates
    };
    return { ...lessons[index] };
  },

  async delete(id) {
    await delay(300);
    const index = lessons.findIndex(l => l.id === id);
    if (index === -1) {
      throw new Error('Lesson not found');
    }
    lessons.splice(index, 1);
    return true;
  }
};

export default lessonService;