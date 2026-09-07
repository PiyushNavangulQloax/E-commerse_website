import ScrollyCanvas from '../components/scrollytelling/ScrollyCanvas';
import Projects from '../components/scrollytelling/Projects';
import FeaturedCategories from '../components/home/FeaturedCategories';
import ProductCarouselSection from '../components/home/ProductCarouselSection';
import EditorialSplit from '../components/home/EditorialSplit';
import BrandStory from '../components/home/BrandStory';
import SocialGallery from '../components/home/SocialGallery';
import Newsletter from '../components/home/Newsletter';

const Home = () => {
  return (
    <div className="w-full font-sans bg-[#121212]">
      {/* 
        Awwwards-level Scrollytelling Section
        This replaces the standard Hero section with a high-performance 
        canvas image sequence scrubber and parallax overlays.
      */}
      <div className="relative">
        <ScrollyCanvas />
      </div>

      {/* Glassmorphism Projects Grid */}
      <Projects />

      {/* 
        Below the dark scrollytelling experience, we transition back 
        to the bright, premium E-Commerce experience seamlessly.
      */}
      <div className="bg-background pt-24 rounded-t-[40px] -mt-[40px] relative z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        <FeaturedCategories />
        
        <ProductCarouselSection 
          title="NEW ARRIVALS" 
          subtitle="Fresh silhouettes. Timeless details." 
          viewAllLink="/shop?filter=new"
        />
        
        <EditorialSplit />
        
        <BrandStory />
        
        <SocialGallery />
        
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;
