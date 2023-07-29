import { Spinner, Text} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getMe } from "../../api/userApi";



export const Hello: React.FC = ({
}) => {
    const {data:user, isLoading}= useQuery(['me'], getMe);

    if(isLoading){
        return(<Spinner></Spinner>)
    }

    return(
        <>
            <Text textAlign={'center'}>
            Welcome {user.name}
            </Text>
        </>
    );

};