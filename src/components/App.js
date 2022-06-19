import { Button, Container, makeStyles } from "@material-ui/core";
import React, { useState } from "react";
import { GameBar } from "./GameBar";
import { GameBoard } from "./GameBoard";
import { useDisableZoom } from "./useDisableZoom";
import { ethers } from "ethers";
import erc20abi from "../abi/ERC20abi.json";
import contract from "../abi/contract_info.json";

const useStyles = makeStyles((theme) => ({
  root: {
    touchAction: "none",
  },
}));

export const App = () => {
  const classes = useStyles();
  const [tokens, setTokens] = useState(14);
  const [balanceInfo, setBalanceInfo] = useState({
    address: "-",
    balance: "-"
  })

  const getMyBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const erc20 = new ethers.Contract(contract.address, erc20abi, provider);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const balance = await erc20.balanceOf(signerAddress);

    setBalanceInfo({
      address: signerAddress,
      balance: String(balance)
    });
  };

  useDisableZoom();

  return (
    <Container maxWidth="xs" disableGutters className={classes.root}>
      <h1 style={{textAlign: 'center'}}>ADU Game</h1>
      <h2 style={{textAlign: 'center'}}>Заработано токенов: {balanceInfo.balance}</h2>
      <Button onClick={getMyBalance}>Проверить</Button>
      <GameBar />
      <GameBoard />
    </Container>
  );
};
