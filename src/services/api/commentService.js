import { toast } from 'react-toastify';

const commentService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: ["Name", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy", "content", "status", "created_at", "user_id", "lesson_id"],
        orderBy: [{ fieldName: "created_at", SortType: "DESC" }]
      };

      const response = await apperClient.fetchRecords("Comment1", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform data to match component expectations
      return (response.data || []).map(comment => ({
        ...comment,
        userId: comment.user_id,
        lessonId: comment.lesson_id,
        createdAt: comment.created_at
      }));
    } catch (error) {
      console.error("Error fetching comments:", error);
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
        fields: ["Name", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy", "content", "status", "created_at", "user_id", "lesson_id"]
      };

      const response = await apperClient.getRecordById("Comment1", id, params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      const comment = response.data;
      return {
        ...comment,
        userId: comment.user_id,
        lessonId: comment.lesson_id,
        createdAt: comment.created_at
      };
    } catch (error) {
      console.error(`Error fetching comment with ID ${id}:`, error);
      throw error;
    }
  },

  async getByLessonId(lessonId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: ["Name", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy", "content", "status", "created_at", "user_id", "lesson_id"],
        where: [
          {
            fieldName: "lesson_id",
            operator: "ExactMatch",
            values: [lessonId]
          }
        ],
        orderBy: [{ fieldName: "created_at", SortType: "DESC" }]
      };

      const response = await apperClient.fetchRecords("Comment1", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return (response.data || []).map(comment => ({
        ...comment,
        userId: comment.user_id,
        lessonId: comment.lesson_id,
        createdAt: comment.created_at
      }));
    } catch (error) {
      console.error("Error fetching comments by lesson:", error);
      throw error;
    }
  },

  async getByStatus(status) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: ["Name", "Tags", "Owner", "CreatedOn", "CreatedBy", "ModifiedOn", "ModifiedBy", "content", "status", "created_at", "user_id", "lesson_id"],
        where: [
          {
            fieldName: "status",
            operator: "ExactMatch",
            values: [status]
          }
        ],
        orderBy: [{ fieldName: "created_at", SortType: "DESC" }]
      };

      const response = await apperClient.fetchRecords("Comment1", params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return (response.data || []).map(comment => ({
        ...comment,
        userId: comment.user_id,
        lessonId: comment.lesson_id,
        createdAt: comment.created_at
      }));
    } catch (error) {
      console.error("Error fetching comments by status:", error);
      throw error;
    }
  },

  async create(commentData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      // Only include Updateable fields
      const params = {
        records: [{
          Name: `Comment by ${commentData.userId}`,
          content: commentData.content,
          status: commentData.status || 'pending',
          created_at: commentData.createdAt || new Date().toISOString(),
          user_id: parseInt(commentData.userId),
          lesson_id: parseInt(commentData.lessonId)
        }]
      };

      const response = await apperClient.createRecord("Comment1", params);
      
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
          const comment = successfulRecords[0].data;
          return {
            ...comment,
            userId: comment.user_id,
            lessonId: comment.lesson_id,
            createdAt: comment.created_at
          };
        }
      }
      return null;
    } catch (error) {
      console.error("Error creating comment:", error);
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
          ...(updates.content && { content: updates.content }),
          ...(updates.status && { status: updates.status }),
          ...(updates.createdAt && { created_at: updates.createdAt }),
          ...(updates.userId && { user_id: parseInt(updates.userId) }),
          ...(updates.lessonId && { lesson_id: parseInt(updates.lessonId) })
        }]
      };

      const response = await apperClient.updateRecord("Comment1", params);
      
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
          const comment = successfulUpdates[0].data;
          return {
            ...comment,
            userId: comment.user_id,
            lessonId: comment.lesson_id,
            createdAt: comment.created_at
          };
        }
      }
      return null;
    } catch (error) {
      console.error("Error updating comment:", error);
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

      const response = await apperClient.deleteRecord("Comment1", params);
      
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
      console.error("Error deleting comment:", error);
      throw error;
    }
  }
};

export default commentService;