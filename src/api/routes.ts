import { getApi, getByIdApi, getByParamsApi, postApi, putApi, deleteApi } from './api';
import { endPoints } from './apiEndpoints';

interface ApiResponse<T = any> {
  status: number;
  data: T;
}

export class ApiRoutes {
  // User Routes
  static async register(userData: any): Promise<ApiResponse> {
    return await postApi(endPoints.users.register, userData);
  }

  static async login(data: { email: string; password: string }): Promise<ApiResponse> {
    return await postApi(endPoints.users.login, data);
  }

  static async logout(): Promise<ApiResponse> {
    return await postApi(endPoints.users.logout, {});
  }

  static async requestPasswordReset(data: { email: string }): Promise<ApiResponse> {
    return await postApi(endPoints.users.requestPasswordReset, data);
  }

  static async resetPassword(data: { token: string; newPassword: string }): Promise<ApiResponse> {
    return await postApi(endPoints.users.resetPassword, data);
  }

  static async verifyToken(token: string): Promise<ApiResponse> {
    return await getApi(endPoints.users.verifyToken(token));
  }

  static async refreshToken(token: string): Promise<ApiResponse> {
    return await postApi(endPoints.users.refreshToken, { token });
  }

  static async getAllUsers(params: { page: number; limit: number }): Promise<ApiResponse> {
    return await getByParamsApi(endPoints.users.getAll, params);
  }

  static async checkUserShortlistStatus(params: {
    page: number;
    limit: number;
  }): Promise<ApiResponse> {
    return await getByParamsApi(endPoints.users.shortlist, params);
  }

  static async getUserDomain(params: {
    domain: string;
    page: number;
    limit: number;
  }): Promise<ApiResponse> {
    return await getByParamsApi(endPoints.users.domain, params);
  }

  static async getUserById(id: string): Promise<ApiResponse> {
    return await getByIdApi(endPoints.users.getById(id), id);
  }

  static async updateUser(id: string, userData: any): Promise<ApiResponse> {
    return await putApi(endPoints.users.update(id), userData);
  }

  static async deleteUser(id: string): Promise<ApiResponse> {
    return await deleteApi(endPoints.users.delete(id));
  }

  // Social Routes
  static async createSocialLink(userId: string, data: any): Promise<ApiResponse> {
    return await postApi(endPoints.social.createSocialLink(userId), data);
  }

  static async getAllSocialLinks(userId: string): Promise<ApiResponse> {
    return await getApi(endPoints.social.getAllSociallinks(userId));
  }

  static async updateSocialLink(id: string, data: any): Promise<ApiResponse> {
    return await putApi(endPoints.social.updateSocialLink(id), data);
  }

  static async deleteSocialLink(id: string): Promise<ApiResponse> {
    return await deleteApi(endPoints.social.deleteSocialLink(id));
  }

  // Aptitude Routes
  static async createAptitude(data: any): Promise<ApiResponse> {
    return await postApi(endPoints.aptitude.createAptitude, data);
  }

  static async getAllAptitudes(): Promise<ApiResponse> {
    return await getApi(endPoints.aptitude.getAllAptitudes);
  }

  static async getAptitudeBy(id: string): Promise<ApiResponse> {
    return await getByIdApi(endPoints.aptitude.getAptitudesById(id), id);
  }

  static async updateAptitude(id: string, data: any): Promise<ApiResponse> {
    return await putApi(endPoints.aptitude.updateAptitude(id), data);
  }

  static async deleteAptitude(id: string): Promise<ApiResponse> {
    return await deleteApi(endPoints.aptitude.deleteAptitude(id));
  }

  // Question Routes
  static async createQuestion(data: any): Promise<ApiResponse> {
    return await postApi(endPoints.question.createQuestion, data);
  }

  static async getPaginatedQuestions(params: {
    page: number;
    limit: number;
  }): Promise<ApiResponse> {
    return await getByParamsApi(endPoints.question.getPaginatedQuestions, params);
  }

  static async getQuestion(id: string): Promise<ApiResponse> {
    return await getByIdApi(endPoints.question.getQuestionById(id), id);
  }

  static async getQuestionsByAptitude(aptitudeId: string): Promise<ApiResponse> {
    return await getApi(endPoints.question.getQuestionsByAptitude(aptitudeId));
  }

  static async updateQuestion(id: string, data: any): Promise<ApiResponse> {
    return await putApi(endPoints.question.updateQuestion(id), data);
  }

  static async deleteQuestion(id: string): Promise<ApiResponse> {
    return await deleteApi(endPoints.question.deleteQuestion(id));
  }

  // Option Routes
  static async createOption(data: any): Promise<ApiResponse> {
    return await postApi(endPoints.option.createOption, data);
  }

  static async getOptionsByQuestion(questionId: string): Promise<ApiResponse> {
    return await getApi(endPoints.option.getOptionsByQuestion(questionId));
  }

  static async getOption(id: string): Promise<ApiResponse> {
    return await getByIdApi(endPoints.option.getOptionById(id), id);
  }

  static async updateOption(id: string, data: any): Promise<ApiResponse> {
    return await putApi(endPoints.option.updateOption(id), data);
  }

  static async deleteOption(id: string): Promise<ApiResponse> {
    return await deleteApi(endPoints.option.deleteOption(id));
  }

  // User Aptitude Details Routes
  static async createUserAptitudeDetails(data: any): Promise<ApiResponse> {
    return await postApi(endPoints.userAptitudeDetails.createUserAptitudeDetails, data);
  }

  static async getUserAptitudeDetails(userId: string): Promise<ApiResponse> {
    return await getApi(endPoints.userAptitudeDetails.getUserAptitudeDetails(userId));
  }

  static async updateUserAptitudeDetails(userId: string, data: any): Promise<ApiResponse> {
    return await putApi(endPoints.userAptitudeDetails.updateUserAptitudeDetails(userId), data);
  }

  static async deleteUserAptitudeDetails(userId: string): Promise<ApiResponse> {
    return await deleteApi(endPoints.userAptitudeDetails.deleteUserAptitudeDetails(userId));
  }

  // Contest Routes
  static async createContest(data: any): Promise<ApiResponse> {
    return await postApi(endPoints.contest.createContest, data);
  }

  static async getAllContests(): Promise<ApiResponse> {
    return await getApi(endPoints.contest.getAllContests);
  }

  static async getContest(id: string): Promise<ApiResponse> {
    return await getByIdApi(endPoints.contest.getContestById(id), id);
  }

  static async updateContest(id: string, data: any): Promise<ApiResponse> {
    return await putApi(endPoints.contest.updateContest(id), data);
  }

  static async deleteContest(id: string): Promise<ApiResponse> {
    return await deleteApi(endPoints.contest.deleteContest(id));
  }

  // Contest Problems Routes
  static async createContestProblems(data: any): Promise<ApiResponse> {
    return await postApi(endPoints.contestProblems.createContestProblems, data);
  }

  static async getContestProblemsByYear(params: {
    contestId: string;
    year: number;
  }): Promise<ApiResponse> {
    return await getByParamsApi(endPoints.contestProblems.getContestProblemsByYear, params);
  }

  static async getAllContestProblems(contestId: string): Promise<ApiResponse> {
    return await getApi(endPoints.contestProblems.getAllContestProblems(contestId));
  }

  static async updateContestProblem(id: string, data: any): Promise<ApiResponse> {
    return await putApi(endPoints.contestProblems.updateContestProblem(id), data);
  }

  static async deleteContestProblem(id: string): Promise<ApiResponse> {
    return await deleteApi(endPoints.contestProblems.deleteContestProblem(id));
  }

  // Coding Question Routes
  static async createCodingQuestion(data: any): Promise<ApiResponse> {
    return await postApi(endPoints.codingQuestionRoutes.createCodingQuestion, data);
  }

  static async getAllCodingQuestions(): Promise<ApiResponse> {
    return await getApi(endPoints.codingQuestionRoutes.getAllCodingQuestions);
  }

  static async getCodingQuestionsByContest(contestId: string): Promise<ApiResponse> {
    return await getApi(endPoints.codingQuestionRoutes.getCodingQuestionsByContest(contestId));
  }

  static async updateCodingQuestion(id: string, data: any): Promise<ApiResponse> {
    return await putApi(endPoints.codingQuestionRoutes.updateCodingQuestion(id), data);
  }

  static async deleteCodingQuestion(id: string): Promise<ApiResponse> {
    return await deleteApi(endPoints.codingQuestionRoutes.deleteCodingQuestion(id));
  }

  // Test Cases Routes
  static async createTestCase(data: any): Promise<ApiResponse> {
    return await postApi(endPoints.testCases.createTestCase, data);
  }

  static async getAllTestCasesForProblem(contestProblemId: string): Promise<ApiResponse> {
    return await getApi(endPoints.testCases.getAllTestCasesForProblem(contestProblemId));
  }

  static async updateTestCase(id: string, data: any): Promise<ApiResponse> {
    return await putApi(endPoints.testCases.updateTestCase(id), data);
  }

  static async deleteTestCase(id: string): Promise<ApiResponse> {
    return await deleteApi(endPoints.testCases.deleteTestCase(id));
  }
}
