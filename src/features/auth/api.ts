import { apiPost, apiGet } from '@/lib/api/client';
import { API } from '@/lib/api/endpoints';
import { MakerSchema } from '@/types/domain';
import type { Maker } from '@/types/domain';

interface OtpRequestResponse {
  requestId: string;
  expiresInSec: number;
}

export async function requestOtp(phone: string): Promise<OtpRequestResponse> {
  return apiPost<OtpRequestResponse>(API.authOtpRequest, { phone }, { skipAuth: true });
}

interface VerifyOtpResponse {
  accessToken: string;
  refreshToken: string;
  expiresInSec: number;
  maker: Maker;
}

export async function verifyOtp(requestId: string, code: string): Promise<VerifyOtpResponse> {
  const res = await apiPost<VerifyOtpResponse>(API.authOtpVerify, { requestId, code }, { skipAuth: true });
  // Validate at the boundary so contract drift surfaces here, not deep in the UI.
  res.maker = MakerSchema.parse(res.maker);
  return res;
}

export async function fetchMe(): Promise<Maker> {
  const data = await apiGet<unknown>(API.authMe);
  return MakerSchema.parse(data);
}
