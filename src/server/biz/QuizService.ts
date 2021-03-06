import config from "config";
import { PoolConnection, ResultSetHeader } from "mysql2/promise";
import { Transactional } from "../../framework/biz/@Transactional";
import { Rest } from "../../framework/biz/@Rest";
import { Response } from "../../framework/biz/Response";
import { LeafQuizDao } from "../dao/LeafQuizDao";
import { LeafQuiz } from "../dto/generated/LeafQuiz";

export class QuizService {
  connection!: PoolConnection;

  @Rest("/v1/QuizService/getAll", "get")
  @Transactional("connection")
  async getAll(): Promise<Response<LeafQuiz[]>> {
    /* const result = "quiz"; */
    const dao = new LeafQuizDao(this.connection);
    const result = await dao.selectAll();
    return new Response<LeafQuiz[]>(result);
  }
  @Rest("/v1/QuizService/getById", "get")
  @Transactional("connection")
  async getById(id: number): Promise<Response<LeafQuiz>> {
    /* const result = "quiz"; */
    const dao = new LeafQuizDao(this.connection);
    const result = await dao.selectById(id);
    return new Response<LeafQuiz>(result);
  }
  @Rest("/v1/QuizService/quizUpdate", "post")
  @Transactional("connection")
  async quizUpdate(value: LeafQuiz): Promise<Response<number>> {
    const dao = new LeafQuizDao(this.connection);
    const result = await dao.update(value);
    const affectedRows = result.affectedRows;
    return new Response<number>(affectedRows);
  }
}
