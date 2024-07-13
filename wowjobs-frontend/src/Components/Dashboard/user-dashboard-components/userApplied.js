import UserGetAppliedJobs from "./UserFindJobs/UserGetAppliedJobs";
import UserGetAcceptedJobs from "./UserFindJobs/UserGetAcceptedJobs";
import UserRejectedJobs from "./UserFindJobs/UserRejectedJobs";

export default function UserApplied() {
    return (
        <div>
            <div>
                <div className="row">
                    <div className="col-9">
                        <UserGetAppliedJobs/>
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
        </div>
    );
}