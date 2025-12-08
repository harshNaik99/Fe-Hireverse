export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  gender: string;
  address: string;
  userType: "hr" | "candidate";
  designation: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data?: any;
  token?: string;
}
