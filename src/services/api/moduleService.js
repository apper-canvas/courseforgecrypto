import moduleData from '../mockData/modules.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let modules = [...moduleData];

const moduleService = {
  async getAll() {
    await delay(300);
    return [...modules];
  },

  async getById(id) {
    await delay(250);
    const module = modules.find(m => m.id === id);
    if (!module) {
      throw new Error('Module not found');
    }
    return { ...module };
  },

  async getByCourseId(courseId) {
    await delay(300);
    return modules
      .filter(m => m.courseId === courseId)
      .sort((a, b) => a.order - b.order)
      .map(m => ({ ...m }));
  },

  async create(moduleData) {
    await delay(400);
    const newModule = {
      id: Date.now().toString(),
      ...moduleData,
      lessons: []
    };
    modules.push(newModule);
    return { ...newModule };
  },

  async update(id, updates) {
    await delay(350);
    const index = modules.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Module not found');
    }
    modules[index] = {
      ...modules[index],
      ...updates
    };
    return { ...modules[index] };
  },

  async delete(id) {
    await delay(300);
    const index = modules.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error('Module not found');
    }
    modules.splice(index, 1);
    return true;
  }
};

export default moduleService;