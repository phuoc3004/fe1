import { Carousel, Image } from "antd";
import React from "react";
import LazyLoad from "react-lazyload";
import "./Banner.scss";

const Banner = () => {
  return (
    <div className="banner">
      <Carousel dotPosition={"bottom"} autoplay>
        <div>
          <div className="banner-slide">
            <LazyLoad>
              <Image
                src="https://file.hstatic.net/200000018774/file/dsc00989_copy_86f6c86997424841878075fcac458f23.jpg"
                preview={false}
                title="collections"
              />
            </LazyLoad>
            <div className="banner-text">CLOTHES SHOP</div>
          </div>
        </div>
        <div>
          <div className="banner-slide">
            <LazyLoad>
              <Image
                src="https://file.hstatic.net/200000018774/collection/dsc01063_copy_098bbc1d027345d283d0ff618270d423.jpg"
                preview={false}
                title="collections"
              />
            </LazyLoad>
            <div className="banner-text">CLOTHES SHOP</div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
