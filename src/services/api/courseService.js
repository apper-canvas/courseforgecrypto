import courseData from '../mockData/courses.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let courses = [...courseData];

const courseService = {
  async getAll() {
    await delay(300);
    return [...courses];
  },

  async getById(id) {
    await delay(250);
    const course = courses.find(c => c.id === id);
    if (!course) {
      throw new Error('Course not found');
    }
    return { ...course };
  },

  async getByCategoryId(categoryId) {
    await delay(300);
    return courses.filter(c => c.category === categoryId).map(c => ({ ...c }));
  },

  async create(courseData) {
    await delay(400);
    const newCourse = {
      id: Date.now().toString(),
      ...courseData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: courseData.tags || []
    };
    courses.unshift(newCourse);
    return { ...newCourse };
  },

  async update(id, updates) {
    await delay(350);
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Course not found');
    }
    courses[index] = {
      ...courses[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return { ...courses[index] };
  },

  async delete(id) {
    await delay(300);
    const index = courses.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Course not found');
    }
    courses.splice(index, 1);
    return true;
  }
};

export default courseService;