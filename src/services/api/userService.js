import userData from '../mockData/users.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

let users = [...userData];

const userService = {
  async getAll() {
    await delay(300);
    return [...users];
  },

  async getById(id) {
    await delay(250);
    const user = users.find(u => u.id === id);
    if (!user) {
      throw new Error('User not found');
    }
    return { ...user };
  },

  async getByRole(role) {
    await delay(300);
    return users.filter(u => u.role === role).map(u => ({ ...u }));
  },

  async create(userData) {
    await delay(400);
    const newUser = {
      id: Date.now().toString(),
      ...userData,
      enrolledCourses: userData.enrolledCourses || [],
      joinedAt: userData.joinedAt || new Date().toISOString()
    };
    users.push(newUser);
    return { ...newUser };
  },

  async update(id, updates) {
    await delay(350);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    users[index] = {
      ...users[index],
      ...updates
    };
    return { ...users[index] };
  },

  async delete(id) {
    await delay(300);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    users.splice(index, 1);
    return true;
  }
};

export default userService;