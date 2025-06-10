import commentData from '../mockData/comments.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let comments = [...commentData];

const commentService = {
  async getAll() {
    await delay(300);
    return [...comments];
  },

  async getById(id) {
    await delay(250);
    const comment = comments.find(c => c.id === id);
    if (!comment) {
      throw new Error('Comment not found');
    }
    return { ...comment };
  },

  async getByLessonId(lessonId) {
    await delay(300);
    return comments
      .filter(c => c.lessonId === lessonId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .map(c => ({ ...c }));
  },

  async getByStatus(status) {
    await delay(300);
    return comments.filter(c => c.status === status).map(c => ({ ...c }));
  },

  async create(commentData) {
    await delay(400);
    const newComment = {
      id: Date.now().toString(),
      ...commentData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    comments.unshift(newComment);
    return { ...newComment };
  },

  async update(id, updates) {
    await delay(350);
    const index = comments.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Comment not found');
    }
    comments[index] = {
      ...comments[index],
      ...updates
    };
    return { ...comments[index] };
  },

  async delete(id) {
    await delay(300);
    const index = comments.findIndex(c => c.id === id);
    if (index === -1) {
      throw new Error('Comment not found');
    }
    comments.splice(index, 1);
    return true;
  }
};

export default commentService;