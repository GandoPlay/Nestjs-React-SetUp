import {
  Flex,
  Input,
  Text,

  Button,
  Container,
  Stack,
  Box,
  Heading,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Auth } from '../../types';
import {createUser} from '../../api/userApi'
import { FormField } from "./FromField";




export const SignUp = () => {

  const AuthSchema: ZodType<Auth> = z.object({
    name: z.string().min(4).max(30),
    password: z.string().min(8).max(30),
  });

  const {
    register,
    handleSubmit,
    formState: {errors   },
  } = useForm<Auth>({
    resolver: zodResolver(AuthSchema),
  });
  const required = {
    value: true,
    message: "this field is required",
  };



  const {mutateAsync: signUp} = useMutation(createUser,
  
    {
      onSuccess:()=>{
        window.location.href = "/hello";
      }
    }
  )


  const submitData = async (data: Auth) => {
       await signUp(data);
  };


  return (
    <>
        <Box position={"relative"}>

      <Container
        as={Flex}
        justifyContent={"center"}
        alignItems={"center"}
        maxW={"100vh"}
        minH={"100vh"}
        py={{}}
      >
        <Stack
          bg={"gray.50"}
          rounded={"xl"}
          shadow={"dark-lg"}
          p={{ base: 4, sm: 6, md: 8 }}
          maxW={"600px"}
          w="100%"
          spacing={{ base: 8 }}
        >
          <form onSubmit={handleSubmit(submitData)}>
            <Stack spacing={4}>
              <Heading
                color={"gray.800"}
                lineHeight={1.1}
                textAlign={'center'}
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
              >
                Sign Up
                <Text
                  as={"span"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                >
                  
                </Text>
              </Heading>
            </Stack>
            <Box mt={10}>
              <Stack spacing={4}>
                <FormField label="name" error={errors?.name?.message}>
                  <Input dir ={'rtl'} focusBorderColor="pink.200" type="name" {...register("name", { required })} />
                  {errors.name && (
                    <Text color="red">{errors.name.message}</Text>
                  )}
                </FormField>

                <FormField label="password" error={errors?.name?.message}>
                  <Input dir ={'rtl'} focusBorderColor="pink.200" type="password" {...register("password", { required })} />
                  {errors.password && (
                    <Text color="red">{errors.password.message}</Text>
                  )}
                </FormField>

              </Stack>
              <br />
              <Button
                type="submit"
                fontFamily={"heading"}
                mt={8}
                w={"full"}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
              >
                Enter
              </Button>
            </Box>
          </form>
        </Stack>
      </Container>

    </Box>

    </>
  );
};

