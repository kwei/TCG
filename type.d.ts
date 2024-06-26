interface PGReq {
	action: "set" | "delete" | "get";
	RoomID: number;
	data: Room;
}

interface Room {
	RoomID: number;
	UserName: string;
	ICE: string;
	SDP: string;
	Timestamp: string;
}