// Home.js
import React from "react";
import "./Home.css";
import Products from "./Products";
import BannerSlider from "./BannerSlider";

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <BannerSlider /> {/* Use the BannerSlider component */}
        <div className="products_grid">
          <div className="home_row">
            <Products
              id="12334"
              title="Nike Black Hoodie"
              price={19.99}
              image="images/jacket.png"
              rating={3}
            />
            <Products
              id="98030"
              title="Classic Comfort Hoodie"
              price={24.99}
              image="images/shoes.png"
              rating={4}
            />
          </div>
          <div className="home_row">
            <Products
              id="93939"
              title="This is imported from Brazil"
              price={29.99}
              image="images/jacket.png"
              rating={5}
            />
            <Products
              id="39393"
              title="Sports Edition Hoodie"
              price={22.99}
              image="images/jacket.png"
              rating={4}
            />
            <Products
              id="53535"
              title="Premium Cotton Hoodie"
              price={27.99}
              image="images/jacket.png"
              rating={5}
            />
          </div>
          <div className="home_row">
            <Products
              id="73728"
              title="Winter Special Hoodie"
              price={25.99}
              image="images/jacket.png"
              rating={4}
            />
            <Products
              id="99339"
              title="Casual Wear Hoodie"
              price={21.99}
              image="images/jacket.png"
              rating={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
