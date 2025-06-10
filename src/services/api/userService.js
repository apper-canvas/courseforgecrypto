import { toast } from 'react-toastify';

const userService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: ["Name", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy", "email", "role", "enrolled_courses", "joined_at"],
        orderBy: [{ fieldName: "joined_at", SortType: "DESC" }]
      };

      const response = await apperClient.fetchRecords("User1", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform data to match component expectations
      return (response.data || []).map(user => ({
        ...user,
        name: user.Name,
        enrolledCourses: user.enrolled_courses ? user.enrolled_courses.split(',').filter(Boolean) : [],
        joinedAt: user.joined_at
      }));
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: ["Name", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy", "email", "role", "enrolled_courses", "joined_at"]
      };

      const response = await apperClient.getRecordById("User1", id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      const user = response.data;
      return {
        ...user,
        name: user.Name,
        enrolledCourses: user.enrolled_courses ? user.enrolled_courses.split(',').filter(Boolean) : [],
        joinedAt: user.joined_at
      };
    } catch (error) {
      console.error(`Error fetching user with ID ${id}:`, error);
      throw error;
    }
  },

  async getByRole(role) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: ["Name", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy", "email", "role", "enrolled_courses", "joined_at"],
        where: [
          {
            fieldName: "role",
            operator: "ExactMatch",
            values: [role]
          }
        ]
      };

      const response = await apperClient.fetchRecords("User1", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return (response.data || []).map(user => ({
        ...user,
        name: user.Name,
        enrolledCourses: user.enrolled_courses ? user.enrolled_courses.split(',').filter(Boolean) : [],
        joinedAt: user.joined_at
      }));
    } catch (error) {
      console.error("Error fetching users by role:", error);
      throw error;
    }
  },

  async create(userData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          Name: userData.name,
          email: userData.email,
          role: userData.role || 'student',
          enrolled_courses: userData.enrolledCourses ? userData.enrolledCourses.join(',') : '',
          joined_at: userData.joinedAt || new Date().toISOString()
        }]
      };

      const response = await apperClient.createRecord("User1", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulRecords = response.results.filter(result => result.success);
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create ${failedRecords.length} records:${failedRecords}`);
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulRecords.length > 0) {
          const user = successfulRecords[0].data;
          return {
            ...user,
            name: user.Name,
            enrolledCourses: user.enrolled_courses ? user.enrolled_courses.split(',').filter(Boolean) : [],
            joinedAt: user.joined_at
          };
        }
      }
      return null;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  async update(id, updates) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          Id: parseInt(id),
          ...(updates.name && { Name: updates.name }),
          ...(updates.email && { email: updates.email }),
          ...(updates.role && { role: updates.role }),
          ...(updates.enrolledCourses && { enrolled_courses: updates.enrolledCourses.join(',') }),
          ...(updates.joinedAt && { joined_at: updates.joinedAt })
        }]
      };

      const response = await apperClient.updateRecord("User1", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successfulUpdates = response.results.filter(result => result.success);
        const failedUpdates = response.results.filter(result => !result.success);
        
        if (failedUpdates.length > 0) {
          console.error(`Failed to update ${failedUpdates.length} records:${failedUpdates}`);
          failedUpdates.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }
        
        if (successfulUpdates.length > 0) {
          const user = successfulUpdates[0].data;
          return {
            ...user,
            name: user.Name,
            enrolledCourses: user.enrolled_courses ? user.enrolled_courses.split(',').filter(Boolean) : [],
            joinedAt: user.joined_at
          };
        }
      }
      return null;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord("User1", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successfulDeletions = response.results.filter(result => result.success);
        const failedDeletions = response.results.filter(result => !result.success);
        
        if (failedDeletions.length > 0) {
          console.error(`Failed to delete ${failedDeletions.length} records:${failedDeletions}`);
          failedDeletions.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        return successfulDeletions.length > 0;
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  }
};

export default userService;