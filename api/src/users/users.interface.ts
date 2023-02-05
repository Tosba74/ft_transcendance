import internal from "stream";

export interface UserModel {
    id?: number;

    display_name: string;
    login_name: string;
    password: string;

    avatar_url: string;

    tfa_enabled: boolean;
    tfa_email: string;
    tfa_code: string;

    status_id: number;
    status_updated_at: Date;
}
