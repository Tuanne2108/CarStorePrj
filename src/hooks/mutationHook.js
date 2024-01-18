import { useMutation } from "@tanstack/react-query";
import axios from "axios";


export const MutationHook = (fnCallback) => {
    const mutation = useMutation({
        mutationFn:fnCallback
    })
    return mutation
};


