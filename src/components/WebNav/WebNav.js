import { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";

import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false,
    };

    this.changeTheme = this.changeTheme.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  changeTheme() {
    let current = localStorage.getItem("theme");
    if (current !== "light") {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }

    if (localStorage.theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    this.setState({
      icon: localStorage.theme === "light" ? <FaMoon /> : <IoMdSunny />,
    });
  }

  handleScroll() {
    let scroll = document.getElementById("root").scrollTop;
    if (scroll > 30) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  }

  componentDidMount() {
    // To change styling
    document
      .querySelector("#root")
      .addEventListener("scroll", this.handleScroll.bind(this));
    this.handleScroll();

    // Setting the websites theme
    if (localStorage.theme === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }

    this.setState({
      icon: localStorage.theme === "light" ? <FaMoon /> : <IoMdSunny />,
    });
  }

  render() {
    return (
      <div
        className={
          "fixed w-full h-20 flex justify-between items-center px-8 dark:text-gray-200 bg-green-50 dark:bg-gray-900 web-menu border-solid border-b-2 " +
          (this.state.scrolled
            ? "border-gray-400 dark:border-white"
            : "border-green-50 dark:border-gray-900")
        }
      >
        <Link to="/" className="flex justify-center items-center h-2/5">
          <img src={Logo} className="h-full mr-2" />
          <span className="text-xl font-mono">Decentrapass</span>
        </Link>
        <div className="flex items-center justify-center">
          <Link to="/docs" className="mx-5 hover:underline">
            Documentation
          </Link>
          <a
            className="mx-5 hover:underline"
            href="https://github.com/Decentrapass"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <Link to="/token" className="mx-5 hover:underline">
            Governance
          </Link>
          <button
            onClick={this.changeTheme}
            className="text-lg p-3 hover:text-gray-600 dark:hover:text-gray-400 ml-2 rounded focus:outline-none"
          >
            {this.state.icon}
          </button>
          <a
            className="mx-5 bg-green-300 dark:bg-green-700 hover:bg-green-400 dark:hover:bg-green-600 py-2 px-3 rounded-full"
            href="/app/login"
          >
            Launch Decentrapass
          </a>
        </div>
      </div>
    );
  }
}

export default Nav;
