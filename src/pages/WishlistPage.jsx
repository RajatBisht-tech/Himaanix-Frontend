import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext.jsx";
import ProductGrid from "../components/ProductGrid.jsx";
export default function WishlistPage(){const {wishlist}=useStore();return <main className="shop-page"><div className="shop-heading"><span className="eyebrow">SAVED FOR LATER</span><h1>Your wishlist.</h1></div>{wishlist.length?<ProductGrid products={wishlist}/>:<div className="empty-state"><h3>Your wishlist is waiting for its first favourite.</h3><Link to="/shop" className="primary-btn">EXPLORE THE EDIT</Link></div>}</main>}