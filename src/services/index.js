import { getJson, postJson } from "../utils/request";
import apiObject from "../constants/api";

export async function topicsService() {
  let result = await getJson(apiObject.topics);
  return result;
}