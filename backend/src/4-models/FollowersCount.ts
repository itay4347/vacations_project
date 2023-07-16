class Followers_Count {
    public vacationId:number;
    public followersCount:number;

    public constructor(followerCount:Followers_Count){
        this.vacationId = followerCount.vacationId;
        this.followersCount = followerCount.followersCount;
    }
}

export default Followers_Count;