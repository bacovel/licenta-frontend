import { IProfile } from './iprofile';

export interface ILoginDTO {
  token: string;
  refreshToken: string;
  profile: IProfile;
}
