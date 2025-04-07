import { getApi, getByIdApi, getByParamsApi, postApi, putApi, deleteApi } from './api';
import { apiEndPoints } from './apiEndpoints';

interface ApiResponse<T = any> {
  status: number;
  data: T;
}

export class ApiRoutes {
  // User Routes
  static async register(userData: any): Promise<ApiResponse> {
    return await postApi(apiEndPoints.users.register, userData);
  }

  static async login(data: { email: string; password: string }): Promise<ApiResponse> {
    return await postApi(apiEndPoints.users.login, data);
  }

  static async logout(): Promise<ApiResponse> {
    return await postApi(apiEndPoints.users.logout, {});
  }

  static async requestPasswordReset(data: { email: string }): Promise<ApiResponse> {
    return await postApi(apiEndPoints.users.requestPasswordReset, data);
  }

  static async resetPassword(data: { token: string; newPassword: string }): Promise<ApiResponse> {
    return await postApi(apiEndPoints.users.resetPassword, data);
  }

  static async verifyToken(token: string): Promise<ApiResponse> {
    return await getApi(apiEndPoints.users.verifyToken(token));
  }

  static async refreshToken(token: string): Promise<ApiResponse> {
    return await postApi(apiEndPoints.users.refreshToken, { token });
  }

  static async getAllUsers(params: { page: number; limit: number }): Promise<ApiResponse> {
    return await getByParamsApi(apiEndPoints.users.getAll, params);
  }

  static async checkUserShortlistStatus(params: {
    page: number;
    limit: number;
  }): Promise<ApiResponse> {
    return await getByParamsApi(apiEndPoints.users.shortlist, params);
  }

  static async getUserDomain(params: {
    domain: string;
    page: number;
    limit: number;
  }): Promise<ApiResponse> {
    return await getByParamsApi(apiEndPoints.users.domain, params);
  }

  static async getUserById(id: string): Promise<ApiResponse> {
    return await getByIdApi(apiEndPoints.users.getById(id), id);
  }

  static async updateUser(id: string, userData: any): Promise<ApiResponse> {
    return await putApi(apiEndPoints.users.update(id), userData);
  }

  static async deleteUser(id: string): Promise<ApiResponse> {
    return await deleteApi(apiEndPoints.users.delete(id));
  }

  // Social Routes
  static async createSocialLink(userId: string, data: any): Promise<ApiResponse> {
    return await postApi(apiEndPoints.social.createSocialLink(userId), data);
  }

  static async getAllSocialLinks(userId: string): Promise<ApiResponse> {
    return await getApi(apiEndPoints.social.getAllSociallinks(userId));
  }

  static async updateSocialLink(id: string, data: any): Promise<ApiResponse> {
    return await putApi(apiEndPoints.social.updateSocialLink(id), data);
  }

  static async deleteSocialLink(id: string): Promise<ApiResponse> {
    return await deleteApi(apiEndPoints.social.deleteSocialLink(id));
  }

  // Aptitude Routes
  static async createAptitude(data: any): Promise<ApiResponse> {
    return await postApi(apiEndPoints.aptitude.createAptitude, data);
  }

  static async getAllAptitudes(): Promise<ApiResponse> {
    return await getApi(apiEndPoints.aptitude.getAllAptitudes);
  }

  static async getAptitudeBy(id: string): Promise<ApiResponse> {
    return await getByIdApi(apiEndPoints.aptitude.getAptitudesById(id), id);
  }

  static async updateAptitude(id: string, data: any): Promise<ApiResponse> {
    return await putApi(apiEndPoints.aptitude.updateAptitude(id), data);
  }

  static async deleteAptitude(id: string): Promise<ApiResponse> {
    return await deleteApi(apiEndPoints.aptitude.deleteAptitude(id));
  }

  // Question Routes
  static async createQuestion(data: any): Promise<ApiResponse> {
    return await postApi(apiEndPoints.question.createQuestion, data);
  }

  static async getPaginatedQuestions(params: {
    page: number;
    limit: number;
  }): Promise<ApiResponse> {
    return await getByParamsApi(apiEndPoints.question.getPaginatedQuestions, params);
  }

  static async getQuestion(id: string): Promise<ApiResponse> {
    return await getByIdApi(apiEndPoints.question.getQuestionById(id), id);
  }

  static async getQuestionsByAptitude(aptitudeId: string): Promise<ApiResponse> {
    return await getApi(apiEndPoints.question.getQuestionsByAptitude(aptitudeId));
  }

  static async updateQuestion(id: string, data: any): Promise<ApiResponse> {
    return await putApi(apiEndPoints.question.updateQuestion(id), data);
  }

  static async deleteQuestion(id: string): Promise<ApiResponse> {
    return await deleteApi(apiEndPoints.question.deleteQuestion(id));
  }

  // Option Routes
  static async createOption(data: any): Promise<ApiResponse> {
    return await postApi(apiEndPoints.option.createOption, data);
  }

  static async getOptionsByQuestion(questionId: string): Promise<ApiResponse> {
    return await getApi(apiEndPoints.option.getOptionsByQuestion(questionId));
  }

  static async getOption(id: string): Promise<ApiResponse> {
    return await getByIdApi(apiEndPoints.option.getOptionById(id), id);
  }

  static async updateOption(id: string, data: any): Promise<ApiResponse> {
    return await putApi(apiEndPoints.option.updateOption(id), data);
  }

  static async deleteOption(id: string): Promise<ApiResponse> {
    return await deleteApi(apiEndPoints.option.deleteOption(id));
  }

  // User Aptitude Details Routes
  static async createUserAptitudeDetails(data: any): Promise<ApiResponse> {
    return await postApi(apiEndPoints.userAptitudeDetails.createUserAptitudeDetails, data);
  }

  static async getUserAptitudeDetails(userId: string): Promise<ApiResponse> {
    return await getApi(apiEndPoints.userAptitudeDetails.getUserAptitudeDetails(userId));
  }

  static async updateUserAptitudeDetails(userId: string, data: any): Promise<ApiResponse> {
    return await putApi(apiEndPoints.userAptitudeDetails.updateUserAptitudeDetails(userId), data);
  }

  static async deleteUserAptitudeDetails(userId: string): Promise<ApiResponse> {
    return await deleteApi(apiEndPoints.userAptitudeDetails.deleteUserAptitudeDetails(userId));
  }

  // Contest Routes
  static async createContest(data: any): Promise<ApiResponse> {
    return await postApi(apiEndPoints.contest.createContest, data);
  }

  static async getAllContests(): Promise<ApiResponse> {
    return await getApi(apiEndPoints.contest.getAllContests);
  }

  static async getContest(id: string): Promise<ApiResponse> {
    return await getByIdApi(apiEndPoints.contest.getContestById(id), id);
  }

  static async updateContest(id: string, data: any): Promise<ApiResponse> {
    return await putApi(apiEndPoints.contest.updateContest(id), data);
  }

  static async deleteContest(id: string): Promise<ApiResponse> {
    return await deleteApi(apiEndPoints.contest.deleteContest(id));
  }

  // Contest Problems Routes
  static async createContestProblems(data: any): Promise<ApiResponse> {
    return await postApi(apiEndPoints.contestProblems.createContestProblems, data);
  }

  static async getContestProblemsByYear(params: {
    contestId: string;
    year: number;
  }): Promise<ApiResponse> {
    return await getByParamsApi(apiEndPoints.contestProblems.getContestProblemsByYear, params);
  }

  static async getAllContestProblems(contestId: string): Promise<ApiResponse> {
    return await getApi(apiEndPoints.contestProblems.getAllContestProblems(contestId));
  }

  static async updateContestProblem(id: string, data: any): Promise<ApiResponse> {
    return await putApi(apiEndPoints.contestProblems.updateContestProblem(id), data);
  }

  static async deleteContestProblem(id: string): Promise<ApiResponse> {
    return await deleteApi(apiEndPoints.contestProblems.deleteContestProblem(id));
  }

  // Coding Question Routes
  static async createCodingQuestion(data: any): Promise<ApiResponse> {
    return await postApi(apiEndPoints.codingQuestionRoutes.createCodingQuestion, data);
  }

  static async getAllCodingQuestions(): Promise<ApiResponse> {
    return await getApi(apiEndPoints.codingQuestionRoutes.getAllCodingQuestions);
  }

  static async getCodingQuestionsByContest(contestId: string): Promise<ApiResponse> {
    return await getApi(apiEndPoints.codingQuestionRoutes.getCodingQuestionsByContest(contestId));
  }

  static async updateCodingQuestion(id: string, data: any): Promise<ApiResponse> {
    return await putApi(apiEndPoints.codingQuestionRoutes.updateCodingQuestion(id), data);
  }

  static async deleteCodingQuestion(id: string): Promise<ApiResponse> {
    return await deleteApi(apiEndPoints.codingQuestionRoutes.deleteCodingQuestion(id));
  }

  // Test Cases Routes
  static async createTestCase(data: any): Promise<ApiResponse> {
    return await postApi(apiEndPoints.testCases.createTestCase, data);
  }

  static async getAllTestCasesForProblem(contestProblemId: string): Promise<ApiResponse> {
    return await getApi(apiEndPoints.testCases.getAllTestCasesForProblem(contestProblemId));
  }

  static async updateTestCase(id: string, data: any): Promise<ApiResponse> {
    return await putApi(apiEndPoints.testCases.updateTestCase(id), data);
  }

  static async deleteTestCase(id: string): Promise<ApiResponse> {
    return await deleteApi(apiEndPoints.testCases.deleteTestCase(id));
  }

  //notifications
  static async subscribeUser(data: any): Promise<ApiResponse> {
    return await postApi(apiEndPoints.notification.subscribe, data);
  }

  static async sendNotifications(data: any): Promise<ApiResponse> {
    return await postApi(apiEndPoints.notification.sendNotifications, data);
  }

  static async getNotification(userId: string): Promise<ApiResponse> {
    return await getApi(apiEndPoints.notification.getNotifications(userId));
  }
}
