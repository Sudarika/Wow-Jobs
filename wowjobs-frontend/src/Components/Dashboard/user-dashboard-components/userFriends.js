import AddUserFriends from "./userProfile/AddUserFriends";
import ShowUserFriends from "./userProfile/ShowUserFriends";
import React from "react";

export default function UserFriends () {

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col">
                </div>
                <div className="col-3">
                    <div className="rounded-5 bg-warning text-dark fw-bold fs-5 text-center border-dark border-3 p-2">Find Friends</div>
                </div>
                <div className="col">
                </div>
            </div>

            <div className="row">
            <div className="col-9">
                    <AddUserFriends/>
                </div>
                <div className="col">
                    <ShowUserFriends/>
                </div>
            </div>

        </div>
    );

}