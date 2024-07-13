import UserGetAllJobs from "./UserFindJobs/UserGetAllJobs";
import UserGetAcceptedJobs from "./UserFindJobs/UserGetAcceptedJobs";
import UserRejectedJobs from "./UserFindJobs/UserRejectedJobs";

export default function UserFindJob () {
    return (
        <div>
            <div className="row">
                <div className="col-9">
                    <UserGetAllJobs />
                </div>
                <div className="col">
                    <div className="row">
                        <UserGetAcceptedJobs/>
                    </div>
                    <div className="row">
                        <UserRejectedJobs/>
                    </div>
                </div>
            </div>
        </div>
    );
}