import { Flex, Box, Image, Avatar, Stack, Text, Heading } from "@chakra-ui/react";

import { MdOutlineLogout } from 'react-icons/md';

import Logo from '../../assets/logo.svg';
import { useAuth } from "../../hooks/AuthContext";

export function Header() {
  const { user, logOut } = useAuth();

  return (
    <Flex w="100vw" h={90} bg="gray.800" align="center" justify="center">
      <Flex w={1280} p={["0", "10"]} align="center" justify="space-between">
        <Image src={Logo} w={100} h={90} />

        <Stack direction="row" spacing={50} alignItems="center">
          <Flex align="center" justify="center">
            <Stack direction="row" align="center" justifyContent="center" spacing="4">
              <Flex direction="column" align="flex-end">
                <Text fontSize="sm">Seja bem-vindo,</Text>
                <Text fontSize="sm" fontWeight="bold">{user?.displayName}</Text>
              </Flex>
              <Avatar name={user?.displayName} borderWidth={2} borderColor="gray.700" />
              <MdOutlineLogout size={25} cursor="pointer" onClick={() => logOut()} />
            </Stack>
          </Flex>
        </Stack>
      </Flex >
    </Flex >
  );
}
