import React from "react";

const isRole = (role: string) => {
    if(role === "buyer") {
        return true;
    } else if (role === "seller") {
        return true
    } else return false;
}

export default isRole;