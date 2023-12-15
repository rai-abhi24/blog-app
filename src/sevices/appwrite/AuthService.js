import config from "../../config/config";
import { Client, Account, ID } from "appwrite";

class AuthService {
    client = new Client();

    constructor() {
        this.client
            .setEndpoint(config.appwrite.endpointUrl)
            .setProject(config.appwrite.projectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const newUser = await this.account.create(ID.unique(), email, password, name);
            if (newUser) {
                return this.login({ email, password });
            } else {
                return newUser;
            }
        } catch (error) {
            throw `Failed to createAccount. Error: ${error}`;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw `Login failed. Error: ${error}`;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw `Failed to fetch currentUser. Error: ${error}`;
        }

        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSession();
        } catch (error) {
            throw `Failed to logout. Error: ${error}`;
        }
    }
}

const authService = new AuthService();

export default authService;