class UserDTO{
	constructor(user){
		this.firstName = user.firstName || "";
		this.lastName = user.lastName || "";
		this.fullName = this.firstName +" "+this.lastName;
		this.email = user.email || "";
		this.password = user.password || "";
		this.birthday = user.birthday || "";
		this.address = user.address || "";
		this.phone = user.phone || "";
		this.role = user.role || "user";
		this.social = user.social || "local";
		this.recoveryCode = user.recoveryCode || null;
		this.lastConnection = new Date();
	}
}

export default UserDTO