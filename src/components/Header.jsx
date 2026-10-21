
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  UserRound,
  LogOut,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

import { useStore } from "../context/StoreContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const navigation = [
  { label: "Women", path: "/shop?category=Women" },
  { label: "Men", path: "/shop?category=Men" },
  {
    label: "Shoes",
    children: [
      { label: "Men's Shoes", path: "/shoes/men" },
      { label: "Women's Shoes", path: "/shoes/women" },
    ],
  },
  {
    label: "Watches",
    children: [
      { label: "Men's Watches", path: "/watches/men" },
      { label: "Women's Watches", path: "/watches/women" },
    ],
  },
  { label: "Kids", path: "/shop?category=Kids" },
  { label: "All Collections", path: "/shop" },
  { label: "Blog", path: "/blog" },
];

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [openNavMenu, setOpenNavMenu] = useState("");

  const accountRef = useRef(null);
  const navRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    cartCount = 0,
    wishlist = [],
  } = useStore();

  const { user, signOut } = useAuth();

  const wishlistCount = Array.isArray(wishlist)
    ? wishlist.length
    : 0;

  const isShoesPage = location.pathname.startsWith("/shoes/");
  const isWatchesPage = location.pathname.startsWith("/watches/");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setAccountOpen(false);
      }

      if (
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setOpenNavMenu("");
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setAccountOpen(false);
        setOpenNavMenu("");
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleClickOutside
      );
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setAccountOpen(false);
    setOpenNavMenu("");
    setSearchOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchTerm.trim();

    if (query) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
    } else {
      navigate("/shop");
    }

    closeMenu();
    setSearchTerm("");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      closeMenu();
      navigate("/");
    } catch (error) {
      console.error("Unable to sign out:", error);
    }
  };

  const linkClass =
    "flex min-h-[72px] items-center gap-1 whitespace-nowrap " +
    "border-b-2 border-transparent text-sm font-semibold " +
    "text-slate-800 transition hover:border-pink-600 " +
    "hover:text-pink-600 xl:text-base";

  const mobileLinkClass =
    "flex min-h-12 items-center justify-between border-b " +
    "border-gray-100 px-2 text-sm font-medium text-slate-800 " +
    "transition hover:text-pink-600";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white text-slate-800">
      {/* Main Header */}
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex min-h-[76px] items-center justify-between gap-3">

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen((open) => !open);
              setSearchOpen(false);
            }}
            aria-label={
              mobileMenuOpen ? "Close menu" : "Open menu"
            }
            aria-expanded={mobileMenuOpen}
            className="shrink-0 rounded-md p-1.5 text-slate-800 transition hover:bg-gray-100 lg:hidden"
          >
            {mobileMenuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>

          {/* Logo and Brand */}
          <Link
            to="/"
            onClick={closeMenu}
            aria-label="HIMAANIX home"
            className="flex shrink-0 items-center gap-2.5 no-underline"
          >
            <img
              src="/logo.png"
              alt="HIMAANIX logo"
              className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
            />

            <span className="font-sans text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              HIMAANIX
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            ref={navRef}
            aria-label="Main navigation"
            className="ml-auto hidden shrink-0 items-center gap-4 lg:flex xl:gap-6"
          >
            {navigation.map((item) => {
              const isActiveDropdown =
                (item.label === "Shoes" && isShoesPage) ||
                (item.label === "Watches" && isWatchesPage);

              if (item.children) {
                const isOpen = openNavMenu === item.label;

                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() =>
                      setOpenNavMenu(item.label)
                    }
                    onMouseLeave={() =>
                      setOpenNavMenu((current) =>
                        current === item.label ? "" : current
                      )
                    }
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenNavMenu((current) =>
                          current === item.label
                            ? ""
                            : item.label
                        )
                      }
                      aria-expanded={isOpen}
                      aria-haspopup="menu"
                      className={`${linkClass} ${isOpen || isActiveDropdown
                        ? "border-pink-600 text-pink-600"
                        : ""
                        }`}
                    >
                      {item.label}

                      <ChevronDown
                        size={15}
                        className={`transition-transform ${isOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {isOpen && (
                      <div
                        role="menu"
                        className="absolute left-0 top-full z-[60] min-w-44 overflow-hidden rounded-b-lg border border-gray-100 bg-white py-2 shadow-xl"
                      >
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            role="menuitem"
                            onClick={closeMenu}
                            className="block px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-pink-50 hover:text-pink-600"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={closeMenu}
                  className={linkClass}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Search */}
          <form
            onSubmit={handleSearch}
            role="search"
            className="hidden min-w-[180px] max-w-[280px] flex-1 items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-2 xl:flex"
          >
            <Search
              size={18}
              className="shrink-0 text-gray-500"
            />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search products..."
              aria-label="Search products"
              className="min-w-0 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="text-gray-500 hover:text-pink-600"
              >
                <X size={16} />
              </button>
            )}
          </form>

          {/* Header Actions */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-4 xl:gap-5">

            {/* Search Toggle */}
            <button
              type="button"
              onClick={() => {
                setSearchOpen((open) => !open);
                setMobileMenuOpen(false);
              }}
              aria-label={
                searchOpen ? "Close search" : "Open search"
              }
              aria-expanded={searchOpen}
              className="p-1.5 text-gray-700 transition hover:text-pink-600 xl:hidden"
            >
              {searchOpen ? (
                <X size={21} />
              ) : (
                <Search size={21} />
              )}
            </button>

            {/* Account Dropdown */}
            <div
              ref={accountRef}
              className="relative hidden sm:block"
            >
              <button
                type="button"
                onClick={() =>
                  setAccountOpen((open) => !open)
                }
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                aria-label="Account menu"
                className="flex items-center gap-1.5 text-gray-700 transition hover:text-pink-600"
              >
                {user ? (
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-pink-50 text-sm font-semibold text-pink-600">
                    {user.name?.trim()?.charAt(0)?.toUpperCase() || (
                      <UserRound size={18} />
                    )}
                  </span>
                ) : (
                  <UserRound size={22} />
                )}

                <span className="hidden max-w-24 truncate text-sm md:inline">
                  {user?.name || "Account"}
                </span>

                <ChevronDown
                  size={15}
                  className={`transition-transform ${accountOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {accountOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-[60] mt-4 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white p-2 shadow-xl"
                >
                  {user ? (
                    <>
                      <div className="border-b border-gray-100 px-3 py-3">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {user.name || "Welcome"}
                        </p>

                        {user.email && (
                          <p className="mt-1 truncate text-xs text-gray-500">
                            {user.email}
                          </p>
                        )}

                        <p className="mt-1 text-xs capitalize text-pink-600">
                          {user.role || "User"}
                        </p>
                      </div>

                      <Link
                        to="/account"
                        role="menuitem"
                        onClick={closeMenu}
                        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <UserRound size={16} />
                        My Account
                      </Link>

                      <Link
                        to="/orders"
                        role="menuitem"
                        onClick={closeMenu}
                        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <ShoppingBag size={16} />
                        My Orders
                      </Link>

                      <button
                        type="button"
                        onClick={handleSignOut}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={16} />
                        Sign Out
                      </button>
                    </>
                  ) : (
                      <>
                        <Link
                          to="/login"
                          role="menuitem"
                          onClick={closeMenu}
                          className="block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Sign In
                        </Link>

                        <Link
                          to="/register"
                          role="menuitem"
                          onClick={closeMenu}
                          className="block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Create Account
                        </Link>
                      </>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              onClick={closeMenu}
              aria-label={`Wishlist, ${wishlistCount} items`}
              className="relative p-1 text-gray-700 transition hover:text-pink-600"
            >
              <Heart size={22} strokeWidth={1.8} />

              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-pink-600 px-1 text-[10px] font-bold text-white">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping Cart */}
            <Link
              to="/cart"
              onClick={closeMenu}
              aria-label={`Shopping bag, ${cartCount} items`}
              className="relative p-1 text-gray-700 transition hover:text-pink-600"
            >
              <ShoppingBag size={22} strokeWidth={1.8} />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-pink-600 px-1 text-[10px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile and Tablet Search */}
        {searchOpen && (
          <form
            onSubmit={handleSearch}
            role="search"
            className="border-t border-gray-100 py-3 xl:hidden"
          >
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 focus-within:border-pink-500">
              <Search
                size={18}
                className="shrink-0 text-gray-500"
              />

              <input
                autoFocus
                type="search"
                value={searchTerm}
                onChange={(event) =>
                  setSearchTerm(event.target.value)
                }
                placeholder="Search products, styles, brands"
                aria-label="Search products"
                className="min-w-0 w-full bg-transparent text-sm outline-none"
              />

              <button
                type="submit"
                className="text-sm font-semibold text-pink-600"
              >
                Search
              </button>
            </div>
          </form>
        )}

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="absolute left-0 right-0 top-full z-50 flex max-h-[75vh] flex-col overflow-y-auto border-t border-gray-100 bg-white px-5 py-2 shadow-xl lg:hidden"
          >
            {navigation.map((item) => {
              if (item.children) {
                const isOpen = openNavMenu === item.label;

                const isActive =
                  (item.label === "Shoes" && isShoesPage) ||
                  (item.label === "Watches" && isWatchesPage);

                return (
                  <div
                    key={item.label}
                    className="border-b border-gray-100"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenNavMenu((current) =>
                          current === item.label
                            ? ""
                            : item.label
                        )
                      }
                      aria-expanded={isOpen}
                      className={`flex min-h-12 w-full items-center justify-between text-left text-sm font-medium transition hover:text-pink-600 ${isActive ? "text-pink-600" : ""
                        }`}
                    >
                      {item.label}

                      <ChevronDown
                        size={17}
                        className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""
                          }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="pb-2 pl-4">
                        {item.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            onClick={closeMenu}
                            className="flex min-h-10 items-center text-sm text-gray-600 transition hover:text-pink-600"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={closeMenu}
                  className={mobileLinkClass}
                >
                  {item.label}
                  <span className="text-xl text-gray-400">›</span>
                </Link>
              );
            })}

            {/* Extra Collections */}
            <Link
              to="/shop?category=New%20Arrivals"
              onClick={closeMenu}
              className={mobileLinkClass}
            >
              New Arrivals
              <span className="text-xl text-gray-400">›</span>
            </Link>

            <Link
              to="/shop?sale=true"
              onClick={closeMenu}
              className="flex min-h-12 items-center justify-between border-b border-gray-100 px-2 text-sm font-semibold text-pink-600"
            >
              Sale
              <span className="text-xl">›</span>
            </Link>

            {/* Mobile Account Links */}
            <div className="mt-2 border-t border-gray-100 pt-2">
              {user ? (
                <>
                  <Link
                    to="/account"
                    onClick={closeMenu}
                    className={mobileLinkClass}
                  >
                    My Account
                    <UserRound size={17} />
                  </Link>

                  <Link
                    to="/orders"
                    onClick={closeMenu}
                    className={mobileLinkClass}
                  >
                    My Orders
                    <ShoppingBag size={17} />
                  </Link>

                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex min-h-12 w-full items-center justify-between px-2 text-left text-sm font-semibold text-red-600"
                  >
                    Sign Out
                    <LogOut size={17} />
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className={mobileLinkClass}
                  >
                    Sign In
                    <UserRound size={17} />
                  </Link>

                  <Link
                    to="/register"
                    onClick={closeMenu}
                    className={mobileLinkClass}
                  >
                    Create Account
                    <UserRound size={17} />
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
