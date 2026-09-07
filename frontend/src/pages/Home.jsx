import ScrollyCanvas from '../components/scrollytelling/ScrollyCanvas';
import FeaturedCategories from '../components/home/FeaturedCategories';
import ProductCarouselSection from '../components/home/ProductCarouselSection';
import SareeFeature from '../components/home/SareeFeature';
import BabyFeature from '../components/home/BabyFeature';
import CollectionGrid from '../components/home/CollectionGrid';
import EditorialSplit from '../components/home/EditorialSplit';
import BrandStory from '../components/home/BrandStory';
import SocialGallery from '../components/home/SocialGallery';
import Newsletter from '../components/home/Newsletter';

import { products } from '../data/products';

const newArrivals = products.filter(p => p.isNew).slice(0, 4);
const sareesProducts = products.filter(p => p.category === 'Sarees').slice(0, 4);
const womenProducts = products.filter(p => p.category === 'Women').slice(0, 4);
const dressesProducts = products.filter(p => p.category === 'Dresses').slice(0, 4);
const ethnicProducts = products.filter(p => p.category === 'Ethnic Wear').slice(0, 4);
const kidsProducts = products.filter(p => p.category === 'Baby & Kids');

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

      {/* 
        Below the scrollytelling experience, we transition into the 
        bright, premium Indian fashion e-commerce showcase.
      */}
      <div className="bg-background pt-24 rounded-t-[40px] -mt-[40px] relative z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        
        {/* 1. Explore Categories Grid */}
        <FeaturedCategories />
        
        {/* 2. New Arrivals Section */}
        <div id="new-arrivals">
          <ProductCarouselSection 
            title="NEW ARRIVALS" 
            subtitle="Fresh silhouettes. Timeless details." 
            viewAllLink="/shop?filter=new"
            products={newArrivals}
          />
        </div>

        {/* 3. Sarees Spotlight Banner + Carousel */}
        <div id="sarees">
          <SareeFeature />
          <ProductCarouselSection 
            title="HANDCRAFTED SAREES" 
            subtitle="Pure Banarasi, Chanderi, and Tissue Silk drapes." 
            viewAllLink="/category/sarees"
            products={sareesProducts}
          />
        </div>

        {/* 4. Women's Wear Section */}
        <div id="women">
          <ProductCarouselSection 
            title="WOMEN'S EDIT" 
            subtitle="Flowing kurtas, shararas, and everyday grace." 
            viewAllLink="/category/women"
            products={womenProducts}
          />
        </div>

        {/* 5. Dresses Section */}
        <div id="dresses">
          <ProductCarouselSection 
            title="CONTEMPORARY DRESSES" 
            subtitle="Modern silhouettes cut from breathable luxury textiles." 
            viewAllLink="/category/dresses"
            products={dressesProducts}
          />
        </div>

        {/* 6. Editorial Feature + Ethnic Wear Section */}
        <div id="ethnic-wear">
          <EditorialSplit />
          <ProductCarouselSection 
            title="FESTIVE ETHNIC WEAR" 
            subtitle="Celebration-ready lehengas, anarkalis, and artisanal sets." 
            viewAllLink="/category/ethnic"
            products={ethnicProducts}
          />
        </div>

        {/* 7. Baby & Kids Section */}
        <div id="kids">
          <BabyFeature />
          <ProductCarouselSection 
            title="BABY & KIDS" 
            subtitle="Gentle organic fabrics and festive outfits crafted with pure love." 
            viewAllLink="/category/kids"
            products={kidsProducts}
          />
        </div>

        {/* 8. Collections Grid */}
        <div id="collections">
          <CollectionGrid />
        </div>

        {/* Brand Heritage, Social, & Newsletter */}
        <BrandStory />
        <SocialGallery />
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;
