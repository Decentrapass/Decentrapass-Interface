import { Component } from "react";
import { Link } from "react-router-dom";
import Logo from "../../img/logo.png";

// ICONS
import { FaMoon } from "react-icons/fa";
import { IoMdSunny, IoMdClose } from "react-icons/io";
import { FiMenu } from "react-icons/fi";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrolled: false,
      menuOpen: false,
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
          "web-menu fixed w-full h-20 flex justify-between items-center px-8 dark:text-gray-200 bg-green-50 dark:bg-gray-900 border-solid border-b-2 z-100 " +
          (this.state.scrolled
            ? "border-gray-400 dark:border-white"
            : "border-green-50 dark:border-gray-900")
        }
      >
        <Link to="/" className="flex justify-center items-center h-2/5">
          <img src={Logo} className="h-full mr-2" />
          <span className="text-xl font-mono">Decentrapass</span>
        </Link>
        {/* LARGE SCREENS */}
        <div className="items-center justify-center hidden lg:flex">
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
          <Link
            className="mx-5 bg-green-300 dark:bg-green-700 hover:bg-green-400 dark:hover:bg-green-600 py-2 px-3 rounded-full"
            to="/app/login"
          >
            Launch Decentrapass
          </Link>
        </div>

        {/* MOBILE */}
        <div className="flex lg:hidden items-center justify-center">
          <button
            onClick={this.changeTheme}
            className="text-lg p-3 hover:text-gray-600 dark:hover:text-gray-400 ml-2 rounded focus:outline-none"
          >
            {this.state.icon}
          </button>
          {this.state.menuOpen ? (
            <IoMdClose
              className="text-2xl"
              onClick={() => {
                this.setState({ menuOpen: false });
              }}
            />
          ) : (
            <FiMenu
              className="text-2xl"
              onClick={() => {
                this.setState({ menuOpen: true });
              }}
            />
          )}
          <div
            className="flex flex-col w-full absolute top-full left-0 border-b-2 bg-green-50 dark:bg-gray-900 border-solid border-gray-400 dark:border-white overflow-hidden web-menu"
            style={
              this.state.menuOpen
                ? {
                    maxHeight: "500px",
                  }
                : { maxHeight: "0px" }
            }
          >
            <div className="pb-5 px-12 flex flex-col">
              <Link to="/docs" className="my-3">
                Documentation
              </Link>
              <a
                className="my-3"
                href="https://github.com/Decentrapass"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
              <Link to="/token" className="my-3">
                Governance
              </Link>
              <Link className="my-3 text-green-500 font-black" to="/app/login">
                Launch Decentrapass
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Nav;
