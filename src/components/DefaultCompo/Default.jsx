import React from "react";
import { Header } from "../HeaderCompo/Header";


export const Default = ({children}) => {
    return (
        <div>
            <Header /> {children}
        </div>
    );
};
