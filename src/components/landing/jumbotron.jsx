import './jumbotron.css';
import React, {useState} from "react";

function Jumbotron() {
    return (
        <div className={"jumbo-wrapper"}>
            <span className={"jumbo-text-black"}>
                SEE WHAT EVERY
                <span className={"jumbo-text-white"}> BODY </span>
                IS TELLING YOU
            </span>
            <p className={"jumbo-sub-text"}>
                Trusted by experts in the field, backed by research conducted by the FBI and other trusted
                organisations .... BLAH BLAH BALH
            </p>
        </div>
    );
}

export default Jumbotron;
