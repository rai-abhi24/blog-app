import { Client, Databases, Query } from "appwrite";
import config from "../../config/config";

class DatabaseService {
    client = new Client();

    constructor() {
        this.client
            .setEndpoint(config.appwrite.endpoint)
            .setProject(config.appwrite.projectId);
        this.databases = new Databases(this.client);
        this.collectionId = config.appwrite.collectionId;
        this.databaseId = config.appwrite.databaseId;
    }

    async createPost({ title, content, postId, featuredImage, status, userId }) {
        const post = {
            title, content, image: featuredImage, status, userId
        };

        try {
            return await this.databases.createCollection(this.databaseId, this.collectionId, postId, post);
        } catch (error) {
            throw `Failed to create post. Error: ${error}`;
        }

        return null;
    }

    async updatePost(postId, { title, content, featuredImage, status }) {
        const updatedPost = {
            title, content, image: featuredImage, status
        };

        try {
            return await this.databases.updateDocument(this.databaseId, this.collectionId, postId, updatedPost);
        } catch (error) {
            throw `Failed to update post. Error: ${error}`;
        }

        return null;
    }

    async listPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.getDocument(this.databaseId, this.collectionId, queries);
        } catch (error) {
            throw `Failed to list posts. Error: ${error}`;
        }

        return null;
    }

    async getPost(postId) {
        try {
            return await this.databases.getDocument(this.databaseId, this.collectionId, postId);
        } catch (error) {
            throw `Failed to get post. Error: ${error}`;
        }
    }

    async deletePost(postId) {
        try {
            await this.databases.deleteDocument(this.databaseId, this.collectionId, postId);
            return true;
        } catch (error) {
            throw `Failed to delete post. Error: ${error}`;
        }
    }
}

const databaseService = new DatabaseService();

export default databaseService;