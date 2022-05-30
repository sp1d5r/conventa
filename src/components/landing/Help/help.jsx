import './help.css';
import React from "react";

function Help() {
    return (
        <div className={"help-div"}>
            <div className={"help-top-div"}>
                <span className={"help-top-text-reverse"}>
                    WE ARE HERE TO <span className={"help-top-text"}>HELP</span>!
                </span>
                <p className={"help-top-bottom"}>
                    “Quote about reading body language efficiently” - Einshien
                </p>
            </div>
            <div className={"help-bottom-div"}>
                <div className={"help-card"}>
                    <div className={"help-card-top"}>
                        <img src={require("../../../assets/Illustrations/why1.png")} alt={"Illusatration part 1"} />
                    </div>
                    <div className={"help-card-bottom"}>
                        This is going to be about using the
                        courses to develop a solid basis
                    </div>
                </div>
                <div className={"help-card"}>
                    <div className={"help-card-top"}>
                        <img src={require("../../../assets/Illustrations/why2.png")} alt={"Illusatration part 2"} />
                    </div>
                    <div className={"help-card-bottom"}>
                        This one is more about using the
                        minigames to consolidate your
                        material
                    </div>
                </div>
                <div className={"help-card"}>
                    <div className={"help-card-top"}>
                        <img src={require("../../../assets/Illustrations/why3.png")} alt={"Illusatration part 3"} />
                    </div>
                    <div className={"help-card-bottom"}>
                        This one is more about using the
                        reminders to do a game once a day
                        to build up the goal
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Help;
