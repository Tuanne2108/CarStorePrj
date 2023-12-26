import React from "react";
import { Form } from "react-bootstrap";
import { Rate } from "antd";

export const NavBar = () => {
    const renderContent = (type, options) => {
        switch (type) {
            case "text":
                return options.map((option, index) => (
                    <div key={index}>{option}</div>
                ));
            case "checkbox":
                return (
                    <Form>
                        {options.map((option) => (
                            <div key={`${option}`} className="mb-3">
                                <Form.Check
                                    id={`${option}`}
                                    value={`${option.value}`}
                                    label={`${option.label}`}
                                    onChange={null}
                                />
                            </div>
                        ))}
                    </Form>
                );
            case "rating":
                return options.map((option) => {
                    return (
                        <div>
                            <Rate disabled defaultValue={option} />
                            <span style={{marginLeft:'7px'}}>From {option} star</span>
                        </div>
                    );
                });
            case "price":
                return options.map((option)=>{
                    return (
                        <div className="priceRange">
                            {option}
                        </div>
                    )
                })
            default:
                return {};
        }
    };

    return (
        <div className="productCategory">
            <h4>Categories</h4>
            {renderContent("text", [
                "THERMAL INSULATION FILM",
                "CERAMIC COATING",
                "RUST-PROOF UNDERCOVER",
                "CAR GLASS CARE",
                "CAR BODY CARE",
            ])}
            {renderContent("checkbox", [
                {
                    label: "A",
                    value: "abc",
                },
                {
                    label: "B",
                    value: "def",
                },
            ])}
            {renderContent("rating", [5, 4, 3])}
            {renderContent("price", ['From $10-$100', 'From $100-$1000', 'Greater than $1000'])}
        </div>
    );
};
