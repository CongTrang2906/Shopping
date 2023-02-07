import React from "react";
import "./FeaturedProducts.scss";
import Card from "../Card/Card";
const FeaturedProducts = ({ type }) => {
  const data = [
    {
      id: 1,
      img: "https://product.hstatic.net/1000284478/product/01_536477_2_fc38ed319e2c42b8b7aa63f2e1f971b9_grande.jpg",
      img2: "https://product.hstatic.net/1000284478/product/01_536159_2_e1515e2ba5d344dbaf5541907547f933_grande.jpg",
      title: "MLB",
      isNew: true,
      oldPrice: 19,
      price: 12,
    },
    {
      id: 2,
      img: "https://product.hstatic.net/1000284478/product/01_536371_2_3d453d528f5248cc9a973674e048c3d9_grande.jpg",
      title: "Puma Basketball",
      isNew: true,
      oldPrice: 19,
      price: 12,
    },
    {
      id: 3,
      img: "https://product.hstatic.net/1000284478/product/22_536161_2_74def6a507c345c69c487f4163906e58_grande.jpg",
      title: "Puma Printed",
      isNew: true,
      oldPrice: 19,
      price: 12,
    },
    {
      id: 4,
      img: "https://product.hstatic.net/1000284478/product/50crs_3afdb0326_1_b51bef8518b14c22bedae00a88661d1b_large.jpg",
      title: "MLB",
      isNew: true,
      oldPrice: 19,
      price: 12,
    },
  ];
  return (
    <div className="featuredproducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minus
          placeat ducimus in, deleniti voluptates fuga fugit exercitationem
          impedit cupiditate. Saepe deleniti rem expedita voluptate. Esse sunt
          sit earum nihil laudantium.
        </p>
      </div>
      <div className="bottom">
        {data.map((item) => (
          <Card item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
