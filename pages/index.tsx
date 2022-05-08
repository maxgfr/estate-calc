import {
  Box,
  FormControl,
  FormLabel,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  getTotalFeesMortgage,
  getMonthlyMortgagePayment,
  getRevenuPerMonth,
  getTotalPrice,
  getTotalPriceMortgage,
  getProfitability,
  getInitialContribution,
} from "../utils";

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
      {
        key: "bankLoan",
        name: "Montant emprunté (avec assurance comprise)",
        step: 1000,
      },
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
  [key in Key]: string | number;
};

const Home: NextPage = () => {
  const router = useRouter();
  const [state, setState] = useState<State>({} as State);

  useEffect(() => {
    setState(router.query as unknown as State);
  }, [router.query]);

  const onChangeState = (key: string, value: string) => {
    setState({ ...state, [key]: value });
    router.replace(
      {
        query: { ...router.query, [key]: value },
      },
      undefined,
      { shallow: true }
    );
  };

  const totalPrice = useMemo(
    () => getTotalPrice(state.housingPrice, state.notaryFees, state.houseWorks),
    [state.houseWorks, state.housingPrice, state.notaryFees]
  );

  const initialContribution = useMemo(
    () => getInitialContribution(state.bankLoan, totalPrice),
    [state.bankLoan, totalPrice]
  );

  const monthlyMortgagePayment = useMemo(
    () =>
      getMonthlyMortgagePayment(
        state.bankLoan,
        state.bankRate,
        state.bankLoanPeriod
      ),
    [state.bankLoan, state.bankRate, state.bankLoanPeriod]
  );

  const totalFeesMortgage = useMemo(
    () =>
      getTotalFeesMortgage(
        state.bankLoan,
        state.bankLoanPeriod,
        monthlyMortgagePayment
      ),
    [state.bankLoan, state.bankLoanPeriod, monthlyMortgagePayment]
  );

  const totalPriceMortgage = useMemo(
    () => getTotalPriceMortgage(state.bankLoan, totalFeesMortgage),
    [state.bankLoan, totalFeesMortgage]
  );

  const revenuPerMonth = useMemo(
    () => getRevenuPerMonth(state.rent, state.rentalCharges, state.propertyTax),
    [state.rent, state.rentalCharges, state.propertyTax]
  );

  const profitabilityCredit = useMemo(
    () =>
      getProfitability(revenuPerMonth, totalPriceMortgage, initialContribution),
    [revenuPerMonth, totalPriceMortgage, initialContribution]
  );

  return (
    <Box
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
                  onChange={valueString => onChangeState(key, valueString)}
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
      <UnorderedList marginBottom="10px">
        <ListItem fontSize="large">{`Coût total de l’investissement: ${totalPrice} €`}</ListItem>
        <ListItem fontSize="large">{`Apport: ${initialContribution} €`}</ListItem>
        <ListItem fontSize="large">{`Coût total du crédit: ${totalPriceMortgage} € (dont ${totalFeesMortgage} € d'intérêts)`}</ListItem>
        <ListItem fontSize="large">{`Mensualité du prêt: ${monthlyMortgagePayment} €`}</ListItem>
        <ListItem fontSize="large">{`Revenu locatif mensuel brut : ${revenuPerMonth} €`}</ListItem>
        <ListItem fontSize="large">{`Rentabilité brut : ${profitabilityCredit} %`}</ListItem>
      </UnorderedList>
    </Box>
  );
};

export default Home;
