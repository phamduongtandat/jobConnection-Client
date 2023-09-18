import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Button from '../../components/button/Button';

const HeroSlideContent = ({ image, title, children }) => {
  return (
    <>
      <div className="absolute w-full h-full">
        <img
          src={image}
          alt="hero section image"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      <div className="text-center relative flex flex-col items-center justify-center w-full h-full">
        <h3 className="text-white text-5xl md:text-6xl mb-8 max-w-5xl">
          {title}
        </h3>
        {children}
      </div>
    </>
  );
};

const HeroSection = () => {
  return (
    <Swiper
      pagination={{
        clickable: true,
        bulletActiveClass: 'bg-primary !opacity-100',
      }}
      modules={[Pagination]}
      className="h-[700px] relative z-0 pb-10 bg-gray-100"
      slidesPerView="auto"
    >
      <SwiperSlide>
        <HeroSlideContent
          image="https://cdn.pixabay.com/photo/2017/05/31/11/17/office-2360063_1280.jpg"
          title={
            <p>
              Tìm nhân sự{' '}
              <span className="text-accent font-semibold block md:inline-block">
                phù hợp nhất
              </span>{' '}
              với yêu cầu của doanh nghiệp
            </p>
          }
        >
          <Button>Tạo mới tin tuyển dụng</Button>
        </HeroSlideContent>
      </SwiperSlide>
      <SwiperSlide>
        <HeroSlideContent
          image="https://i.ibb.co/9nZprxk/slider1.jpg"
          title={
            <div>
              <p>Quá trình tuyển dụng</p>
              <p className="text-accent font-semibold">nhanh chóng & dễ dàng</p>
            </div>
          }
        >
          <Button>Xem thử tin tuyển dụng của doanh nghiệp khác</Button>
        </HeroSlideContent>
      </SwiperSlide>
      <SwiperSlide>
        <HeroSlideContent
          image="https://cdn.pixabay.com/photo/2013/03/20/17/00/office-95311_1280.jpg"
          title={
            <p>
              <span className="text-accent font-semibold block">
                Tối ưu chi phí
              </span>{' '}
              cho doanh nghiệp của bạn
            </p>
          }
        >
          <Button>Xem bảng giá</Button>
        </HeroSlideContent>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroSection;
