import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;
import { apiClient } from "../intercepters/Intercepter";


// Sign Up API
export const signUpApi = async (formData) => {return axios.post(`${BASE_URL}/api/signup/`, formData);}; 

// Sign In API
export const signInApi = async (formData)=>{return axios.post(`${BASE_URL}/api/signin/`, formData);};

// Verify Email API
export const verifyEmailApi = async (formData) => {return axios.post(`${BASE_URL}/api/verify-email/`, formData);};

// Create Event API
export const createEventApi = async (formData, headers) =>{return apiClient.post(`${BASE_URL}/api/events/`, formData, {headers});};

// Update Event Api

export const updateEventApi = async(id, updateData, headers)=>{return apiClient.patch(`${BASE_URL}/api/events/${id}/`, updateData, {headers})}

// Get One Event

export const getEventApi = async(postId, headers)=>{return apiClient.get(`${BASE_URL}/api/events/${postId}`, {headers})}


// Get All Event

export const getAllEventApi = async(headers)=>{return apiClient.get(`${BASE_URL}/api/events/`, {headers})}


// Delete Event

export const getDeleteEventApi = async(postId, headers)=>{return apiClient.delete(`${BASE_URL}/api/events/${postId}/`, {headers})}


// Refresh Token

export const refreshTokenApi = async(refresh, headers)=>{return axios.post(`${BASE_URL}/api/refresh/`, refresh, {headers})}

