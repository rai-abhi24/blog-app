import { Client, ID, Storage } from "appwrite";
import config from "../../config/config";

class StorageService {
    client = new Client();

    constructor() {
        this.client
            .setEndpoint(config.appwrite.endpoint)
            .setProject(config.appwrite.projectId);
        this.storage = new Storage(this.client);
        this.bucketId = config.appwrite.bucketId;
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(this.bucketId, ID.unique(), file);
        } catch (error) {
            throw `Failed to updload file. Error: ${error}`;
        }
    }

    async previewFile(fileId) {
        try {
            return this.storage.getFilePreview(this.bucketId, fileId);
        } catch (error) {
            throw `Failed to updload file. Error: ${error}`;
        }
    }

    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(this.bucketId, fileId);
        } catch (error) {
            throw `Failed to updload file. Error: ${error}`;
        }
    }
}