import { Spinner } from "react-bootstrap";

export const Loading = () => {
    return (
        <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            variant="warning"
            aria-hidden="true"
        />
    );
};
