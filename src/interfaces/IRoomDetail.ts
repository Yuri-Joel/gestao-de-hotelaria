export interface IRoomDetail {
	userFullName: string;
	userCellNumber: string;
	reserveId: string;
	createdAt: Date;
	updatedAt: Date;
	agency: string | null;
	client: string | null;
	externReference: string;
	dailyValue: number;
	productValue: number;
	servicesValue: number;
	taxValue: number;
	stateId: number;
}