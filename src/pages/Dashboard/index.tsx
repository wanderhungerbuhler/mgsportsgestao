import { Flex } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";

import { Header } from "../../components/Header";
import { Register } from "../../components/Register";

export function Dashboard() {
  return (
    <Flex w="100vw" h="100vh" direction="column">
      <Header />
      <Register />
    </Flex >
  )
}
