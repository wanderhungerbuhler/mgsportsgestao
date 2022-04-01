import React, { forwardRef, ForwardRefRenderFunction, ReactNode } from 'react';
import { FormControl, FormErrorMessage, FormLabel, InputGroup, InputLeftElement, Input as ChackraInput, InputProps as ChackraInputProps } from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

import { IconBaseProps } from 'react-icons';

interface InputProps extends ChackraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
  icon?: ReactNode;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = ({ name, label, icon: Icon, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={name} mt="3" color="gray.600">{label}</FormLabel>}
      <InputGroup>
        {Icon && <InputLeftElement
          pointerEvents='none'
          children={Icon}
          color="gray.600"
          mt="1"
        />}
        <ChackraInput
          borderWidth={.1}
          name={name}
          id={name}
          focusBorderColor="gray.700"
          variant="filled"
          size="lg"
          bg="gray.800"
          color="gray.500"
          _placeholder={{
            color: "gray.700"
          }}
          _hover={{
            bg: "gray.800"
          }}
          ref={ref}
          {...rest}
        />
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase);
