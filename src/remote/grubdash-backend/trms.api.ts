import { Status } from './../../../../tuition-backend/src/models/request';
import ReimbursementRequest from "../../models/request";
import User from "../../models/user";
import trmsClient from "./trms.client";
import { v4 as uuidv4 } from 'uuid';

export var currentUser: User | undefined;

export const sendLogin = async (username: string, password: string): Promise<User> => {
  const {data: user} = await trmsClient.post<User>('/login', {
    username,
    password,
  });
  currentUser = user;
  return user;
}

export const sendReimbursementRequest = async (
  beneficiaryId: string,
  supervisorId: string,
  managerId: string,
  eventName: string,
  eventType: string,
  startDate: string,
  endDate: string,
  cost: number,
  bencoApproval: Status = 'Pending',
  managerApproval: Status = 'Pending',
  supervisorApproval: Status = 'Pending', id: string = uuidv4()): Promise<ReimbursementRequest> => {

  const {data: user} = await trmsClient.post<ReimbursementRequest>('/request', {
    beneficiaryId, supervisorId, managerId, eventName,
    eventType, startDate, endDate, cost, supervisorApproval, managerApproval, bencoApproval, id
  });

  return user;
}

export const getPendingRequests = async (): Promise<ReimbursementRequest[]> => {
  const userId = currentUser?.id;
  const {data: request} = await trmsClient.get('/pending/' + userId) ;
  return request;
}

export const getMyRequests = async (): Promise<ReimbursementRequest[]> => {
  const userId = currentUser?.id;
  const {data: request} = await trmsClient.get('/my_request/' + userId) ;
  return request;
}