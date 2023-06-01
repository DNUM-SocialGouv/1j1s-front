export interface VideoService {
	isAllowed(): boolean;
	allow(): void;
}
