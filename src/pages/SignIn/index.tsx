import { Button, Flex, Heading, Image, Stack, useToast } from "@chakra-ui/react";
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import app from "../../services/AuthFirebase";
import { getAuth, signInWithEmailAndPassword, setPersistence, browserLocalPersistence } from 'firebase/auth';

import { HiMail, HiLockClosed } from 'react-icons/hi';

import Logo from '../../assets/logo.svg';
import BgSoccerSignIn from '../../assets/bgSoccerSignIn.png';

import { Input } from "../../components/Form/Input";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
import { useEffect, useState } from "react";

interface SignInFormData {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string().email('Informe um e-mail válido').required('E-mail obrigatório'),
  password: Yup.string().min(6, 'A senha deve conter no mínimo 6 dígitos')
})

export function SignIn() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema)
  })

  const { errors } = formState;

  const toast = useToast();

  const { user } = useAuth();
  const navigate = useNavigate();

  { user && navigate("/dashboard") }

  const handleSignIn: SubmitHandler<SignInFormData | FieldValues> = async ({ email, password }, event) => {
    event?.preventDefault();

    const auth = getAuth(app);
    await signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast({
          position: 'top-right',
          title: 'Acesso autorizado',
          description: "Agora você pode navegar a vontade!",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      }).catch(error => {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          toast({
            position: 'top-right',
            title: 'Usuário não encontrado.',
            description: "E-mail ou senha inválidos!",
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      })
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center" backgroundImage={`url(${BgSoccerSignIn})`}
      backgroundPosition="right" backgroundRepeat="no-repeat">
      <Flex
        as="form"
        w="100%"
        maxWidth={380}
        p="8"
        borderRadius={7}
        direction="column"
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Image src={Logo} w={200} h={90} m="auto" mb="10" />

        <Input
          icon={<HiMail size={20} />}
          type="email"
          label="E-mail"
          placeholder="Digite o seu e-mail"
          error={errors?.email}
          {...register('email')}
        />
        <Input
          icon={<HiLockClosed size={20} />}
          type="password"
          label="Senha"
          placeholder="Digite a sua senha"
          error={errors?.password}
          {...register('password')}
        />

        <Button
          type="submit"
          mt="7"
          bg="gray.200"
          color="gray.900"
          size="lg"
          isLoading={formState.isSubmitting}
        >Acessar</Button>
      </Flex>
    </Flex>
  )
}
