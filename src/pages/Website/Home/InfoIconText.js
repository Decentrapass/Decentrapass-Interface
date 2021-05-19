import { AiFillSafetyCertificate } from "react-icons/ai";
import { GoKey } from "react-icons/go";
import { BsLightningFill } from "react-icons/bs";
import { FaVoteYea, FaSuitcaseRolling } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";

import { Link } from "react-router-dom";

export const ITEM = [
  {
    icon: <AiFillSafetyCertificate />,
    title: "Secure & protected",
    content:
      "Thanks to AES encryption (the encryption used by the U.S. government), we achieve one of the most secure password cyphering in the world. This allows for safe password storing in the Ethereum network, which is virtually impossible to destroy.",
  },
  {
    icon: <GoKey />,
    title: "You are in control",
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
    title: "Fast & easy",
    content:
      "Since this project is fully decentralized, we don't to follow KYC guidelines, so to use this project you just need an ethereum wallet, a hard password you can remember, and you are ready to go!",
  },
  {
    icon: <FaSuitcaseRolling />,
    title: "Plug and play",
    content: (
      <>
        <span className="align-middle">
          Thanks to the project being in the ethereum network, it is fairly easy
          to set up in a new device. Just install and log into metamask
        </span>
        <IoIosArrowForward className="inline text-lg align-middle" />
        <span className="align-middle"> type in your password!</span>
      </>
    ),
  },
  {
    icon: <FaVoteYea />,
    title: "User governance",
    content:
      "Through our token SAFE we allow all our users to have a voice in deciding the future upgrades and changes of this platform.",
  },
  {
    icon: <BiSearchAlt />,
    title: "Full transparency",
    content: (
      <>
        Using the{" "}
        <Link to="/docs" className="text-green-500 hover:underline">
          developer
        </Link>{" "}
        option, users can see what the dApp is doing at all times, including the
        cyphering, contract calls, etc.
      </>
    ),
  },
];
