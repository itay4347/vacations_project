class LikedVacation {
    public id:number;
    public userId:number;
    public vacationId:number;

    public constructor(likedVacation:LikedVacation){
        this.id = likedVacation.id
        this.userId = likedVacation.userId;
        this.vacationId = likedVacation.vacationId;
    }
}

export default LikedVacation;