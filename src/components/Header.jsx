import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  { label: "Women", path: "/shop?category=women" },
  { label: "Men", path: "/shop?category=men" },
  { label: "Kids", path: "/shop?category=kids" },
  { label: "All Collections", path: "/shop" },
  { label: "Blog", path: "/blog" },
];

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const accountRef = useRef(null);
  const navigate = useNavigate();

  const { cartCount = 0, wishlist = [] } = useStore();
  const { user, signOut } = useAuth();

  const wishlistCount = Array.isArray(wishlist) ? wishlist.length : 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target)
      ) {
        setAccountOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setAccountOpen(false);
        setMobileMenuOpen(false);
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setAccountOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchTerm.trim();

    if (!query) return;

    navigate(`/shop?search=${encodeURIComponent(query)}`);
    setSearchOpen(false);
    setMobileMenuOpen(false);
    setSearchTerm("");
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setAccountOpen(false);
      setMobileMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Unable to sign out:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      {/* Main header — wider container */}
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="flex h-[76px] items-center justify-between gap-4">
          {/* Logo + brand name */}
          <Link
            to="/"
            onClick={closeMenu}
            aria-label="HIMAANIX home"
            className="flex shrink-0 items-center gap-2.5 no-underline"
          >
            <img
              src="/logo.png"
              alt="HIMAANIX logo"
              className="h-11 w-11 shrink-0 object-contain sm:h-12 sm:w-12"
            />

            <span className="font-sans text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              HIMAANIX
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 lg:flex xl:gap-8"
          >
            {navigation.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="whitespace-nowrap text-sm font-medium text-gray-700 transition-colors hover:text-black"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop search — slightly wider */}
          <form
            onSubmit={handleSearch}
            className="hidden max-w-[280px] flex-1 items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-2 xl:flex"
            role="search"
          >
            <Search size={17} className="shrink-0 text-gray-500" />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search products..."
              aria-label="Search products"
              className="ml-2 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </form>

          {/* Header actions */}
          <div className="flex shrink-0 items-center gap-3 sm:gap-4">
            {/* Mobile/tablet search toggle */}
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              aria-label={searchOpen ? "Close search" : "Open search"}
              className="p-1.5 text-gray-700 transition hover:text-black xl:hidden"
            >
              {searchOpen ? <X size={21} /> : <Search size={21} />}
            </button>

            {/* Account dropdown */}
            <div ref={accountRef} className="relative hidden sm:block">
              <button
                type="button"
                onClick={() => setAccountOpen((open) => !open)}
                aria-expanded={accountOpen}
                aria-label="Account menu"
                className="flex items-center gap-1.5 text-gray-700 transition hover:text-black"
              >
                <UserRound size={21} />
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
                <div className="absolute right-0 top-full mt-4 w-56 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
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
                      </div>

                      <Link
                        to="/account"
                        onClick={() => setAccountOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        My Account
                      </Link>

                      <Link
                        to="/orders"
                        onClick={() => setAccountOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
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
                        onClick={() => setAccountOpen(false)}
                        className="block rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        Sign In
                      </Link>

                      <Link
                        to="/register"
                        onClick={() => setAccountOpen(false)}
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
              className="relative p-1 text-gray-700 transition hover:text-black"
            >
              <Heart size={22} />

              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Shopping bag */}
            <Link
              to="/cart"
              onClick={closeMenu}
              aria-label={`Shopping bag, ${cartCount} items`}
              className="relative p-1 text-gray-700 transition hover:text-black"
            >
              <ShoppingBag size={22} />

              {cartCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-black px-1 text-[10px] font-semibold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className="p-1.5 text-gray-800 lg:hidden"
            >
              {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
            </button>
          </div>
        </div>

        {/* Mobile/tablet search form */}
        {searchOpen && (
          <form
            onSubmit={handleSearch}
            role="search"
            className="border-t border-gray-100 py-3 xl:hidden"
          >
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5">
              <Search size={18} className="shrink-0 text-gray-500" />

              <input
                autoFocus
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full bg-transparent text-sm outline-none"
              />

              <button
                type="submit"
                className="text-sm font-semibold text-gray-900"
              >
                Search
              </button>
            </div>
          </form>
        )}

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-100 py-4 lg:hidden">
            <nav
              aria-label="Mobile navigation"
              className="flex flex-col"
            >
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={closeMenu}
                  className="border-b border-gray-100 px-2 py-3.5 text-sm font-medium text-gray-800 transition hover:bg-gray-50"
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-3 flex flex-col gap-1 sm:hidden">
                {user ? (
                  <>
                    <Link
                      to="/account"
                      onClick={closeMenu}
                      className="rounded-lg px-2 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      My Account
                    </Link>

                    <Link
                      to="/orders"
                      onClick={closeMenu}
                      className="rounded-lg px-2 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      My Orders
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="flex items-center gap-2 rounded-lg px-2 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut size={17} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMenu}
                      className="rounded-lg px-2 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Sign In
                    </Link>

                    <Link
                      to="/register"
                      onClick={closeMenu}
                      className="rounded-lg px-2 py-3 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}