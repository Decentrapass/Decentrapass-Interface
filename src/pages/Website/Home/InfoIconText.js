import { AiFillSafetyCertificate } from "react-icons/ai";
import { GoKey } from "react-icons/go";
import { BsLightningFill } from "react-icons/bs";
import { FaVoteYea } from "react-icons/fa";

export const ITEM = [
  {
    icon: <AiFillSafetyCertificate />,
    title: "Safe blockchain password storing",
    content:
      "Thanks to AES encryption (the encryption used by the U.S. government), we achieve one of the most secure password cyphering in the world. This allows for safe password storing in the Ethereum network.",
  },
  {
    icon: <GoKey />,
    title: "Not your keys, not your passwords",
    content: (
      <>
        Decentrapass was created following the same concept of
        <span className="italic"> "not your keys, not your coins" </span>. You
        are only in full control of your passwords using a protocol like
        decentrapass: your passwords are fully managed and owned by you.
      </>
    ),
  },
  {
    icon: <BsLightningFill />,
    title: "Fast, easy, and anonymus setup",
    content:
      "Since this project is fully decentralized, we don't to follow KYC guidelines, so to use this project you just need an ethereum wallet, a hard password you can remember, and you are ready to go!",
  },
  {
    icon: <FaVoteYea />,
    title: "User-driven network governance",
    content:
      "Through our token SAFE we allow all our users to have a voice in deciding future upgrades, changes, and more. ",
  },
  {
    icon: <FaVoteYea />,
    title: "User-driven network governance",
    content:
      "Through our token SAFE we allow all our users to have a voice in deciding future upgrades, changes, and more. ",
  },
  {
    icon: <FaVoteYea />,
    title: "User-driven network governance",
    content:
      "Through our token SAFE we allow all our users to have a voice in deciding future upgrades, changes, and more. ",
  },
];
