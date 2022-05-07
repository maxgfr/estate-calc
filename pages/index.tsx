import {
  Box,
  FormControl,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { loanInterestCalculator, loanPaymentCalculator } from "../utils";

const pattern = [
  {
    title: "Achat 🏠",
    value: [
      { key: "housingPrice", name: "Prix du logement", step: 1000 },
      { key: "notaryFees", name: "Frais notariaux", step: 1000 },
      { key: "houseWorks", name: "Travaux", step: 1000 },
    ],
  },
  {
    title: "Crédit 💳",
    value: [
      { key: "bankContribution", name: "Apport", step: 1000 },
      { key: "bankLoan", name: "Montant emprunté", step: 1000 },
      { key: "bankRate", name: "Taux", step: 0.1 },
      { key: "bankLoanPeriod", name: "Durée du prêt (en année)", step: 1 },
    ],
  },
  {
    title: "Location 💰",
    value: [
      { key: "rent", name: "Loyer annuelle (charges comprises)", step: 100 },
      {
        key: "rentalCharges",
        name: "Charges annuelle de copropriété",
        step: 100,
      },
      {
        key: "propertyTax",
        name: "Taxe foncière",
        step: 100,
      },
    ],
  },
] as const;

type Key = typeof pattern[number]["value"][number]["key"];

type State = {
  [key in Key]: number;
};

const Home: NextPage = () => {
  const router = useRouter();
  const [state, setState] = React.useState<State>({} as State);

  useEffect(() => {
    setState(router.query as unknown as State);
  }, [router.query]);

  const onChangeState = (key: string, value: number) => {
    setState({ ...state, [key]: value });
    router.replace(
      {
        query: { ...router.query, [key]: value },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <Box
      ref={ref}
      display="flex"
      flexDirection="column"
      maxWidth="1400px"
      marginX="auto"
      paddingX={"10vw"}
      paddingY={"2vw"}
    >
      <Head>
        <title>Rentabilité immobilière</title>
      </Head>
      <Text alignSelf={"center"} fontSize="6xl" fontWeight={"extrabold"}>
        Calcul de rentabilité immobilière
      </Text>
      {pattern.map(pattern => (
        <Box key={pattern.title} marginTop={"40px"}>
          <Text fontSize="3xl" fontWeight={"bold"}>
            {pattern.title}
          </Text>
          {pattern.value.map(({ key, name, step }) => (
            <Box key={key} marginTop={"15px"}>
              <FormControl variant="floating" isRequired>
                <FormLabel>{name}</FormLabel>
                <NumberInput
                  min={0}
                  step={step ?? 1000}
                  onChange={(_valueString, valueNumber) =>
                    onChangeState(key, valueNumber)
                  }
                  onBlur={e => {
                    e.preventDefault();
                  }}
                  value={state[key as keyof State]}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Box>
          ))}
        </Box>
      ))}

      <Text
        fontSize="3xl"
        fontWeight={"bold"}
        marginTop={"40px"}
        marginBottom={"10px"}
      >
        Résultat 🚀
      </Text>
      <Box marginBottom="10px">
        <Text fontSize="xl" fontWeight={"bold"} marginBottom="5px">
          Prêt
        </Text>
        <Text>
          Mensualité :{" "}
          {loanPaymentCalculator(
            state.bankLoan,
            state.bankRate,
            state.bankLoanPeriod
          )}
        </Text>
        <Text>
          Coût intérêt :{" "}
          {loanInterestCalculator(
            state.bankLoan,
            state.bankRate,
            state.bankLoanPeriod
          )}
        </Text>
      </Box>
    </Box>
  );
};

export default Home;
