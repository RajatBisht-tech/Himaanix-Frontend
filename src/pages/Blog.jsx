import { Link, useParams } from "react-router-dom";

const blogPosts = [
  {
    id: "women-kurtis",
    slug: "/blog/comfortable-everyday-kurtis",
    category: "WOMEN",
    title: "Comfortable Everyday Kurtis for Women: What to Wear to Work and Beyond",
    excerpt:
      "Finding the right kurti for everyday wear is about balancing comfort, style and versatility. Discover breathable fabrics, flattering prints and easy-to-maintain designs that take you effortlessly from busy workdays to relaxed weekends.",
    image: "/Kurtis.png",
    bannerTitle: "Comfortable Everyday Kurtis for Women",
    bannerSubtitle: "What to wear to work and beyond",
    features: [
      { icon: "✨", label: "Breathable Fabrics" },
      { icon: "🌿", label: "Versatile Styles" },
      { icon: "💼", label: "Work Ready" },
      { icon: "👌", label: "Easy to Maintain" },
    ],
    bgGradient: "from-[#f4e8e1] to-[#e8d7cd]",
    sections: [
      {
        heading: "Start with fabric that feels good all day",
        paragraphs: [
          "An everyday kurti should feel comfortable from the first commute to the last errand. Cotton and other breathable, lightweight fabrics are easy choices for warm days, while a soft cotton blend can offer a little extra structure without feeling restrictive.",
          "Check the fabric care instructions before choosing a favourite. Pieces that are easy to wash and maintain are more likely to become reliable parts of your weekly wardrobe.",
        ],
      },
      {
        heading: "Choose a fit that works for your routine",
        paragraphs: [
          "For a workday, look for a cut that gives you room to move and sits comfortably at the shoulders. A straight kurti pairs neatly with trousers, while a gently flared silhouette creates a more relaxed look. The best fit is the one that lets you sit, walk and work comfortably.",
          "If you are between sizes, compare the garment measurements with a piece you already own and like. This is more useful than relying on a size label alone.",
        ],
      },
      {
        heading: "Build more than one outfit",
        paragraphs: [
          "Keep styling simple for the office: add tailored trousers, comfortable flats and a light layer for air-conditioned spaces. For an evening plan, switch to statement earrings or a colourful scarf. A versatile kurti can move easily between both settings.",
          "Prints and colours can also help you get more use from your wardrobe. Choose shades that work with bottoms and accessories you already own, then add one standout piece when you want a change.",
        ],
      },
    ],
  },
  {
    id: "little-explorers",
    slug: "/blog/stylish-comfort-for-little-explorers",
    category: "KIDS",
    title: "Stylish Comfort for Little Explorers",
    excerpt:
      "Discover stylish outfits for little explorers, from playful everyday looks to charming festive ensembles. Explore comfortable fabrics, delightful prints and versatile designs that let kids move freely while looking their best for every occasion.",
    image: "/HimaanixLittle.png",
    bannerTitle: "Stylish Comfort for Little Explorers",
    bannerSubtitle: "Everyday Looks for Every Occasion",
    features: [
      { icon: "🧸", label: "Soft Fabrics" },
      { icon: "⚽", label: "Play Friendly" },
      { icon: "🌱", label: "Safe & Skin Friendly" },
      { icon: "⭐", label: "Trendy Styles" },
    ],
    bgGradient: "from-[#f2e9dc] to-[#e5d8c8]",
    sections: [
      {
        heading: "Comfort comes first",
        paragraphs: [
          "Kids need clothes that can keep up with them. Soft, breathable fabrics and comfortable fits make it easier to move, play and explore. Look for smooth seams, practical closures and waistbands that stay comfortable throughout the day.",
          "When caring for sensitive skin, check the fabric and wash-care details, and wash new clothes before the first wear. Every child is different, so choose what feels comfortable for yours.",
        ],
      },
      {
        heading: "Dress for the day ahead",
        paragraphs: [
          "For everyday outings, simple layers are useful when the weather changes. A breathable top with an easy layer can work for travel and play, while coordinated sets make getting ready quicker. For celebrations, a special print or festive detail adds personality without needing an uncomfortable outfit.",
          "Think about the activities planned for the day. Clothes that are easy to put on and allow free movement are often the pieces children reach for most.",
        ],
      },
      {
        heading: "Make getting dressed easier",
        paragraphs: [
          "Let children help choose between a few comfortable options. This gives them a say in their style while keeping the choices practical. Keeping favourite pieces together also makes busy mornings simpler.",
          "A small, versatile wardrobe can go a long way: choose colours and separates that pair together, and follow the care instructions so well-loved outfits stay ready for the next adventure.",
        ],
      },
    ],
  },
  {
    id: "every-man",
    slug: "/blog/modern-styles-for-every-man",
    category: "MEN",
    title: "Modern Styles for Every Man",
    excerpt:
      "From office-ready outfits to festive celebrations and weekend outings, discover versatile menswear designed for modern living. Explore timeless kurtas, refined colours and comfortable styles that make dressing well effortless for every occasion.",
    image: "/EveryMan.png",
    bannerTitle: "Modern Styles for Every Man",
    bannerSubtitle: "From Workdays to Weekends",
    features: [
      { icon: "🧵", label: "Premium Fabrics" },
      { icon: "🌿", label: "Versatile Styles" },
      { icon: "💼", label: "Work Ready" },
      { icon: "✨", label: "Everyday Comfort" },
    ],
    bgGradient: "from-[#eae4d9] to-[#dcd4c7]",
    sections: [
      {
        heading: "Build a useful wardrobe foundation",
        paragraphs: [
          "Modern menswear does not need to be complicated. Start with comfortable everyday pieces in colours that are easy to combine. A well-fitting shirt, versatile trousers and a relaxed kurta can cover a range of plans without making the wardrobe feel crowded.",
          "Fit matters as much as style. Choose pieces that sit comfortably at the shoulders and allow you to move freely, then use the product measurements to compare sizes when shopping online.",
        ],
      },
      {
        heading: "Move from work to the weekend",
        paragraphs: [
          "For work, pair a clean shirt or understated kurta with tailored bottoms and simple footwear. For a more relaxed day, switch to an easy layer or a casual top. Keeping the base outfit comfortable makes it simple to adapt when plans change.",
          "A light jacket or overshirt can add structure when needed. Choose a layer that works with several outfits rather than only one special look.",
        ],
      },
      {
        heading: "Add colour and personal details",
        paragraphs: [
          "Neutral shades make dependable foundations, while a deeper colour or subtle print can bring character to an outfit. Try one statement piece at a time and keep the rest of the look simple.",
          "The most useful style is your own. Prioritise comfort, choose pieces that suit your routine, and take care of them according to their labels so they stay in rotation longer.",
        ],
      },
    ],
  },
];

export default function Blog() {
  const { slug } = useParams();
  const selectedPost = slug
    ? blogPosts.find((post) => post.slug === `/blog/${slug}`)
    : null;

  if (slug && selectedPost) {
    return (
      <main className="bg-white px-5 py-10 sm:px-8 lg:px-[5%] lg:py-16">
        <article className="mx-auto max-w-4xl">
          <Link
            to="/blog"
            className="text-sm text-slate-600 underline underline-offset-4 transition-colors hover:text-[#e91e63]"
          >
            Back to all blog posts
          </Link>

          <header className="mt-8 border-b border-gray-200 pb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-600">
              {selectedPost.category} · HIMAANIX Journal
            </p>
            <h1 className="mt-4 font-serif text-3xl leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {selectedPost.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-600">
              {selectedPost.excerpt}
            </p>
          </header>

          <img
            src={selectedPost.image}
            alt={selectedPost.title}
            className="mt-8 h-auto w-full object-contain"
          />

          <div className="mx-auto max-w-3xl py-8 sm:py-10">
            {selectedPost.sections.map((section) => (
              <section key={section.heading} className="mb-8 last:mb-0">
                <h2 className="font-serif text-2xl text-slate-900">
                  {section.heading}
                </h2>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-base leading-8 text-slate-700"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <Link
              to={`/shop?category=${encodeURIComponent(
                selectedPost.category === "WOMEN"
                  ? "Women"
                  : selectedPost.category === "KIDS"
                    ? "Kids"
                    : "Men"
              )}`}
              className="mt-8 inline-flex border border-slate-900 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-900 transition hover:bg-slate-900 hover:text-white"
            >
              Explore {selectedPost.category.toLowerCase()} styles
            </Link>
          </div>
        </article>
      </main>
    );
  }

  if (slug) {
    return (
      <main className="mx-auto min-h-[50vh] max-w-4xl px-5 py-16 text-center sm:px-8">
        <h1 className="font-serif text-3xl text-slate-900">
          Blog post not found
        </h1>
        <Link
          to="/blog"
          className="mt-5 inline-block text-sm text-slate-600 underline underline-offset-4 hover:text-[#e91e63]"
        >
          Back to all blog posts
        </Link>
      </main>
    );
  }

  return (
    <main className="bg-white px-5 py-12 sm:px-8 lg:px-[5%] lg:py-16">
      <div className="mx-auto max-w-[1340px]">
        {/* Page Header */}
        <div className="text-center">
          <h1 className="font-serif text-2xl tracking-[0.3em] text-slate-900 uppercase sm:text-3xl lg:text-[32px]">
            BLOG POSTS
          </h1>
        </div>

        {/* Blog Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
          {blogPosts.map((post) => (
            <article key={post.id} className="flex flex-col">
              
              {/* Banner / Poster Preview */}
              <Link
                to={post.slug}
                className="group relative block overflow-hidden rounded-sm shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#f7eee5]">
                  {/* Photo */}
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                  />
                </div>
              </Link>

              {/* Card Body */}
              <div className="mt-5 flex flex-1 flex-col justify-between">
                <div>
                  {/* Title */}
                  <h2 className="font-sans text-[18px] font-normal leading-snug text-slate-900 transition-colors hover:text-[#e91e63] sm:text-[20px]">
                    <Link to={post.slug}>{post.title}</Link>
                  </h2>

                  {/* Excerpt */}
                  <p className="mt-3 text-[14px] leading-[1.75] text-slate-600 font-normal">
                    {post.excerpt}
                  </p>
                </div>

                {/* Read More Link */}
                <div className="mt-5 pt-1">
                  <Link
                    to={post.slug}
                    className="inline-block text-[14px] font-normal text-slate-900 underline underline-offset-4 decoration-slate-400 transition-colors hover:decoration-[#e91e63] hover:text-[#e91e63]"
                  >
                    Read more
                  </Link>
                </div>
              </div>

            </article>
          ))}
        </div>
      </div>
    </main>
  );
}