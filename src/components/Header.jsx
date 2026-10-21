import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  Heart,
  ShoppingBag,
  UserRound,
  LogOut,
  ChevronUp,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useStore } from "../context/StoreContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useLocation } from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openNavMenu, setOpenNavMenu] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const profileMenuRef = useRef(null);
  const navMenuRef = useRef(null);

  const { cartCount, wishlist } = useStore();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isShoesPage = pathname.startsWith("/shoes/");
  const isWatchesPage = pathname.startsWith("/watches/");

  const primaryCategories = [
    
    { label: "Women", path: "/shop?category=Women" },
    { label: "Men", path: "/shop?category=Men" },
    { label: "Shoes", children: [
      { label: "Men", path: "/shoes/men" },
      { label: "Women", path: "/shoes/women" },
    ] },
    { label: "Watches", children: [
      { label: "Men", path: "/watches/men" },
      { label: "Women", path: "/watches/women" },
    ] },
    { label: "Kids", path: "/shop?category=Kids" },
    { label: "All Collections ", path: "/shop" },
    { label: "Blog", path: "/blog" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();

    const value = query.trim();

    navigate(
      value ? `/shop?search=${encodeURIComponent(value)}` : "/shop"
    );

    setMenuOpen(false);
  };

  const closeMenu = () => setMenuOpen(false);
  const closeNavMenu = () => setOpenNavMenu("");
  const handleLogout = () => {
    signOut();
    setMenuOpen(false);
    setProfileMenuOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setProfileMenuOpen(false);
      }
      if (!navMenuRef.current?.contains(event.target)) {
        setOpenNavMenu("");
      }
    };
    const handleKeyDown = (event) => {
      if (event.key === "Escape") setProfileMenuOpen(false);
      if (event.key === "Escape") setOpenNavMenu("");
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white text-slate-800">
      {/* Main Header */}
      <div className="mx-auto flex min-h-[72px] items-center gap-3 px-4 sm:px-6 lg:gap-5 lg:px-8 xl:px-12">
        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="shrink-0 rounded-md p-1.5 text-slate-800 transition hover:bg-gray-100 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Himaanix Logo */}
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center gap-1 whitespace-nowrap no-underline"
          aria-label="Himaanix home"
        >
          <span className="grid h-7 w-7 place-items-center rounded-full bg-pink-600 font-serif text-lg font-bold text-white">
            H
          </span>

          <span className="text-2xl font-extrabold tracking-[-1px] text-slate-900">
            himaanix
          </span>

          {/* Fix #1: text-[9px] → text-xs */}
          <span className="self-start text-xs text-slate-700">
            ®
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          ref={navMenuRef}
          className="ml-auto hidden shrink-0 items-center gap-6 whitespace-nowrap lg:flex xl:gap-8"
          aria-label="Main navigation"
        >
          {primaryCategories.map((category) => (
            category.children ? (
              <div
                key={category.label}
                className="relative"
                onMouseEnter={() => setOpenNavMenu(category.label)}
                onMouseLeave={() =>
                  setOpenNavMenu((open) =>
                    open === category.label ? "" : open
                  )
                }
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenNavMenu((open) =>
                      open === category.label ? "" : category.label
                    )
                  }
                  aria-expanded={openNavMenu === category.label}
                  aria-haspopup="menu"
                  className={`flex min-h-[72px] items-center gap-1 border-b-2 text-base font-semibold capitalize transition hover:border-pink-600 hover:text-pink-600 ${
                    (category.label === "Shoes" && isShoesPage) ||
                    (category.label === "Watches" && isWatchesPage) ||
                    openNavMenu === category.label
                      ? "border-pink-600 text-pink-600"
                      : "border-transparent text-slate-800"
                  }`}
                >
                  {category.label}
                  <ChevronDown
                    size={15}
                    className={`transition-transform ${openNavMenu === category.label ? "rotate-180" : ""}`}
                  />
                </button>
                {openNavMenu === category.label && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full z-[60] min-w-40 border border-gray-100 bg-white py-2 shadow-lg"
                  >
                    {category.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        role="menuitem"
                        onClick={closeNavMenu}
                        className="block px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-gray-50 hover:text-pink-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={category.label}
                to={category.path}
                className="flex min-h-[72px] items-center gap-1 border-b-2 border-transparent text-base font-semibold capitalize text-slate-800 transition hover:border-pink-600 hover:text-pink-600"
              >
                {category.label}
              </Link>
            )
          ))}
        </nav>

        {/* Desktop Search */}
        <form
          onSubmit={handleSearch}
          className="hidden h-12 min-w-[220px] max-w-[420px] flex-1 items-center gap-3 border-b border-gray-300 bg-gray-50 px-4 focus-within:border-pink-600 focus-within:bg-white md:flex lg:ml-2"
        >
          <Search
            size={23}
            className="shrink-0 text-slate-500"
          />

          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, styles, brands"
            aria-label="Search products"
            className="min-w-0 flex-1 bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-500"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="shrink-0 text-slate-500 transition hover:text-pink-600"
              aria-label="Clear search"
            >
              <X size={17} />
            </button>
          )}
        </form>

        {/* Account, Wishlist and Cart */}
        <div className="ml-auto flex shrink-0 items-center justify-end gap-5 sm:gap-7 lg:ml-0 lg:gap-8">
          {/* Account */}
          {user ? (
            <div className="relative" ref={profileMenuRef}>
              <button
                type="button"
                onClick={() => setProfileMenuOpen((open) => !open)}
                aria-expanded={profileMenuOpen}
                aria-haspopup="menu"
                className="flex min-w-[172px] items-center gap-3 rounded border border-gray-200 bg-white px-2.5 py-1.5 text-left transition hover:border-gray-300"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded bg-slate-100 text-sm font-semibold text-slate-800">
                  {user.name?.trim()?.charAt(0)?.toUpperCase() || <UserRound size={18} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-bold uppercase tracking-wide text-slate-900">
                    {user.role === "admin" ? "Administrator" : user.name}
                  </span>
                  <span className="mt-0.5 block text-[10px] uppercase tracking-wide text-amber-600">
                    {user.role || "User"}
                  </span>
                </span>
                <ChevronUp
                  size={15}
                  className={`shrink-0 text-slate-500 transition-transform ${profileMenuOpen ? "" : "rotate-180"}`}
                />
              </button>

              {profileMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-full z-[60] mt-3 w-52 overflow-hidden rounded border border-gray-200 bg-white py-1 text-sm text-slate-700 shadow-xl"
                >
                  <Link
                    to="/account"
                    role="menuitem"
                    onClick={() => setProfileMenuOpen(false)}
                    className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 transition hover:bg-gray-50 hover:text-slate-900"
                  >
                    <UserRound size={17} />
                    My Profile
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-4 py-3 text-left text-pink-600 transition hover:bg-gray-50 hover:text-pink-700"
                  >
                    <LogOut size={17} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="flex flex-col items-center gap-1 text-slate-800 no-underline transition hover:text-pink-600"
            >
              <UserRound size={25} strokeWidth={1.7} />
              <span className="hidden text-sm font-medium sm:block">Account</span>
            </Link>
          )}

          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="flex flex-col items-center gap-1 text-slate-800 no-underline transition hover:text-pink-600"
          >
            <span className="relative">
              <Heart size={27} strokeWidth={1.7} />

              {wishlist.length > 0 && (
                /* Fix #1: text-[10px] → text-xs */
                <span className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-pink-700 px-1 text-xs font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </span>

            <span className="hidden text-sm font-medium sm:block">
              Wishlist
            </span>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="flex flex-col items-center gap-1 text-slate-800 no-underline transition hover:text-pink-600"
          >
            <span className="relative">
              <ShoppingBag size={27} strokeWidth={1.7} />

              {/* Fix #1: text-[10px] → text-xs */}
              <span className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-pink-700 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            </span>

            <span className="hidden text-sm font-medium sm:block">
              Cart
            </span>
          </Link>
        </div>
      </div>

      {/* Mobile Search */}
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-3 border-t border-gray-100 bg-white px-4 py-2.5 md:hidden"
      >
        <Search
          size={20}
          className="shrink-0 text-slate-500"
        />

        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, styles, brands"
          aria-label="Search products"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500"
        />

        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="text-slate-500 hover:text-pink-600"
          >
            <X size={17} />
          </button>
        )}
      </form>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav
          className="absolute left-0 right-0 top-full flex max-h-[75vh] flex-col overflow-y-auto border-t border-gray-100 bg-white px-5 py-2 shadow-xl lg:hidden"
          aria-label="Mobile navigation"
        >
          {primaryCategories.map((category) => (
            category.children ? (
              <div key={category.label} className="border-b border-gray-100">
                <button
                  type="button"
                  onClick={() =>
                    setOpenNavMenu((open) =>
                      open === category.label ? "" : category.label
                    )
                  }
                  aria-expanded={openNavMenu === category.label}
                  className={`flex min-h-12 w-full items-center justify-between text-left text-sm font-medium transition hover:text-pink-600 ${
                    (category.label === "Shoes" && isShoesPage) ||
                    (category.label === "Watches" && isWatchesPage)
                      ? "text-pink-600"
                      : "text-slate-800"
                  }`}
                >
                  {category.label}
                  <ChevronDown
                    size={16}
                    className={`text-gray-400 transition-transform ${openNavMenu === category.label ? "rotate-180" : ""}`}
                  />
                </button>
                {openNavMenu === category.label && (
                  <div className="pb-2 pl-4">
                    {category.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={() => {
                          closeMenu();
                          closeNavMenu();
                        }}
                        className="flex min-h-10 items-center text-sm text-slate-600 transition hover:text-pink-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={category.label}
                to={category.path}
                onClick={closeMenu}
                className="flex min-h-12 items-center justify-between border-b border-gray-100 text-sm font-medium text-slate-800 transition hover:text-pink-600"
              >
                {category.label}
                <span className="text-xl text-gray-400">›</span>
              </Link>
            )
          ))}

          <Link
            to="/shop?category=New%20Arrivals"
            onClick={closeMenu}
            className="flex min-h-12 items-center justify-between border-b border-gray-100 text-sm font-medium text-slate-800 hover:text-pink-600"
          >
            New Arrivals
            <span className="text-xl text-gray-400">›</span>
          </Link>

          <Link
            to="/shop?sale=true"
            onClick={closeMenu}
            className="flex min-h-12 items-center justify-between text-sm font-semibold text-pink-600"
          >
            Sale
            <span className="text-xl">›</span>
          </Link>
          <Link
            to={user ? "/account" : "/login"}
            onClick={closeMenu}
            className="flex min-h-12 items-center justify-between border-t border-gray-100 text-sm font-semibold text-slate-800"
          >
            {user ? "My Profile" : "Account"}
            <span className="text-xl text-gray-400">›</span>
          </Link>
          {user && (
            <button
              type="button"
              onClick={handleLogout}
              className="flex min-h-12 items-center justify-between text-left text-sm font-semibold text-pink-600"
            >
              Logout
              <LogOut size={18} />
            </button>
          )}
        </nav>
      )}
    </header>
  );
}