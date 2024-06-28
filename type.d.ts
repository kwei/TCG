interface PGReq {
	action: "set" | "delete" | "get";
	RoomID: string;
	data: Room;
}

interface Room {
	RoomID: string;
	UserName: string;
	ICE: RTCIceCandidate;
	SDP: RTCSessionDescription;
	Timestamp: string;
}

interface Message {
	userName: string;
	message: string;
	timestamp: number;
}