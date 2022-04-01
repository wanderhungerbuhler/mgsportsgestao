import { Flex, Box, Heading, Text, Stack, Button, useToast } from "@chakra-ui/react";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import app from "../../services/AuthFirebase";
import { getFirestore, addDoc, collection } from "firebase/firestore";

import { Input } from "../../components/Form/Input";

interface RegisterAthleteData {
  nome_completo: string;
  rg: string;
  cpf: string;
  tipo_sanguineo: string;
  endereco: string;
  numero: string;
  estado: string;
  nome_mae_completo: string;
  nome_pai_completo: string;
  altura: string;
  peso: string;
  imc: string;
  escolaridade: string;
  turno_escolaridade: string;
  clubes: string;
}

const schema = Yup.object().shape({
  nome_completo: Yup.string().required('O Nome completo é obrigatório'),
  rg: Yup.string().required('O RG é obrigatório'),
  cpf: Yup.string().required('O CPF é obrigatório'),
  tipo_sanguineo: Yup.string().required('O Tipo Sanguíneo é obrigatório'),
  endereco: Yup.string().required('O Endereço é obrigatório'),
  numero: Yup.string().required('O Nº é obrigatório'),
  estado: Yup.string().required('O Estado é obrigatório'),
  nome_mae_completo: Yup.string().required('O Nome da Mãe é obrigatório'),
  nome_pai_completo: Yup.string().optional(),
  altura: Yup.string().required('A Altura é obrigatório'),
  peso: Yup.string().required('O Peso é obrigatório'),
  imc: Yup.string().required('O IMC é obrigatório'),
  escolaridade: Yup.string().required('A Escolaridade é obrigatória'),
  turno_escolaridade: Yup.string().required('O Turno em que Estuda, é obrigatória'),
  clubes: Yup.string().required('O Clube é obrigatório (e não esqueça de separar por vírgulas)'),
})

export function Register() {
  const { register, handleSubmit, formState, reset, resetField } = useForm({
    resolver: yupResolver(schema)
  });

  const { errors } = formState;

  const toast = useToast();

  const handleRegisterAthlete: SubmitHandler<RegisterAthleteData | FieldValues> = async (data, event) => {
    event?.preventDefault();

    const db = getFirestore(app);
    await addDoc(collection(db, "atletas"), {
      nome_completo: data?.nome_completo,
      rg: data?.rg,
      cpf: data?.cpf,
      tipo_sanguineo: data?.tipo_sanguineo,
      endereco: data?.endereco,
      numero: data?.numero,
      estado: data?.estado,
      nome_mae_completo: data?.nome_mae_completo,
      nome_pai_completo: data?.nome_pai_completo,
      altura: data?.altura,
      peso: data?.peso,
      imc: data?.imc,
      escolaridade: data?.escolaridade,
      turno_escolaridade: data?.turno_escolaridade,
      clubes: data?.clubes
    })

    reset();
    resetField('');

    toast({
      position: 'top-right',
      title: 'Atleta registrado.',
      description: "Um novo atleta já faz parte do seu clube!",
      status: 'success',
      duration: 2000,
      isClosable: true,
    });


  }

  return (
    <Flex w={["1280", "100"]} m="auto" direction="column">
      <Box borderWidth={.1} borderRadius={7} borderColor="gray.700" bg="gray.900" mt="10" mb="7" p="7">
        <Heading size="lg">Registrar Atletas</Heading>
        <Text width={["sm", "sm"]} mt="4" color="gray.500" fontSize="md">Não se esqueça, o cadastro dos atletas é importante para o
          acompanhamento e evolução deles dentro e fora de campo!
        </Text>
      </Box>

      <Flex m={["0", "0", "auto"]}>
        <Stack direction={["column", "column", "row"]} spacing="7">
          <Box w={[350, 470, 580]} minHeight="500">
            <Input label="Nome Completo" placeholder="Nome Completo" error={errors?.nome_completo} {...register('nome_completo')} />
            <Input label="RG" placeholder="RG" error={errors?.rg} {...register('rg')} />
            <Input label="CPF" placeholder="CPF" error={errors?.cpf} {...register('cpf')} />
            <Input label="Tipo Sanguíneo" placeholder="Ex: A, A-, A+..." error={errors?.tipo_sanguineo} {...register('tipo_sanguineo')} />
            <Input label="Endereço" placeholder="Ex: Av. Ayrton Senna" error={errors?.endereco} {...register('endereco')} />

            <Stack direction="row">
              <Input label="Nº" placeholder="Ex: 123" error={errors?.numero} {...register('numero')} />
              <Input label="Estado" placeholder="Ex: Rio de Janeiro" error={errors?.estado} {...register('estado')} />
            </Stack>
          </Box>

          <Box w={[350, 470, 580]} minHeight="500">
            <Input label="Nome da Mãe Completo" placeholder="Nome da Mãe Completo" error={errors?.nome_mae_completo} {...register('nome_mae_completo')} />
            <Input label="Nome do Pai Completo (Opcional)" placeholder="Nome do Pai Completo (Opcional)" error={errors?.nome_pai_completo} {...register('nome_pai_completo')} />

            <Stack direction="row">
              <Input label="Altura (m)" placeholder="Altura (m)" error={errors?.altura} {...register('altura')} />
              <Input label="Peso (Kg)" placeholder="Peso (Kg)" error={errors?.peso} {...register('peso')} />
              <Input label="IMC" placeholder="IMC" error={errors?.imc} {...register('imc')} />
            </Stack>

            <Input label="Grau de Escolaridade" placeholder="Ex: Ensino Médio, Ensino Completo" error={errors?.escolaridade} {...register('escolaridade')} />
            <Input label="Turno de Escolaridade" placeholder="Ex: Manhã, Tarde ou Noite(EJA)" error={errors?.turno_escolaridade} {...register('turno_escolaridade')} />
            <Input label="Clubes (Separados por vírgulas)" placeholder="Ex: MG Sports, Flamengo" error={errors?.clubes} {...register('clubes')} />

            <Flex justify="flex-end">
              <Button
                mt="6"
                mb="10"
                outline="none"
                _focus={{
                  outline: "none"
                }}
                type="submit"
                bg="gray.200"
                color="gray.900"
                size="lg"
                isLoading={formState.isSubmitting}
                onClick={handleSubmit(handleRegisterAthlete)}
              >Registrar Atleta</Button>
            </Flex>

          </Box>
        </Stack>
      </Flex>
    </Flex>
  )
}
