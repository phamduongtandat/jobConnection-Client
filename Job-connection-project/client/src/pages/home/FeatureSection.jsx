import { BsCheckCircle } from 'react-icons/bs';
import Button from '../../components/button/Button';
import SectionContainer from '../../components/container/SectionContainer';

const FeatureItem = ({ content }) => {
  return (
    <li className="flex items-start gap-x-4">
      <span className="inline-block mt-1">
        <BsCheckCircle size={18} />
      </span>
      <span>{content}</span>
    </li>
  );
};

const FeatureSection = () => {
  return (
    <SectionContainer
      wrapperClassName="bg-[#0d084d] py-24 text-white"
      className="flex flex-col lg:flex-row gap-y-12 justify-between gap-x-16"
    >
      <div>
        <h3 className="text-3xl font-semibold mb-6">
          Giải pháp cho doanh nghiệp
        </h3>
        <div className="text-xl mb-8">
          Bắt đầu tuyển dụng nhân sự cho doanh nghiệp của bạn theo cách mới:
        </div>
        <ul className="space-y-4 text-lg">
          <FeatureItem content="Tin tuyển dụng tiếp cận tới nhiều người hơn" />
          <FeatureItem content="Nhận thông báo khi có người ứng tuyển" />
          <FeatureItem content="Tiết kiệm chi phí so với phương pháp truyền thống" />
          <FeatureItem content="Tin tuyển dụng luôn được tìm thấy khi đang ở trạng thái mở" />
          <FeatureItem content="Thay đổi trạng thái, thời gian tuyển dụng và những thông tin khác một cách dễ dàng" />
        </ul>
        <Button className="mt-12">Đăng tin tuyển dụng ngay</Button>
      </div>
      <div>
        <img
          className="w-full h-full object-contain object-center"
          alt="illustation image"
          src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png"
        />
      </div>
    </SectionContainer>
  );
};

export default FeatureSection;
